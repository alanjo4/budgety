// BUDGET CONTROLLER
var budgetController =  (function(){

    var Expense =  function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;    
    };

    var Income =  function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;    
    };

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;
            // Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else{
                ID = 0;
            }
            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            //Push it into our data structure
            data.allItems[type].push(newItem);
            // Return the new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    };

})();

var Expense =  function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;    
};

//UI CONTROLLER
var UIController = (function(){

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value, //Es valido para entrada o salida de expensas
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        addListItem: function (obj, type){
            // Create HTML string witch placeholder text
            var html, newHtml, element;

            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="income-&id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function(){
            var fields;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields);
        },

        getDOMStrings: function(){
            return DOMStrings;
        }
    };
})();


//GLOBAL APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl){
    var DOM = UIController.getDOMStrings();
    var setupEventListeners = function(){
            document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
            document.addEventListener('keypress', function(e){
            
            if(e.keyCode === 13 || event.whick === 13){
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function(){
        var input, newItem;
        //Get the field input data
        input = UICtrl.getInput();
        console.log(input);
        //Add the item to the budget controller
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);
        //Calculate de budget

        //Display the budget on the UI
    };

    return {
        init: function(){
            setupEventListeners();
        }
    };

})(budgetController, UIController);

appController.init();