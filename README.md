# Built-in Decorators

Based on the [Fall 2019, Stage 2 Decorators Proposal](https://github.com/tc39/proposal-decorators/blob/691d95e67052e125239a725d2756cb8a039c5fb9/README.md#built-in-decorators), these decorators are defined as "built-in decorators that can either be used directly, or can be used as a basis to define other decorators."

### `@wrap`

The `@wrap` decorator can be used on a method to pass the function through another function. For example:

```ts
class C {
  @wrap(f) method() {}
}
```

is roughly equivalent to the following:

```ts
class C {
  method() {}
}
C.prototype.method = f(C.prototype.method);
```

`@wrap` can also be used on a class to wrap the entire class:

```ts
@wrap(f)
class C {}
```

is roughly equivalent to:

```ts
class C {}
C = f(C);
```

### `@register`

The `@register` decorator schedules a callback to run after the class is created.

```ts
class C {
  @register(f) method() {}
}
```

is roughly equivalent to:

```ts
class C {
  method() {}
}
f(C, 'method');
```

### `@initialize`

The `@initialize` decorator intercepts the initialization of a public class field and runs a callback supplied to the decorator in place of `Object.defineProperty`. For example:

```ts
class C {
  @initialize(f) a = b;
}
```

is roughly equivalent to the following:

```ts
class C {
  constructor() {
    f(this, 'a', b);
  }
}
```

> When invoked on something which is not a public field, or when used on the left of another @initialize decorator on the same public field, the callback is called without the final "value" argument. The other "property key" argument is also omitted when not available. So this becomes simply a way to schedule work. For example:

```ts
@initialize(f)
class C {}
```

is roughly equivalent to the following:

```ts
class C {
  constructor() {
    f(this);
  }
}
```

Likewise,

```ts
class C {
  @initialize(f) method() {}
}
```

is roughly equivalent to:

```ts
class C {
  method() {}

  constructor() {
    f(this, 'method');
  }
}
```
