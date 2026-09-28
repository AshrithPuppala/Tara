import type { Repository } from "./repository";
import { mockRepository } from "./mock/mockRepository";

// Later: switch on process.env.NEXT_PUBLIC_DATA_SOURCE and return a Supabase-backed repo.
export const repo: Repository = mockRepository;
