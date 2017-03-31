import { Last4DigitsPipe } from './last-4-digits.pipe';

describe('Last4DigitsPipe', () => {
  it('create an instance', () => {
    const pipe = new Last4DigitsPipe();
    expect(pipe).toBeTruthy();
  });
});
