const budget_div = document.querySelector('.budget_div');
const main_div = document.querySelector('.main');
const expenses_div = document.querySelector('.expensesDiv');
const cat_div = document.querySelector('.cat_div');
const rightIcon = document.querySelector('.right');
const leftIcon = document.querySelector('.left');
const week_paragraph = document.querySelector('.arrows p');
const balanceHeader = document.createElement('p');
const total_expenses = document.querySelector('.total_expenses')
const total_cats = document.querySelector('.total_cats')


const food_cat = document.createElement('p');
const enter_cat = document.createElement('p');
const bills_cat = document.createElement('p');
const clothing_cat = document.createElement('p');

let counter = 0; //determintes weeks

let budget = 0;
let balance = 0;//starting budget/balance to be set at the start of the web app, also sets the budget


function balance_func() { //keeps balance from having more than 2 digits after floating point
    return parseFloat(balance).toFixed(2);
}


class budgetPlanner{
    constructor(){

        this.weeks = [

        this.expenses1 = [ //main array containing the expenses 
            new Expense('Sandwich', 5.99, 'food'),
            new Expense('Movie', 11.99, 'entertainment'),
            new Expense('Car payment', 49.56, 'bills'),
            new Expense('Jeans', 45.49, 'clothing'),
            new Expense('Netflix', 12.99, 'entertainment'),
            new Expense('Electricity', 32.56, 'bills'),
            new Expense('Bikini', 30.43, 'clothing'),
            new Expense('Orange', 1.24, 'food'),
            new Expense('Sushi', 133.24, 'food'),
        ],

        this.expense2 = [
            new Expense('Socks', 8.98, 'clothing'),
            new Expense('PC', 245, 'entertainment'),
            new Expense('Juice', 34.98, 'food'),
            new Expense('Gas', 45.98, 'bills'),
        ],

        this.expense3 = [
            new Expense('underwear', 120, 'clothing'),
            new Expense('Videogame', 85, 'entertainment'),
            new Expense('Donuts', 67.98, 'food'),
            new Expense('Gym', 66.98, 'bills'),
            
        ],

        this.expense4 = [
            new Expense('Jacket', 21.48, 'clothing'),
            new Expense('TV', 99, 'entertainment'),
            new Expense('Soup', 12.98, 'food'),
            new Expense('Electric Bill', 35.98, 'bills'),
            
        ]


        ];
    }

/*************************************** Display functions start *****************************************/

changeWeeks(){ //toggles between the arrays to change weeks
    rightIcon.addEventListener( 'click', () => {

        //checks if the week counter is higher than the quantity of weeks available and sets the counter to show the first week
        if(counter >= this.weeks[counter].length - 1){ 
            counter = -1;
        }
        
        counter++;
        console.log(counter);
        week_paragraph.innerText = `Week ${counter + 1}`;
        balance_func();
        this.display();

        
    });

    leftIcon.addEventListener( 'click', () => {

        //checks if the week counter is lower than the quantity of weeks available and resets the counter to the target the last week
        if(counter <= 0){
            counter = this.weeks.length;
        }
        
        counter--;
        week_paragraph.innerText = `Week ${counter + 1}`;
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
        food_cat.innerHTML = `<span><i class=" food_icon cat_icon fas fa-utensils"></i>Food: </span><span>$${food_spent.toFixed(2)}</span>`;
        cat_div.appendChild(food_cat);

        enter_cat.className = 'cat';
        enter_cat.innerHTML = `<span><i class="enter_icon cat_icon fas fa-tv"></i>Entertainment: </span> <span>$${enter_spent.toFixed(2)}</span>`;
        cat_div.appendChild(enter_cat);

        bills_cat.className = 'cat';
        bills_cat.innerHTML = `<span><i class="bills_icon cat_icon fas fa-gas-pump"></i>Bills:</span> <span>$${bills_spent.toFixed(2)}</span>`;
        cat_div.appendChild(bills_cat);

        clothing_cat.className = 'cat';
        clothing_cat.innerHTML = `<span><i class="clothing_icon cat_icon fas fa-tshirt"></i>Clothing: </span><span>$${clothing_spent.toFixed(2)}</span>`;
        cat_div.appendChild(clothing_cat);


        
    }
    
    display(){ //displays expenses
        budget_div.innerHTML= '';
        expenses_div.innerHTML = '';
        
        budget = parseFloat(budget);
        balanceHeader.classList.add('budget_num')
        balanceHeader.innerHTML = `$${budget.toFixed(2)}`;

        budget_div.appendChild(balanceHeader);
        
        
       

    
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

            if(item.category === 'food'){
                expense.classList.add('food_color');
            }

            if(item.category === 'entertainment'){
                expense.classList.add('enter_color');
            }

            if(item.category === 'bills'){
                expense.classList.add('bills_color');
            }

            if(item.category === 'clothing'){
                expense.classList.add('clothing_color');
            }

            const deleteIcon = document.createElement('i');
            
            deleteIcon.className = ('expense_element inline far fa-trash-alt deleteIcon');

            expenses_div.appendChild(expense);

            expense.appendChild(deleteIcon);


               
            deleteIcon.addEventListener('click', () =>{
            this.delete(i);
            this.display();
                });
        }
        balance = parseFloat(balanceHeader.innerText.replace('$', ""));
        this.displayBudget(balance - expenses);
        expenses = parseFloat(expenses);
        total_expenses.innerHTML = `Total $${expenses.toFixed(2)}`;
        total_cats.innerHTML = `Total $${expenses.toFixed(2)}`;

        
        
        

        this.display_categories();
    }

    displayBudget = (remainingBudget) => { //displays fixed budget
        const budget_p = document.querySelector('.budget');
        
        budget_p.innerText = `$${parseFloat(remainingBudget.toFixed(2))}`;
        

        balance = parseFloat(remainingBudget.toFixed(2));



        
        
        
    }

    delete(index){  //removes object from array when called and adds back balance
        
        if(typeof balance === 'number'){
        balance = balance.toString();
        } 

        if (balance.includes('$')){
        balance = parseFloat(balance.replace('$', ''));
        } 

        if (typeof balance === 'string'){
            balance = parseFloat(balance);
        }
        console.log(balance);
        console.log( typeof balance);
        console.log(this.weeks[counter][index].price);

        balance += this.weeks[counter][index].price;

        console.log(balance);

        
        this.weeks[counter].splice(index,1);
    }

    updateBudget(){
        budget_div.addEventListener('blur', () => {
            budget = balanceHeader.innerText;
            budget = budget.replace('$', '');
            this.displayBudget(parseFloat(budget, 10));
            balance = balanceHeader.innerText;
            
            
            
        });

    const addButton = document.querySelector('.add_button');
    const popup = document.querySelector('.popup_location'); 

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
    popup.appendChild(newAdd);

    // adds new form entry to the Expense array and removes the "new entry" popup
    // needs to connect to George's code
    submitButton.addEventListener('click', () => {
    popup.removeChild(newAdd);
    });
    }); 

    }

    

    
}

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
planner.updateBudget();
