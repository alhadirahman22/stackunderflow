import type {
  CommentItem,
  QuestionItem,
  QuestionStatus,
} from "@/types/question";

export type QuestionAction =
  | {
      type: "CREATE_QUESTION";
      payload: QuestionItem;
    }
  | {
      type: "EDIT_QUESTION";
      payload: {
        id: string;
        title: string;
        description: string;
        author: string;
      };
    }
  | {
      type: "UPDATE_STATUS";
      payload: {
        id: string;
        status: QuestionStatus;
        author: string;
      };
    }
  | {
      type: "ADD_COMMENT";
      payload: {
        questionId: string;
        comment: CommentItem;
      };
    }
  | {
      type: "EDIT_COMMENT";
      payload: {
        questionId: string;
        commentId: string;
        body: string;
        author: string;
      };
    };

export const createQuestionAction = (question: QuestionItem): QuestionAction => ({
  type: "CREATE_QUESTION",
  payload: question,
});

export const editQuestionAction = (
  id: string,
  title: string,
  description: string,
  author: string,
): QuestionAction => ({
  type: "EDIT_QUESTION",
  payload: { id, title, description, author },
});

export const updateStatusAction = (
  id: string,
  status: QuestionStatus,
  author: string,
): QuestionAction => ({
  type: "UPDATE_STATUS",
  payload: { id, status, author },
});

export const addCommentAction = (
  questionId: string,
  comment: CommentItem,
): QuestionAction => ({
  type: "ADD_COMMENT",
  payload: { questionId, comment },
});

export const editCommentAction = (
  questionId: string,
  commentId: string,
  body: string,
  author: string,
): QuestionAction => ({
  type: "EDIT_COMMENT",
  payload: { questionId, commentId, body, author },
});

export const questionReducer = (
  state: QuestionItem[],
  action: QuestionAction,
): QuestionItem[] => {
  switch (action.type) {
    case "CREATE_QUESTION":
      return [action.payload, ...state];
    case "EDIT_QUESTION":
      return state.map((question) => {
        if (question.id !== action.payload.id) {
          return question;
        }
        if (question.author !== action.payload.author) {
          return question;
        }
        const trimmedTitle = action.payload.title.trim();
        const trimmedDescription = action.payload.description.trim();
        return {
          ...question,
          title: trimmedTitle || question.title,
          description: trimmedDescription || question.description,
        };
      });
    case "UPDATE_STATUS":
      return state.map((question) =>
        question.id === action.payload.id &&
        question.author === action.payload.author
          ? { ...question, status: action.payload.status }
          : question,
      );
    case "ADD_COMMENT":
      return state.map((question) =>
        question.id === action.payload.questionId
          ? {
              ...question,
              comments: [...question.comments, action.payload.comment],
            }
          : question,
      );
    case "EDIT_COMMENT":
      return state.map((question) => {
        if (question.id !== action.payload.questionId) {
          return question;
        }
        return {
          ...question,
          comments: question.comments.map((comment) => {
            if (comment.id !== action.payload.commentId) {
              return comment;
            }
            if (comment.author !== action.payload.author) {
              return comment;
            }
            const trimmedBody = action.payload.body.trim();
            return {
              ...comment,
              body: trimmedBody || comment.body,
            };
          }),
        };
      });
    default:
      return state;
  }
};
