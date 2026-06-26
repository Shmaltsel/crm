import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useSchoolsList() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: () =>
      api.get("/schools?minimal=true", { headers: h() }).then(r => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: any) =>
      api.post("/schools", { ...form, type: "Школа" }, { headers: h() }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/schools/${id}`, { headers: h() }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useBulkImport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ cityId, type }: { cityId: string; type: string }) =>
      api.post("/schools/bulk-import", { cityId, type }, {
        headers: h(),
        timeout: 120000,
      }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}