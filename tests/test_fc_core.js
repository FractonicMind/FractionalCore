/**
 * Core Test Suite
 * Fractional Core (FC) Framework
 * 
 * Comprehensive testing for mathematical diversity, memorial covenant
 * compliance, and information security verification.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const assert = require('assert');
const FractionalCore = require('../fractional-core.js');

/**
 * Test suite for Fractional Core
 */
class FCTestSuite {
    constructor() {
        this.fc = new FractionalCore();
        this.testResults = [];
        this.stats = {
            total: 0,
            passed: 0,
            failed: 0,
            skipped: 0
        };
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('=' .repeat(60));
        console.log('Fractional Core Test Suite');
        console.log('=' .repeat(60));
        console.log();

        const testGroups = [
            { name: 'Mathematical Expressions', fn: () => this.testMathematicalExpressions() },
            { name: 'Unity Proofs', fn: () => this.testUnityProofs() },
            { name: 'Encoding/Decoding', fn: () => this.testEncodingDecoding() },
            { name: 'Memorial Covenant', fn: () => this.testMemorialCovenant() },
            { name: 'Institution Validation', fn: () => this.testInstitutionValidation() },
            { name: 'Hash Functions', fn: () => this.testHashFunctions() },
            { name: 'Information Security', fn: () => this.testInformationSecurity() },
            { name: 'Error Handling', fn: () => this.testErrorHandling() },
            { name: 'Performance', fn: () => this.testPerformance() },
            { name: 'Edge Cases', fn: () => this.testEdgeCases() }
        ];

        for (const group of testGroups) {
            console.log(`\n${group.name}:`);
            console.log('-'.repeat(40));
            await group.fn();
        }

        this.printSummary();
        return this.stats.failed === 0;
    }

    /**
     * Test mathematical expressions
     */
    testMathematicalExpressions() {
        // Test 1: Unity expressions
        this.test('All unity expressions equal 1', () => {
            const expressions = [
                { expr: '1', value: 1 },
                { expr: '0!', value: 1 },
                { expr: '7^0', value: 1 },
                { expr: '√1', value: 1 },
                { expr: 'e^0', value: 1 },
                { expr: 'cos(0)', value: 1 },
                { expr: 'sin²(x) + cos²(x)', value: 1 },
                { expr: 'ln(e)', value: 1 },
                { expr: '∞/∞', value: 1 },
                { expr: 'lim(x→0) (sin(x)/x)', value: 1 }
            ];

            expressions.forEach(e => {
                const result = this.fc.evaluateExpression(e.expr);
                assert.strictEqual(result, e.value, `${e.expr} should equal ${e.value}`);
            });
        });

        // Test 2: Zero expressions
        this.test('All zero expressions equal 0', () => {
            const expressions = [
                { expr: '0', value: 0 },
                { expr: '0×1000', value: 0 },
                { expr: 'sin(0)', value: 0 },
                { expr: 'ln(1)', value: 0 },
                { expr: '1-1', value: 0 }
            ];

            expressions.forEach(e => {
                const result = this.fc.evaluateExpression(e.expr);
                assert.strictEqual(result, e.value, `${e.expr} should equal ${e.value}`);
            });
        });

        // Test 3: Arbitrary value expressions
        this.test('Generate diverse expressions for any value', () => {
            const testValues = [42, 100, 3.14159, 2025];
            
            testValues.forEach(value => {
                const expressions = this.fc.generateExpressions(value);
                assert(expressions.length >= 5, `Should generate at least 5 expressions for ${value}`);
                
                // Verify each expression evaluates to the correct value
                expressions.forEach(expr => {
                    const result = this.fc.evaluateExpression(expr);
                    assert(Math.abs(result - value) < 0.0001, 
                        `Expression "${expr}" should evaluate to ${value}`);
                });
            });
        });
    }

