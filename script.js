//HTML
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')

//ELEMENTOS DA LISTA

const expenseList = document.querySelector('ul')
const expenseQuantity = document.querySelector('aside header p span')

//AMOUNT

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")
    value = Number(value) /100
    amount.value = formatCurrencyBRL(value)
}

    function formatCurrencyBRL (value){
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
        return value
    }

//CAPTURA EVENTO DE SUBMIT DE USUARIO PARA OBTER VALORES
form.onsubmit = (e) => {
//PREVINE COMPORTAMENTO PADRÃO DE RECARREGAR A PÁGINA
    e.preventDefault()

//New Object, content value new expense
    const newExpense = {

    id: new Date().getTime(),
    expense: expense.value, //CAPTURANDO O VALOR INSERIDO COMO DESPESA
    category_id:category.value, //CAPTURANDO O VALOR DA CATEGORIA SELECIONADA 
    category_name: category.options[category.selectedIndex].text,//CAPTURANDO O TEXTO DA CATEGORIA QUE ESTA SELECIONADA(selectedIndes).
    amount: amount.value, //CAPTURANDO O VALOR DA DESPESA
    created_dt: new Date(),
    }   

//CHAMANDO A FUNÇÃO QUE VAI ADICIONAR UM NOVO ITEM
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try{

//CRIAR ELEMENTO li PARA SER ADICIONADO NA LISTA ul DE FORMA DINÂMICA
        const expenseItem = document.createElement('li')
//ADICIONAR O ITEM CRIADO A LISTA DE DESPESAS
        expenseItem.classList.add("expense")

//CRIAR ICONE DA CATEGORIA
        const expenseIcon = document.createElement('img')

//setAttribute(acessar atributo) - "src", depois `img- é a pasta onde está a imagem`
//ENTÃO ACESSO O newExpense e dentro dele category_id que é um objeto que retorna o valor da categoria
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)

//NESSE CASO EU PASSO "alt" COMO PARÂMETRO DA FUNÇÃO, E category_name, que está declarado
//DENTRO DO newExpense também, acessando então a indexItem, ou seja, o item que estiver sendo
//selecionado naquele momento        
        expenseIcon.setAttribute("alt", newExpense.category_name)

        
        //RESPOSTAS DO FORMULÁRIO PREENCHIDO
        const expenseInf = document.createElement('div')
        expenseInf.classList.add('expense-inf')
        
        //CRIAR NOME DA DESPESA
        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense
        
        //CRIA A CATEGORIA DA DESPESA
        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name
        
        //ADICIONA NAME E CATEGORY AS INFORMAÇÕES DA LISTA DE INFORMAÇÕES DAS DISPESAS
        expenseInf.append(expenseName, expenseCategory)

        //ADICIONA A LEGENDA DE VALOR A LISTA DE INFORMAÇÕES DAS DIVIDAS
        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`


        //ICONE DE REMOVER DESPESA
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-icon')
        removeIcon.setAttribute('src', 'img/remove.svg')
        removeIcon.setAttribute('alt','remover')

        //ADICIONA AS INFORMAÇÕES NO ITEM
        expenseItem.append(expenseIcon, expenseInf, expenseAmount, removeIcon)
        //ATUALIZA OS TOTAIS
        updateTotals()
    

        //ADICIONA O ITEM NA LISTA
        expenseList.appendChild(expenseItem)

        
    }
    catch(error){
        alert('Não foi possível atualizar a lista de despesas!')
        console.log(error)
    }

}

//ATUALIZAR OS TOTAIS, A SOMA DAS DESPESAS

function updateTotals(){
    try {
//RECUPERA TODOS OS ITENS LI DA LISTA UL
        const items = expenseList.children
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesa' : 'despesa'}`
        console.log(items)

} catch (error) {
        console.log('Erro na lista')
    }
}
