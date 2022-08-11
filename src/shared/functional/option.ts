export interface Match<T, U> {
  some: (val: T) => U
  none: () => U
}

export interface Option<T> {
  isSome() : boolean
  isNone(): boolean
  match<U>(fn: Match<T, U>): U
  unwrapOr(other: T): T
  unwrap(): T | never
}

export interface OptionSome<T> extends Option<T> {
  unwrap(): T
}

export interface OptionNone<T> extends Option<T> {
  unwrap(): never
}

export function Some<T>(val: T): Option<T> {
  return someConstructor<T>(val)
}

function someConstructor<T>(val: T): OptionSome<T> {
  return {
    isSome(): boolean {
      return true
    },
    isNone(): boolean {
      return false
    },
    match<U>(fn: Match<T, U>): U {
      return fn.some(val)
    },
    unwrapOr(other: T): T {
      return val
    },
    unwrap() {
      return val
    },
  }
}

function noneConstructor<T>(): OptionNone<T> {
  return {
    isSome(): boolean {
      return false
    },
    isNone(): boolean {
      return true
    },
    match<U>(fn: Match<T, U>): U {
      return fn.none()
    },
    unwrapOr(other: T): T {
      return other
    },
    unwrap() {
      throw new ReferenceError('Trying to unwrap None.');
    },
  }
}