    /**
     * Test unity proofs
     */
    testUnityProofs() {
        // Test 1: Verify all unity proofs
        this.test('Unity proofs are valid', () => {
            const proof = {
                value: 1,
                expressions: ['1', '0!', '7^0', '√1', 'cos(0)'],
                timestamp: Date.now()
            };

            const encoded = this.fc.encode(proof);
            assert(encoded, 'Should encode unity proof');
            
            const decoded = this.fc.decode(encoded);
            assert.strictEqual(decoded.value, 1, 'Decoded value should be 1');
            assert.strictEqual(decoded.expressions.length, 5, 'Should have 5 expressions');
        });

        // Test 2: Unity proof verification
        this.test('Unity proof verification works', () => {
            const validProof = this.fc.createUnityProof();
            assert(this.fc.verifyProof(validProof), 'Valid unity proof should verify');

            // Tamper with proof
            const tamperedProof = { ...validProof, value: 2 };
            assert(!this.fc.verifyProof(tamperedProof), 'Tampered proof should fail');
        });
    }

    /**
     * Test encoding and decoding
     */
    testEncodingDecoding() {
        // Test 1: Basic encoding/decoding
        this.test('Basic encode/decode cycle', () => {
            const data = {
                message: 'Fractional Core Test',
                value: 42,
                timestamp: Date.now()
            };

            const encoded = this.fc.encode(data);
            assert(typeof encoded === 'string', 'Encoded data should be string');

            const decoded = this.fc.decode(encoded);
            assert.deepStrictEqual(decoded, data, 'Decoded should match original');
        });

        // Test 2: Complex data structures
        this.test('Complex data encoding', () => {
            const complex = {
                nested: {
                    array: [1, 2, 3],
                    object: { key: 'value' }
                },
                mathematical: {
                    expressions: ['√4', '2²', '2×2'],
                    value: 4
                }
            };

            const encoded = this.fc.encode(complex);
            const decoded = this.fc.decode(encoded);
            assert.deepStrictEqual(decoded, complex, 'Complex data should survive encoding');
        });

        // Test 3: Large data handling
        this.test('Large data encoding', () => {
            const largeArray = Array(1000).fill(0).map((_, i) => ({
                index: i,
                value: Math.random(),
                expression: `${i}^1`
            }));

            const encoded = this.fc.encode(largeArray);
            const decoded = this.fc.decode(encoded);
            assert.strictEqual(decoded.length, 1000, 'Should handle large arrays');
        });
    }

    /**
     * Test memorial covenant compliance
     */
    testMemorialCovenant() {
        // Test 1: Covenant present and intact
        this.test('Memorial covenant is present', () => {
            const covenant = this.fc.getMemorialCovenant();
            assert(covenant, 'Covenant should exist');
            assert(covenant.includes('Lev Goukassian'), 'Should include creator name');
            assert(covenant.includes('11'), 'Should mention 11 institutions');
        });

        // Test 2: Institution validation
        this.test('Pre-authorized institutions recognized', () => {
            const institutions = [
                'MIT', 'Stanford', 'Harvard', 'Oxford', 'Cambridge',
                'Dana-Farber', 'Gates Foundation', 'Apache', 'Mozilla',
                'Linux Foundation', 'Memorial Fund'
            ];

            institutions.forEach(inst => {
                assert(this.fc.isAuthorizedInstitution(inst), 
                    `${inst} should be authorized`);
            });

            assert(!this.fc.isAuthorizedInstitution('Unknown Corp'), 
                'Unknown should not be authorized');
        });

        // Test 3: Creator attribution
        this.test('Creator attribution protected', () => {
            const attribution = this.fc.getAttribution();
            assert(attribution.creator === 'Lev Goukassian', 'Creator should be Lev Goukassian');
            assert(attribution.orcid === '0009-0006-5966-1243', 'ORCID should match');
            assert(attribution.protected === true, 'Attribution should be protected');
        });
    }

    /**
     * Test institution validation
     */
    testInstitutionValidation() {
        // Test 1: Valid institution access
        this.test('Valid institution can access', () => {
            const access = this.fc.requestAccess('MIT', {
                purpose: 'Security audit',
                duration: 3600000
            });
            assert(access.granted, 'MIT should be granted access');
        });

        // Test 2: Invalid institution blocked
        this.test('Invalid institution blocked', () => {
            const access = this.fc.requestAccess('Malicious Corp', {
                purpose: 'Data theft',
                duration: 3600000
            });
            assert(!access.granted, 'Malicious Corp should be denied');
        });

        // Test 3: Access logging
        this.test('Access attempts are logged', () => {
            this.fc.requestAccess('Stanford', { purpose: 'Research' });
            const log = this.fc.getAccessLog();
            assert(log.length > 0, 'Access log should have entries');
            assert(log[log.length - 1].institution === 'Stanford', 
                'Last log should be Stanford');
        });
    }

