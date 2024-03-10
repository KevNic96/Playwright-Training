import { chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from "../pages/HomePage";
import { test, expect } from '@playwright/test';
import { LoginData } from '../data/login.data'
import { ProfilePage } from '../pages/ProfilePage';

let loginPage;
let homePage;
let profilePage;

test.describe('Home tests', () => {

  test.beforeAll(async () => {
    // Arrange pages
    const browser = await chromium.launch();
    const page = await browser.newPage();
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    profilePage = new ProfilePage(page);
  })
  
  test.beforeEach(async () => {
    // Arrange successfull login
    await loginPage.goto();
    await loginPage.login(LoginData.validCredentials.username, LoginData.validCredentials.password);
  })
  
  
  test.describe('"For you" section tests', () => {

    test('should be able to access another user profile by clicking profile image (TC-009)', async ({ page }) => {  
      await page.waitForTimeout(1000)
      // find icon profile in a tweet
      const profileIcon = await homePage.otherUserProfileIcon.first();
      await profileIcon.click();

      await page.waitForTimeout(1000)
      expect(homePage.page).toHaveURL(`${profilePage.baseUrl}${process.env.ANOTHER_USER_ID}`);
    });
  
    test('should show users tweets (TC-011)', async ({ page }) => {
      await page.waitForTimeout(1000)
      const firstTweet = await homePage.forYouDiv.first()  
      expect(firstTweet).toBeVisible();
      const tweetChatIcon = await homePage.chatIcon.first()
      expect(tweetChatIcon).toBeVisible();
    });

    test('infinite scroll should work ok (TC-011)', async ({ page }) => {
      // Wait for divs to load
      const initialDivsCount = await homePage.retweetIcon.count();

      // Make scroll down and load new tweets
      const lastDiv = await homePage.retweetIcon.last().click();
      await page.waitForTimeout(3000)

      const finalDivsCount = await homePage.retweetIcon.count();
      // Check more tweets loaded
      expect(finalDivsCount).toBeGreaterThan(initialDivsCount); 
    })
  });
  

})

