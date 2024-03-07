export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.name = page.getByLabel('Name', {exact: true});
    this.username = page.getByLabel('Username', {exact: true});
    this.email = page.getByLabel('Email', {exact: true});
    this.password = page.getByLabel('Password', {exact: true});
    this.confirmPassword = page.getByLabel('Confirm Password', {exact: true});
    this.confirmButton = page.getByRole('button', {name: 'Register'});
    this.loginButton = page.getByRole('button', {name: 'Login'});
    this.errorUserMessage = page.getByText('User already exists', {exact: true});
    this.errorPasswordMessage = page.getByText('Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol', {exact: true});
    this.errorDifferentPasswords = page.getByText('Passwords must match', {exact: true});
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/register');
  };
  
  async fillName(name) {
    await this.name.fill(name);
  }

  async fillUserName(userName) {
    await this.username.fill(userName);
  }

  async fillEmail(email) {
    await this.email.fill(email);
  }

  async fillPassword(password) {
    await this.password.fill(password);
  }

  async fillConfirmPassword(confirmButton) {
    await this.confirmPassword.fill(confirmButton);
  }

  async pressConfirmButton() {
    await this.confirmButton.click();
  }
}