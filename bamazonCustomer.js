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
    connection.end();
})

var displayStock = function() {
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(
                    'Item ID: ' + res[i].item_id + '\n' +
                    'Product: ' + res[i].product_name + '\n' +
                    'Price: $' + res[i].price + '\n'
                );
            };
        });
};