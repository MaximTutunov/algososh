import { STYLES } from './constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Page Fibonacci', () => {
  

  it('Submit button is disabled when input is 0', () => {
    cy.visit('/fibonacci');
    cy.get(STYLES.singleInput).should('have.value', '0');
    cy.get(STYLES.submitButton).should('be.disabled');
  });

  it('Submit button is disabled when input is empty', () => {
    cy.visit('/fibonacci');
    cy.get(STYLES.singleInput).clear();
    cy.get(STYLES.submitButton).should('be.disabled');
  });

  it('function produces correct results', () => {
    cy.visit('/fibonacci');
    const startValue = '4';
    const resultSteps = [
      [1],
      [1, 1],
      [1, 1, 2],
      [1, 1, 2, 3],
      [1, 1, 2, 3, 5]
    ];

    cy.get(STYLES.singleInput).clear().type(startValue).should('have.value', startValue);
    cy.get(STYLES.submitButton).should('be.enabled').click();

    cy.get(STYLES.circle)
      .should('have.length', 1);

    cy.get(STYLES.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[0][index]);
      });

    cy.get(STYLES.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 2);

    cy.get(STYLES.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[1][index]);
      });

    cy.get(STYLES.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 3);

    cy.get(STYLES.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[2][index]);
      });

    cy.get(STYLES.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 4);

    cy.get(STYLES.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[3][index]);
      });

    cy.get(STYLES.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 5);

    cy.get(STYLES.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[4][index]);
      });

    cy.get(STYLES.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
  });
});

export { };
