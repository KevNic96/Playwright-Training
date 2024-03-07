import { chromium } from 'playwright';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from "../pages/HomePage";
import { test, expect } from '@playwright/test';
import { registerData } from '../data/register.data'

let registerPage;
let homePage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  registerPage = new RegisterPage(page)
  homePage = new HomePage(page)

})


test.describe('Register tests', () => {

  test.beforeEach(async ({page}) => {
    await registerPage.goto();
  })

  test('register with valid credentials', async ({ page }) => {  
    await registerPage.fillName('John Doe');
    await registerPage.fillUserName('validUser');
    await registerPage.fillEmail('validUser@mail.com');
    await registerPage.fillPassword('1234');
    await registerPage.fillConfirmPassword('FakePassword1$');

    await registerPage.pressConfirmButton();

    await expect(homePage.homeText).toBeVisible();
  });

  test.only('register with a already used email', async ({ page }) => {  
    await registerPage.fillName(registerData.registerCredentials.name);
    await registerPage.fillUserName(registerData.registerCredentials.userName);
    await registerPage.fillEmail(registerData.registerCredentials.email);
    await registerPage.fillPassword(registerData.registerCredentials.password);
    await registerPage.fillConfirmPassword(registerData.registerCredentials.confirmPassword);

    await registerPage.pressConfirmButton();

    await expect(registerPage.errorUserMessage).toContainText('User already exists');
  });

  test('register with not valid password', async ({ page }) => {
    await registerPage.fillName(registerData.registerCredentials.name);
    await registerPage.fillUserName(registerData.registerCredentials.userName);
    await registerPage.fillEmail(registerData.registerCredentials.email);
    await registerPage.fillPassword('123');
    await registerPage.fillConfirmPassword(registerData.registerCredentials.confirmPassword);

    await registerPage.pressConfirmButton();

    await expect(registerPage.errorPasswordMessage).toContainText('Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol');
  });

  test('register with different password and confirmPassword', async ({ page }) => {
    await registerPage.fillName(registerData.registerCredentials.name);
    await registerPage.fillUserName(registerData.registerCredentials.userName);
    await registerPage.fillEmail(registerData.registerCredentials.email);
    await registerPage.fillPassword(registerData.registerCredentials.password);
    await registerPage.fillConfirmPassword('Pass123$%');

    await registerPage.pressConfirmButton();
    
    await expect(registerPage.errorDifferentPasswords).toContainText('Passwords must match');
  });


});
