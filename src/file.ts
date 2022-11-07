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
  return new Promise((resolve, reject) => {
    fs.writeFile(path, "", (err) => {
      if (err) {
        reject(new Error(`${err}`));
      } else {
        resolve(undefined);
      }
    });
  });
}

export function write<T>(path: string, asyncWriter: AsyncWriter): Promise<T> {
  return new Promise((resolve, reject) => {
    const toWrite = (text: string) => {
      fs.appendFile(path, text, (err) => {
        if (err) {
          reject(new Error(`${err}`));
        };
      });
    };

    asyncWriter(
      (value) => toWrite(value),
      (value) => resolve(value as T),
      (err) => reject(new Error(`${err}`))
    );
  });
}

export function read(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(new Error("error"));
      }
    });
  });
}

export async function exists(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.stat(path, function (err, stat) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export async function remove(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(new Error(`${err}`));
      } else {
        resolve(undefined);
      }
    });
  });
}

//"./node_modules/ts-jest/preprocessor.js"
