import { STYLES, LABELS } from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Page Stack", () => {
  it("Submit button is disabled when input is empty", () => {
    cy.visit("/stack");
    cy.get(STYLES.singleInput).should("have.value", "");
    cy.get(STYLES.addButton).should("be.disabled");
  });

  it("element adding function works correctly, colors are changing, animation is correct", () => {
    cy.visit("/stack");
    cy.get(STYLES.singleInput).type("1").should("have.value", "1");
    cy.get(STYLES.addButton).click();

    cy.get(STYLES.circle)
      .should("have.length", 1)
      .each((element) => {
        cy.wrap(element).contains("1");
        cy.wrap(element)
          .get(STYLES.circleHead)
          .should("contain.text", LABELS.topText);
        cy.wrap(element).find(STYLES.circleChangingState);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle).each((element) => {
      cy.wrap(element).contains("1");
      cy.wrap(element).find(STYLES.circleDefaultState);
    });

    cy.get(STYLES.singleInput).type("2").should("have.value", "2");
    cy.get(STYLES.addButton).click();

    cy.get(STYLES.circle)
      .should("have.length", 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("1");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains("2");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.topText);
          cy.wrap(el).find(STYLES.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should("have.length", 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("1");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains("2");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.topText);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }
      });

    cy.get(STYLES.singleInput).type("3").should("have.value", "3");
    cy.get(STYLES.addButton).click();

    cy.get(STYLES.circle)
      .should("have.length", 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("1");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains("2");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 2) {
          cy.wrap(el).contains("3");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.topText);
          cy.wrap(el).find(STYLES.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should("have.length", 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("1");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains("2");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 2) {
          cy.wrap(el).contains("3");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.topText);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }
      });

    cy.get(STYLES.singleInput).should("have.value", "");
  });

  it("Element delete function works correctly", () => {
    cy.visit("/stack");
    cy.get(STYLES.singleInput).type("1");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("2");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("3");
    cy.get(STYLES.addButton).click();

    cy.get(STYLES.deleteButton).click();
    cy.get(STYLES.circle)
      .should("have.length", 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("1");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains("2");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 2) {
          cy.wrap(el).contains("3");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.topText);
          cy.wrap(el).find(STYLES.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should("have.length", 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("1");
          cy.wrap(el).should("not.have.html", STYLES.circleHead);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains("2");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.topText);
          cy.wrap(el).find(STYLES.circleDefaultState);
        }
      });
  });

  it("Function reset works properly", () => {
    cy.visit("/stack");
    cy.get(STYLES.singleInput).type("1");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("2");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("3");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.clearButton).click();
    cy.get(STYLES.singleInput).should("have.value", "");
  });
});
export {};
