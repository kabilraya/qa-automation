import { test, expect } from "@playwright/test";
import { LoginPage } from "../PageLogin/login.po";
const testData = require("../fixtures/loginFixture.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/"); //base url for me its daraz nepal
});

test.describe("Valid login tests", () => {
  test("Login using valid username and password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login("kabil_roy@yahoo.com", "goawayyoumuggle");
    await login.verifyValidLogin();
  });
});

test.describe("Invalid login tests", () => {
  test("Login using invalid username and password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );
    await login.invalidLogin();
  });

  test("Login using valid username and invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.validUser.username,
      testData.invalidUser.password
    );
    await login.invalidLogin();
  });

  test("Login using invalid username and valid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.username,
      testData.validUser.password
    );
    await login.invalidLogin();
  });

  test("Login using only username", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.username, "");
    await login.invalidLogin();
  });

  test("Login using only password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login("", testData.validUser.password);
    await login.invalidLogin();
  });
});
