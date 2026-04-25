// script.js
// Calculator class encapsulating state and operations for the simple calculator UI.

class Calculator {
    constructor() {
        // The string currently being entered (e.g., "12" or "3.14")
        this.currentInput = '';
        // The stored numeric value before an operator is pressed
        this.previousValue = null;
        // The pending operator ("+", "-", "*", "/")
        this.operator = null;
        // Flag indicating that the last action was an evaluation ("=")
        this.justEvaluated = false;
        this.updateDisplay();
    }

    // Helper to get the display element
    get displayElement() {
        return document.getElementById('display');
    }

    // Update the #display element based on the current state
    updateDisplay() {
        const el = this.displayElement;
        if (!el) return;
        if (this.currentInput !== '') {
            el.textContent = this.currentInput;
        } else if (this.previousValue !== null) {
            // Show previous value when there is no current input
            el.textContent = String(this.previousValue);
        } else {
            el.textContent = '0';
        }
    }

    // Append a numeric digit (0‑9) to the current input
    appendDigit(digit) {
        if (this.justEvaluated) {
            // Starting a new entry after a calculation clears the previous input
            this.currentInput = '';
            this.justEvaluated = false;
        }
        // Prevent leading zeros like "00"
        if (this.currentInput === '0') {
            this.currentInput = digit;
        } else {
            this.currentInput += digit;
        }
        this.updateDisplay();
    }

    // Append a decimal point if one is not already present
    appendDecimal() {
        if (this.justEvaluated) {
            this.currentInput = '';
            this.justEvaluated = false;
        }
        if (this.currentInput === '') {
            this.currentInput = '0.';
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    // Set the pending operator (+, -, *, /)
    setOperator(op) {
        // If we already have a pending operation and a new number has been entered,
        // evaluate the previous operation first.
        if (this.operator && this.currentInput !== '') {
            this.calculate();
        }
        // Store the operator and move the current input to previousValue
        if (this.currentInput !== '') {
            this.previousValue = parseFloat(this.currentInput);
            this.currentInput = '';
        }
        this.operator = op;
        this.justEvaluated = false;
        this.updateDisplay();
    }

    // Perform the pending calculation with basic error handling
    calculate() {
        try {
            if (this.operator === null || this.previousValue === null || this.currentInput === '') {
                // Nothing to calculate
                return;
            }
            const current = parseFloat(this.currentInput);
            let result;
            switch (this.operator) {
                case '+':
                    result = this.previousValue + current;
                    break;
                case '-':
                    result = this.previousValue - current;
                    break;
                case '*':
                    result = this.previousValue * current;
                    break;
                case '/':
                    // Detect division by zero
                    if (current === 0) {
                        throw new Error('Division by zero');
                    }
                    result = this.previousValue / current;
                    break;
                default:
                    return;
            }
            // Store result and reset operator
            this.previousValue = result;
            this.currentInput = String(result);
            this.operator = null;
            this.justEvaluated = true;
            this.updateDisplay();
        } catch (e) {
            // On any error (including division by zero) display "Error" and reset state
            this.currentInput = 'Error';
            this.previousValue = null;
            this.operator = null;
            this.justEvaluated = true;
            this.updateDisplay();
        }
    }

    // Reset the calculator to its initial state
    clear() {
        this.currentInput = '';
        this.previousValue = null;
        this.operator = null;
        this.justEvaluated = false;
        this.updateDisplay();
    }

    // Remove the last character from the current input
    backspace() {
        if (this.justEvaluated) {
            // After evaluation a backspace should clear the displayed result
            this.clear();
            return;
        }
        if (this.currentInput !== '') {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        this.updateDisplay();
    }
}

// Create a singleton instance that can be accessed by other scripts or event listeners.
const calculator = new Calculator();
// Expose globally for non‑module usage
window.calculator = calculator;

// ---------------------------------------------------------------------------
// UI wiring – connect button clicks to calculator methods using event delegation
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Container that holds all calculator buttons
    const buttonContainer = document.querySelector('.buttons');
    if (!buttonContainer) return;

    // Event delegation: handle clicks on any button inside the container
    buttonContainer.addEventListener('click', (event) => {
        const btn = event.target.closest('button[data-action]');
        if (!btn || !buttonContainer.contains(btn)) return;

        const action = btn.dataset.action;
        // For digit and operator actions we rely on a data-value attribute if present,
        // otherwise fall back to the button's trimmed text content.
        const value = btn.dataset.value ? btn.dataset.value.trim() : btn.textContent.trim();

        switch (action) {
            case 'digit':
                calculator.appendDigit(value);
                break;
            case 'operator':
                calculator.setOperator(value);
                break;
            case 'decimal':
                calculator.appendDecimal();
                break;
            case 'clear':
                calculator.clear();
                break;
            case 'backspace':
                calculator.backspace();
                break;
            case 'equals':
                calculator.calculate();
                break;
            default:
                // No recognized action – ignore
                break;
        }
    });

    // -----------------------------------------------------------------------
    // Keyboard support – map key presses to calculator actions
    // -----------------------------------------------------------------------
    document.addEventListener('keydown', (e) => {
        // Normalize the key value for easier handling
        const key = e.key;
        // Digits 0‑9
        if (/^[0-9]$/.test(key)) {
            calculator.appendDigit(key);
            e.preventDefault();
            return;
        }
        // Decimal point
        if (key === '.' || key === ',') { // allow comma as decimal in some locales
            calculator.appendDecimal();
            e.preventDefault();
            return;
        }
        // Operators
        if (['+', '-', '*', '/'].includes(key)) {
            calculator.setOperator(key);
            e.preventDefault();
            return;
        }
        // Enter or = for evaluation
        if (key === 'Enter' || key === '=') {
            calculator.calculate();
            e.preventDefault();
            return;
        }
        // Backspace – delete last digit
        if (key === 'Backspace') {
            calculator.backspace();
            e.preventDefault();
            return;
        }
        // Escape or c/C to clear
        if (key === 'Escape' || key.toLowerCase() === 'c') {
            calculator.clear();
            e.preventDefault();
            return;
        }
    });

    // Ensure the display is in sync on load
    calculator.updateDisplay();
});
