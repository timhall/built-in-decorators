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

Not currently implemented, this proved difficult with the legacy decorators approach.
