import { test, expect } from "@playwright/test";

//testing login module

test("Login Module", async ({ page }) => {
  await page.goto("https://www.automationexercise.com/");
  const btnclick = page.locator("//a[@href='/login']");
  await btnclick.click();

  // await page.goto("https://www.automationexercise.com/login");
  // await page.getByRole("link", { name: "Login" }).click();

  const username = page.locator('//input[@data-qa="login-email"]');
  const password = page.locator('//input[@data-qa="login-password"]');

  //using test data for filling these credentials
  await username.fill("kabil_roy@yahoo.com");
  await password.fill("goawayyoumuggle");

  const clickLogin = page.locator('button[data-qa="login-button"]');

  await expect(clickLogin).toBeVisible({ timeout: 5000 });
  await clickLogin.click();
  const logout = page.locator("//a[@href='/logout']");
  await expect(logout).toBeVisible();
});

//invalid login test

//testing login module

test("Login Module02", async ({ page }) => {
  await page.goto("https://www.automationexercise.com/");
  const btnclick = page.locator("//a[@href='/login']");
  await btnclick.click();

  // await page.goto("https://www.automationexercise.com/login");
  // await page.getByRole("link", { name: "Login" }).click();

  const username = page.locator('//input[@data-qa="login-email"]');
  const password = page.locator('//input[@data-qa="login-password"]');

  //using test data for filling these credentials
  await username.fill("kabil_roy@yahoo.com");
  await password.fill("goawayyoumuggl");

  const clickLogin = page.locator('button[data-qa="login-button"]');

  await expect(clickLogin).toBeVisible({ timeout: 5000 });
  await clickLogin.click();
  const errormsg = page.locator(
    "//p[contains(., 'email or password is incorrect')]"
  );
  await expect(errormsg).toBeVisible();
});

//unregistered login test
//email is untegstered login test

test.only("Login Module03", async ({ page }) => {
  await page.goto("https://www.automationexercise.com/");
  const btnclick = page.locator("//a[@href='/login']");
  await btnclick.click();

  // await page.goto("https://www.automationexercise.com/login");
  // await page.getByRole("link", { name: "Login" }).click();

  const username = page.locator('//input[@data-qa="login-email"]');
  const password = page.locator('//input[@data-qa="login-password"]');

  //using test data for filling these credentials
  await username.fill("ghastly.kabil@gmail.com");
  await password.fill("goawayyoumuggl");

  const clickLogin = page.locator('button[data-qa="login-button"]');

  await expect(clickLogin).toBeVisible({ timeout: 5000 });
  await clickLogin.click();
  const errormsg = page.locator(
    "//p[contains(., 'email or password is incorrect')]"
  );
  await expect(errormsg).toBeVisible();
});

//empty p
