class Transaction {
    constructor(type, amount, description) {
      this.type = type; // Transaction type (expense or earning)
      this.amount = amount; // Transaction amount
      this.description = description; // Transaction description
      this.date = new Date().toLocaleDateString(); // Set the current date
    }
  }
  
  class ExpenseTracker {
    constructor() {
      // Load transactions from local storage or initialize an empty array
      this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    }
  
    saveTransactions() {
      // Save transactions to local storage
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }
  
    calculateTotal(type) {
      // Calculate the total for a given transaction type (expense or earning)
      return this.transactions
        .filter((transaction) => transaction.type === type)
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
        .toFixed(2);
    }
  
    addTransaction(type, amount, description) {
      try {
        switch (type) {
          case "expense":
          case "earning":
            if (!amount || !description) {
              throw new Error("Amount and description cannot be empty.");
            }
            const transaction = new Transaction(type, amount, description);
            this.transactions.push(transaction); // Add the new transaction
            this.saveTransactions(); // Save transactions to local storage
            this.updateSummary(); // Update the summary section
            this.renderTransactions(); // Render the transaction list
            break;
          default:
            throw new Error("Invalid transaction type.");
        }
      } catch (error) {
        console.error("Error adding transaction:", error);
        alert(error.message); // Show an alert with the error message
      } finally {
        // Clear input fields after adding a transaction
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
      }
    }
  
    editTransaction(index, type, amount, description) {
      try {
        switch (type) {
          case "expense":
          case "earning":
            if (!amount || !description) {
              throw new Error("Amount and description cannot be empty.");
            }
            if (index >= 0 && index < this.transactions.length) {
              // Update the transaction at the specified index
              this.transactions[index].type = type;
              let editedAmount = parseFloat(amount);
              if (isNaN(editedAmount)) {
                throw new Error("Invalid Amount.");
              } else {
                this.transactions[index].amount = editedAmount;
              }
              this.transactions[index].description = description;
              this.saveTransactions(); // Save updated transactions
              this.updateSummary(); // Update the summary section
              this.renderTransactions(); // Render the transaction list
            } else {
              throw new Error("Invalid index for editing transaction.");
            }
            break;
          default:
            throw new Error("Invalid transaction type.");
        }
      } catch (error) {
        console.error("Error editing transaction:", error);
        alert(error.message); // Show an alert with the error message
      } finally {
        // Clear input fields after editing a transaction
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
      }
    }
  
    deleteTransaction(index) {
      try {
        if (index >= 0 && index < this.transactions.length) {
          // Remove the transaction at the specified index
          this.transactions.splice(index, 1);
          this.saveTransactions(); // Save updated transactions
          this.updateSummary(); // Update the summary section
          this.renderTransactions(); // Render the transaction list
        } else {
          throw new Error("Invalid index for deleting transaction.");
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  
    updateSummary() {
      // Update the summary section with total expense, total earnings, and net balance
      const totalExpenseElement = document.getElementById("totalExpense");
      const totalEarningsElement = document.getElementById("totalEarnings");
      const netBalanceElement = document.getElementById("netBalance");
  
      const totalExpense = this.calculateTotal("expense");
      const totalEarnings = this.calculateTotal("earning");
      const netBalance = (totalEarnings - totalExpense).toFixed(2);
  
      totalExpenseElement.textContent = totalExpense;
      totalEarningsElement.textContent = totalEarnings;
      netBalanceElement.textContent = netBalance;
    }
  
    renderTransactions() {
      // Render the list of transactions
      const transactionList = document.getElementById("transactionList");
      transactionList.innerHTML = "";
  
      this.transactions.forEach((transaction, index) => {
        // Create a list item for each transaction
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <span>Type: ${transaction.type}</span>
          <span>Amount: $${transaction.amount}</span>
          <span>Description: ${transaction.description}</span>
          <span>Date: ${transaction.date}</span>
          <button onclick="editTransaction(${index})">Edit</button>
          <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(listItem);
      });
    }
  }
  
  const expenseTracker = new ExpenseTracker();
  
  function addTransaction() {
    // Get input values for adding a new transaction
    const amountInput = document.getElementById("amount");
    const descriptionInput = document.getElementById("description");
    const transactionTypeInput = document.getElementById("transactionType");
  
    const amount = amountInput.value;
    const description = descriptionInput.value;
    const transactionType = transactionTypeInput.value;
  
    if (!amount || !description) {
      alert("Amount and description cannot be empty.");
      return;
    }
  
    expenseTracker.addTransaction(transactionType, amount, description);
  }
  
  function editTransaction(index) {
    // Prompt the user for new values to edit a transaction
    const transaction = expenseTracker.transactions[index];
    const newType = prompt("Edit Type:", transaction.type);
    const newAmount = prompt("Edit Amount:", transaction.amount);
    const newDescription = prompt("Edit Description:", transaction.description);
  
    expenseTracker.editTransaction(index, newType, newAmount, newDescription);
  }
  
  function deleteTransaction(index) {
    // Confirm and delete a transaction
    if (confirm("Are you sure you want to delete this transaction?")) {
      expenseTracker.deleteTransaction(index);
    }
  }
  
  // Initialize the app by updating the summary and rendering transactions
  expenseTracker.updateSummary();
  expenseTracker.renderTransactions();
  