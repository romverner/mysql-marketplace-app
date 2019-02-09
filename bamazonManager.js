var inquirer = require('inquirer');
var mysql    = require('mysql');

var connection = mysql.createConnection({
    host        :   'localhost',
    port        :   '3306',
    user        :   'root',
    password    :   'password',
    database    :   'bamazon'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId);
    displayActions();
    connection.end();
});

var displayActions = function() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add Inventory',
                'Add New Product'
            ]
        }
    ])
    .then(answers => {
        // Interpret answers as case switches 
        console.log(answers.action);

        switch(answers) {
            case 'View Products for Sale':
                // displayProducts();
                break;
            case 'View Low Inventory':
                // displayLow();
                break;
            case 'Add Inventory':
                // addInventory();
                break;
            case 'Add New Product':
                // addNew();
                break;
        };
    });
};