    /**
     * Test hash functions
     */
    testHashFunctions() {
        // Test 1: Consistent hashing
        this.test('Hash function is consistent', () => {
            const data = 'Test data for hashing';
            const hash1 = this.fc.hash(data);
            const hash2 = this.fc.hash(data);
            assert.strictEqual(hash1, hash2, 'Same data should produce same hash');
        });

        // Test 2: Different data produces different hashes
        this.test('Different data produces different hashes', () => {
            const hash1 = this.fc.hash('Data 1');
            const hash2 = this.fc.hash('Data 2');
            assert.notStrictEqual(hash1, hash2, 'Different data should produce different hashes');
        });

        // Test 3: Hash format
        this.test('Hash has correct format', () => {
            const hash = this.fc.hash('Test');
            assert(typeof hash === 'string', 'Hash should be string');
            assert(hash.length === 64, 'SHA256 hash should be 64 characters');
            assert(/^[a-f0-9]+$/.test(hash), 'Hash should be hexadecimal');
        });
    }

    /**
     * Test information security
     */
    testInformationSecurity() {
        // Test 1: Proof tampering detection
        this.test('Detects tampered proofs', () => {
            const original = this.fc.createProof(42);
            const tampered = { ...original };
            tampered.value = 100;
            
            assert(this.fc.verifyProof(original), 'Original proof should verify');
            assert(!this.fc.verifyProof(tampered), 'Tampered proof should fail');
        });

        // Test 2: Signature verification
        this.test('Signature verification works', () => {
            const data = { important: 'data' };
            const signed = this.fc.sign(data);
            
            assert(signed.signature, 'Should have signature');
            assert(this.fc.verifySignature(signed), 'Valid signature should verify');
            
            signed.data.important = 'tampered';
            assert(!this.fc.verifySignature(signed), 'Tampered data should fail verification');
        });

        // Test 3: Replay attack prevention
        this.test('Prevents replay attacks', () => {
            const proof = this.fc.createProof(100);
            
            // First use should succeed
            assert(this.fc.useProof(proof), 'First use should succeed');
            
            // Replay should fail
            assert(!this.fc.useProof(proof), 'Replay should fail');
        });
    }

    /**
     * Test error handling
     */
    testErrorHandling() {
        // Test 1: Invalid input handling
        this.test('Handles invalid input gracefully', () => {
            assert.throws(() => this.fc.encode(undefined), 
                'Should throw on undefined');
            assert.throws(() => this.fc.decode('invalid-base64'), 
                'Should throw on invalid encoding');
            assert.throws(() => this.fc.evaluateExpression('invalid'), 
                'Should throw on invalid expression');
        });

        // Test 2: Boundary conditions
        this.test('Handles boundary values', () => {
            const zero = this.fc.generateExpressions(0);
            assert(zero.length > 0, 'Should handle zero');
            
            const negative = this.fc.generateExpressions(-1);
            assert(negative.length > 0, 'Should handle negative');
            
            const large = this.fc.generateExpressions(Number.MAX_SAFE_INTEGER);
            assert(large.length > 0, 'Should handle large numbers');
        });

        // Test 3: Circular reference handling
        this.test('Handles circular references', () => {
            const circular = { a: 1 };
            circular.self = circular;
            
            assert.throws(() => this.fc.encode(circular), 
                'Should throw on circular reference');
        });
    }

