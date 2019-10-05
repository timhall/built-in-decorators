import wrap from '../wrap';

it('should wrap method on prototype', () => {
  const existing = jest.fn();
  const added = jest.fn();
  const wrapper = jest.fn(method => {
    return function() {
      added();
      method();
    };
  });

  class Test {
    @wrap(wrapper) method() {
      existing();
    }
  }
  expect(wrapper).toHaveBeenCalled();

  const instance = new Test();
  instance.method();

  expect(added).toHaveBeenCalled();
  expect(existing).toHaveBeenCalled();
});
