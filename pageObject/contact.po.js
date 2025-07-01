import { expect } from "@playwright/test";
exports.ContactValidation = class ContactValidation {
  constructor(page) {
    this.page = page;
    this.addButton = "#add-contact";
    this.firstName = "//input[@id='firstName']";
    this.lastName = "//input[@id='lastName']";
    this.birthDate = "//input[@id='birthdate']";
    this.email = "//input[@id='email']";
    this.phoneNumber = "//input[@id='phone']";
    this.streetone = "//input[@id='street1']";
    this.streettwo = "//input[@id='street2']";
    this.stateProvince = "//input[@id='stateProvince']";
    this.city = "//input[@id='city']";
    this.postalCode = "//input[@id='postalCode']";
    this.country = "//input[@id='country']";
    this.submitButton = "//button[@id='submit']";
    this.afterText =
      "//p[text()='Click on any contact to view the Contact Details']";
    this.tableClick = "//td[text()=`${fname}`]";
    this.errormsg = "//span[@id='error']";
    this.editbutton = "//button[@id='edit-contact']";
  }

  async fillContact(
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    streetone,
    streettwo,
    stateProvince,
    city,
    postalCode,
    country
  ) {
    await this.page.locator(this.addButton).click();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.birthDate).fill(birthDate);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phoneNumber).fill(phoneNumber);
    await this.page.locator(this.streetone).fill(streetone);
    await this.page.locator(this.streettwo).fill(streettwo);
    await this.page.locator(this.stateProvince).fill(stateProvince);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.postalCode).fill(postalCode);
    await this.page.locator(this.country).fill(country);
    await this.page.locator(this.submitButton).click();
  }
  async validFill(
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    streetone,
    streettwo,
    stateProvince,
    city,
    postalCode,
    country
  ) {
    await this.page.locator(this.tableClick).click();
    const expfname = this.page.locator("//span[@id='firstName']");
    const explname = this.page.locator("//span[@id='lastName']");
    const exp_email = this.page.locator("//span[@id='email']");
    const phn = this.page.locator("//span[@id='phone']");

    await expect(expfname).toHaveText(firstName);
    await expect(explname).toHaveText(lastName);
    await expect(exp_email).toHaveText(email);
    await expect(phn).toHaveText(phoneNumber);
  }

  async emptyFields() {
    const error = this.page.locator(this.errormsg);
    await expect(error).toHaveText(
      "Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required."
    );
  }

  async contactValidate() {
    const contactError = this.page.locator(this.errormsg);
    await expect(contactError).toHaveText(
      "Contact validation failed: phone: Phone number is invalid"
    );
  }

  async emailInValidate() {
    const contactError = this.page.locator(this.errormsg);
    await expect(contactError).toHaveText(
      "Contact validation failed: email: Email is invalid"
    );
  }

  async editContact(
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    streetone,
    streettwo,
    stateProvince,
    city,
    postalCode,
    country
  ) {
    await this.page.locator(this.tableClick).click();
    await this.page.locator(this.editContact).click();
    // await this.page.locator(this.addButton).click();
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).clear();
    await this.page.locator(this.lastName).fill(lastName);
    // await this.page.locator(this.birthDate).clear();
    // await this.page.locator(this.birthDate).fill(birthDate);
    await this.page.locator(this.email).clear();
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phoneNumber).clear();
    await this.page.locator(this.phoneNumber).fill(phoneNumber);
    await this.page.locator(this.submitButton).click();
  }

  async editValidation(
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    streetone,
    streettwo,
    stateProvince,
    city,
    postalCode,
    country
  ) {
    const expfname = this.page.locator("//span[@id='firstName']");
    const explname = this.page.locator("//span[@id='lastName']");
    const exp_email = this.page.locator("//span[@id='email']");
    const phn = this.page.locator("//span[@id='phone']");
    await expect(expfname).toHaveText(firstName);
    await expect(explname).toHaveText(lastName);
    await expect(exp_email).toHaveText(email);
    await expect(phn).toHaveText(phoneNumber);
  }
  async viewContact(fname, lname) {
    await this.page.locator(`//td[text()='${fname} ${lname}']`).click();
    const expfname = this.page.locator('//span[@id="firstName"]');
    const explname = this.page.locator('//span[@id="lastName"]');
    await expect(expfname).toHaveText(fname);
    await expect(explname).toHaveText(lname);
  }

  async contactEdit(fname, lname) {
    await this.page.locator(this.editbutton).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(fname);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.lastName).clear();
    await this.page.locator(this.lastName).fill(lname);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.submitButton).click();
    await expect(this.page.locator('//span[@id="firstName"]')).toHaveText(
      fname
    );
    await expect(this.page.locator('//span[@id="lastName"]')).toHaveText(lname);
  }

  async contactDelete() {
    await this.page.waitForTimeout(2000);
    this.page.once("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
    await this.page.locator(this.deleteContact);
  }
};
//comment
