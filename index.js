const balance_div = document.querySelector('.balance-div');
const main_div = document.querySelector('.main');
const expenses_div = document.querySelector('.expensesDiv');
const budget_div = document.querySelector('.budget_div');
const cat_div = document.querySelector('.cat_div');
const rightIcon = document.querySelector('.right');
const leftIcon = document.querySelector('.left');

const food_cat = document.createElement('p');
const enter_cat = document.createElement('p');
const bills_cat = document.createElement('p');
const clothing_cat = document.createElement('p');

let counter = 0; //determintes weeks

let balance = 0;//starting budget/balance to be set at the start of the web app, also sets the budget
const testVariable = 'test';

function balance_func() {
  //keeps balance from having more than 2 digits after floating point
  return balance.toFixed(2);
}


class budgetPlanner{
    constructor(){

        this.weeks = [

        this.expenses1 = [ //main array containing the expenses 
            new Expense('Sandwich', 5.99, 'food'),
            new Expense('Movie', 11.99, 'entertainment'),
            new Expense('Car monthly payment', 49.56, 'bills'),
            new Expense('Jeans', 45.49, 'clothing'),
            new Expense('Netflix', 12.99, 'entertainment'),
            new Expense('Electricity', 32.56, 'bills'),
            new Expense('Bikini', 30.43, 'clothing'),
            new Expense('Orange', 1.24, 'food'),
            new Expense('Sushi', 133.24, 'food'),
            // balance = parseInt(prompt('budget?'))
        ],

        this.expense2 = [
            new Expense('Socks', 8.98, 'clothing'),
            new Expense('PC', 8245, 'entertainment'),
            new Expense('Juice', 34.98, 'food'),
            new Expense('Gas', 45.98, 'bills'),
            // balance = parseInt(prompt('budget?'))
        ],

        this.expense3 = [
            new Expense('underwear', 120, 'clothing'),
            new Expense('Videogame', 825, 'entertainment'),
            new Expense('Donuts', 67.98, 'food'),
            new Expense('Gym', 66.98, 'bills'),
            // balance = parseInt(prompt('budget?'))
            
        ]

        ];
    }

/*************************************** Display functions start *****************************************/

changeWeeks(){ //toggles between the arrays to change weeks
    rightIcon.addEventListener( 'click', () => {
        counter++;
        console.log(counter);
        balance= parseInt(prompt('budget?'));
        balance_func();
        this.display();
    });

    leftIcon.addEventListener( 'click', () => {
        counter--;
        console.log(counter);
        this.display();

    });

}

    display_categories(){ //displays money spent in each category
        food_cat.innerHTML = '';        
        enter_cat.innerHTML = '';        
        bills_cat.innerHTML = '';        
        clothing_cat.innerHTML = '';        
        
        let food_spent = 0;
        let enter_spent = 0;
        let bills_spent = 0 ;
        let clothing_spent = 0;

    enter_cat.className = 'cat';
    enter_cat.innerHTML = `Entertainment: $${enter_spent.toFixed(2)}`;
    cat_div.appendChild(enter_cat);

        //fetches the prices from expenses and stores them in a variable for each category
        const categories = this.weeks[counter].map( item => item.category);
        const prices = this.weeks[counter].map( item => item.price);
        let i = 0;

    clothing_cat.className = 'cat';
    clothing_cat.innerHTML = `Clothing: $${clothing_spent.toFixed(2)}`;
    cat_div.appendChild(clothing_cat);

    console.log(food_spent);
    console.log(enter_spent);
    console.log(bills_spent);
    console.log(clothing_spent);
  }

  display() {
    //displays expenses
    balance_div.innerHTML = '';
    expenses_div.innerHTML = '';

    const balance = document.createElement('h1');
    balance.innerHTML = `$${balance_func()}`;

    balance_div.appendChild(balance);

    main_div.appendChild(balance_div);

        enter_cat.className = 'cat';
        enter_cat.innerHTML = `Entertainment: $${enter_spent.toFixed(2)}`;
        cat_div.appendChild(enter_cat);

        bills_cat.className = 'cat';
        bills_cat.innerHTML = `Bills: $${bills_spent.toFixed(2)}`;
        cat_div.appendChild(bills_cat);

        clothing_cat.className = 'cat';
        clothing_cat.innerHTML = `Clothing: $${clothing_spent.toFixed(2)}`;
        cat_div.appendChild(clothing_cat);


        
    }
    
    display(){ //displays expenses
        balance_div.innerHTML= '';
        expenses_div.innerHTML = '';
        

      const expense = document.createElement('div');
      expense.className = 'expense';

      expense.innerHTML = `<p class = 'expense_element inline'>${item.name}</p> 
            <p class = 'expense_element inline'>$${item.price}</p> 
            `;

    

      deleteIcon.className =
        'expense_element deleteIcon inline far fa-trash-alt';

        //for loop that goes through every iteration to show each element in the main array
         for(let i = 0; i < this.weeks[counter].length; i++){  
            const item = this.weeks[counter][i];

      expense.appendChild(deleteIcon);

      deleteIcon.addEventListener('click', () => {
        this.delete(i);
        this.display();
      });
    }

    this.display_categories();
  }

  displayBudget = () => {
    //displays fixed budget
    const budget_p = document.createElement('p');

    budget_p.innerText = `$${balance}`;

    main_div.appendChild(budget_p);
  };

  delete(index) {
    //removes object from array when called and adds back balance

    balance += this.expenses[index].price;

    displayBudget = () => { //displays fixed budget
        const budget_p = document.createElement('p');
        
        budget_p.innerText = `$${balance}`;
        
        main_div.appendChild(budget_p);
        
        }

    delete(index){  //removes object from array when called and adds back balance
        
        
        balance += this.weeks[counter][index].price;
        
        this.weeks[counter].splice(index,1);
    }

    
}

/*************************************** Display functions end *****************************************/

class Expense {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}

const planner = new budgetPlanner();

planner.display();
planner.displayBudget();
planner.changeWeeks();