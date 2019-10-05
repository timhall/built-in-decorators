import register from '../register';

it('should register callback for instance method', () => {
  const callback = jest.fn();

  class Test {
    @register(callback) method() {
      return 42;
    }
  }

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenLastCalledWith(Test.prototype, 'method');
});

it('should register callback for instance field', () => {
  const callback = jest.fn();

  class Test {
    @register(callback) field = 42;
  }

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenLastCalledWith(Test.prototype, 'field');
});

it('should register callback for static method', () => {
  const callback = jest.fn();

  class Test {
    @register(callback) static method() {
      return 42;
    }
  }

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenLastCalledWith(Test, 'method');
});

it('should register callback for static field', () => {
  const callback = jest.fn();

  class Test {
    @register(callback) static field = 42;
  }

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenLastCalledWith(Test, 'field');
});

it('should register callback for class', () => {
  const callback = jest.fn();

  @register(callback)
  class Test {
    method() {
      return 42;
    }
  }

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenLastCalledWith(Test, undefined);
});
