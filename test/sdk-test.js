'use strict';

const Calculator = require('../lib/calculator');

console.log('='.repeat(50));
console.log('Calculator SDK 测试');
console.log('='.repeat(50));

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
    } catch (error) {
        console.log(`❌ ${name}`);
        console.log(`   错误: ${error.message}`);
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}: 期望 ${expected}, 实际 ${actual}`);
    }
}

console.log('\n📋 基础运算测试\n');

test('加法: 5 + 3 = 8', () => {
    const calc = new Calculator();
    const result = calc.add(5, 3);
    assertEqual(result, 8, '加法结果');
});

test('减法: 10 - 4 = 6', () => {
    const calc = new Calculator();
    const result = calc.subtract(10, 4);
    assertEqual(result, 6, '减法结果');
});

test('乘法: 7 × 8 = 56', () => {
    const calc = new Calculator();
    const result = calc.multiply(7, 8);
    assertEqual(result, 56, '乘法结果');
});

test('除法: 20 ÷ 5 = 4', () => {
    const calc = new Calculator();
    const result = calc.divide(20, 5);
    assertEqual(result, 4, '除法结果');
});

test('小数运算: 0.1 + 0.2 = 0.3', () => {
    const calc = new Calculator();
    const result = calc.add(0.1, 0.2);
    assertEqual(result, 0.3, '小数加法结果');
});

console.log('\n📋 calculate 方法测试\n');

test('calculate("add", 5, 3) = 8', () => {
    const calc = new Calculator();
    const result = calc.calculate('add', 5, 3);
    assertEqual(result, 8, 'calculate加法');
});

test('calculate("sub", 10, 4) = 6', () => {
    const calc = new Calculator();
    const result = calc.calculate('sub', 10, 4);
    assertEqual(result, 6, 'calculate减法');
});

test('calculate("mul", 7, 8) = 56', () => {
    const calc = new Calculator();
    const result = calc.calculate('mul', 7, 8);
    assertEqual(result, 56, 'calculate乘法');
});

test('calculate("div", 20, 5) = 4', () => {
    const calc = new Calculator();
    const result = calc.calculate('div', 20, 5);
    assertEqual(result, 4, 'calculate除法');
});

console.log('\n📋 错误处理测试\n');

test('除零错误', () => {
    const calc = new Calculator();
    try {
        calc.divide(10, 0);
        throw new Error('应该抛出错误');
    } catch (error) {
        if (error.code !== 'DIVISION_BY_ZERO') {
            throw new Error('错误码不正确');
        }
    }
});

test('无效操作数错误', () => {
    const calc = new Calculator();
    try {
        calc.add('a', 3);
        throw new Error('应该抛出错误');
    } catch (error) {
        if (error.code !== 'INVALID_OPERAND') {
            throw new Error('错误码不正确');
        }
    }
});

test('不支持的操作错误', () => {
    const calc = new Calculator();
    try {
        calc.calculate('pow', 2, 3);
        throw new Error('应该抛出错误');
    } catch (error) {
        if (error.code !== 'UNSUPPORTED_OPERATION') {
            throw new Error('错误码不正确');
        }
    }
});

console.log('\n📋 状态管理测试\n');

test('getLastResult() 获取最后结果', () => {
    const calc = new Calculator();
    calc.add(5, 3);
    assertEqual(calc.getLastResult(), 8, '最后结果');
});

test('clear() 清除结果', () => {
    const calc = new Calculator();
    calc.add(5, 3);
    calc.clear();
    assertEqual(calc.getLastResult(), null, '清除后结果');
});

console.log('\n📋 静态方法测试\n');

test('Calculator.getOperations() 获取支持的操作', () => {
    const ops = Calculator.getOperations();
    if (ops.length !== 4) {
        throw new Error('操作数量不正确');
    }
});

test('Calculator.version 获取版本', () => {
    const version = Calculator.version;
    if (!version) {
        throw new Error('版本号不存在');
    }
    console.log(`   版本: v${version}`);
});

console.log('\n' + '='.repeat(50));
console.log('测试完成！');
console.log('='.repeat(50) + '\n');
