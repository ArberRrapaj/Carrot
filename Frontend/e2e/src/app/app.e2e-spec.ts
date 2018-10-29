import { AppPage } from './app.po';
import { injectElementRef } from '@angular/core/src/render3';
import { inject } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { browser, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  const EC = browser.ExpectedConditions;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the logo on the login page', () => {
    page.navigateTo();
    expect(page.getLogoForLogin()).toBeTruthy();
  });

  it('should successfully register a new User and be redirect to dashboard', () => {
    page.navigateTo();
    browser.waitForAngular();
    browser.driver.sleep(300);
    page.getSignUpTabButton().click();
    browser.waitForAngular();
    browser.driver.sleep(300);
    page.getRegisterUsernameInput().sendKeys('TestUser550');
    page.getRegisterPasswordInput().sendKeys('abcdefgh');
    page.getPasswordConfirmInput().sendKeys('abcdefgh');
    page.getFirstNameInput().sendKeys('Testy');
    page.getAboutInput().sendKeys('Hi, I am a test user, I love E2E-Tests');
    page.getStartedInput().sendKeys('2018');

    expect(page.getSignUpButton().isEnabled());
    page.getSignUpButton().click();
    browser.wait(EC.urlContains('dashboard'), 1000); // Checks that the current URL contains the expected text
    // browser.waitForAngular();
    // expect(page.getTabTitle()).toEqual('Your Library'); always given
  });

  it('should logout the user', () => {
    page.navigateTo();
    page.getLogoutButton().click();
    browser.wait(EC.urlContains('login'), 1000); // Checks that the current URL contains the expected text
    // browser.waitForAngular();
  });

  it('should Login user', () => {
    page.navigateTo();
    page.getUsernameInput().sendKeys('TestUser550');
    page.getPasswordInput().sendKeys('abcdefgh');
    expect(page.getSignInButton().isEnabled());
    page.getSignInButton().click();
    browser.wait(EC.urlContains('dashboard'), 4000); // Checks that the current URL contains the expected text
    // browser.waitForAngular();
    // expect(page.getTabTitle()).toEqual('Your Library');
  });

  it('should delete the test user', () => {
    page.navigateTo();
    page.getProfileTab().click();
    browser.waitForAngular();
    browser.driver.sleep(300);

    page.getEditButton().click();
    browser.waitForAngular();
    browser.driver.sleep(300);

    page.getDeleteButton().click();
    browser.wait(EC.urlContains('login'), 4000); // Checks that the current URL contains the expected text
    // browser.driver.sleep(300000);
  });

});
