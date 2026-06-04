import { MessageSquare, Plus, Send, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../services/api";

type Message = {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
};

type Conversation = {
  _id: string;
  title: string;
  messages: Message[];
  updatedAt?: string;
};

export function MentorPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Ask a specific question about your roadmap, a technical concept, or your next portfolio deliverable." }
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadConversations() {
    const response = await api.get<Conversation[]>("/mentor/conversations");
    setConversations(response.data);
    if (!conversationId && response.data[0]) {
      setConversationId(response.data[0]._id);
      setMessages(response.data[0].messages.length ? response.data[0].messages : messages);
    }
  }

  useEffect(() => {
    loadConversations().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeConversation = useMemo(() => conversations.find((conversation) => conversation._id === conversationId), [conversations, conversationId]);

  function openConversation(conversation: Conversation) {
    setConversationId(conversation._id);
    setMessages(conversation.messages.length ? conversation.messages : [{ role: "assistant", content: "This conversation has no messages yet." }]);
  }

  function startNewConversation() {
    setConversationId(undefined);
    setMessages([{ role: "assistant", content: "Start a new mentor thread. Keep it specific: goal, blocker, what you tried, and what you need." }]);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    const userMessage = message.trim();
    setMessages((current) => [...current, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/mentor/chat", { message: userMessage, conversationId });
      setConversationId(response.data.conversationId);
      setMessages(response.data.conversation.messages);
      await loadConversations();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-7rem)] gap-5 xl:grid-cols-[320px_1fr]">
      <aside className="panel flex min-h-[320px] flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-indigo-700">History</p>
            <h2 className="text-lg font-black text-ink">Mentor threads</h2>
          </div>
          <button onClick={startNewConversation} className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-700" aria-label="New conversation">
            <Plus size={18} />
          </button>
        </div>
        <div className="mt-4 space-y-2 overflow-y-auto">
          {conversations.length === 0 && <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">No saved conversations yet.</p>}
          {conversations.map((conversation) => (
            <button
              key={conversation._id}
              onClick={() => openConversation(conversation)}
              className={`interactive-card w-full rounded-xl border p-3 text-left ${conversationId === conversation._id ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white"}`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 text-indigo-600" size={16} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-ink">{conversation.title || "Mentor conversation"}</p>
                  <p className="mt-1 text-xs text-slate-500">{conversation.messages.length} messages</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="panel grid min-h-[calc(100vh-7rem)] grid-rows-[auto_1fr_auto] overflow-hidden">
        <header className="border-b border-slate-200 p-5">
          <p className="flex items-center gap-2 text-sm font-bold uppercase text-indigo-700">
            <Sparkles size={16} />
            Mentor AI
          </p>
          <h1 className="text-2xl font-black text-ink">{activeConversation?.title || "Contextual guidance"}</h1>
          <p className="mt-1 text-sm text-slate-600">Every message is saved in MongoDB and can be reopened from the history panel.</p>
        </header>
        <div className="space-y-4 overflow-y-auto p-5">
          {messages.map((item, index) => (
            <motion.div
              key={`${item.role}-${index}-${item.createdAt ?? ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-3xl rounded-2xl p-4 text-sm leading-6 ${item.role === "user" ? "ml-auto bg-ink text-white" : "bg-slate-50 text-slate-700"}`}
            >
              {item.content.split("\n").map((line, lineIndex) => <p key={`${index}-${lineIndex}`} className="mb-2 last:mb-0">{line}</p>)}
            </motion.div>
          ))}
          {loading && <p className="rounded-xl bg-indigo-50 p-3 text-sm font-semibold text-indigo-700">The mentor is preparing a contextual answer...</p>}
        </div>
        <form onSubmit={submit} className="flex gap-3 border-t border-slate-200 p-4">
          <input value={message} onChange={(event) => setMessage(event.target.value)} className="focus-ring min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-3" placeholder="Example: I understand Docker images but not volumes. What should I build next?" />
          <button className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-700" aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}