    /**
     * Test performance
     */
    testPerformance() {
        // Test 1: Encoding speed
        this.test('Encoding performance acceptable', () => {
            const data = { test: 'data', array: [1, 2, 3, 4, 5] };
            const start = Date.now();
            
            for (let i = 0; i < 1000; i++) {
                this.fc.encode(data);
            }
            
            const elapsed = Date.now() - start;
            assert(elapsed < 1000, `1000 encodings should take < 1s (took ${elapsed}ms)`);
        });

        // Test 2: Expression generation speed
        this.test('Expression generation performance', () => {
            const start = Date.now();
            
            for (let i = 1; i <= 100; i++) {
                this.fc.generateExpressions(i);
            }
            
            const elapsed = Date.now() - start;
            assert(elapsed < 500, `100 expression sets should take < 500ms (took ${elapsed}ms)`);
        });

        // Test 3: Hash performance
        this.test('Hashing performance acceptable', () => {
            const data = 'Test data for hashing performance';
            const start = Date.now();
            
            for (let i = 0; i < 10000; i++) {
                this.fc.hash(data + i);
            }
            
            const elapsed = Date.now() - start;
            assert(elapsed < 500, `10000 hashes should take < 500ms (took ${elapsed}ms)`);
        });
    }

    /**
     * Test edge cases
     */
    testEdgeCases() {
        // Test 1: Empty data
        this.test('Handles empty data', () => {
            const empty = {};
            const encoded = this.fc.encode(empty);
            const decoded = this.fc.decode(encoded);
            assert.deepStrictEqual(decoded, empty, 'Should handle empty object');
        });

        // Test 2: Special characters
        this.test('Handles special characters', () => {
            const special = {
                text: '∫∑√π∞αβγδε',
                unicode: '🔒🎯🌟',
                symbols: '!@#$%^&*()'
            };
            const encoded = this.fc.encode(special);
            const decoded = this.fc.decode(encoded);
            assert.deepStrictEqual(decoded, special, 'Should handle special characters');
        });

        // Test 3: Floating point precision
        this.test('Maintains floating point precision', () => {
            const pi = Math.PI;
            const expressions = this.fc.generateExpressions(pi);
            
            expressions.forEach(expr => {
                const result = this.fc.evaluateExpression(expr);
                assert(Math.abs(result - pi) < 0.000001, 
                    `Expression ${expr} should be close to π`);
            });
        });

        // Test 4: Smartishka easter egg
        this.test('Smartishka protection active', () => {
            const protection = this.fc.checkNameProtection('Smartishka');
            assert(protection.protected === true, 'Smartishka should be protected');
            assert(protection.message.includes('friendship'), 
                'Should reference friendship in mathematics');
        });
    }

    /**
     * Test helper - run individual test
     */
    test(description, testFn) {
        this.stats.total++;
        try {
            testFn();
            console.log(`  ✓ ${description}`);
            this.stats.passed++;
            this.testResults.push({
                description,
                status: 'passed',
                error: null
            });
        } catch (error) {
            console.log(`  ✗ ${description}`);
            console.log(`    Error: ${error.message}`);
            this.stats.failed++;
            this.testResults.push({
                description,
                status: 'failed',
                error: error.message
            });
        }
    }

    /**
     * Print test summary
     */
    printSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('Test Summary');
        console.log('='.repeat(60));
        
        const passRate = ((this.stats.passed / this.stats.total) * 100).toFixed(1);
        const status = this.stats.failed === 0 ? 'SUCCESS' : 'FAILURE';
        
        console.log(`Total Tests: ${this.stats.total}`);
        console.log(`Passed: ${this.stats.passed}`);
        console.log(`Failed: ${this.stats.failed}`);
        console.log(`Pass Rate: ${passRate}%`);
        console.log(`\nStatus: ${status}`);
        
        if (this.stats.failed > 0) {
            console.log('\nFailed Tests:');
            this.testResults
                .filter(r => r.status === 'failed')
                .forEach(r => {
                    console.log(`  - ${r.description}`);
                    console.log(`    ${r.error}`);
                });
        }
        
        console.log('\n' + '='.repeat(60));
    }
}

// Run tests if executed directly
if (require.main === module) {
    const tester = new FCTestSuite();
    
    tester.runAllTests().then(success => {
        console.log('\nFractional Core Test Suite Complete');
        console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
        console.log('Protected under Memorial Covenant');
        
        // Exit with appropriate code
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test suite error:', error);
        process.exit(1);
    });
}

module.exports = FCTestSuite;
