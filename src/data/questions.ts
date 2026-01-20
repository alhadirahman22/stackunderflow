import { createId } from "@/utils/createId";
import type { QuestionItem, QuestionStatus } from "@/types/question";

export const statusOptions: QuestionStatus[] = ["open", "answered", "closed"];

export const initialQuestions: QuestionItem[] = [
  {
    id: createId(),
    title: "How do I center a div without magic numbers?",
    description:
      "I want a layout that stays centered across breakpoints. What is a clean approach that does not rely on fixed widths?",
    status: "open",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    author: "naya",
    comments: [
      {
        id: createId(),
        author: "mira",
        body: "Use flexbox on the parent and avoid fixed widths.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ],
  },
  {
    id: createId(),
    title: "When should I use a custom hook vs a helper function?",
    description:
      "I keep mixing helpers and hooks. Is there a good rule to decide when logic belongs in a hook?",
    status: "answered",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    author: "alex",
    comments: [
      {
        id: createId(),
        author: "naya",
        body: "If it uses React state or lifecycle, put it in a hook.",
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
    ],
  },
  {
    id: createId(),
    title: "How do I keep state after navigating in Next.js?",
    description:
      "I need state to persist across views without localStorage. What are my options?",
    status: "closed",
    createdAt: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
    author: "sera",
    comments: [],
  },
];
