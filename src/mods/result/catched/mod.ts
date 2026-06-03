// deno-lint-ignore-file no-namespace

/**
 * An non-error that was caught by a catch clause
 */
export class Catched extends Error {
  readonly #class = Catched

  override readonly name: string = this.#class.name

  constructor(cause: unknown) {
    super(undefined, { cause })
  }

}

export namespace Catched {

  export function wrapAsError(cause: unknown): Error {
    return cause instanceof Error ? cause : new Catched(cause)
  }

}