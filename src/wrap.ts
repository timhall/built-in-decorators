import { Function, Target } from './types';

type Wrapper<T = Target | Function> = (fn: T) => T;

/*

# Spec

- `@wrap` may be used on private methods as well as public ones, static as well as instance.
- The function is only passed the method, and no other context.
- The return value is used to replace the method or accessor.
- `@wrap` may be used on getters or setters, and applies to these individually.
- `@wrap` may not be used on field declarations, as there's no clear meaning.
- When `@wrap` is used on a class, if there is a use of `C` in a method or field initializer inside the class, it will refer to the original, unwrapped `C`. See [#211](https://github.com/tc39/proposal-decorators/issues/211) for details.

*/

export default function wrap(wrapper: Wrapper) {
  return function(target: Target, key?: PropertyKey, descriptor?: PropertyDescriptor) {
    // Four options:
    // @wrap(...) class Name {} -> no key or descriptor
    // @wrap(...) get ...() {}
    // @wrap(...) set ...() {}
    // @wrap(...) ...() {}

    if (!key || !descriptor) {
      return wrapper(target);
    } else if (descriptor.get) {
      descriptor.get = wrapper(descriptor.get);
    } else if (descriptor.set) {
      descriptor.set = wrapper(descriptor.set);
    } else if (typeof descriptor.value === 'function') {
      descriptor.value = wrapper(descriptor.value);
    }
  };
}
