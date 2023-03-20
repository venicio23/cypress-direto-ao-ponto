describe('Transações', () => {

    beforeEach(() => {
        cy.visit("https://devfinance-agilizei.netlify.app/#")
    });

    it('Cadastra uma entrada', () => { 
           criarTransacao("Freela", 250)

           cy.get("tbody tr td.description")
            .should("have.text", "Freela")
    });


    it('Cadastrar uma saída', () => {
        criarTransacao("Cinema", -45)

        cy.get("tbody tr td.description")
            .should("have.text", "Cinema")
    });

    it('Excluir transação', () => {
        criarTransacao("Freela", 100)
        criarTransacao("Mesada", 10)

        //Fluxo alternativo 
        // cy.contains(".description", "Freela")
        // .siblings()    
        // .children('img')
        // .click()

        cy.contains(".description", "Freela") //td -> referencia
        .parent() //tr -> elemento pai
        .find('img') // elemento que a gente precisa
        .click() //Ação a ser feito após encontrado o elemento

        cy.get('tbody tr').should("have.length", 1)
        
    });

});

function criarTransacao(descricao, valor){
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-03-19")

    cy.contains('button', 'Salvar').click()

}