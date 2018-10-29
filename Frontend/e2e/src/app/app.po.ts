import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  getLogoForLogin() {
    return element(by.id('icon'));
  }

  getUsernameInput() {
    return element(by.id('login-username'));
  }

  getPasswordInput() {
    return element(by.id('login-password'));
  }

  getRegisterUsernameInput() {
    return element(by.id('register-username'));
  }

  getRegisterPasswordInput() {
    return element(by.id('register-password'));
  }

  getPasswordConfirmInput() {
    return element(by.id('register-password-confirm'));
  }

  getFirstNameInput() {
    return element(by.id('register-first-name'));
  }

  getStartedInput() {
    return element(by.id('register-started'));
  }

  getAboutInput() {
    return element(by.id('register-about'));
  }

  getSignUpTabButton() {
    return element(by.css('.mat-tab-labels div[aria-posinset="2"]'));
  }

  getSignUpButton() {
    return element(by.id('sign-up-button'));
  }

  getSignInButton() {
    return element(by.id('sign-in-button'));
  }

  getEditButton() {
    return element(by.id('user-edit-button'));
  }

  getDeleteButton() {
    return element(by.id('user-delete-button'));
  }

  getSignInTabButton() {
    return element(by.css('.mat-tab-labels div[aria-posinset="1"]'));
  }

  getProfileTab() {
    return element(by.id('navigation-profile'));
  }

  getLogoutButton() {
    return element(by.id('navigation-logout'));
  }

  getTabTitle() {
    return element(by.id('tab-title')).getText();
  }

}
