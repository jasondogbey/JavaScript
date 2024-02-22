//deposit money
//how many lines
//collect a bet amount
//spin slot machine
//check if user won
//give the user their wins
//play again

const prompt = require("prompt-sync")();

const deposit = () => {
    while(true){
        const amount = prompt("How much would you like to deposit? $")
        numberDepositAmount = parseFloat(amount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid amount! Try again.")
        } else {
            return numberDepositAmount;
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("How many lines would you like to bet on (1-3)? ")
        numberLines = parseFloat(lines);
        if (isNaN(numberLines) || numberLines <= 0 || numberLines > 3){
            console.log("Invalid number of lines! Try again.")
        } else {
            return numberLines;
        }
    }
}

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("How much would you like to bet per line? ")
        numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet * lines > balance){
            console.log("Invalid bet amount! Your balance is $"+ balance +" Try again.")
        } else {
            return numberBet;
        }
    }
}


let balance = deposit()
const numberOfLines = getNumberOfLines()
const betPerLine = getBet(balance, numberOfLines)

console.log("Balance is $" + balance)
console.log("Number of lines is: " + numberOfLines)
console.log("Bet per line is: " + betPerLine)