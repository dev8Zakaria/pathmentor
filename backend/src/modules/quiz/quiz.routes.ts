import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { QuizAttempt, QuizTemplate } from "./quiz.model";

const router = Router();
router.use(requireAuth);

router.get(
  "/:careerGoalId",
  asyncHandler(async (request, response) => {
    const quiz = await QuizTemplate.findOne({ careerGoalId: request.params.careerGoalId }).lean();
    if (!quiz) {
      response.status(404).json({ message: "Quiz not found" });
      return;
    }
    response.json({
      ...quiz,
      questions: quiz.questions.map(({ correctOptionIndex, ...question }) => question)
    });
  })
);

router.post(
  "/:quizId/submit",
  asyncHandler(async (request, response) => {
    const input = z.object({ answers: z.array(z.object({ questionId: z.string(), selectedOptionIndex: z.number() })) }).parse(request.body);
    const quiz = await QuizTemplate.findById(request.params.quizId);
    if (!quiz) {
      response.status(404).json({ message: "Quiz not found" });
      return;
    }

    const answerById = new Map(input.answers.map((answer) => [answer.questionId, answer.selectedOptionIndex]));
    const answers = quiz.questions.map((question) => {
      const selectedOptionIndex = answerById.get(question.id) ?? -1;
      return {
        questionId: question.id,
        skillTag: question.skillTag,
        selectedOptionIndex,
        isCorrect: selectedOptionIndex === question.correctOptionIndex
      };
    });
    const score = Math.round((answers.filter((answer) => answer.isCorrect).length / Math.max(1, answers.length)) * 100);
    const strengths = [...new Set(answers.filter((answer) => answer.isCorrect).map((answer) => answer.skillTag))];
    const weaknesses = [...new Set(answers.filter((answer) => !answer.isCorrect).map((answer) => answer.skillTag))];

    const attempt = await QuizAttempt.create({
      userId: request.user?.id,
      careerGoalId: quiz.careerGoalId,
      quizTemplateId: quiz._id,
      score,
      answers,
      strengths,
      weaknesses
    });
    response.status(201).json(attempt);
  })
);

export default router;
