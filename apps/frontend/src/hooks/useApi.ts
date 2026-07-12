import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, School } from "../types";

export function useAddCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post<City>("/cities", { name }).then((r) => r.data),
    onSuccess: (newCity) => {
      qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
    },
  });
}

export interface SchoolFilters {
  search?: string;
  cityId?: string;
  type?: "Школа" | "Садочок";
  stage?: "new" | "planned" | "inProgress" | "done";
  size?: "small" | "medium" | "large";
}

interface SchoolsPage {
  data: School[];
  meta: {
    totalItems: number;
    page: number;
    take: number;
    pageCount: number;
    hasNextPage: boolean;
  };
}

export function useSchools(filters: SchoolFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["schools", filters],
    queryFn: ({ pageParam = 1 }) =>
      api
        .get<SchoolsPage>("/schools", {
          params: { ...filters, page: pageParam, take: 30 },
        })
        .then((r) => r.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSchoolStats(
  filters: Pick<SchoolFilters, "cityId" | "type" | "stage"> = {},
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { stage, ...badgeFilters } = filters;
  return useQuery({
    queryKey: ["schoolStats", badgeFilters],
    queryFn: () =>
      api
        .get("/schools/stats", { params: badgeFilters })
        .then((r) => r.data),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useSupportedCities() {
  return useQuery({
    queryKey: ["supportedCities"],
    queryFn: () =>
      api
        .get<string[]>("/schools/supported-cities")
        .then((r) => r.data),
    staleTime: 60 * 60 * 1000,
  });
}

export function useAddSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<School>) =>
      api
        .post<School>("/schools", data)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
      qc.invalidateQueries({ queryKey: ["cities"] });
    },
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (schoolId: string) =>
      api.delete(`/schools/${schoolId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
      qc.invalidateQueries({ queryKey: ["cities"] });
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get("/events").then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePrefetchSchool() {
  const qc = useQueryClient();
  return (schoolId: string) => {
    qc.prefetchQuery({
      queryKey: ["school", schoolId],
      queryFn: () =>
        api
          .get<School>(`/schools/${schoolId}`)
          .then((r) => r.data),
      staleTime: 2 * 60 * 1000,
    });
  };
}
