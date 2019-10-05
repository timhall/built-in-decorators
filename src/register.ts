import { Target } from './types';

export type Callback = (target: Target, key?: PropertyKey) => void;

/*
# Spec

- `@register` can be used on any method, field, accessor, or the class as a whole.
- Arguments passed into the callback given to `@register`:
  - First argument: the "target": For static fields and methods, or the class itself, it is the class; for instance fields and methods, it is the class's prototype.
  - Second argument: For public fields, methods or accessors, the property key; for private, or for the class itself, only one argument is passed.
  - Note, there is no third argument; the property descriptor is not passed into the callback, but the callback could look it up itself.
- The return value of the callback must be undefined.
- All `@wrap` callbacks run before all `@register` callbacks. This is because `@wrap` is used to set up the class, and `@register` runs on the class after it's created.
*/

export default function register(callback: Callback) {
  return function(target: Target, key?: PropertyKey, _descriptor?: PropertyDescriptor) {
    // Two options:
    // @register(...) class Name {}, @register(...) static ... -> target = Class
    // @register(...) ... -> target = Prototype
    // -> Typescript experimentalDecorators does this already

    callback(target, key);
  };
}
