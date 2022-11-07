import * as fs from "fs";

export type Writer = (content: string) => void;
export type ResolveCallBack<T = unknown> = (value: T) => void;
export type RejectCallback<T extends Error = Error> = (value: T) => void;
export type AsyncWriter<R = unknown, E = Error> = (
  writer: Writer,
  resolve: ResolveCallBack<R>,
  reject: RejectCallback<Error>
) => void;

export function create(path: string): Promise<void> {
}

export function write<T>(path: string, asyncWriter: AsyncWriter): Promise<T> {
}

export function read(path: string): Promise<string> {
}

export async function exists(path: string): Promise<boolean> {
}

export async function remove(path: string): Promise<boolean> {
}