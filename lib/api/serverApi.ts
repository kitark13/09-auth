import { cookies } from "next/headers";
import { api } from "./api";
import { FetchNoteParams, FetchNotesResponse } from "./clientApi";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNoteParams): Promise<FetchNotesResponse> {
  const cookiesStore = await cookies();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage: 12, ...(tag ? { tag } : {}) },
    headers: { Cookie: cookiesStore.toString() },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookiesStore = await cookies();
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookiesStore.toString() },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookiesStore = await cookies();
  const response = await api.get<User>("/users/me", {
    headers: { Cookie: cookiesStore.toString() },
  });
  return response.data;
}

export async function checkSession() {
  const cookiesStore = await cookies();
  const response = await api.get("/auth/session", {
    headers: { Cookie: cookiesStore.toString() },
  });
  return response;
}
