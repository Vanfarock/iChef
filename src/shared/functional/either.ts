import { None, Option, Some } from './option'

export interface Match<T, U> {
  some: (val: T) => U
  none: () => U
}

export interface Either<L, R> {
  isLeft(): boolean
  isRight(): boolean
  left(): Option<L>
  right(): Option<R>
  unwrap(): L | R
  unwrapLeft(): L | never
  unwrapLeftOr(other: L): L
  unwrapRight(): R | never
  unwrapRightOr(other: R): R
  mapLeft<U>(fn: (left: L) => U): Either<U, R>
  mapRight<U>(fn: (right: R) => U): Either<L, U>
}

export class ResultLeft<L, R> implements Either<L, R> {
  constructor(readonly val: L) { }

  isLeft(): boolean {
    return true
  }

  isRight(): boolean {
    return false
  }

  left(): Option<L> {
    return Some(this.val)
  }

  right(): Option<R> {
    return None()
  }

  unwrap(): L {
    return this.val
  }

  unwrapLeft(): L {
    return this.val
  }

  unwrapLeftOr(other: L): L {
    return this.val
  }

  unwrapRight(): never {
    throw new ReferenceError('Cannot unwrap right value.')
  }

  unwrapRightOr(other: R): R {
    return other
  }

  mapLeft<U>(fn: (left: L) => U): Either<U, never> {
    return new ResultLeft<U, never>(fn(this.val))
  }

  mapRight<U>(fn: (right: R) => U): Either<L, never> {
    return new ResultLeft<L, never>(this.val)
  }
}

export class ResultRight<L, R> implements Either<L, R> {
  constructor(readonly val: R) { }

  isLeft(): boolean {
    return false
  }

  isRight(): boolean {
    return true
  }

  left(): Option<L> {
    return None()
  }

  right(): Option<R> {
    return Some(this.val)
  }

  unwrap(): R {
    return this.val
  }

  unwrapLeft(): never {
    throw new ReferenceError('Cannot unwrap left value.')
  }

  unwrapLeftOr(other: L): L {
    return other
  }

  unwrapRight(): R {
    return this.val
  }

  unwrapRightOr(other: R): R {
    return this.val
  }

  mapLeft<U>(fn: (left: L) => U): Either<never, R> {
    return new ResultRight<never, R>(this.val)
  }

  mapRight<U>(fn: (right: R) => U): Either<never, U> {
    return new ResultRight<never, U>(fn(this.val))
  }
}
