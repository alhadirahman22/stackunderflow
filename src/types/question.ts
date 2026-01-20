export type QuestionStatus = "open" | "answered" | "closed";

export type CommentItem = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

export type QuestionItem = {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  createdAt: string;
  author: string;
  comments: CommentItem[];
};
