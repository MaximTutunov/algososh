import { STYLES, LABELS } from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { QUEUE_LENGTH } from "../../src/constants/queue";

describe("Page Queue", () => {
  it("Submit button is disabled when input is empty", () => {
    cy.visit("/queue");
    cy.get(STYLES.singleInput).should("have.value", "");
    cy.get(STYLES.addButton).should("be.disabled");
  });

  it("function works correctly while adding elements", () => {
    cy.visit("/queue");
    cy.get(STYLES.singleInput).type("1").should("have.value", "1");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.circle).first().find(STYLES.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should("have.length", QUEUE_LENGTH)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(STYLES.circleLetter).contains("1");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.headText);
          cy.wrap(el)
            .get(STYLES.circleTail)
            .should("contain.text", LABELS.tailText);
          cy.wrap(el).find(STYLES.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should("have.length", QUEUE_LENGTH)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(STYLES.circleLetter).contains("1");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.headText);
          cy.wrap(el)
            .get(STYLES.circleTail)
            .should("contain.text", LABELS.tailText);
        } else {
          cy.wrap(el).get(STYLES.circleLetter).should("be.empty");
          cy.wrap(el).get(STYLES.circleHead).should("be.empty");
          cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        }
        cy.wrap(el).find(STYLES.circleDefaultState);
      });

    cy.get(STYLES.singleInput).should("have.value", "");
    cy.get(STYLES.deleteButton).should("be.enabled");
    cy.get(STYLES.clearButton).should("be.enabled");
    
    cy.get(STYLES.singleInput).type("2").should("have.value", "2");
    cy.get(STYLES.addButton).click();

    cy.get(STYLES.circle).first().find(STYLES.circleDefaultState);

    cy.get(STYLES.circle).eq(1).find(STYLES.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle).eq(1).contains("2");
    cy.get(STYLES.circle).eq(1).get(STYLES.circleHead).should("be.empty");
    cy.get(STYLES.circle)
      .eq(1)
      .get(STYLES.circleTail)
      .should("contain.text", LABELS.tailText);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should("have.length", QUEUE_LENGTH)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(STYLES.circleLetter).contains("1");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.headText);
          cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        }

        if (index === 1) {
          cy.wrap(el).get(STYLES.circleLetter).contains("2");
          cy.wrap(el).get(STYLES.circleHead).should("be.empty");
          cy.wrap(el)
            .get(STYLES.circleTail)
            .should("contain.text", LABELS.tailText);
        }

        if (index > 1) {
          cy.wrap(el).get(STYLES.circleLetter).should("be.empty");
          cy.wrap(el).get(STYLES.circleHead).should("be.empty");
          cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        }

        cy.wrap(el).find(STYLES.circleDefaultState);
      });

    cy.get(STYLES.singleInput).should("have.value", "");
    cy.get(STYLES.deleteButton).should("be.enabled");
    cy.get(STYLES.clearButton).should("be.enabled");

    cy.get(STYLES.singleInput).type("3").should("have.value", "3");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.circle).first().find(STYLES.circleDefaultState);
    cy.get(STYLES.circle).eq(1).find(STYLES.circleDefaultState);
    cy.get(STYLES.circle).eq(2).find(STYLES.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(STYLES.circle).eq(2).contains("3");
    cy.get(STYLES.circle).eq(1).get(STYLES.circleHead).should("be.empty");
    cy.get(STYLES.circle).eq(2).get(STYLES.circleHead).should("be.empty");
    cy.get(STYLES.circle).eq(1).get(STYLES.circleTail).should("be.empty");
    cy.get(STYLES.circle)
      .eq(2)
      .get(STYLES.circleTail)
      .should("contain.text", LABELS.tailText);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(STYLES.circle)
      .should("have.length", QUEUE_LENGTH)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(STYLES.circleLetter).contains("1");
          cy.wrap(el)
            .get(STYLES.circleHead)
            .should("contain.text", LABELS.headText);
          cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        }

        if (index === 2) {
          cy.wrap(el).get(STYLES.circleLetter).contains("2");
          cy.wrap(el).get(STYLES.circleHead).should("be.empty");
          cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        }

        if (index === 2) {
          cy.wrap(el).get(STYLES.circleLetter).contains("3");
          cy.wrap(el).get(STYLES.circleHead).should("be.empty");
          cy.wrap(el)
            .get(STYLES.circleTail)
            .should("contain.text", LABELS.tailText);
        }

        if (index > 2) {
          cy.wrap(el).get(STYLES.circleLetter).should("be.empty");
          cy.wrap(el).get(STYLES.circleHead).should("be.empty");
          cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        }

        cy.wrap(el).find(STYLES.circleDefaultState);
      });
  });

  it("function works correctly while deleting elements", () => {
    cy.visit('/queue');
    cy.get(STYLES.singleInput).type("1");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("2");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("3");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.deleteButton).click();
    cy.get(STYLES.circle).first().find(STYLES.circleChangingState);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(STYLES.circle).first().find(STYLES.circleDefaultState);
    cy.get(STYLES.circle).first().get(STYLES.circleLetter).should("be.empty");
    cy.get(STYLES.circle).first().get(STYLES.circleHead).should("be.empty");
    cy.get(STYLES.circle).eq(1).find(STYLES.circleChangingState);
    cy.get(STYLES.circle)
      .eq(1)
      .get(STYLES.circleHead)
      .should("contain.text", LABELS.headText);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(STYLES.circle).eq(1).find(STYLES.circleDefaultState);
  });
  
  it("function clear input works correctly", () => {
    cy.visit('/queue');
    cy.get(STYLES.singleInput).type("1");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("2");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.singleInput).type("3");
    cy.get(STYLES.addButton).click();
    cy.get(STYLES.clearButton).click();
    cy.get(STYLES.circle)
      .should("have.length", QUEUE_LENGTH)
      .each((el, index) => {
        cy.wrap(el).get(STYLES.circleLetter).should("be.empty");
        cy.wrap(el).get(STYLES.circleHead).should("be.empty");
        cy.wrap(el).get(STYLES.circleTail).should("be.empty");
        cy.wrap(el).find(STYLES.circleDefaultState);
      });
    cy.get(STYLES.deleteButton).should("be.disabled");
    cy.get(STYLES.clearButton).should("be.disabled");
  });
});

export {};
