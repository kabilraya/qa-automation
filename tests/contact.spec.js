import { test, expect } from "@playwright/test";
import { ContactValidation } from "../pageObject/contact.po";
import { LoginPage } from "../pageObject/logintwo.po";
import contacttest from "../fixtures/contactFixtures.json";
import {
  createEntity,
  authenticateUser,
  getEntity,
  deleteEntity,
  validateEntity,
} from "../utils/helper.spec.js";
test.beforeEach(async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  const login = new LoginPage(page);
  await login.login("kabil_roy@yahoo.com", "goawayyoumuggle");
  await login.verifyValidLogin();
});

test.describe("ValidContact", () => {
  test("Valid Contact Credentials", async ({ page }) => {
    const contact = new ContactValidation(page);
    await contact.fillContact(
      contacttest.validcontact.firstName,
      contacttest.validcontact.lastName,
      contacttest.validcontact.birthDate,
      contacttest.validcontact.email,
      contacttest.validcontact.phoneNumber,
      contacttest.validcontact.streetone,
      contacttest.validcontact.streettwo,
      contacttest.validcontact.stateProvince,
      contacttest.validcontact.city,
      contacttest.validcontact.postalCode,
      contacttest.validcontact.country
    );
    await contact.validFill(
      contacttest.validcontact.firstName,
      contacttest.validcontact.lastName,
      contacttest.validcontact.birthDate,
      contacttest.validcontact.email,
      contacttest.validcontact.phoneNumber,
      contacttest.validcontact.streetone,
      contacttest.validcontact.streettwo,
      contacttest.validcontact.stateProvince,
      contacttest.validcontact.city,
      contacttest.validcontact.postalCode,
      contacttest.validcontact.country
    );
  });
});

test.describe("Invalid Login Cases", () => {
  test("Empty Compulsory Fields", async ({ page }) => {
    const contact = new ContactValidation(page);
    await contact.fillContact(
      contacttest.invalidcontact.firstName,
      contacttest.invalidcontact.lastName,
      contacttest.invalidcontact.birthDate,
      contacttest.invalidcontact.email,
      contacttest.invalidcontact.phoneNumber,
      contacttest.invalidcontact.streetone,
      contacttest.invalidcontact.streettwo,
      contacttest.invalidcontact.stateProvince,
      contacttest.invalidcontact.city,
      contacttest.invalidcontact.postalCode,
      contacttest.invalidcontact.country
    );
    await contact.emptyFields();
  });

  test("Contact Number Invalid Check", async ({ page }) => {
    const contactno = new ContactValidation(page);
    await contactno.fillContact(
      contacttest.contactNumberLength.firstName,
      contacttest.contactNumberLength.lastName,
      contacttest.contactNumberLength.birthDate,
      contacttest.contactNumberLength.email,
      contacttest.contactNumberLength.phoneNumber,
      contacttest.contactNumberLength.streetone,
      contacttest.contactNumberLength.streettwo,
      contacttest.contactNumberLength.stateProvince,
      contacttest.contactNumberLength.city,
      contacttest.contactNumberLength.postalCode,
      contacttest.contactNumberLength.country
    );
    await contactno.contactValidate();
  });

  test("Email Invalid", async ({ page }) => {
    const contact = new ContactValidation(page);
    await contact.fillContact(
      contacttest.EmailInvalid.firstName,
      contacttest.EmailInvalid.lastName,
      contacttest.EmailInvalid.birthDate,
      contacttest.EmailInvalid.email,
      contacttest.EmailInvalid.phoneNumber,
      contacttest.EmailInvalid.streetone,
      contacttest.EmailInvalid.streettwo,
      contacttest.EmailInvalid.stateProvince,
      contacttest.EmailInvalid.city,
      contacttest.EmailInvalid.postalCode,
      contacttest.EmailInvalid.country
    );
    await contact.emailInValidate();
  });
});
test.describe("Edit Contact", () => {
  test("Edit Contact", ({ page }) => {
    const contact = new ContactValidation(page);
    contact.editContact(
      contacttest.editcontact.firstName,
      contacttest.EmailInvalid.lastName,
      contacttest.EmailInvalid.birthDate,
      contacttest.EmailInvalid.email,
      contacttest.EmailInvalid.phoneNumber,
      contacttest.EmailInvalid.streetone,
      contacttest.EmailInvalid.streettwo,
      contacttest.EmailInvalid.stateProvince,
      contacttest.EmailInvalid.city,
      contacttest.EmailInvalid.postalCode,
      contacttest.EmailInvalid.country
    );
  });
});

test.only("Contact Edit Test", async ({ page, request }) => {
  const Data = {
    firstName: "Jane",
    lastName: "Doe",
    birthdate: "2058-10-13",
    email: "gopalshrestha@yahoo.com",
    phone: "9805605891",
    street1: "ktm",
    street2: "ktm",
    city: "ktm",
    stateProvince: "bagmati",

    postalCode: "4460",
    country: "Nepal",
  };
  const contact = new ContactValidation(page);
  const accessToken = await authenticateUser(
    "kabil_roy@yahoo.com",
    "goawayyoumuggle",
    { request }
  );
  await createEntity(Data, accessToken, "/contacts", { request });
  page.reload();
  await contact.viewContact(Data.firstName, Data.lastName);
  await contact.contactEdit(
    contacttest.editcontact.firstName,
    contacttest.editcontact.lastName
  );
  console.log(accessToken);
  const id = await getEntity(accessToken, "/contacts", "200", { request });
  console.log(id);
  await deleteEntity(accessToken, `/contacts/${id}`, { request });
  await validateEntity(accessToken, `/contacts/${id}`, "404", { request });
  // const id = await getEntity(accessToken, "/contacts", "200", { request });
  // await deleteEntity(accessToken, `/contact/${id}`, { request });
  // await validateEntity(accessToken, `/contacts/${id}`, "404", { request });
});
