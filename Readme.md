
Hijacks `do` expressions with bitwise left shift (`<<`) to implement the `for`/`yield` syntax we all know and :heart: from [scala](https://docs.scala-lang.org/tutorials/FAQ/yield.html).

If you don't like using the tasiest syntax sugar available, then stay away!

However, if you like feeling alive and the taste of the kool-aid they're handing out in fp land, then look no further!

You can turn:
```js
getFoo("/api/foo").chain(foo => {
  return getBar("/api/bar").chain(bar => {
    const lol = bar.name;
    return getBaz("/api/baz/" + lol).map(baz => {
      return foo + bar + baz;
    });
  });
});
```

into:
```awesome-sauce
do {
  foo << getFoo("/api/foo")
  bar << getBar("/api/bar")
  const lol = bar.name;
  baz << getBaz("/api/baz/" + lol)

  foo + bar + baz;
}
```

Limitations:
  1. Top expression _must_ be a 'bind' expression, i.e. `x << y`
  2. Last line must be a plain expression (not a bind expression)
  3. Coworkers will loathe you when you try to explain monads to them.
