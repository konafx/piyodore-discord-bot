type ChainedWhen<T, R> = {
  on: <A>(_pred: (_v: T) => boolean, _fn: () => A) => ChainedWhen<T, R | A>;
  otherwise: <A>(_fn: () => A) => R | A;
};

const match = <T, R>(val: any): ChainedWhen<T, R> => ({
  on: <A>(_pred: (_v: T) => boolean, _fn: () => A) => match<T, R | A>(val),
  otherwise: <A>(_fn: () => A): A | R => val,
});

const chain = <T, R>(val: T): ChainedWhen<T, R> => ({
  on: <A>(pred: (_v: T) => boolean, fn: () => A) => (pred(val) ? match(fn()) : chain<T, A | R>(val)),
  otherwise: <A>(fn: () => A) => fn(),
});

export const when = <T>(val: T) => ({
  on: <A>(pred: (_v: T) => boolean, fn: () => A) => (pred(val) ? match<T, A>(fn()) : chain<T, A>(val)),
});

export const eq =
  <T>(val1: T) =>
  (val2: T) =>
    val1 === val2;
