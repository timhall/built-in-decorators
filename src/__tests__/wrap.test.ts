import { Function } from '../types';
import wrap from '../wrap';

it('should wrap method on prototype', () => {
  const wrapped = jest.fn();
  const wrapper = jest.fn(original => join(wrapped, original));

  class Test {
    @wrap(wrapper) method() {
      return 42;
    }
  }
  expect(wrapper).toHaveBeenCalled();

  const instance = new Test();
  const result = instance.method();

  expect(wrapped).toHaveBeenCalled();
  expect(result).toBe(42);
});

it('should wrap static method', () => {
  const wrapped = jest.fn();
  const wrapper = jest.fn(original => join(wrapped, original));

  class Test {
    @wrap(wrapper) static method() {
      return 42;
    }
  }
  expect(wrapper).toHaveBeenCalled();

  const result = Test.method();

  expect(wrapped).toHaveBeenCalled();
  expect(result).toBe(42);
});

it('should wrap getter', () => {
  const wrapped = jest.fn();
  const wrapper = jest.fn(original => join(wrapped, original));

  class Test {
    @wrap(wrapper) get getter() {
      return 42;
    }
  }
  expect(wrapper).toHaveBeenCalled();

  const instance = new Test();
  const result = instance.getter;

  expect(wrapped).toHaveBeenCalled();
  expect(result).toBe(42);
});

it('should wrap setter', () => {
  const wrapped = jest.fn();
  const wrapper = jest.fn(original => join(wrapped, original));

  class Test {
    private _value: number = 0;

    get getter(): number {
      return this._value;
    }
    @wrap(wrapper) set setter(value: number) {
      this._value = value;
    }
  }
  expect(wrapper).toHaveBeenCalled();

  const instance = new Test();
  instance.setter = 42;

  expect(wrapped).toHaveBeenCalled();
  expect(instance.getter).toBe(42);
});

it('should wrap class', () => {
  const fn = jest.fn();
  const wrapper = jest.fn(Target => {
    Target.prototype.fn = fn;
  });

  @wrap(wrapper)
  class Test {}

  expect(wrapper).toHaveBeenCalled();
  expect(wrapper).toHaveBeenLastCalledWith(Test);
  expect((Test.prototype as any).fn).toBe(fn);
});

function join(...fns: Function[]): Function {
  const final = fns.pop();

  return function(this: any, ...args: any[]) {
    for (const fn of fns) {
      fn.apply(this, args);
    }

    return final && final.apply(this, args);
  };
}
