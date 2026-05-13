"use client";

import { useQuery } from "@tanstack/react-query";
import type { TugasDTO } from "@/features/tugas/shared/types/tugas.types";

export function useTugasList() {
  return useQuery<TugasDTO[]>({
    queryKey: ["tugas"],
    queryFn: async () => {
      const res = await fetch("/api/tugas");
      if (!res.ok) throw new Error("Gagal memuat tugas");
      return res.json();
    },
  });
}

export function useTugas(id: number) {
  return useQuery<TugasDTO>({
    queryKey: ["tugas", id],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${id}`);
      if (!res.ok) throw new Error("Gagal memuat tugas");
      return res.json();
    },
    enabled: !!id,
  });
}