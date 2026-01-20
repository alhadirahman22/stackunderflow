"use client";

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { CommentItem, QuestionItem, QuestionStatus } from "@/types/question";
import { initialQuestions, statusOptions } from "@/data/questions";
import { createId } from "@/utils/createId";
import {
  addCommentAction,
  createQuestionAction,
  editCommentAction,
  editQuestionAction,
  questionReducer,
  updateStatusAction,
} from "@/reducers/questionReducer";

export default function useQuestion() {
  const router = useRouter();
  const { isLoggedIn, username } = useAuth();

  const [questions, dispatch] = useReducer(questionReducer, initialQuestions);

  const [selectedId, setSelectedId] = useState<string | null>(
    initialQuestions[0]?.id ?? null,
  );
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [newCommentBody, setNewCommentBody] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentBody, setEditCommentBody] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const selectedQuestion =
    questions.find((question) => question.id === selectedId) ?? null;
  const currentUser = username || "user";

  const selectQuestion = (id: string) => {
    setSelectedId(id);
    setEditingQuestionId(null);
    setEditingCommentId(null);
    setEditCommentBody("");
    setEditTitle("");
    setEditDescription("");
  };

  const createQuestion = () => {
    const trimmedTitle = newTitle.trim();
    const trimmedDescription = newDescription.trim();
    if (!trimmedTitle || !trimmedDescription) {
      return;
    }

    const newQuestion: QuestionItem = {
      id: createId(),
      title: trimmedTitle,
      description: trimmedDescription,
      status: "open",
      createdAt: new Date().toISOString(),
      author: currentUser,
      comments: [],
    };

    dispatch(createQuestionAction(newQuestion));
    setSelectedId(newQuestion.id);
    setNewTitle("");
    setNewDescription("");
  };

  const startEditQuestion = (question: QuestionItem) => {
    setEditingQuestionId(question.id);
    setEditTitle(question.title);
    setEditDescription(question.description);
  };

  const cancelEditQuestion = () => {
    setEditingQuestionId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveQuestionEdits = () => {
    if (!editingQuestionId) {
      return;
    }

    dispatch(
      editQuestionAction(editingQuestionId, editTitle, editDescription, currentUser),
    );
    cancelEditQuestion();
  };

  const updateStatus = (status: QuestionStatus) => {
    if (!selectedQuestion || selectedQuestion.author !== currentUser) {
      return;
    }
    dispatch(updateStatusAction(selectedQuestion.id, status, currentUser));
  };

  const addComment = () => {
    if (!selectedQuestion) {
      return;
    }
    const trimmedBody = newCommentBody.trim();
    if (!trimmedBody) {
      return;
    }
    const comment: CommentItem = {
      id: createId(),
      author: currentUser,
      body: trimmedBody,
      createdAt: new Date().toISOString(),
    };
    dispatch(addCommentAction(selectedQuestion.id, comment));
    setNewCommentBody("");
  };

  const startEditComment = (comment: CommentItem) => {
    setEditingCommentId(comment.id);
    setEditCommentBody(comment.body);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentBody("");
  };

  const saveCommentEdit = () => {
    if (!selectedQuestion || !editingCommentId) {
      return;
    }
    dispatch(
      editCommentAction(
        selectedQuestion.id,
        editingCommentId,
        editCommentBody,
        currentUser,
      ),
    );
    cancelEditComment();
  };

  return {
    isLoggedIn,
    username,
    questions,
    selectedId,
    selectedQuestion,
    statusOptions,
    newTitle,
    newDescription,
    editingQuestionId,
    editTitle,
    editDescription,
    newCommentBody,
    editingCommentId,
    editCommentBody,
    setNewTitle,
    setNewDescription,
    setEditTitle,
    setEditDescription,
    setNewCommentBody,
    setEditCommentBody,
    selectQuestion,
    createQuestion,
    startEditQuestion,
    cancelEditQuestion,
    saveQuestionEdits,
    updateStatus,
    addComment,
    startEditComment,
    cancelEditComment,
    saveCommentEdit,
  };
}
