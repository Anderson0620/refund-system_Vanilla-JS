//CAPTURANDO ITENS DO FORMULÁRIO
const form = document.querySelector('form')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const amount = document.getElementById('amount')

//CAPTURANDO LISTA
const list = document.querySelector('ul')
const expenseTotal = document.querySelector('aside header h2')
const expenseQuantity = document.querySelector('aside header span')

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
})

function formatCurrencyBRL(value){
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return value
}

amount.oninput = () => {
    let value = amount.value.replace(/\D/g,'')
    value = Number(value) /100
     amount.value = formatCurrencyBRL(value)
}

function expenseAdd(newExpense){
    try {
        
    //CRIANDO NOVO ELEMENTE LI PARA LISTA UL
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')
    expenseItem.textContent = newExpense.expense

    //ADICIONA ICONE SEGUNDO A CATEGORIA SELECIONADA
    const expenseIcon = document.createElement('img')
    expenseIcon.classList.add('expense-icon')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    
    
    //ADICIONA DETALHES DA LISTA
    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-info')
    
    const expenseName = document.createElement('strong')
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    const expenseAmount = document.createElement('span')
    expenseAmount.textContent = newExpense.amount
    expenseAmount.classList.add('expense-amount')

    expenseInfo.append(expenseName, expenseCategory, expenseAmount)
    
    //ADICIONA ICONE DE REMOVER
    const expenseRemove = document.createElement('img')
    expenseRemove.classList.add('remove-icon')
    expenseRemove.setAttribute('src', `img/remove.svg`)
    expenseRemove.setAttribute('alt', 'Remover')

    expenseRemove.addEventListener('click', ()=> {
        expenseItem.remove()
        updateTotals()
    })

        
    //ADICIONA NOVOS ITENS
    expenseItem.append(expenseIcon, expenseInfo, expenseRemove)

    list.append(expenseItem)
    
    //ATUALIZAR OS TOTAIS
        updateTotals()

    } catch (error) {
        alert('ERRO')
    }
}

function updateTotals(){
    try {
        const items = list.children
        expenseQuantity.textContent = 
        `${items.length}
         ${items.length > 1 ? 
        'despesas' : 'dispesa'} `

        //CALCULAR OS TOTAIS
        let total = 0

        for (let item = 0; item < items.length; item++) {
            const expenseAmount = items[item].querySelector('.expense-amount')

            if (expenseAmount) {
                let value = expenseAmount.textContent
                    .replace(/[^\d,]/g, '') // remove tudo que não for número ou vírgula
                    .replace(',', '.')      // troca vírgula por ponto

                value = parseFloat(value)

                if (!isNaN(value)) {
                    total += value
                }
            }
        }

        // Atualiza o total no HTML, formatado
        expenseTotal.textContent = formatCurrencyBRL(total)

    } 
    
    catch (error) {
        alert('Não foi possivel calcular os totais')
    }
}


