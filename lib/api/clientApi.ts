// import axios from "axios";
import type { Note, NewNote } from "@/types/note";
import type { User } from "@/types/user";
import { api } from "./api";

export interface FetchNoteParams {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  total: number;
}

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNoteParams): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage: 12, ...(tag ? { tag } : {}) },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await api.post<Note>(`/notes`, note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export async function register(request: RegisterRequest): Promise<User> {
  const response = await api.post<User>("/auth/register", request);
  return response.data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(request: LoginRequest): Promise<User> {
  const response = await api.post<User>("/auth/login", request);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export interface CheckSessionResponse {
  success: boolean;
}

export async function checkSession(): Promise<boolean> {
  const response = await api.get<CheckSessionResponse>("/auth/session");
  return response.data.success;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export interface UpdateUserRequest {
  username?: string;
}

export async function patchMe(request: UpdateUserRequest): Promise<User> {
  const response = await api.patch<User>("/users/me", request);
  return response.data;
}
