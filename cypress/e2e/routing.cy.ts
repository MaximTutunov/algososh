describe("Routing", () => {
  it("Page String is available", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.get("h3").should("have.text", "Строка");
  });

  it("Page Fibonacci is available", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get("h3").should("have.text", "Последовательность Фибоначчи");
  });

  it("Page Sorting is available", () => {
    cy.visit("http://localhost:3000/sorting");
    cy.get("h3").should("have.text", "Сортировка массива");
  });

  it("Page Stack is available", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get("h3").should("have.text", "Стек");
  });

  it("Page Queue is available", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get("h3").should("have.text", "Очередь");
  });

  it("Page Linked List is available",()=>{
    cy.visit('http://localhost:3000/list');
    cy.get('h3').should('have.text', 'Связный список')
        });
});

export {};
