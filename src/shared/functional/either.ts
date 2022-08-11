export class Ok<T> {
  constructor(readonly value: T) {}

  map<E>(fn: (a: T) => E): Either<E> {
    return ok(fn(this.value));
  }

  isOk(): this is Ok<T> {
    return true;
  }
}

export class Err<T> {
  constructor(readonly error: string) {}

  map<E>(fn: (a: T) => E): Either<E> {
    return err<E>(this.error);
  }

  isOk(): this is Ok<T> {
    return false;
  }
}

export function ok<T>(value: T): Either<T> {
  return new Ok(value);
}

export function err<T>(error: string): Either<T> {
  return new Err<T>(error);
}

export type Either<T> = Ok<T> | Err<T>
