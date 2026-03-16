'use strict';

const OPERATIONS = {
    add: { symbol: '+', name: '加法', calc: (a, b) => a + b },
    sub: { symbol: '-', name: '减法', calc: (a, b) => a - b },
    mul: { symbol: '×', name: '乘法', calc: (a, b) => a * b },
    div: { symbol: '÷', name: '除法', calc: (a, b) => a / b }
};

class CalculatorError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'CalculatorError';
        this.code = code;
    }
}

class Calculator {
    constructor() {
        this.lastResult = null;
    }

    _validateOperands(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new CalculatorError('操作数必须是数字', 'INVALID_OPERAND');
        }
        if (isNaN(a) || isNaN(b)) {
            throw new CalculatorError('操作数不能是NaN', 'INVALID_OPERAND');
        }
    }

    _roundResult(result) {
        return Math.round(result * 1000000000) / 1000000000;
    }

    add(a, b) {
        this._validateOperands(a, b);
        this.lastResult = this._roundResult(a + b);
        return this.lastResult;
    }

    subtract(a, b) {
        this._validateOperands(a, b);
        this.lastResult = this._roundResult(a - b);
        return this.lastResult;
    }

    multiply(a, b) {
        this._validateOperands(a, b);
        this.lastResult = this._roundResult(a * b);
        return this.lastResult;
    }

    divide(a, b) {
        this._validateOperands(a, b);
        if (b === 0) {
            throw new CalculatorError('除数不能为零', 'DIVISION_BY_ZERO');
        }
        this.lastResult = this._roundResult(a / b);
        return this.lastResult;
    }

    calculate(operation, a, b) {
        const op = operation.toLowerCase();
        if (!OPERATIONS[op]) {
            throw new CalculatorError(`不支持的操作: ${operation}`, 'UNSUPPORTED_OPERATION');
        }
        
        switch (op) {
            case 'add':
                return this.add(a, b);
            case 'sub':
                return this.subtract(a, b);
            case 'mul':
                return this.multiply(a, b);
            case 'div':
                return this.divide(a, b);
            default:
                throw new CalculatorError(`不支持的操作: ${operation}`, 'UNSUPPORTED_OPERATION');
        }
    }

    getLastResult() {
        return this.lastResult;
    }

    clear() {
        this.lastResult = null;
    }

    static getOperations() {
        return Object.keys(OPERATIONS).map(key => ({
            name: key,
            symbol: OPERATIONS[key].symbol,
            description: OPERATIONS[key].name
        }));
    }

    static get version() {
        return require('../package.json').version;
    }
}

Calculator.OPERATIONS = OPERATIONS;
Calculator.CalculatorError = CalculatorError;

module.exports = Calculator;
module.exports.default = Calculator;
