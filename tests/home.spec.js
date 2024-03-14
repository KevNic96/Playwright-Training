import { chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from "../pages/HomePage";
import { test, expect } from '@playwright/test';
import { loginData } from '../data/login.data'
import { ProfilePage } from '../pages/ProfilePage';
import { HomeData } from '../data/home.data';

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
    await loginPage.login(loginData.loginValidCredentials.username, loginData.loginValidCredentials.password);
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
      const wrapper = homePage.forYouDiv  
      expect(wrapper).toBeVisible();
      const tweetChatIcon = await homePage.chatIcon.first();
      await page.waitForTimeout(1000)
      expect(tweetChatIcon).toBeVisible();
    });

    test('infinite scroll should work ok (TC-011)', async ({ page }) => {
      // Arrange
      const initialDivsCount = await homePage.retweetIcon.count();

      // Act
      const lastDiv = await homePage.retweetIcon.last().click();
      await page.waitForTimeout(3000)
      const finalDivsCount = await homePage.retweetIcon.count();

      // Assert
      expect(finalDivsCount).toBeGreaterThan(initialDivsCount); 
    })

    test.describe('Like Icons', () => {
      // MAY FAIL (When you first click a tweet like icon it doesn't work, but in the second time it does)
      test('should change color when clicked (TC-013 / TC-014)', async ({ page })=> {
        await page.waitForTimeout(1000);
        // Arrange
        const tweet = await homePage.likeIcon.first();

        // Act
        const previousUrl = await tweet.getAttribute('src');
        await tweet.click();
        const modifiedUrl = await tweet.getAttribute('src');

        // Assert
        expect(previousUrl).not.toEqual(modifiedUrl);

        // Clean
        await tweet.click();
      })

      test('should add or substract likes counting depending like icon color when clicked (TC-013)', async ({ page })=> {
        await page.waitForTimeout(3000);
        // Arrange
        const likeIcon = await (homePage.page.locator(HomeData.likeIconXPath))
        const buttonText = await (homePage.page.locator(HomeData.likeButtonXPath)).innerText();
        
        // Act
        const previousUrl = await likeIcon.getAttribute('src');
        await likeIcon.click();
        await page.waitForTimeout(3000);
        const nextButtonText = await (homePage.page.locator(HomeData.likeButtonXPath)).innerText();

        // Assert
        if(previousUrl === HomeData.greyLikeIconSrc) {
          expect(parseInt(nextButtonText)).toBeGreaterThan(parseInt(buttonText));
        }
        else {
          expect(parseInt(buttonText)).toBeGreaterThan(parseInt(nextButtonText));
        }
        
        // Clean
        await likeIcon.click();
      })
    })

    test.describe('Retweet Icons', () => {
      // MAY FAIL (When you first click a tweet like icon it doesn't work, but in the second time it does)
      test('should change color when clicked (TC-015)', async ({ page })=> {
        await page.waitForTimeout(1000);
        // Arrange
        const retweetIcon = await homePage.retweetIcon.first();

        // Act
        const previousUrl = await retweetIcon.getAttribute('src');
        await retweetIcon.click();
        const modifiedUrl = await retweetIcon.getAttribute('src');

        // Assert
        expect(previousUrl).not.toEqual(modifiedUrl);

        // Clean
        await retweetIcon.click();
      })

      test('should add or substract likes counting depending like icon color when clicked (TC-015)', async ({ page })=> {
        await page.waitForTimeout(3000);
        // Arrange
        const retweetIcon = await (homePage.page.locator(HomeData.retweetIconXPath))
        const buttonText = await (homePage.page.locator(HomeData.retweetButtonXPath)).innerText();
        
        // Act
        const previousUrl = await retweetIcon.getAttribute('src');
        await retweetIcon.click();
        await page.waitForTimeout(3000);
        const nextButtonText = await (homePage.page.locator(HomeData.retweetButtonXPath)).innerText();

        // Assert
        if(previousUrl === HomeData.greyRetweetIconSrc) {
          expect(parseInt(nextButtonText)).toBeGreaterThan(parseInt(buttonText));
        }
        else {
          expect(parseInt(buttonText)).toBeGreaterThan(parseInt(nextButtonText));
        }
        
        // Clean
        await retweetIcon.click();
      })
    })

    test.describe('Comments', () => {

      test('should open comment modal when comment icon is clicked (TC-016)', async ({ page })=> {
        // Act
        await homePage.chatIcon.first().click();

        // Assert
        expect(homePage.commentModal).toBeVisible()
      })

      test('should be able to make a comment (TC-017)', async ({ page })=> {
        // Arrange
        const commentText = (new Date()).toISOString();

        // Act
        await homePage.chatIcon.first().click();
        await homePage.fillCommentInput(`Comment made ${commentText}`);
        await homePage.modalTweetButton.click();
        await page.waitForTimeout(1000);
        await homePage.modalCloseButton.click();
        await homePage.chatIcon.first().click();
        const comment = await homePage.page.getByText(`Comment made ${commentText}`, { exact: true })

        // Assert
        expect(comment).toBeVisible();
        expect(comment).toHaveText(`Comment made ${commentText}`);
        
      })
    })

    // WILL FAIL -- APP ERROR
    test('should not be able to make a comment of more than 240 characters (TC-021)', async ({ page })=> {
      // Arrange
      const commentText = HomeData.commentOf260Char;

      // Act
      await homePage.chatIcon.first().click();
      await homePage.fillCommentInput(commentText);

      // Assert
      expect(homePage.modalTweetButton).toBeDisabled();      
    })
  });

  test.describe('"Following" section tests', () => {

    test('should show users tweets (TC-010)', async ({ page }) => {
      // Act
      await page.waitForTimeout(1000);
      await homePage.followingButton.click();
      await page.waitForTimeout(1000);
      const wrapper = homePage.followingDiv;
      const tweetChatIcon = await homePage.chatIcon.first();

      // Assert
      expect(wrapper).toBeVisible();
      expect(tweetChatIcon).toBeVisible();
    });

    test('should not show tweets of users that are not followed (TC-010)', async ({ page }) => {
      // Act
      await page.waitForTimeout(1000);
      await homePage.followingButton.click();
      await page.waitForTimeout(1000);
      const notFollowedUserTweet = await homePage.page.getByText(HomeData.notFollowedUserUsername);
      
      // Assert
      expect(notFollowedUserTweet).toBeHidden();
    });
  });

  test.describe('"Tweet" tests', () => {
    test('should create a tweet', async ({ page }) => {
      // Arrange
      await page.waitForTimeout(1000);
      const initialTweetsCount = await homePage.tweets.count();
      const tweetText = HomeData.tweetOf260Char; // Usamos un tweet de ejemplo definido en home.data.js
  
      // Act
      await homePage.tweetButton.click();
      await page.waitForSelector('.tweetInput');
      await homePage.fillCommentInput(tweetText);
      await homePage.modalTweetButton.click();
      await page.waitForTimeout(2000); // Esperamos un poco para que el tweet se procese y aparezca en la lista de tweets
  
      // Assert
      const finalTweetsCount = await homePage.tweets.count();
      const lastTweetText = await homePage.page.locator('.tweetText').nth(finalTweetsCount - 1).innerText();
      
      // Verificamos que el contador de tweets haya aumentado en 1
      expect(finalTweetsCount).toBe(initialTweetsCount + 1);
      
      // Verificamos que el texto del último tweet sea el texto que ingresamos
      expect(lastTweetText).toEqual(tweetText);
    });

    test('should create a tweet with image', async ({ page }) => {
      // Arrange
      await page.waitForTimeout(1000);
      const initialTweetsCount = await homePage.tweets.count();
      const tweetText = "This is a test tweet with image.";
      const imagePath = 'path/to/your/image.jpg'; 
  
      // Act
      await homePage.tweetButton.click();
      await page.waitForSelector('.tweetInput');
      await homePage.fillCommentInput(tweetText);
      await homePage.attachImage(imagePath); 
      await homePage.modalTweetButton.click();
      await page.waitForTimeout(2000); 
  
      // Assert
      const finalTweetsCount = await homePage.tweets.count();
      const lastTweetText = await homePage.page.locator('.tweetText').nth(finalTweetsCount - 1).innerText();
      const lastTweetImage = await homePage.page.locator('.tweetImage').nth(finalTweetsCount - 1).getAttribute('src');
  
      // Verify that tweet count increased by 1
      expect(finalTweetsCount).toBe(initialTweetsCount + 1);
  
      // Verify that the last tweet matches the text provided
      expect(lastTweetText).toEqual(tweetText);
  
      // Verify that the last tweet contains an image
      expect(lastTweetImage).not.toBeNull();
    });

  });

  

})

