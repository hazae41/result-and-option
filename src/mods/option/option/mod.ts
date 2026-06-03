// deno-lint-ignore-file
import { None } from "../none/mod.ts";
import { Some } from "../some/mod.ts";

export type Nullable<T> =
  T | undefined | null

export type Optional<T> =
  T | undefined

export type NonOptional<T> =
  Exclude<T, undefined>

export type Option<T> =
  | Some<T>
  | None

export namespace Option {

  /**
   * Create an Option from a nullable value
   * @param inner 
   * @returns `Some<T>` if `T`, `None` if `null` or `undefined`
   */
  export function wrap<T>(inner: Nullable<T>): Option<T> {
    return inner == null ? new None() : new Some(inner)
  }

}