import { ShoopingPage } from './app.po';

describe('shooping App', () => {
  let page: ShoopingPage;

  beforeEach(() => {
    page = new ShoopingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
