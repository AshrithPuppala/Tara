import { create } from "zustand";
import type { TimeRange } from "@/domain/types";

type AppState = {
  selectedChildId: string;
  range: TimeRange;
  setChild: (id: string) => void;
  setRange: (r: TimeRange) => void;
};

/** UI selection state only. Data comes from the repository, not from here. */
export const useAppStore = create<AppState>((set) => ({
  selectedChildId: "aarav",
  range: "1M",
  setChild: (selectedChildId) => set({ selectedChildId }),
  setRange: (range) => set({ range }),
}));
