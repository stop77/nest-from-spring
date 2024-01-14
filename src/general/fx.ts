export const log = console.log;

export const nop = Symbol('nop');

export const curry =
  (f: any) =>
  (a: any, ..._: any) =>
    _.length ? f(a, ..._) : (..._: any) => f(a, ..._);

export const go = (...args: any) => reduce((a: any, f: any) => f(a), args);

export const go1 = (a: any, f: any) =>
  a instanceof Promise ? a.then(f) : f(a);

export const pipe =
  (f: any, ...fs: any) =>
  (...as: any) =>
    go(f(...as), ...fs);

export const range = (l: number) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

export const max = (iter: any) => maxBy((a: any) => a, iter);

export const maxBy = curry((f: any, iter: any) =>
  reduce((a: any, b: any) => (f(a) >= f(b) ? a : b), iter),
);

export const min = (iter: any) => minBy((a: any) => a, iter);

export const minBy = curry((f: any, iter: any) =>
  reduce((a: any, b: any) => (f(a) <= f(b) ? a : b), iter),
);

export const take = curry((l: any, iter: any) => {
  let res: any = [];
  iter = iter[Symbol.iterator]();
  return (function recur(): any {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => {
            res.push(a);
            return res.length == l ? res : recur();
          })
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});

export const from = curry((l: any, iter: any) => {
  let from = 0;
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur(): any {
    let cur;
    while (!(cur = iter.next()).done) {
      if (from < l) {
        from++;
        continue;
      }
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => {
            res.push(a);
            return recur();
          })
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
    }
    return res;
  })();
});

const head = (iter: any) => go1(take(1, iter), ([h]: any) => h);

const reduceF = (acc: any, a: any, f: any) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e)),
      )
    : f(acc, a);

export const reduce = curry((f: any, acc: any, iter: any) => {
  if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc: any): any {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

export const takeAll = take(Infinity);

export const find = curry((f: any, iter: any) =>
  go(iter, L.filter(f), take(1), ([a]: any) => a),
);

export declare type LazyModel = {
  range: any;
  map: any;
  filter: any;
  entries: any;
  flatten: any;
  deepFlat: any;
  flatMap: any;
};

const Lrange = function* (l: any) {
  let i = -1;
  while (++i < l) yield i;
};

const Lmap = curry(function* (f: any, iter: any) {
  for (const a of iter) {
    yield go1(a, f);
  }
});

const Lfilter = curry(function* (f: any, iter: any) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

const Lentries = function* (obj: any) {
  for (const k in obj) yield [k, obj[k]];
};

const Lflatten = function* (iter: any) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

const LdeepFlat = function* f(iter: any): any {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

export const sleep = (ms: number) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

const LflatMap = curry(pipe(Lmap, LdeepFlat));

export const L: LazyModel = {
  range: Lrange,
  map: Lmap,
  filter: Lfilter,
  entries: Lentries,
  flatten: Lflatten,
  deepFlat: LdeepFlat,
  flatMap: LflatMap,
};

export const map = curry(pipe(L.map, takeAll));

export const filter = curry(pipe(L.filter, takeAll));

export const join = curry((sep = ',', iter: any) =>
  reduce((a: any, b: any) => `${a}${sep}${b}`, iter),
);

export const replaceAll = (
  str: string,
  searchStr: string,
  replaceStr: string,
) => str.split(searchStr).join(replaceStr);

const isIterable = (a: any) => a && a[Symbol.iterator];

export const flatten = pipe(L.flatten, takeAll);

export const deepFlat = pipe(L.deepFlat, takeAll);

export const flatMap = curry(pipe(L.map, flatten));

function noop() {}

const catchNoop = (arr: any) => (
  arr.forEach((a: any) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

const Creduce = curry((f: any, acc: any, iter: any) => {
  const iter2 = catchNoop(iter ? [...iter] : [...acc]);
  return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});

const Ctake = curry((l: any, iter: any) => take(l, catchNoop([...iter])));
const CtakeAll = Ctake(Infinity);

const Cmap = curry(pipe(L.map, CtakeAll));
const Cfilter = curry(pipe(L.filter, CtakeAll));

export const C = {
  reduce: Creduce,
  take: Ctake,
  takeAll: CtakeAll,
  map: Cmap,
  filter: Cfilter,
};
