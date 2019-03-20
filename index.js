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

let balance = 500;//starting budget/balance to be set at the start of the web app, also sets the budget



function balance_func() { //keeps balance from having more than 2 digits after floating point
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
        // balance= parseInt(prompt('budget?'));
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


        //fetches the prices from expenses and stores them in a variable for each category
        const categories = this.weeks[counter].map( item => item.category);
        const prices = this.weeks[counter].map( item => item.price);
        let i = 0;

        for ( const element of categories){
            
            if(element === 'food'){
                food_spent += parseFloat(prices[i]);
            }

            if(element === 'entertainment'){
                enter_spent += parseFloat(prices[i]);
            }

            if(element === 'bills'){
                bills_spent += parseFloat(prices[i]);
            }

            if(element === 'clothing'){
                clothing_spent += parseFloat(prices[i]);
            }

            i++;
        }
        

        //appends and update the content of each category
        food_cat.className = 'cat';
        food_cat.innerHTML = `Food: $${food_spent.toFixed(2)}`;
        cat_div.appendChild(food_cat);

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
        

        const balanceHeader = document.createElement('h1');
        balanceHeader.innerHTML = `$${balance_func()}`;

        balance_div.appendChild(balanceHeader);
        
        main_div.appendChild(balance_div);

    
        let expenses = 0;

        //for loop that goes through every iteration to show each element in the main array
         for(let i = 0; i < this.weeks[counter].length; i++){  

            const item = this.weeks[counter][i];
            expenses += item.price;
            const expense = document.createElement('div');
            expense.className = ('expense');
        

            expense.innerHTML = `<p class = 'expense_element inline'>${item.name}</p> 
            <p class = 'expense_element inline'>$${item.price}</p> 
            `;

            const deleteIcon = document.createElement('i');
            
            deleteIcon.className = ('expense_element deleteIcon inline far fa-trash-alt');

            
            expenses_div.appendChild(expense);

            expense.appendChild(deleteIcon);


               
            deleteIcon.addEventListener('click', () =>{
            this.delete(i);
            this.display();
                });
        }
        this.displayBudget(balance - expenses);

        this.display_categories();
    }

    displayBudget = (remainingBudget) => { //displays fixed budget
        const budget_p = document.querySelector('.budget');
        
        budget_p.innerText = `$${remainingBudget}`;
        
        
        }

    delete(index){  //removes object from array when called and adds back balance
        
        
        balance += this.weeks[counter][index].price;
        
        this.weeks[counter].splice(index,1);
    }

} //Budgetplanner()



// Pop-up form for adding expenses

        const addButton = document.querySelector('.addButton');
        const main = document.querySelector('.main'); 
        const body = document.querySelector('body');
    
    
    addButton.addEventListener('click', () => {
      const newAdd = document.createElement('div');
      newAdd.className = 'fullPage';
      const div = document.createElement('div');
      div.innerHTML = ` 
      <form>
      <input name="entry name" type="text" placeholder="Entry Name"></input> <br></br>
      <input name="price" type="text" placeholder="Price"></input> <br></br>
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Entertainment</a>
      <a class="dropdown-item" href="#">Food</a>
      <a class="dropdown-item" href="#">Clothing</a>
      <a class="dropdown-item" href="#">Bills</a>
      </div>
      </div> <br></br>
      </form>
      `;
      
      const submitButton = document.createElement('button');
      submitButton.textContent = 'Add Item';
      submitButton.classList.add('btn', 'btn-secondary');
      newAdd.appendChild(div);
      div.appendChild(submitButton);
      body.appendChild(newAdd);


   // adds new form entry to the Expense array and removes the "new entry" popup
      submitButton.addEventListener('click', () => {
        body.removeChild(newAdd);
    });

    }); 

    

    


/*************************************** Display functions end *****************************************/


class Expense{
    constructor(name, price, category){
        this.name = name;
        this.price = price;
        this.category = category;
    
    }

}

const planner = new budgetPlanner();

planner.display();
planner.displayBudget(balance);
planner.changeWeeks();


