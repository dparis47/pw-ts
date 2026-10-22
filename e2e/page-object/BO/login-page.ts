import { Locator, Page } from '@playwright/test';

export default class LoginPage {
  page: Page;

  // Locators
  // private readonly connectMethodLink: Locator;
  private readonly loginInput: Locator;
  private readonly pwdInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    // this.connectMethodLink = this.page.locator('a.puik-link');
    this.loginInput = this.page.locator('#email');
    this.pwdInput = this.page.locator('#passwd');
    this.loginButton = this.page.locator('#submit_login');
  }
  //
  // isConnectWithAnotherMethodLinkVisible(): Promise<boolean> {
  //   return this.isVisible(this.connectMethodLink, 1000);
  // }
  //
  // async connectWithAnotherMethod(): Promise<void> {
  //   await this.clickAndWaitForLoadState(this.connectMethodLink, 'networkidle');
  // }

  async login(login: string, pwd: string): Promise<void> {
    await this.loginInput.fill(login);
    await this.pwdInput.fill(pwd);
    await this.loginButton.click();
  }
}
