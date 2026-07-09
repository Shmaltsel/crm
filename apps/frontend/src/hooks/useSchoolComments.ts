import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { CommentType } from "../types";

export interface SchoolCommentItem {
  id: string;
  schoolId: string;
  authorId: string;
  type: CommentType;
  text: string;
  createdAt: string;
  author: { id: string; name: string; role: string };
}

export function useSchoolComments(schoolId: string, type?: CommentType, page = 1) {
  return useQuery({
    queryKey: ["school-comments", schoolId, type, page],
    queryFn: () =>
      api
        .get<{ items: SchoolCommentItem[]; total: number; page: number; pageCount: number }>(
          `/schools/${schoolId}/comments`,
          { params: { type, page, take: 20 } },
        )
        .then((r) => r.data),
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useCreateSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      type,
      text,
    }: {
      schoolId: string;
      type: CommentType;
      text: string;
    }) =>
      api
        .post(`/schools/${schoolId}/comments`, { type, text })
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["school-comments", vars.schoolId] });
    },
  });
}

export function useDeleteSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      commentId,
    }: {
      schoolId: string;
      commentId: string;
    }) => api.delete(`/schools/${schoolId}/comments/${commentId}`).then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["school-comments", vars.schoolId] });
    },
  });
}
