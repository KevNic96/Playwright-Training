export class HomePage {
  constructor(page) {
      this.page = page;
      this.homeText = page.getByRole('heading', { name: 'Home' })
      this.tweetButton = page.getByRole('button', { name: 'Tweet' });
      this.forYouDiv = page.locator('//*[@id="root"]/div/div/main/div[2]');
      this.followingDiv = page.locator('.hKPtDu');
      this.chatIcon = page.getByAltText('chat-icon');
      this.retweetIcon = page.getByAltText('retweet-icon');
      this.likeIcon = page.getByAltText('like-icon');
      this.otherUserProfileIcon = page.getByText('FE', { exact: true });
      this.followingButton = page.getByText('Following', { exact: true });
      this.profileButton = page.getByRole('button', { name: 'Profile' });
      this.commentModal = page.locator('.inrQXB');
      this.modalCloseButton = page.locator('.jyAbil');
      this.modalTweetButton = page.locator('.eheooK')
      this.commentInput = page.getByPlaceholder('Tweet your reply');
      // Create Tweet
      this.tweetInput = page.getByPlaceholder("What's happening?");
      this.imageInput = page.locator('input[type="file"]');
      this.moreCharTweet = page.getByText('Post should be between 1 and 240 characters');
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/');
  };

  //Create
  async fillTweetInput(tweet){
    await this.tweetInput.fill(tweet);
  }

  async fillCommentInput(comment) {
    await this.commentInput.fill(comment);
  }

  async attachImage(imagePath) {
    await this.imageInput.setInputFiles(imagePath);
  }


}