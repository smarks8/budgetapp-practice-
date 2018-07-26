//BUDGET CONTROLLER
var budgetController = (function(){

})();




//UI CONTROLLER
var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'

  }

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
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
    //get the field input data
    var input = UICtrl.getInput();

    //add item to budget controller
    //add item to UI
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