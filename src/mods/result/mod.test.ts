// deno-lint-ignore-file

import { Result } from "@/mods/result/mod.ts";

function get(result: Result<string, never>) {
  if (result.isOk())
    return result.get()
  if (result.isErr())
    return result.get()
}

class CustomError extends Error {
  readonly #class = CustomError

  constructor(x: number) {
    super(`first`)
  }
}