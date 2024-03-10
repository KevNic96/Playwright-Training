export class HomePage {
  constructor(page) {
      this.page = page;
      this.homeText = page.getByRole('heading', { name: 'Home' })
      this.tweetButton = page.getByRole('button', { name: 'Tweet' });
      this.forYouDiv = page.locator('//*[@id="root"]/div/div/main/div[2]');
      this.chatIcon = page.locator('//*[@id="root"]/div/div/main/div[2]/div[2]/div[3]/button[1]/img');
      this.retweetIcon = page.getByAltText('retweet-icon');
      this.otherUserProfileIcon = page.getByText('FE', { exact: true });
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/');
  };

}