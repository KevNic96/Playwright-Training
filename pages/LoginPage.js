export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByLabel('Username', {exact: true});
    this.password = page.getByLabel('Password', {exact: true});
    this.loginButton = page.getByRole('button', { name: 'Login'});
    this.notValidUser = page.getByLabel('Not found. Couldnt find any user');
    this.notValidPass = page.getByLabel('Validation Error', {exact: true});
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/login');
  }

  async fillUsername(username) {
    await this.username.fill(username);
  }

  async fillPassword(password) {
    await this.password.fill(password);
  }

  async pressLoginButton() {
    await this.loginButton.click()
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.pressLoginButton();
  }
}