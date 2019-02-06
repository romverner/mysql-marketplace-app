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
    displayStock();
    // connection.end();
});

// Displays current inventory and prompts users for input synchronously
var displayStock = function() {
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(
                    '\nItem ID: ' + res[i].item_id +
                    '  ||  Product: ' + res[i].product_name +
                    '  ||  Price: $' + res[i].price + '\n'
                );
            };
            if (res) {
                // Once a response is acquired, prompt user for input
                orderPrompt();
            };
        });
};

// Prompts user for desired item and quantity
var orderPrompt = function() {
    inquirer
        .prompt([
            {
                name: 'item_id',
                message: ('What is the item ID of the product ' +
                          'you would like to purchase?')
            }, 
            {
                name: 'quantity',
                message: ('In what quantity would you like to ' +
                          'purchase that item?')
            }
        ]) 
        .then(answers => {
            console.log("Let's see if that item is in stock... ");
            checkQuant(answers);
        });
};

// Checks quantity of item that is input as argument
var checkQuant = function(answers) {
    connection.query(
        ("SELECT stock_quantity" +
        " FROM products WHERE item_id = " + answers.item_id), 
        (err, res) => {
            if (err) throw err;
            if (res[0].stock_quantity >= parseInt(answers.quantity)) {
                var newQ = (res[0].stock_quantity 
                    - parseInt(answers.quantity));

                console.log('That item is in stock!');
                updateQuant(newQ, answers.item_id, answers.quantity);
            } else {
                console.log('Sorry, that item is out of stock!');
            };
        });
};

// Updates quantity of ordered items
var updateQuant = function(newQuant, item_id, desiredQuant) {
    connection.query(
        ("UPDATE products SET stock_quantity = " + newQuant +
        " WHERE item_id = " + item_id), 
        (err, res) => {
            if (err) throw err;
            // console.log(res.affectedRows); Should always be '1'
            checkout(item_id, desiredQuant);
        });
};

// Shows the amount owed on the product
var checkout = function(item_id, desiredQuant) {
    connection.query(
        "SELECT price FROM products WHERE item_id = " + item_id,
        (err, res) => {
            if (err) throw err;
            var total = (parseFloat(desiredQuant) 
            * parseFloat(res[0].price));
            console.log(
                'You owe: $' + total +
                '\nThank you for your business! Have a nice day!'
            );
        });
    connection.end();
};