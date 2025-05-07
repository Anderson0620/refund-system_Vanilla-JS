//HTML
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')

//ELEMENTOS DA LISTA

const expenseList = document.querySelector('ul')

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
        expenseItem.classList.add("expense")

//CRIAR ICONE DA CATEGORIA
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

//ADICIONA AS INFORMAÇÕES NO ITEM
        expenseItem.append(expenseIcon)
        
//ADICIONA O ITEM NA LISTA
        expenseList.append(expenseItem)

    } catch(error){
        alert('Não foi possível atualizar a lista de despesas!')
        console.log(error)
    }
}