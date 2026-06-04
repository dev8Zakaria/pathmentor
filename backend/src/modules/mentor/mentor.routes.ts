import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { generateMentorAnswer } from "../ai/ai.service";
import { Conversation } from "./conversation.model";

const router = Router();
router.use(requireAuth);

router.post(
  "/chat",
  asyncHandler(async (request, response) => {
    const input = z.object({ message: z.string().min(2), conversationId: z.string().optional() }).parse(request.body);

    const conversation = input.conversationId
      ? await Conversation.findOne({ _id: input.conversationId, userId: request.user?.id })
      : await Conversation.create({ userId: request.user?.id, title: input.message.slice(0, 50), messages: [] });

    if (!conversation) {
      response.status(404).json({ message: "Conversation not found" });
      return;
    }

    const mentorAnswer = await generateMentorAnswer(request.user!.id, input.message, conversation.messages);

    conversation.messages.push({ role: "user", content: input.message, createdAt: new Date() });
    conversation.messages.push({ role: "assistant", content: mentorAnswer.answer, createdAt: new Date() });
    await conversation.save();

    response.json({ conversationId: conversation._id, answer: mentorAnswer.answer, provider: mentorAnswer.provider, conversation });
  })
);

router.get(
  "/conversations",
  asyncHandler(async (request, response) => {
    response.json(await Conversation.find({ userId: request.user?.id }).sort({ updatedAt: -1 }).lean());
  })
);

router.get(
  "/conversations/:id",
  asyncHandler(async (request, response) => {
    const conversation = await Conversation.findOne({ _id: request.params.id, userId: request.user?.id }).lean();
    if (!conversation) {
      response.status(404).json({ message: "Conversation not found" });
      return;
    }
    response.json(conversation);
  })
);

export default router;
