export class LoginPage {
    constructor(page) {
      this.page = page;
      this.username = page.getByLabel('Username', {exact: true});
      this.password = page.getByLabel('Password', {exact: true});
      this.loginButton = page.getByRole('button', {name: 'Login'});
      this.errorMessage = page.getByText('Sorry, your username or password was incorrect. Please try again.', {exact: true});
      this.notValidUser = page.getByText("Not found. Couldn't find any user", {exact: true});
      this.notValidPass = page.getByText('Validation Error', {exact: true});
    }

    async goto() {
        await this.page.goto('https://frontend-training-taupe.vercel.app/login');
      };
    
      async fillUserName(userName) {
        await this.username.fill(userName);
      }
    
      async fillPassword(password) {
        await this.password.fill(password);
      }

      async pressLoginButton() {
        await this.loginButton.click();
      }
  }