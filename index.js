const leftover_div = document.querySelector('.leftover-div');
const main_div = document.querySelector('.main');
const expenses_div = document.querySelector('.expensesDiv');
const budget_div = document.querySelector('.budget_div');

let budget_value = 500;

function budget_valueF() {
    return budget_value.toFixed(2);
}


class budgetPlanner{
    constructor(){
        this.expenses = [
            new Expense('Sandwich', 5.99, 'Food'),
            new Expense('Movie', 11.99, 'Entertainment'),
            new Expense('Car monthly payment', 49.56, 'Bills')
            
        ];
    }
    
    display(){
        leftover_div.innerHTML= '';
        expenses_div.innerHTML = '';
        

        const budget = document.createElement('h1');
        budget.innerHTML = `$${budget_valueF()}`;

        leftover_div.appendChild(budget);
        
        main_div.appendChild(leftover_div);

        



        for(let i = 0; i < this.expenses.length; i++){

            const item = this.expenses[i];

            const expense = document.createElement('div');
            expense.className = ('expense');
        

            expense.innerHTML = `<p class = 'inline'>${item.name}</p> 
            <p class = 'inline'>$${item.price}</p> 
            `;

            const deleteIcon = document.createElement('i');
            
            deleteIcon.className = ('deleteIcon inline far fa-trash-alt');

            
            expenses_div.appendChild(expense);

            expense.appendChild(deleteIcon);


               
            deleteIcon.addEventListener('click', () =>{
            this.delete(i);
            this.display();
                });
        }
    }

    displayBudget = () => {
        const budget_p = document.createElement('p');
        
        budget_p.innerText = `$${budget_value}`;
        
        main_div.appendChild(budget_p);
        
        }

    delete(index){
        
        
        budget_value += this.expenses[index].price;
        
        this.expenses.splice(index,1);
    }
}

class Expense{
    constructor(name, price, category){
        this.name = name;
        this.price = price;
        this.category = category;
    
    }

}

const planner = new budgetPlanner();

planner.display();
planner.displayBudget();