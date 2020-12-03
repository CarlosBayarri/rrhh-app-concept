import { IsANewPipe } from './is-anew.pipe';

describe('IsANewPipe', () => {
  it('create an instance', () => {
    const pipe = new IsANewPipe();
    expect(pipe).toBeTruthy();
  });
});
