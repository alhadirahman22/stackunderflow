"use client";

import useQuestion from "@/hooks/useQuestion";
import type { QuestionStatus } from "@/types/question";

const statusStyles: Record<QuestionStatus, string> = {
  open: "border-emerald-200 bg-emerald-50 text-emerald-700",
  answered: "border-sky-200 bg-sky-50 text-sky-700",
  closed: "border-rose-200 bg-rose-50 text-rose-700",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });


export default function QuestionsPage() {
  const {
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
  } = useQuestion();
  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
        <p className="text-sm text-slate-500">Redirecting to login...</p>
      </main>
    );
  }

  const isOwner = selectedQuestion?.author === username;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Questions
            </p>
            <h1 className="text-3xl font-semibold">Stack Underflow</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            Signed in as <span className="font-semibold">{username}</span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Question list</h2>
              <span className="text-xs text-slate-500">
                {questions.length} total
              </span>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                createQuestion();
              }}
              className="mt-5 space-y-3"
            >
              <input
                type="text"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Question title"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              <textarea
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                placeholder="Describe your question"
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create question
              </button>
            </form>

            <div className="mt-6 max-h-[420px] space-y-3 overflow-y-auto pr-1">
              {questions.map((question) => {
                const isSelected = question.id === selectedId;
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => selectQuestion(question.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${isSelected
                      ? "border-slate-300 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {question.title}
                      </p>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${statusStyles[question.status]}`}
                      >
                        {question.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(question.createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {question.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {!selectedQuestion ? (
              <p className="text-sm text-slate-500">
                Pick a question to see the details.
              </p>
            ) : (
              <div>
                <div className="flex flex-col gap-4 border-b border-slate-200 pb-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      {editingQuestionId === selectedQuestion.id ? (
                        <input
                          value={editTitle}
                          onChange={(event) =>
                            setEditTitle(event.target.value)
                          }
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-lg font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        />
                      ) : (
                        <h2 className="text-2xl font-semibold text-slate-900">
                          {selectedQuestion.title}
                        </h2>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>Asked by {selectedQuestion.author}</span>
                        <span>-</span>
                        <span>{formatDate(selectedQuestion.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      {isOwner ? (
                        <select
                          value={selectedQuestion.status}
                          onChange={(event) =>
                            updateStatus(
                              event.target.value as QuestionStatus,
                            )
                          }
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-slate-600"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[selectedQuestion.status]}`}
                        >
                          {selectedQuestion.status}
                        </span>
                      )}

                      {isOwner && editingQuestionId !== selectedQuestion.id && (
                        <button
                          type="button"
                          onClick={() => startEditQuestion(selectedQuestion)}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                        >
                          Edit question
                        </button>
                      )}
                    </div>
                  </div>

                  {editingQuestionId === selectedQuestion.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editDescription}
                        onChange={(event) =>
                          setEditDescription(event.target.value)
                        }
                        rows={5}
                        className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={saveQuestionEdits}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                        >
                          Save changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditQuestion}
                          className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-slate-700">
                      {selectedQuestion.description}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Comments</h3>
                    <span className="text-xs text-slate-500">
                      {selectedQuestion.comments.length} total
                    </span>
                  </div>

                  <div className="mt-4 max-h-[320px] space-y-3 overflow-y-auto pr-1">
                    {selectedQuestion.comments.length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No comments yet. Be the first to add one.
                      </p>
                    ) : (
                      selectedQuestion.comments.map((comment) => {
                        const canEditComment = comment.author === username;
                        return (
                          <div
                            key={comment.id}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                          >
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span className="font-semibold text-slate-600">
                                {comment.author}
                              </span>
                              <span>{formatDate(comment.createdAt)}</span>
                            </div>

                            {editingCommentId === comment.id ? (
                              <div className="mt-3 space-y-2">
                                <textarea
                                  value={editCommentBody}
                                  onChange={(event) =>
                                    setEditCommentBody(event.target.value)
                                  }
                                  rows={3}
                                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                                />
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={saveCommentEdit}
                                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEditComment}
                                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="mt-2 text-sm text-slate-700">
                                {comment.body}
                              </p>
                            )}

                            {canEditComment &&
                              editingCommentId !== comment.id && (
                                <button
                                  type="button"
                                  onClick={() => startEditComment(comment)}
                                  className="mt-3 text-xs font-semibold text-slate-600 hover:text-slate-900"
                                >
                                  Edit comment
                                </button>
                              )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      addComment();
                    }}
                    className="mt-5 space-y-3"
                  >
                    <textarea
                      value={newCommentBody}
                      onChange={(event) => setNewCommentBody(event.target.value)}
                      placeholder="Write a comment"
                      rows={3}
                      className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Add comment
                    </button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
