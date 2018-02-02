import { DevmeetingStartPage } from './app.po';

describe('devmeeting-start App', () => {
  let page: DevmeetingStartPage;

  beforeEach(() => {
    page = new DevmeetingStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
