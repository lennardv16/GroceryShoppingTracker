// Import the readline module for handling user input in the console
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

// Initialize an empty shopping list
const shoppingList = [];

// Function to display the shopping list
function displayItems() {
  console.log('***Grocery Shopping List***');
  shoppingList.forEach((item, index) => {
    console.log(`Item ${index + 1}:`);
    console.log(`Name: ${item.name}`);
    console.log(`Quantity: ${item.quantity}`);
    console.log(`Price: $${item.price}`);
    console.log(`Bought: ${item.bought ? 'Yes' : 'No'}`);
    console.log('***************************');
  });
  mainMenu();
}

// Function to add an item to the shopping list
function addItems() {
  rl.question('Enter the name of the item: ', (name) => {
    rl.question('Enter the quantity: ', (quantity) => {
      rl.question('Enter the price per item: ', (price) => {
        shoppingList.push({
          name,
          quantity: Number(quantity),
          price: Number(price),
          bought: false, // Initialize as not bought
        });
        console.log('Item added to the shopping list.');
        mainMenu();
      });
    });
  });
}

// Function to remove an item from the shopping list
function removeItems() {
  if (shoppingList.length === 0) {
    console.log('The shopping list is empty.');
    mainMenu();
    return;
  }

  rl.question('Enter the index of the item to remove: ', (index) => {
    if (index >= 0 && index <= shoppingList.length) {
      const removedItem = shoppingList.splice(index - 1, 1);
      console.log(`Removed item: ${removedItem[0].name}`);
    } else {
      console.log('Invalid item index. No items were removed.');
    }
    mainMenu();
  });
}

// Function to mark an item as bought
function isBought() {
  if (shoppingList.length === 0) {
    console.log('The shopping list is empty.');
    mainMenu();
    return;
  }

  rl.question('Enter the index of the item to mark as bought: ', (index) => {
    if (index >= 0 && index <= shoppingList.length) {
      shoppingList[index - 1].bought = true;
      console.log(`Marked item as bought: ${shoppingList[index - 1].name}`);
    } else {
      console.log('Invalid item index. No items were marked as bought.');
    }
    mainMenu();
  });
}

// Main menu for user interaction
function mainMenu() {
  rl.question(
    "What would you like to do?\n1) Display Shopping List\n2) Add Item to Shopping List\n3) Remove Item from Shopping List\n4) Mark Item as Bought\n5) Exit\n",
    (choice) => {
      switch (choice) {
        case '1':
          displayItems();
          break;
        case '2':
          addItems();
          break;
        case '3':
          removeItems();
          break;
        case '4':
          isBought();
          break;
        case '5':
          console.log('Goodbye!');
          rl.close();
          break;
        default:
          console.log('Invalid choice. Please select a valid option.');
          mainMenu();
          break;
      }
    }
  );
}

// Start the application by displaying the main menu
mainMenu();