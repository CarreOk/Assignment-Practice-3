// ─── Practice 1: Variables & Template Literals ───────────────────────────────

function greetUser() {
    const nameInput = document.getElementById("nameInput");
    const output = document.getElementById("greetOutput");
    const name = nameInput.value.trim();

    if (name === "") {
        output.textContent = "Please enter your name first!";
        return;
    }

    const hour = new Date().getHours();
    let timeOfDay;
    if (hour < 12) {
        timeOfDay = "morning";
    } else if (hour < 17) {
        timeOfDay = "afternoon";
    } else {
        timeOfDay = "evening";
    }

    output.textContent = `Good ${timeOfDay}, ${name}! Welcome to Assignment 3 practice.`;
}


// ─── Practice 2: Functions ────────────────────────────────────────────────────

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;
    const output = document.getElementById("calcOutput");

    if (isNaN(num1) || isNaN(num2)) {
        output.textContent = "Please enter two valid numbers.";
        return;
    }

    let result;
    let symbol;

    switch (operation) {
        case "add":
            result = add(num1, num2);
            symbol = "+";
            break;
        case "subtract":
            result = subtract(num1, num2);
            symbol = "−";
            break;
        case "multiply":
            result = multiply(num1, num2);
            symbol = "×";
            break;
        case "divide":
            if (num2 === 0) {
                output.textContent = "Cannot divide by zero!";
                return;
            }
            result = divide(num1, num2);
            symbol = "÷";
            break;
    }

    output.textContent = `${num1} ${symbol} ${num2} = ${result}`;
}


// ─── Practice 3: Arrays ──────────────────────────────────────────────────────

let itemList = [];

function renderList() {
    const output = document.getElementById("listOutput");
    if (itemList.length === 0) {
        output.textContent = "Your list is empty.";
    } else {
        output.textContent =
            `Items (${itemList.length}): ${itemList.join(", ")}`;
    }
}

function addToList() {
    const input = document.getElementById("listItem");
    const value = input.value.trim();
    if (value === "") return;
    itemList.push(value);
    input.value = "";
    renderList();
}

function removeLastItem() {
    if (itemList.length > 0) {
        const removed = itemList.pop();
        document.getElementById("listOutput").textContent =
            `Removed "${removed}". ` +
            (itemList.length > 0 ? `Remaining: ${itemList.join(", ")}` : "List is now empty.");
    }
}

function clearList() {
    itemList = [];
    renderList();
}


// ─── Practice 4: Loops ───────────────────────────────────────────────────────

function makeTable() {
    const num = parseInt(document.getElementById("tableNum").value, 10);
    const output = document.getElementById("tableOutput");

    if (isNaN(num) || num < 1 || num > 20) {
        output.textContent = "Please enter a number between 1 and 20.";
        return;
    }

    let table = "";
    for (let i = 1; i <= 10; i++) {
        table += `${num} × ${i} = ${num * i}\n`;
    }
    output.textContent = table.trim();
}


// ─── Practice 5: DOM Manipulation ────────────────────────────────────────────

const colors = [
    "rgba(210,123,247,0.5)",
    "rgba(252,192,71,0.5)",
    "rgba(91,204,162,0.5)",
    "rgba(163,233,247,0.5)"
];
let colorIndex = 3; // matches the initial box color (colors[3])

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    document.getElementById("styleBox").style.background = colors[colorIndex];
}

let enlarged = false;
function changeSize() {
    const box = document.getElementById("styleBox");
    enlarged = !enlarged;
    box.style.width = enlarged ? "300px" : "200px";
    box.style.height = enlarged ? "120px" : "80px";
    box.style.fontSize = enlarged ? "1.4em" : "1.1em";
}

function resetBox() {
    const box = document.getElementById("styleBox");
    box.style.background = "rgba(163,233,247,0.5)";
    box.style.width = "200px";
    box.style.height = "80px";
    box.style.fontSize = "1.1em";
    colorIndex = 3; // reset to initial color index
    enlarged = false;
}


// ─── Practice 6: Tic-Tac-Toe ─────────────────────────────────────────────────

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function buildGrid() {
    const grid = document.getElementById("tttGrid");
    grid.innerHTML = "";
    board.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("ttt-cell");
        if (value) {
            cell.textContent = value;
            cell.classList.add("taken");
        }
        cell.addEventListener("click", () => handleCellClick(index));
        grid.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (gameOver || board[index] !== null) return;

    board[index] = currentPlayer;
    buildGrid();

    const winner = checkWinner();
    const statusEl = document.getElementById("ttt-status");

    if (winner) {
        statusEl.textContent = `Player ${winner} wins! 🎉`;
        gameOver = true;
    } else if (board.every(cell => cell !== null)) {
        statusEl.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    for (const [a, b, c] of winningCombos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    document.getElementById("ttt-status").textContent = "Player X's turn";
    buildGrid();
}

// Initialise the grid on page load
buildGrid();
