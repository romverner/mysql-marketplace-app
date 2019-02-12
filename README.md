# MySQL Marketplace App

This app is run entirely through a terminal and uses Node along with
a few packages. There are two 'views' for the marketplace -- a customer
view and a manager view. To see the manager view, run the 
'bamazonManager.js' script through node. Otherwise use the
'bamazonCustomer.js' script to simulate purchases as a customer. All
actions will update the database/table. The database must be created 
prior to running either file -- using MySQL in this instance.

## Getting Started

To get this app working you'll need to follow some fairly easy steps:
1. Clone to repo to your destination of choice.
2. In the same directory, run the command 'npm i' to install required pacakges
3. Create a database via MySQL and name it 'bamazon' (NOTE: An sql shema file is included, if you're just testing this code, feel free to simply run that schema file and you'll have an auto-populated database of a few items that can be used for testing the app).
4. Change the password in the config variable of each '.js' file to match your local password on your computer.

This app uses inquirer to prompt users for actions. No custom input is necessary to access functionality.

### Authors
Roman Verner

### License
Creative Commons

### Acknowledgements
Our class instructor Quincy, the TA's, and my classmates. Thanks!