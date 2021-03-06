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
                addInventory();
                break;
            case 'Add New Product':
                addNew();
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

// Populates an array with item names when given a sql response ob/ar
var itemPopulate = function(response) {
    var localArray = [];
    for (var i = 0; i < response.length; i++) {
        localArray.push(response[i].product_name);
    };
    return localArray;
};

// Prompts user for item that needs to be ordered and asks for quantity
var addInventory = function() {
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'to-order',
                    message: 'What item would you like to re-stock?',
                    choices: itemPopulate(res)
                }
            ]).then( answers => {
                console.log(answers);
            });
        }
    );
    connection.end();
};

var addNew = function() {
    inquirer
    .prompt([
        {
            name: 'product_name_add',
            message: 'What is the name of the product?',
        },
        {
            name: 'department_name_add',
            message: 'What department is the product sold under?'
        },
        {
            name: 'price_name_add',
            message: 'How much does one quantity of the item cost?'
        },
        {
            name: 'quantity_name_add',
            message: 'How many of this item are in our stocks?'
        }
    ]).then( answers => {
        var addQuery = 
            "INSERT INTO products (product_name, department_name, " +
            "price, stock_quantity) VALUES (?, ?, ?, ?)";
        var toAdd = [
            answers.product_name_add,
            answers.department_name_add,
            parseFloat(answers.price_name_add),
            parseInt(answers.quantity_name_add)
        ];
        connection.query(addQuery, toAdd, (err, res) => {
            if (err) throw err;
            console.log(
                'Item has been added! Item ID is: ' + res.insertId);
        });
        connection.end();
    });
};