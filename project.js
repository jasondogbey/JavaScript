//deposit money
//how many lines
//collect a bet amount
//spin slot machine
//check if user won
//give the user their wins
//play again

const prompt = require("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2 
}

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

const spin = () => {
    const symbols = []
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol)
        }
    }

    const reels = []

    for (let i = 0; i < COLS; i++){
        reels.push([])
        const currentSymbols = [...symbols]
        for (let j = 0; j < ROWS; j++){
            const randomindex = Math.floor(Math.random() * currentSymbols.length)
            const selecetedSymbol = currentSymbols[randomindex]
            reels[i].push(selecetedSymbol)
            currentSymbols.splice(randomindex, 1)
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = []
    for (let i = 0; i < ROWS; i++){
        rows.push([])
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const display = (rows) => {
    for (const row of rows){
        let displayString = ""
        for (let i = 0; i < row.length; i++){
            displayString += row[i] 
            if (i != row.length - 1){
                displayString += " | "
            }
        }
        console.log(displayString)
    }
}

const checkWinnings = (rows, betPerLine, numberOfLines) => {
    let winnings = 0
    
    for (let row = 0; row < numberOfLines; row++){
        const symbols = rows[row]
        let allTheSame = true
        for (const symbol of symbols){
            if (symbols[0] != symbol){
                allTheSame = false
                break
            }
        }
        if (allTheSame){
            winnings += betPerLine * SYMBOL_VALUES[symbols[0]]
        }
    }
    
    return winnings
}

const game = () => {
    let balance = deposit()

    while(true){
    console.log("Your current balance is $" + balance)
    const numberOfLines = getNumberOfLines()
    const betPerLine = getBet(balance, numberOfLines)
    balance -= betPerLine * numberOfLines
    const reels = spin()
    const rows = transpose(reels)
    display(rows)
    const winnings = checkWinnings(rows, betPerLine, numberOfLines)
    console.log("You won, $" + winnings)
    balance += winnings

    if (balance <= 0){
        console.log("You've ran out of money.")
        break
    }

    const playAgain = prompt("Do you want to play again (y/n)? ")
    if (playAgain != "y") break
    }
}

game()