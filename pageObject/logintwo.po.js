const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#email";
    this.passwordInput = '//input[placeholder = "Password"]';
    this.loginButton = '//button[@id = "submit"]';
    this.logOut = '//button[@id = "logout"]';
    this.loginValidation =
      '//p[contains(text(),"Click on any contact to view the Contact Details")]';
    this.alertMessage = '//span[@id = "error"]';
  }

  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator('//input[@placeholder="Password"]').fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    const LoginValidation = await this.page.locator(this.loginValidation);
    await this.page.waitForTimeout(2000);
    expect(this.logOut).toBeVisible;
    await expect(LoginValidation).toHaveText(
      "Click on any contact to view the Contact Details"
    );
  }

  async invalidLogin() {
    const LoginValidation = await this.page.locator(this.alertMessage);
    await this.page.waitForTimeout(2000);
    expect(this.logOut).toBeVisible;
    await expect(LoginValidation).toHaveText("Incorrect username or password");
    console.log("Invalid");
  }
};
