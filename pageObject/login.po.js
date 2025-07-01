//object model
//here all the declarations ar made
//actions are done in the main spec.js file
// locators and actions are defined here
import { expect } from "@playwright/test";

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "//input[@data-qa='login-email']";
    this.passwordInput = '//input[@data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.logOut = "//a[@href='/logout']";
    this.btnclick = "//a[@href='/login']";
    this.loginValidation = "//a[@href='/logout']";
    // this.alertMessage = '//span[@id="error"]';
    this.invalidLogin = "//p[contains(., 'email or password is incorrect')]";
    this.validity = "(//span[text()='Automation'])[1]";
    this.emptypop = "(//input[@name='email'])[1]";
  }
  async login(username, password) {
    await this.page.locator(this.btnclick).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async verifyValidLogin() {
    await expect(this.page.locator(this.validity)).toBeVisible({
      timeout: 6000,
    });
  }

  async verifyInvalidLogin() {
    await expect(this.page.locator(this.invalidLogin)).toBeVisible();
  }

  async verifyEmptyLogin() {
    await expect(this.page.locator(this.emptypop)).toHaveAttribute(
      "reuired",
      ""
    );
  }
};
