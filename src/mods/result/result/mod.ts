// deno-lint-ignore-file no-explicit-any no-namespace

import type { Awaitable } from "@/libs/awaitable/mod.ts";
import { Catched } from "../catched/mod.ts";
import { Err } from "../err/mod.ts";
import { Ok } from "../ok/mod.ts";

/**
 * An object that can be either an Ok or an Err
 */
export type Result<T = unknown, E = unknown> =
  | Ok<T>
  | Err<E>

export namespace Result {

  /**
   * Create a Result from a boolean
   * @param value 
   * @returns 
   */
  export function assert(value: boolean): Ok<void> | Err<void> {
    return value ? Ok.void() : Err.void()
  }

  /**
   * Run a callback and wrap any returned value in Ok<T> and any thrown error in Err<unknown>
   * @param callback 
   * @returns 
   */
  export async function runAndWrap<T>(callback: () => Awaitable<T>): Promise<Result<T, unknown>> {
    try {
      return new Ok(await callback())
    } catch (e: unknown) {
      return new Err(e)
    }
  }

  /**
   * Run a callback and wrap any returned value in Ok<T> and any thrown error in Err<unknown>
   * @param callback 
   * @returns 
   */
  export function runAndWrapSync<T>(callback: () => T): Result<T, unknown> {
    try {
      return new Ok(callback())
    } catch (e: unknown) {
      return new Err(e)
    }
  }

  /**
   * Run a callback and wrap any returned value in Ok<T> and any thrown error in Err<Error>
   * @param callback 
   * @returns 
   */
  export async function runAndWrapAsError<T>(callback: () => Awaitable<T>): Promise<Result<T, Error>> {
    try {
      return new Ok(await callback())
    } catch (e: unknown) {
      return new Err(Catched.wrapAsError(e))
    }
  }

  /**
   * Run a callback and wrap any returned value in Ok<T> and any thrown error in Err<Error>
   * @param callback 
   * @returns 
   */
  export function runAndWrapAsErrorSync<T>(callback: () => T): Result<T, Error> {
    try {
      return new Ok(callback())
    } catch (e: unknown) {
      return new Err(Catched.wrapAsError(e))
    }
  }

  /**
   * Run a callback and wrap any thrown error in Err<unknown>
   * @param callback 
   * @returns 
   */
  export async function runOrWrap<R extends Result<any, any>>(callback: () => Awaitable<R>): Promise<R | Err<unknown>> {
    try {
      return await callback()
    } catch (e: unknown) {
      return new Err(e)
    }
  }

  /**
   * Run a callback and wrap any thrown error in Err<unknown>
   * @param callback 
   * @returns 
   */
  export function runOrWrapSync<R extends Result<any, any>>(callback: () => R): R | Err<unknown> {
    try {
      return callback()
    } catch (e: unknown) {
      return new Err(e)
    }
  }

  /**
   * Run a callback and wrap any thrown error in Err<Error>
   * @param callback 
   * @returns 
   */
  export async function runOrWrapAsError<R extends Result<any, any>>(callback: () => Awaitable<R>): Promise<R | Err<Error>> {
    try {
      return await callback()
    } catch (e: unknown) {
      return new Err(Catched.wrapAsError(e))
    }
  }

  /**
   * Run a callback and wrap any thrown error in Err<Error>
   * @param callback 
   * @returns 
   */
  export function runOrWrapAsErrorSync<R extends Result<any, any>>(callback: () => R): R | Err<Error> {
    try {
      return callback()
    } catch (e: unknown) {
      return new Err(Catched.wrapAsError(e))
    }
  }

}