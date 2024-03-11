export class ProfilePage {
  constructor(page) {
      this.page = page;
      this.otherUserProfileIcon = page.getByText('FE', { exact: true });
      this.baseUrl = `https://frontend-training-taupe.vercel.app/profile?user=`;
      this.followButton = page.getByRole('button', { name: 'Follow' });
      this.unfollowButton = page.getByRole('button', { name: 'Unfollow' });
      this.modifyProfileButton = page.getByRole('button', { name: 'Modify Profile' });
  }

  async goto() {
    await this.page.goto(`https://frontend-training-taupe.vercel.app/profile`);
  };

}