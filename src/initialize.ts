import { Target } from './types';

const INITIALIZERS = Symbol('built-in-decorators/initializers');

type ClassInitializer = (target: Target) => void;
type ValueInitializer = (target: Target, key: PropertyKey) => void;
type FieldInitializer = (target: Target, key: PropertyKey, descriptor: PropertyDescriptor) => void;
type Initializer = ClassInitializer | ValueInitializer | FieldInitializer;

export default function initialize(initializer: Initializer) {
  return function(target: any, key: PropertyKey, descriptor: PropertyDescriptor) {
    // For static or class, target is class, otherwise, target is prototype
    const prototype = typeof target === 'function' ? target.prototype : target;
    const constructor = prototype.constructor;

    if (!constructor[INITIALIZERS]) {
      constructor[INITIALIZERS] = new Set();

      prototype.constructor = function() {
        for (const [key, descriptor] of constructor[INITIALIZERS]) {
          if (descriptor) {
            (initializer as FieldInitializer)(this, key, descriptor);
          } else if (key) {
            (initializer as ValueInitializer)(this, key);
          } else {
            (initializer as ClassInitializer)(this);
          }
        }

        return constructor.apply(this, arguments);
      };
    }

    constructor[INITIALIZERS].add([key, descriptor]);
  };
}
