"use client";

import { useQuery } from "@tanstack/react-query";
import type { MateriDTO } from "@/features/materi/shared/types/materi.types";

export function useMateriList() {
  return useQuery<MateriDTO[]>({
    queryKey: ["materi"],
    queryFn: async () => {
      const res = await fetch("/api/materi");
      if (!res.ok) throw new Error("Gagal memuat materi");
      return res.json();
    },
  });
}

export function useMateri(id: number) {
  return useQuery<MateriDTO>({
    queryKey: ["materi", id],
    queryFn: async () => {
      const res = await fetch(`/api/materi/${id}`);
      if (!res.ok) throw new Error("Gagal memuat materi");
      return res.json();
    },
    enabled: !!id,
  });
}