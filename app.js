//BUDGET CONTROLLER
var budgetController = (function(){

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  };

  return{
    addItem: function(type, des, val){
      var newItem, ID;

      //create new id
      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create new item based on 'inc' or 'exp' type
      if(type === 'expense'){
        newItem = new Expense(ID, des, val);
      } else if(type === 'income'){
        newItem = new Income(ID, des, val);
      }

      //push to data structure
      data.allItems[type].push(newItem);

      //return new element
      return newItem;
    }
  };



})();

//UI CONTROLLER
var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'

  }

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function(obj, type){
      var html, newHtml, element;
      //create html string w placeholder text
      console.log(obj.value);

      if(type === 'income'){
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div>
        </div>`
      } else if(type === 'expense'){
        element = DOMstrings.expensesContainer;

        html = `<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div>
        </div>`
      }

      //replace placeholder w actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //insert html into dom
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

    },

    clearFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();
    },

    getDOMstrings: function(){
      return DOMstrings;
    }
  };

})();




//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

  var setupEventListeners = function(){
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function(){
    var input, newItem;

    //get the field input data
    input = UICtrl.getInput();

    //add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //add item to UI
    UICtrl.addListItem(newItem, input.type);

    // clear fields
    UICtrl.clearFields();

    // calc budget
    //display budget

  };

  return {
    init: function(){
      console.log('app has start');
      setupEventListeners();
    }
  };

})(budgetController, UIController)

controller.init();
