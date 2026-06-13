import { apiRequest } from "./client";

export type CommentResponse = {
  comment_id: string;
  content: string;
  author_name: string;
  parent_id: string | null;
  created_at: string;
  replies: CommentResponse[];
};

export function getComments(issueId: string): Promise<CommentResponse[]> {
  return apiRequest<CommentResponse[]>(`/issues/${issueId}/comments`);
}

export function postComment(
  issueId: string,
  content: string,
  parentId?: string
): Promise<CommentResponse> {
  return apiRequest<CommentResponse>(`/issues/${issueId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content, parent_id: parentId ?? null }),
  });
}
