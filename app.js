class Customer {
    constructor(ie,date,name,amount) {
        this.ie = ie;
        this.date = date;
        this.name = name;
        this.amount = amount;
    }
}

var Expense = 0;
var Income = 0; 
var total = 0;
class UI {
  addCustomerToList(customer) {
    const list = document.getElementById('customer-list');
    // Create tr element
    const row = document.createElement('tr');
    row.id=`row_bg${total}`;
    // Insert cols
    row.innerHTML = `
      <td>${customer.ie}</td>
      <td>${customer.date}</td>
      <td>${customer.name}</td>
      <td>${customer.amount}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#customer-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deletecustomer(target) {

    // console.log(target);
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("myTextArea").value = '';
  }

  color_green() {
    document.getElementById(`row_bg${total}`).style = "background-color:green";
  }

  color_red(num) {
    document.getElementById(`row_bg${total}`).style = "background-color:red";
  }

  
}
  
// Event Listener for add customer
document.getElementById('customer-form').addEventListener('submit', function(e){

  myValue = document.getElementById("myTextArea").value;
  //Get the rows into array
  therows = myValue.split(" ");
  // Loop over all the rows
  var amoun = "";
  for (var row = 1; row < therows.length; row++) {
    total++;
    //getting columns of this row into an array
    var columns = therows[row].split(",");
    // console.log(columns.length);
    const ie = columns[0];
    const date=columns[1];
    const name=columns[2];
    const amount=columns[3];
    var exp = parseInt(amount);
    if (ie === "E") {
      Expense+=exp;
    }
    else Income+=exp;
    // console.log(exp);
    // Instantiate customer
    const customer = new Customer(ie, date, name,amount);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(ie === '' || date === '' || name === ''|| amount === '') {
      // Error alert
      ui.showAlert(`Please enter valid csv for row number ${row}`, 'error');

    } else {
      // Add customer to list
      ui.addCustomerToList(customer);
    }

    if (ie === "I") ui.color_green();
    else ui.color_red();

  }
  const ui = new UI();
  e.preventDefault();
  ui.clearFields();

  document.getElementById("total-expense").innerHTML =`<h3><br>Total Expenses: ${Expense}</h3>`;
  document.getElementById("total-income").innerHTML =`<h3><br>Total Income: ${Income}</h3>`;
});

// Event Listener for delete
document.getElementById('customer-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();
  
  // Delete customer
  ui.deletecustomer(e.target);

  // Show message
  ui.showAlert('customer Removed!', 'success');
  // console.log(e.target);
  e.preventDefault();

  document.getElementById("total-expense").innerHTML =`<h3><br>Total Expenses: ${Expense}</h3>`;
  document.getElementById("total-income").innerHTML =`<h3><br>Total Income: ${Income}</h3>`;


});

document.getElementById("total-expense").innerHTML =`<h3><br>Total Expenses: ${Expense}</h3>`;
document.getElementById("total-income").innerHTML =`<h3><br>Total Income: ${Income}</h3>`;
