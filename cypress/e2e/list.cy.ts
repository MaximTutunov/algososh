import { STYLES, LABELS, COLORS } from "./constants";
import { MIN_LIST_LEN, MAX_LIST_LEN } from "../../src/constants/linked-list";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Page LinkedList", () => {
  it("Buttons are disabled when input is empty", () => {
    cy.visit("/list");
    cy.get(STYLES.valueInput).should("be.empty");
    cy.get(STYLES.indexInput).should("be.empty");

    cy.get(STYLES.addToHeadButton).should("be.disabled");
    cy.get(STYLES.addToTailButton).should("be.disabled");

    cy.get(STYLES.addByIndexButton).should("be.disabled");
    cy.get(STYLES.deleteByIndexButton).should("be.disabled");
  });

  it("Linked List is rendered with random values", () => {
    cy.visit("/list");
    let list: JQuery<HTMLElement>[] = [];
    cy.get(STYLES.circle).as("circles");
    cy.get("@circles")
      .its("length")
      .should("be.gte", MIN_LIST_LEN)
      .and("be.lte", MAX_LIST_LEN);

    cy.get("@circles").each(($el) => {
      list.push($el);
    });

    cy.get("@circles").each((el, index) => {
      cy.wrap(el).find(STYLES.circleDefaultState);
      cy.wrap(el).find(STYLES.circleLetter).should("not.be.empty");
    });

    cy.get("@circles").each((el, index) => {
      console.log(list.length);
      if (index === 0) {
        cy.wrap(el)
          .find(STYLES.circleHead)
          .should("contain.text", LABELS.headText);
      } else if (index === list.length - 1) {
        cy.wrap(el)
          .find(STYLES.circleTail)
          .should("contain.text", LABELS.tailText);
      } else {
        cy.wrap(el).find(STYLES.circleHead).should("be.empty");
        cy.wrap(el).find(STYLES.circleTail).should("be.empty");
      }
    });
  });

  it("Function Add element to head is correct", () => {
    cy.visit("/list");
    const list: JQuery<HTMLElement>[] = [];
    const newElement = "45";
    let len = 0;
    cy.get(STYLES.circle).as("circles");
    cy.get("@circles")
      .each(($el) => {
        list.push($el);
      })
      .then((elements) => {
        len = elements.length + 1;
        cy.get(STYLES.valueInput)
          .type(newElement)
          .should("have.value", newElement);
        cy.get(STYLES.addToHeadButton).should("be.enabled");
        cy.get(STYLES.addToHeadButton).click();
        cy.get(STYLES.circle)
          .first()
          .find(STYLES.circleHead)
          .should("be.empty");
        cy.get(STYLES.circle)
          .first()
          .find(STYLES.smallCircle)
          .as("smallCircle");
        cy.get("@smallCircle").should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get("@smallCircle").should("contain.text", newElement);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).should("have.length", len);
        cy.get(STYLES.circle).first().find(STYLES.circleModifiedState);
        cy.get(STYLES.circle)
          .first()
          .find(STYLES.circleHead)
          .should("contain.text", LABELS.headText);
        cy.get(STYLES.circle).first().should("contain.text", newElement);

        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).each((el) => {
          cy.wrap(el).find(STYLES.circleDefaultState);
        });
      });
  });

  it("Function Add element to tail is correct", () => {
    cy.visit("/list");
    const list: JQuery<HTMLElement>[] = [];
    const newElement = "8";
    let len = 0;
    cy.get(STYLES.circle).as("circles");
    cy.get("@circles")
      .each(($el) => {
        list.push($el);
      })
      .then((elements) => {
        len = elements.length + 1;

        cy.get(STYLES.valueInput)
          .type(newElement)
          .should("have.value", newElement);
        cy.get(STYLES.addToTailButton).should("be.enabled");
        cy.get(STYLES.addToTailButton).click();
        cy.get(STYLES.circle).last().find(STYLES.circleHead).should("be.empty");
        cy.get(STYLES.circle).last().find(STYLES.smallCircle).as("smallCircle");
        cy.get("@smallCircle").should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get("@smallCircle").should("contain.text", newElement);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).should("have.length", len);
        cy.get(STYLES.circle).last().find(STYLES.circleModifiedState);
        cy.get(STYLES.circle)
          .last()
          .find(STYLES.circleTail)
          .should("contain.text", LABELS.tailText);
        cy.get(STYLES.circle).last().should("contain.text", newElement);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).each((el) => {
          cy.wrap(el).find(STYLES.circleDefaultState);
        });
      });
  });

  it("Function Add element to index position is correct ", () => {
    cy.visit("/list");
    const originalList: JQuery<HTMLElement>[] = [];
    const newListElement = "46";
    const addingPositionIndex = 1;
    let newListLength = 0;
    cy.get(STYLES.circle).as("originalCircles");
    cy.get("@originalCircles")
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length + 1;
        cy.get(STYLES.valueInput)
          .type(newListElement)
          .should("have.value", newListElement);
        cy.get(STYLES.indexInput)
          .type(addingPositionIndex.toString())
          .should("have.value", addingPositionIndex.toString());
        cy.get(STYLES.addByIndexButton).should("be.enabled");
        cy.get(STYLES.addByIndexButton).click();
        cy.get(STYLES.circle).first().find(STYLES.circleChangingState);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).as("circles");
        cy.get("@circles").first().find(STYLES.circleChangingState);
        cy.get("@circles").eq(1).find(STYLES.circleChangingState);
        cy.get(STYLES.listItem)
          .first()
          .find("svg")
          .find("path")
          .should("have.attr", "fill", COLORS.modified);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).as("circles");
        cy.get("@circles").first().find(STYLES.circleChangingState);
        cy.get("@circles").eq(1).find(STYLES.circleChangingState);
        cy.get("@circles").eq(1).find(STYLES.smallCircle).as("smallCircle");
        cy.get("@smallCircle").should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get("@smallCircle").should("contain.text", newListElement);
        cy.get(STYLES.listItem)
          .first()
          .find("svg")
          .find("path")
          .should("have.attr", "fill", COLORS.modified);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).each((el, index) => {
          if (index === 0) {
            cy.wrap(el).find(STYLES.circleChangingState);
          }
          if (index === 1) {
            cy.wrap(el).should("contain.text", newListElement);
            cy.wrap(el).find(STYLES.circleModifiedState);
          }
          if (index > 1) {
            cy.wrap(el).find(STYLES.circleDefaultState);
          }
        });
        cy.get(STYLES.listItem)
          .first()
          .find("svg")
          .find("path")
          .should("have.attr", "fill", COLORS.modified);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).should("have.length", newListLength);
        cy.get(STYLES.circle).each((el) => {
          cy.wrap(el).find(STYLES.circleDefaultState);
        });
        cy.get(STYLES.listItem).each((el, index) => {
          if (index < newListLength - 1) {
            cy.wrap(el)
              .find("svg")
              .find("path")
              .should("have.attr", "fill", COLORS.default);
          }
        });
      });
  });

  it("Function Delete element from head position is correct", () => {
    cy.visit("/list");
    const originalList: JQuery<HTMLElement>[] = [];
    let newListLength = 0;
    cy.get(STYLES.circle).as("circles");

    cy.get("@circles")
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;
        cy.get(STYLES.deleteFromHeadButton).click();
        cy.get("@circles").first().find(STYLES.circleLetter).should("be.empty");
        cy.get(STYLES.circle)
          .first()
          .find(STYLES.smallCircle)
          .as("smallCircle");
        cy.get("@smallCircle").should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get(STYLES.circle)
          .first()
          .find(STYLES.circleHead)
          .should("contain.text", LABELS.headText);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).should("have.length", newListLength);
        cy.get(STYLES.circle).each((el) => {
          cy.wrap(el).find(STYLES.circleDefaultState);
        });
      });
  });
  it("Function Delete element from tail position is correct", () => {
    cy.visit("/list");
    const originalList: JQuery<HTMLElement>[] = [];
    let newListLength = 0;
    cy.get(STYLES.circle).as("circles");

    cy.get("@circles")
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;
        cy.get(STYLES.deleteFromTailButton).click();
        cy.get("@circles").last().find(STYLES.circleTail).should("be.empty");
        cy.get(STYLES.circle)
          .last()
          .find(STYLES.circleTail)
          .should("not.contain.text", LABELS.tailText);
        cy.get(STYLES.circle).last().find(STYLES.smallCircle).as("smallCircle");
        cy.get("@smallCircle").should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).should("have.length", newListLength);
        cy.get(STYLES.circle).each((el) => {
          cy.wrap(el).find(STYLES.circleDefaultState);
        });
      });
  });

  it("Function Delete element from index position is correct", () => {
    cy.visit("/list");
    const originalList: JQuery<HTMLElement>[] = [];
    const deletingPositionIndex = 1;
    let newListLength = 0;
    cy.get(STYLES.circle).as("originalCircles");
    cy.get("@originalCircles")
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;
        cy.get(STYLES.indexInput)
          .type(deletingPositionIndex.toString())
          .should("have.value", deletingPositionIndex.toString());
        cy.get(STYLES.deleteByIndexButton).should("be.enabled");
        cy.get(STYLES.deleteByIndexButton).click();
        cy.get(STYLES.circle).first().find(STYLES.circleChangingState);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).as("circles");
        cy.get("@circles").first().find(STYLES.circleChangingState);
        cy.get("@circles").eq(1).find(STYLES.circleChangingState);
        cy.get(STYLES.listItem)
          .first()
          .find("svg")
          .find("path")
          .should("have.attr", "fill", COLORS.modified);
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).as("circles");
        cy.get("@circles").first().find(STYLES.circleChangingState);
        cy.get("@circles").eq(1).find(STYLES.circleChangingState);
        cy.get("@circles").eq(1).find(STYLES.circleLetter).should("be.empty");
        cy.get(STYLES.listItem)
          .first()
          .find("svg")
          .find("path")
          .should("have.attr", "fill", COLORS.modified);
        cy.get("@circles").eq(1).find(STYLES.smallCircle).as("smallCircle");
        cy.get("@smallCircle").should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.wait(DELAY_IN_MS);
        cy.get(STYLES.circle).should("have.length", newListLength);
        cy.get(STYLES.circle).each((el) => {
          cy.wrap(el).find(STYLES.circleDefaultState);
        });
        cy.get(STYLES.listItem).each((el, index) => {
          if (index < newListLength - 1) {
            cy.wrap(el)
              .find("svg")
              .find("path")
              .should("have.attr", "fill", COLORS.default);
          }
        });
      });
  });
});

export {};
