export class HomePage {
  constructor(page) {
      this.page = page;
      this.homeText = page.getByRole('heading', { name: 'Home' })
      this.tweetButton = page.getByRole('button', { name: 'Tweet' });
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/');
  };
}