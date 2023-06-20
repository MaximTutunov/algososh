import { STYLES } from './constants';
import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Page String', () => {
   
  it('Submit button is disabled when Input is empty', () => {
    cy.visit('/recursion');
    cy.get(STYLES.singleInput).should('have.value', '');
    cy.get(STYLES.submitButton).should('be.disabled');
  });
  
  

  it('Algorythm produces correct results, STYLES are correct on every step', () => {
    const sampleString = '12345';
    const steps = [
      '12345',
      '12345',
      '52341',
      '54321'
    ];
    cy.visit('/recursion');
    cy.get(STYLES.singleInput).type(sampleString).should('have.value', sampleString);
    cy.get(STYLES.submitButton).click();

    cy.get(STYLES.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[0][index]);
        cy.wrap(el).find(STYLES.circleDefaultState);
      });

    cy.wait(DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[1][index]);
      });

    cy.get(STYLES.circle).first()
      .find(STYLES.circleChangingState);
    cy.get(STYLES.circle).last()
      .find(STYLES.circleChangingState);

    cy.wait(DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[2][index]);

        if(index === 0 || index === 4) {
          cy.wrap(el).find(STYLES.circleModifiedState);
        } else if(index === 1 || index === 3) {
          cy.wrap(el).find(STYLES.circleChangingState);
        } else {
          cy.wrap(el).find(STYLES.circleDefaultState);
        }
      });
    
    cy.wait(DELAY_IN_MS);

    cy.get(STYLES.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[3][index]);
        cy.wrap(el).find(STYLES.circleModifiedState);
      });
    
  });

  it('Input field reset after algorythm completion', () => {
    cy.visit('/recursion');
    cy.get(STYLES.singleInput).should('have.value', '');
    cy.get(STYLES.submitButton).should('be.disabled');
  });

});

export { };
