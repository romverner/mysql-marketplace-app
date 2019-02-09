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
        switch(answers.action) {
            case 'View Products for Sale':
                displayProducts();
                break;
            case 'View Low Inventory':
                displayLow();
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

// Displays all products currently for sale
var displayProducts = function() {
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err;
            for (var i =  0; i < res.length; i++) {
                console.log(
                    '\nItem ID:', res[i].item_id,
                    '  ||  Product:', res[i].product_name,
                    '  ||  Price: $', res[i].price,
                    '  ||  Quantity:', res[i].stock_quantity, '\n'
                );
            };
        }
    );
    connection.end();
};

var displayLow = function() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity <= 5", 
        (err, res) => {
            if (err) throw err;
            for (var i =  0; i < res.length; i++) {
                console.log(
                    '\nItem ID:', res[i].item_id,
                    '  ||  Product:', res[i].product_name,
                    '  ||  Price: $', res[i].price,
                    '  ||  Quantity:', res[i].stock_quantity, '\n'
                );
            };
        }
    );
    connection.end();
};