//pom model
//page obj model
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login.po";
import testdata from "../fixtures/loginFixture.json";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Valid login tests", () => {
  test("Login using valid username and password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testdata.validuser.userName, testdata.validuser.password);
    await login.verifyValidLogin();
  });
});

test.describe("Invalid Login test", () => {
  test("Login using wrong password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testdata.invaliduser.userName,
      testdata.invaliduser.password
    );
    await login.verifyInvalidLogin();
  });
});

test.describe("Invalid Login test2", () => {
  test.only("Login using empty email", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login("", "grayy");
    await login.verifyEmptyLogin();
  });
});
