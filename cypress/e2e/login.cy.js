import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as result_page from "../locators/result_page.json";

describe("Проверка авторизации", function () {
  this.beforeEach("Начало теста", function () {
    cy.visit("/");
    cy.get(main_page.forgotEmailBtn).should(
      "have.css",
      "color",
      "rgb(0, 85, 152)"
    );
  });

  this.afterEach("Конец теста", function () {
    cy.get(result_page.title).should("be.visible");
    cy.get(result_page.close).should("be.visible");
  });

  it("Верный пароль и верный логин", function () {
    cy.get(main_page.mail).type(data.login);
    cy.get(main_page.pass).type(data.password);
    cy.get(main_page.loginButton).click();
    cy.get(result_page.title).contains("Авторизация прошла успешно");
  });

  it("Верный логин и неверный пароль", function () {
    cy.get(main_page.mail).type(data.login);
    cy.get(main_page.pass).type("iLove45465");
    cy.get(main_page.loginButton).click();

    cy.get(result_page.title).contains("Такого логина или пароля нет");
  });

  it("Неверный логин и верный пароль", function () {
    cy.get(main_page.mail).type("random@mil.ru");
    cy.get(main_page.pass).type("iLove45465");
    cy.get(main_page.loginButton).click();

    cy.get(result_page.title).contains("Такого логина или пароля нет");
  });

  it("Невалидный логин и верный пароль", function () {
    cy.get(main_page.mail).type("germandolnikov.ru");
    cy.get(main_page.pass).type("iLove45465");
    cy.get(main_page.loginButton).click();

    cy.get(result_page.title).contains("Нужно исправить проблему валидации");
  });

  it("Проверка восстановление пароля", function () {
    cy.get("#forgotEmailButton").click();
    cy.get("#mailForgot").type(data.login);
    cy.get("#restoreEmailButton").click();

    cy.get(result_page.title).contains("Успешно отправили пароль на e-mail");
  });
});

// запуск через терминал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
//Найти поле Логин и Ввести прав логин
//Найти поле пароль и Ввести прав пароль
//Найти кнопку Войти и Нажать
//Проверить, что прошло успешно
