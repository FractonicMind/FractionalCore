/**
 * Mathematical Expressions Test Suite
 * Fractional Core (FC) Framework
 * 
 * Comprehensive testing of mathematical diversity - the heart of FC.
 * Validates that multiple expressions can represent the same value.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const assert = require('assert');
const FractionalCore = require('../fractional-core.js');

class ExpressionTestSuite {
    constructor() {
        this.fc = new FractionalCore();
        this.testCount = 0;
        this.passCount = 0;
        this.failCount = 0;
        this.startTime = Date.now();
    }

    /**
     * Run all expression tests
     */
    async runAll() {
        console.log('=' .repeat(60));
        console.log('Mathematical Expressions Test Suite');
        console.log('Testing the core principle: Mathematical Diversity');
        console.log('=' .repeat(60));
        console.log();

        // Test categories
        await this.testUnityExpressions();
        await this.testZeroExpressions();
        await this.testIntegerExpressions();
        await this.testFractionalExpressions();
        await this.testNegativeExpressions();
        await this.testComplexExpressions();
        await this.testSpecialConstants();
        await this.testExpressionGeneration();
        await this.testExpressionValidation();
        await this.testExpressionEquivalence();

        this.printResults();
        return this.failCount === 0;
    }

    /**
     * Test unity expressions (all equal to 1)
     */
    async testUnityExpressions() {
        console.log('\n1. Unity Expressions (Value = 1)');
        console.log('-'.repeat(40));

        const unityExpressions = [
            // Basic
            { expr: '1', name: 'Direct unity' },
            { expr: '1.0', name: 'Decimal unity' },
            
            // Factorial
            { expr: '0!', name: 'Zero factorial' },
            { expr: '1!', name: 'One factorial' },
            
            // Powers
            { expr: '7^0', name: 'Any number to power 0' },
            { expr: '1000^0', name: 'Large number to power 0' },
            { expr: '(-5)^0', name: 'Negative to power 0' },
            { expr: '1^1000', name: 'One to any power' },
            
            // Roots
            { expr: '√1', name: 'Square root of 1' },
            { expr: '∛1', name: 'Cube root of 1' },
            { expr: '⁴√1', name: 'Fourth root of 1' },
            
            // Trigonometric
            { expr: 'cos(0)', name: 'Cosine of zero' },
            { expr: 'sin²(x) + cos²(x)', name: 'Pythagorean identity' },
            { expr: 'sec(0)', name: 'Secant of zero' },
            { expr: 'tan(π/4)', name: 'Tangent of π/4' },
            
            // Logarithmic
            { expr: 'ln(e)', name: 'Natural log of e' },
            { expr: 'log₁₀(10)', name: 'Log base 10 of 10' },
            { expr: 'log₂(2)', name: 'Log base 2 of 2' },
            { expr: 'e^ln(1)', name: 'Exponential of ln(1)' },
            
            // Complex
            { expr: '|1+0i|', name: 'Magnitude of 1' },
            { expr: '|e^(iπ)|', name: 'Magnitude of e^(iπ)' },
            
            // Limits
            { expr: 'lim(x→0) (sin(x)/x)', name: 'Famous limit' },
            { expr: 'lim(n→∞) (1+1/n)^n / e', name: 'Definition of e ratio' },
            
            // Combinatorial
            { expr: 'C(n,n)', name: 'n choose n' },
            { expr: 'C(n,0)', name: 'n choose 0' },
            { expr: 'P(1,1)', name: '1 permute 1' },
            
            // Series
            { expr: '∑(0) from 1 to ∞', name: 'Geometric series 1/2^n' },
            { expr: '∏(1) for n terms', name: 'Product of ones' },
            
            // Special functions
            { expr: 'Γ(2) / 1!', name: 'Gamma function ratio' },
            { expr: 'sgn(5)', name: 'Sign of positive' },
            { expr: 'floor(1.9)', name: 'Floor of 1.9' },
            { expr: 'ceil(0.1)', name: 'Ceiling of 0.1' }
        ];

        for (const test of unityExpressions) {
            this.testExpression(test.expr, 1, test.name);
        }
    }

    /**
     * Test zero expressions
     */
    async testZeroExpressions() {
        console.log('\n2. Zero Expressions (Value = 0)');
        console.log('-'.repeat(40));

        const zeroExpressions = [
            // Basic
            { expr: '0', name: 'Direct zero' },
            { expr: '0.0', name: 'Decimal zero' },
            
            // Arithmetic
            { expr: '1 - 1', name: 'Subtraction to zero' },
            { expr: '0 × 1000000', name: 'Zero times anything' },
            { expr: '0 / 42', name: 'Zero divided by non-zero' },
            
            // Trigonometric
            { expr: 'sin(0)', name: 'Sine of zero' },
            { expr: 'sin(π)', name: 'Sine of π' },
            { expr: 'tan(0)', name: 'Tangent of zero' },
            { expr: 'sin(2π)', name: 'Sine of 2π' },
            
            // Logarithmic
            { expr: 'ln(1)', name: 'Natural log of 1' },
            { expr: 'log₁₀(1)', name: 'Log base 10 of 1' },
            { expr: 'e^0 - 1', name: 'e^0 minus 1' },
            
            // Powers
            { expr: '0^1', name: 'Zero to positive power' },
            { expr: '0^100', name: 'Zero to large power' },
            
            // Modular
            { expr: '10 mod 10', name: 'n mod n' },
            { expr: '0 mod 5', name: 'Zero mod anything' },
            
            // Complex
            { expr: 'Im(5)', name: 'Imaginary part of real' },
            { expr: 'Re(3i) - Re(3i)', name: 'Real part difference' }
        ];

        for (const test of zeroExpressions) {
            this.testExpression(test.expr, 0, test.name);
        }
    }

    /**
     * Test integer expressions
     */
    async testIntegerExpressions() {
        console.log('\n3. Integer Expressions');
        console.log('-'.repeat(40));

        const integerTests = [
            { value: 2, expressions: [
                '2', '1+1', '2×1', '4/2', '√4', '2!', '2^1', 'ceil(1.1)', 'floor(2.9)'
            ]},
            { value: 3, expressions: [
                '3', '1+2', '3×1', '9/3', '√9', 'C(3,1)', '3^1', 'π rounded'
            ]},
            { value: 5, expressions: [
                '5', '2+3', '5×1', '25/5', '√25', '5!!/24', 'floor(5.999)', 'ceil(4.001)'
            ]},
            { value: 10, expressions: [
                '10', '5+5', '2×5', '100/10', '√100', '10^1', 'log₂(1024)', '3!+4'
            ]},
            { value: 42, expressions: [
                '42', '6×7', '84/2', '21+21', '42^1', '√1764', '(2+4)×7', '6!/(17.14...)'
            ]},
            { value: 100, expressions: [
                '100', '10²', '50×2', '1000/10', '√10000', '10^2', '4!+76', '5!-20'
            ]}
        ];

        for (const test of integerTests) {
            console.log(`  Testing value: ${test.value}`);
            for (const expr of test.expressions) {
                this.testExpression(expr, test.value, `${expr} = ${test.value}`);
            }
        }
    }

    /**
     * Test fractional expressions
     */
    async testFractionalExpressions() {
        console.log('\n4. Fractional Expressions');
        console.log('-'.repeat(40));

        const fractionalTests = [
            { value: 0.5, expressions: [
                '0.5', '1/2', '½', '2^(-1)', 'sin(π/6)', 'cos(π/3)', '√0.25'
            ]},
            { value: 0.25, expressions: [
                '0.25', '1/4', '¼', '2^(-2)', '0.5²', '√0.0625', '(1/2)²'
            ]},
            { value: 0.75, expressions: [
                '0.75', '3/4', '¾', '1-0.25', '0.5+0.25', '√0.5625'
            ]},
            { value: 0.1, expressions: [
                '0.1', '1/10', '10^(-1)', '0.01×10', '1÷10', '10%'
            ]},
            { value: 0.333333, expressions: [
                '1/3', '⅓', '0.333...', '2/6', '10/30', '0.111...×3'
            ]}
        ];

        for (const test of fractionalTests) {
            console.log(`  Testing value: ${test.value}`);
            for (const expr of test.expressions) {
                this.testExpression(expr, test.value, `${expr} ≈ ${test.value}`, 0.001);
            }
        }
    }

    /**
     * Test negative expressions
     */
    async testNegativeExpressions() {
        console.log('\n5. Negative Expressions');
        console.log('-'.repeat(40));

        const negativeTests = [
            { value: -1, expressions: [
                '-1', '0-1', '-1×1', '-√1', 'cos(π)', 'e^(iπ) real part', '-1^1'
            ]},
            { value: -2, expressions: [
                '-2', '0-2', '-1×2', '-√4', '1-3', '-2^1', 'floor(-1.1)'
            ]},
            { value: -10, expressions: [
                '-10', '0-10', '-5×2', '-√100', '5-15', '-10^1', 'ceil(-10.9)'
            ]}
        ];

        for (const test of negativeTests) {
            console.log(`  Testing value: ${test.value}`);
            for (const expr of test.expressions) {
                this.testExpression(expr, test.value, `${expr} = ${test.value}`);
            }
        }
    }

    /**
     * Test complex mathematical expressions
     */
    async testComplexExpressions() {
        console.log('\n6. Complex Mathematical Expressions');
        console.log('-'.repeat(40));

        const complexTests = [
            { 
                value: Math.PI, 
                name: 'π (Pi)',
                expressions: [
                    'π', '3.14159...', 'acos(-1)', '4×atan(1)', '22/7 (approx)'
                ]
            },
            { 
                value: Math.E, 
                name: 'e (Euler\'s number)',
                expressions: [
                    'e', '2.71828...', 'lim(n→∞)(1+1/n)^n', 'exp(1)', '∑(1/n!) from 0 to ∞'
                ]
            },
            { 
                value: 1.618033988749895, 
                name: 'φ (Golden ratio)',
                expressions: [
                    'φ', '(1+√5)/2', '1.618...', 'golden ratio'
                ]
            },
            { 
                value: Math.SQRT2, 
                name: '√2',
                expressions: [
                    '√2', '2^(1/2)', '1.41421...', 'diagonal of unit square'
                ]
            }
        ];

        for (const test of complexTests) {
            console.log(`  Testing ${test.name}: ${test.value}`);
            for (const expr of test.expressions) {
                this.testExpression(expr, test.value, expr, 0.00001);
            }
        }
    }

    /**
     * Test special mathematical constants
     */
    async testSpecialConstants() {
        console.log('\n7. Special Mathematical Constants');
        console.log('-'.repeat(40));

        const constants = [
            { name: 'Euler-Mascheroni', value: 0.5772156649, expr: 'γ' },
            { name: 'Apéry\'s constant', value: 1.2020569, expr: 'ζ(3)' },
            { name: 'Catalan\'s constant', value: 0.915965594, expr: 'G' },
            { name: 'Khinchin\'s constant', value: 2.6854520010, expr: 'K' },
            { name: 'Glaisher–Kinkelin', value: 1.2824271291, expr: 'A' }
        ];

        for (const c of constants) {
            this.testExpression(c.expr, c.value, `${c.name} (${c.expr})`, 0.0001);
        }
    }

    /**
     * Test expression generation for various values
     */
    async testExpressionGeneration() {
        console.log('\n8. Expression Generation');
        console.log('-'.repeat(40));

        const testValues = [1, 2, 3, 5, 10, 42, 100, 256, 1000, 2025];

        for (const value of testValues) {
            const expressions = this.fc.generateExpressions(value);
            
            this.test(
                `Generate expressions for ${value}`,
                () => {
                    assert(expressions.length >= 5, 
                        `Should generate at least 5 expressions for ${value}`);
                    
                    // Verify diversity
                    const unique = new Set(expressions);
                    assert(unique.size === expressions.length, 
                        'All expressions should be unique');
                    
                    // Verify they all evaluate correctly
                    expressions.forEach(expr => {
                        const result = this.fc.evaluateExpression(expr);
                        assert(Math.abs(result - value) < 0.0001,
                            `Expression "${expr}" should equal ${value}`);
                    });
                }
            );
        }
    }

    /**
     * Test expression validation
     */
    async testExpressionValidation() {
        console.log('\n9. Expression Validation');
        console.log('-'.repeat(40));

        // Valid expressions
        const validExpressions = [
            '1+1', '√4', 'sin(π)', 'e^0', '5!', '2^10', 'log(100)'
        ];

        for (const expr of validExpressions) {
            this.test(
                `Valid expression: ${expr}`,
                () => {
                    assert(this.fc.isValidExpression(expr), 
                        `${expr} should be valid`);
                }
            );
        }

        // Invalid expressions
        const invalidExpressions = [
            'invalid', '1++1', '√√', 'sin()', '1/0', 'undefined'
        ];

        for (const expr of invalidExpressions) {
            this.test(
                `Invalid expression: ${expr}`,
                () => {
                    assert(!this.fc.isValidExpression(expr), 
                        `${expr} should be invalid`);
                }
            );
        }
    }

    /**
     * Test expression equivalence
     */
    async testExpressionEquivalence() {
        console.log('\n10. Expression Equivalence');
        console.log('-'.repeat(40));

        const equivalentSets = [
            {
                value: 1,
                expressions: ['1', '0!', '7^0', 'cos(0)', 'e^0']
            },
            {
                value: 0,
                expressions: ['0', 'sin(0)', 'ln(1)', '1-1', '0×999']
            },
            {
                value: 2,
                expressions: ['2', '1+1', '√4', '2!', '8/4']
            },
            {
                value: Math.PI,
                expressions: ['π', '3.14159...', 'acos(-1)', '4×atan(1)']
            }
        ];

        for (const set of equivalentSets) {
            console.log(`  Testing equivalence for value: ${set.value}`);
            
            this.test(
                `All expressions equal ${set.value}`,
                () => {
                    set.expressions.forEach(expr => {
                        const result = this.fc.evaluateExpression(expr);
                        assert(Math.abs(result - set.value) < 0.0001,
                            `${expr} should equal ${set.value}`);
                    });
                    
                    // Test pairwise equivalence
                    for (let i = 0; i < set.expressions.length; i++) {
                        for (let j = i + 1; j < set.expressions.length; j++) {
                            const expr1 = set.expressions[i];
                            const expr2 = set.expressions[j];
                            assert(
                                this.fc.areEquivalent(expr1, expr2),
                                `${expr1} should be equivalent to ${expr2}`
                            );
                        }
                    }
                }
            );
        }
    }

    /**
     * Test a single expression
     */
    testExpression(expr, expectedValue, description, tolerance = 0.000001) {
        this.test(
            description || `${expr} = ${expectedValue}`,
            () => {
                const result = this.fc.evaluateExpression(expr);
                assert(
                    Math.abs(result - expectedValue) < tolerance,
                    `Expected ${expectedValue}, got ${result}`
                );
            }
        );
    }

    /**
     * Generic test wrapper
     */
    test(description, testFn) {
        this.testCount++;
        try {
            testFn();
            console.log(`  ✓ ${description}`);
            this.passCount++;
        } catch (error) {
            console.log(`  ✗ ${description}`);
            console.log(`    Error: ${error.message}`);
            this.failCount++;
        }
    }

    /**
     * Print test results
     */
    printResults() {
        const duration = Date.now() - this.startTime;
        const passRate = ((this.passCount / this.testCount) * 100).toFixed(1);
        
        console.log('\n' + '='.repeat(60));
        console.log('Mathematical Expression Test Results');
        console.log('='.repeat(60));
        console.log(`Total Tests: ${this.testCount}`);
        console.log(`Passed: ${this.passCount}`);
        console.log(`Failed: ${this.failCount}`);
        console.log(`Pass Rate: ${passRate}%`);
        console.log(`Duration: ${duration}ms`);
        
        if (this.failCount === 0) {
            console.log('\n✨ All mathematical expressions validated successfully!');
            console.log('Mathematical diversity principle confirmed.');
        } else {
            console.log('\n⚠️ Some expressions failed validation.');
            console.log('Please review the mathematical implementation.');
        }
        
        console.log('\n' + '='.repeat(60));
    }
}

// Run tests if executed directly
if (require.main === module) {
    const tester = new ExpressionTestSuite();
    
    tester.runAll().then(success => {
        console.log('\nMathematical Expressions Test Suite Complete');
        console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
        console.log('Protected under Memorial Covenant');
        
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test suite error:', error);
        process.exit(1);
    });
}

module.exports = ExpressionTestSuite;
