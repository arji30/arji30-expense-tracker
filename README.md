# Expense-Tracker
_Stackup bounty project - Expense Tracker_
#### Project
This is a website written using html, css and vanilla JS. It offers a user-friendly interface for tracking expenses and earnings while demonstrating the use of classes, switch-case blocks, and try-catch statements for efficient data management and error handling.<br> 
It is hosted using firebase at https://arji30-expense-tracker.web.app/
## How It Works

### 1. Class-Based Structure

**Transaction Class**: In the project, we employ the `Transaction` class to represent individual financial transactions. This class handles all the essential transaction details like transaction type, amount , date, etc., making it easier to work with transaction data.

**ExpenseTracker Class**: The core functionality of the application is managed by the `ExpenseTracker` class. This class handles data storage, transaction management, and user interface updates using different functions. Transactions are rendered inside the `li` element in the html. New entries are saved to localStorage so that it will be rendered even after page refreshes. Current date is added with the transactions for identification of the user.

### 2. Switch-Case Blocks

**Transaction Type Handling**: When users add a new transaction, a switch-case block is utilized to determine its type (expense or earning). This mechanism ensures that transactions are accurately categorized based on user input. A default case handles any transaction which is not of these two types(can happen when the user is editing the type field later)

**Dynamic UI Updates**: Depending on the transaction type, the switch-case block dynamically updates the user interface to reflect the changes in expenses or earnings, providing real-time feedback.

### 3. Error Handling with Try-Catch Statements

**Data Validation**: Try-catch statements are employed to validate user input and handle potential errors gracefully. In case of empty input for amount or description fields, transaction is deemed invalid , same for an amount input which is not a number.

**Error Messages**: In case of errors, informative error messages are displayed to users, improving the overall user experience and aiding in problem resolution. While editing or adding a transaction, real time error messages are shown as alerts in case any data entered is invalid or any error occurs while handling the transaction.


## Website
The website has a clean user interface with only the very necessary elements.<br>
The Total Expense , the Total Earnings and the Net Balance are displayed and updated in real time. <br>
Users can add a new transaction by entering the amount(which accepts only numbers), the description and the type of transaction(currently only earning and expense type) and clicking on the add button. <br>
Transactions are shown as a list with all the information displayed with an edit or delete button underneath each transaction. <br>
Edit button produces a series of prompt alerts to input all the fields again, validation is done so that invalid data will not process. <br>
On clicking delete button, an alert box asking for confirmation is produced, which on confirmation deletes the transaction.<br>
Local storage is used to store the transaction so the data persists even after leaving the page<br>
