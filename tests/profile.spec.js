import { chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from "../pages/HomePage";
import { test, expect } from '@playwright/test';
import { loginData } from '../data/login.data'
import { ProfilePage } from '../pages/ProfilePage';

let loginPage;
let homePage;
let profilePage;

test.describe('Profile tests', () => {

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
    await loginPage.login(loginData.loginValidCredentials.username, loginData.loginValidCredentials.password);
  })
  
  
  test.describe('Another user Profile page tests', () => {

    test('should be able to follow another user by clicking on Follow button in their profile (TC-009)', async ({ page }) => {  
      await page.waitForTimeout(1000)
      // find icon profile in a tweet -- Arrange
      const profileIcon = await homePage.otherUserProfileIcon.first();
      await profileIcon.click();

      // Act
      await profilePage.followButton.click();

      //Assert
      expect(profilePage.followButton).toBeHidden();
      await page.waitForTimeout(5000)
      expect(profilePage.unfollowButton).toBeVisible();
      await page.waitForTimeout(1000)

      // Clean
      await profilePage.unfollowButton.click();
    });
  });

  test.describe('Own Profile page tests', () => {

    // WILL FAIL - APP ERROR
    test('should be able to edit own profile (TC-012)', async ({ page }) => {  
      await page.waitForTimeout(1000)
      // Act
      await homePage.profileButton.click();
      await profilePage.modifyProfileButton.click();
      //Assert
      expect(profilePage.modifyProfileButton).toHaveText('Modify Profile');
    });
  });
})

