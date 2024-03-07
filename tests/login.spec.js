import { chromium } from 'playwright';
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { test, expect } from '@playwright/test';
import { loginData } from '../data/login.data'

let loginPage;
let homePage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginPage = new LoginPage(page)
  homePage = new HomePage(page)

})

test.describe('Login tests', () => {

    test.beforeEach(async ({page}) => {
      await loginPage.goto();
    })

    test('User can login successfully', async ({ page }) => {
      await loginPage.fillUserName(loginData.loginValidCredentials.username);
      await loginPage.fillPassword(loginData.loginValidCredentials.password);
  
      await loginPage.pressLoginButton();
  
      await expect(homePage.homeText).toBeVisible()
    });
  
  });
  