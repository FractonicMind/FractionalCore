# Fractional Core API Reference

**Professional Documentation for Developers and Researchers**

*Complete technical reference for implementing mathematical expression diversity in information systems*

---

## Table of Contents

- [Installation and Setup](#installation-and-setup)
- [Core Classes](#core-classes)
- [Mathematical Expression Methods](#mathematical-expression-methods)  
- [Encoding and Verification](#encoding-and-verification)
- [Memorial Covenant Integration](#memorial-covenant-integration)
- [Advanced Features](#advanced-features)
- [Error Handling](#error-handling)
- [Performance Optimization](#performance-optimization)
- [Integration Patterns](#integration-patterns)
- [Examples and Tutorials](#examples-and-tutorials)

---

## Installation and Setup

### System Requirements

**Node.js**: Version 14.0 or higher  
**Memory**: Minimum 512MB RAM for basic operations  
**Storage**: 50MB for framework and standard expression libraries  
**Mathematical Libraries**: Built-in JavaScript Math object (no external dependencies)

### Installation

```bash
# Install via npm (when published)
npm install fractional-core

# Or clone from repository
git clone https://github.com/FractonicMind/FractionalCore.git
cd FractionalCore
npm install
```

### Basic Setup

```javascript
// Import the framework
const FractionalCore = require('fractional-core');

// Initialize FC instance
const fc = new FractionalCore();

// Required: Accept Memorial Covenant before use
const covenant = {
    humanitarianCommitment: true,
    cancerResearchSupport: true,
    openScienceCommitment: true,
    institutionName: "Your Institution",
    contributionPlan: "Specific contribution to cancer research"
};

fc.acceptCovenant("Institution-ID", covenant);
```

---

## Core Classes

### FractionalCore

**Primary class for all Fractional Core operations.**

#### Constructor

```javascript
new FractionalCore()
```

**Returns**: `FractionalCore` instance  
**Description**: Creates a new FC instance with covenant enforcement enabled.

**Properties**:
- `covenantAccepted`: `boolean` - Indicates if Memorial Covenant has been accepted
- `institutionId`: `string` - Identifier for covenant-accepting institution
- `verificationCount`: `number` - Total number of verification operations performed
- `FC_ORIGIN`: `string` - Memorial origin signature (read-only)

#### Instance Properties

```javascript
// Read-only properties
fc.FC_ORIGIN            // "Lev Goukassian, 2025: Truth is fractional. Hope is not."
fc.MEMORIAL_BINARY      // Binary encoding of creator's name
fc.covenantAccepted     // boolean: Covenant acceptance status
fc.institutionId        // string: Institution identifier
fc.verificationCount    // number: Total verifications performed
```

---

## Mathematical Expression Methods

### getStandardFractions()

**Returns standard mathematical expressions that equal 1.**

```javascript
fc.getStandardFractions()
```

**Returns**: `Array<ExpressionObject>`  
**Description**: Retrieves the standard library of mathematical expressions equivalent to 1.

**ExpressionObject Structure**:
```javascript
{
    expr: "√1",                    // Human-readable expression
    latex: "\\sqrt{1}",           // LaTeX representation
    value: () => Math.sqrt(1),    // Computation function
    note: "Square root of 1"      // Optional explanation
}
```

**Example**:
```javascript
const expressions = fc.getStandardFractions();
console.log(expressions[0]);
// Output: { expr: "√1", latex: "\\sqrt{1}", value: [Function], note: undefined }

expressions.forEach(expr => {
    console.log(`${expr.expr} = ${expr.value()}`);
});
// Output: √1 = 1, 0! = 1, |−1| = 1, etc.
```

### getAdvancedFractions()

**Returns advanced mathematical expressions for sophisticated applications.**

```javascript
fc.getAdvancedFractions()
```

**Returns**: `Array<ExpressionObject>`  
**Description**: Retrieves advanced mathematical expressions including integrals, limits, and complex operations.

**Example**:
```javascript
const advanced = fc.getAdvancedFractions();
console.log(advanced[0]);
// Output: { expr: "∫(dx)", latex: "\\int dx", value: [Function], note: "Definite integral from 0 to 1" }
```

### generateIdentitySet()

**Creates personalized mathematical expression set for identity verification.**

```javascript
fc.generateIdentitySet(name, setSize)
```

**Parameters**:
- `name`: `string` - Name or identifier for personalized set generation
- `setSize`: `number` - Number of expressions to generate (default: 16)

**Returns**: `Array<ExpressionObject>`  
**Description**: Generates a reproducible set of mathematical expressions based on the input name.

**Example**:
```javascript
const personalSet = fc.generateIdentitySet("Alice", 8);
console.log("Personal FC set for Alice:");
personalSet.forEach((expr, i) => {
    console.log(`  FC${i+1}: ${expr.expr} = ${expr.value()}`);
});
```

---

## Encoding and Verification

### encode()

**Encodes text using mathematical expressions instead of binary 1s.**

```javascript
fc.encode(text, useAdvanced)
```

**Parameters**:
- `text`: `string` - Text to encode using FC methodology
- `useAdvanced`: `boolean` - Whether to include advanced mathematical expressions (default: false)

**Returns**: `Array<Array<string>>` - 2D grid where mathematical expressions replace 1s  
**Throws**: `Error` if Memorial Covenant not accepted  

**Example**:
```javascript
const message = "FC";
const encoded = fc.encode(message);
console.log("Encoded message:");
encoded.forEach(row => console.log(row.join(' ')));

// With advanced expressions
const advancedEncoded = fc.encode(message, true);
```

### verify()

**Verifies that a mathematical expression equals the expected value.**

```javascript
fc.verify(expression, expectedValue)
```

**Parameters**:
- `expression`: `string` - Mathematical expression to verify
- `expectedValue`: `number` - Expected result (default: 1)

**Returns**: `boolean` - True if expression equals expected value within tolerance  
**Throws**: `Error` if Memorial Covenant not accepted

**Example**:
```javascript
console.log(fc.verify("√36/6", 1));    // true
console.log(fc.verify("0!", 1));       // true
console.log(fc.verify("2+2", 4));      // true
console.log(fc.verify("√1", 0));       // false
```

### decode()

**Decodes Fractional Core encoded message back to original text.**

```javascript
fc.decode(encodedGrid)
```

**Parameters**:
- `encodedGrid`: `Array<Array<string>>` - Grid from `encode()` method

**Returns**: `string` - Original decoded text  
**Throws**: `Error` if Memorial Covenant not accepted or decoding fails

**Example**:
```javascript
const message = "HELLO";
const encoded = fc.encode(message);
const decoded = fc.decode(encoded);
console.log(decoded === message); // true
```

---

## Memorial Covenant Integration

### acceptCovenant()

**Accepts Memorial Covenant required for all FC operations.**

```javascript
fc.acceptCovenant(institutionId, covenantAgreement)
```

**Parameters**:
- `institutionId`: `string` - Unique identifier for accepting institution
- `covenantAgreement`: `CovenantObject` - Formal covenant acceptance

**CovenantObject Structure**:
```javascript
{
    humanitarianCommitment: boolean,      // Must be true
    cancerResearchSupport: boolean,       // Must be true
    openScienceCommitment: boolean,       // Must be true
    institutionName: string,              // Official institution name
    contributionPlan: string,             // Specific contribution description
    contactEmail: string                  // Institutional contact
}
```

**Returns**: `boolean` - True if covenant accepted successfully  
**Throws**: `Error` if covenant requirements not met

**Example**:
```javascript
const covenant = {
    humanitarianCommitment: true,
    cancerResearchSupport: true,
    openScienceCommitment: true,
    institutionName: "MIT Media Lab",
    contributionPlan: "Computational resources for cancer modeling research",
    contactEmail: "research@media.mit.edu"
};

try {
    fc.acceptCovenant("MIT-MediaLab-2025", covenant);
    console.log("Covenant accepted successfully");
} catch (error) {
    console.error("Covenant acceptance failed:", error.message);
}
```

### memorialVerification()

**Performs memorial verification honoring framework creator.**

```javascript
fc.memorialVerification()
```

**Returns**: `boolean` - Always true (verification successful)  
**Description**: Validates memorial elements and displays tribute information.

**Example**:
```javascript
fc.memorialVerification();
// Displays:
// Memorial Verification:
// Expected: Lev
// Binary: 01001100 01100101 01110110
// Memorial: 01001100 01100101 01110110 00100000 01000111...
// Origin: Lev Goukassian, 2025: Truth is fractional. Hope is not.
```

### enforceCovenantCheck()

**Internal method ensuring covenant compliance before operations.**

```javascript
fc.enforceCovenantCheck()
```

**Returns**: `void`  
**Throws**: `Error` with detailed violation message if covenant not accepted  
**Description**: Called automatically by all public methods requiring covenant compliance.

---

## Advanced Features

### formatAsGrid()

**Formats encoded array into readable grid structure.**

```javascript
fc.formatAsGrid(encoded, width)
```

**Parameters**:
- `encoded`: `Array<string>` - Linear array of encoded elements
- `width`: `number` - Grid width for formatting

**Returns**: `Array<Array<string>>` - 2D grid representation

### logVerification()

**Logs verification events for covenant compliance tracking.**

```javascript
fc.logVerification(operation, data)
```

**Parameters**:
- `operation`: `string` - Type of operation performed
- `data`: `string` - Data involved in operation

**Returns**: `VerificationLog` - Log entry with timestamp and covenant information

**VerificationLog Structure**:
```javascript
{
    verificationId: number,      // Unique verification identifier
    institution: string,         // Institution identifier
    operation: string,           // Operation type
    timestamp: string,           // ISO timestamp
    covenantTriggered: boolean   // Covenant contribution triggered
}
```

### factorial()

**Helper method for factorial calculations.**

```javascript
fc.factorial(n)
```

**Parameters**:
- `n`: `number` - Number to calculate factorial for

**Returns**: `number` - Factorial of n  
**Description**: Recursive factorial implementation used in mathematical expressions.

---

## Error Handling

### Common Errors

#### CovenantNotAcceptedError

```javascript
// Thrown when attempting operations without covenant acceptance
try {
    fc.encode("test");
} catch (error) {
    if (error.message.includes("COVENANT VIOLATION")) {
        console.log("Memorial Covenant must be accepted first");
        // Handle covenant acceptance
    }
}
```

#### MathematicalExpressionError

```javascript
// Thrown when mathematical expressions are invalid
try {
    const result = fc.verify("invalid_expression", 1);
} catch (error) {
    console.log("Mathematical expression validation failed:", error.message);
}
```

#### EncodingError

```javascript
// Thrown when encoding/decoding operations fail
try {
    const encoded = fc.encode("");  // Empty string
    const decoded = fc.decode(encoded);
} catch (error) {
    console.log("Encoding/decoding error:", error.message);
}
```

### Error Handling Best Practices

```javascript
// Comprehensive error handling pattern
async function safeFC_Operation(message) {
    try {
        // Ensure covenant is accepted
        if (!fc.covenantAccepted) {
            await acceptInstitutionalCovenant();
        }
        
        // Perform FC operations with validation
        const encoded = fc.encode(message);
        const verification = fc.verify("√1", 1);
        const decoded = fc.decode(encoded);
        
        return {
            success: true,
            original: message,
            encoded: encoded,
            decoded: decoded,
            verified: verification
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message,
            errorType: error.constructor.name
        };
    }
}
```

---

## Performance Optimization

### Expression Caching

```javascript
// Cache frequently used expressions for performance
class OptimizedFractionalCore extends FractionalCore {
    constructor() {
        super();
        this.expressionCache = new Map();
        this.verificationCache = new Map();
    }
    
    verify(expression, expectedValue = 1) {
        // Check cache first
        const cacheKey = `${expression}:${expectedValue}`;
        if (this.verificationCache.has(cacheKey)) {
            return this.verificationCache.get(cacheKey);
        }
        
        // Perform verification and cache result
        const result = super.verify(expression, expectedValue);
        this.verificationCache.set(cacheKey, result);
        return result;
    }
}
```

### Batch Operations

```javascript
// Batch processing for large datasets
function batchEncode(messages, batchSize = 100) {
    const results = [];
    
    for (let i = 0; i < messages.length; i += batchSize) {
        const batch = messages.slice(i, i + batchSize);
        const batchResults = batch.map(msg => fc.encode(msg));
        results.push(...batchResults);
        
        // Optional: Progress reporting
        console.log(`Processed ${Math.min(i + batchSize, messages.length)}/${messages.length} messages`);
    }
    
    return results;
}
```

### Memory Management

```javascript
// Memory-efficient large-scale processing
function processLargeDataset(data) {
    const processed = [];
    
    for (const item of data) {
        // Process item
        const result = fc.encode(item.message);
        processed.push({
            id: item.id,
            encoded: result
        });
        
        // Clear intermediate variables for garbage collection
        if (processed.length % 1000 === 0) {
            // Force garbage collection opportunity
            if (global.gc) global.gc();
        }
    }
    
    return processed;
}
```

---

## Integration Patterns

### Educational Platform Integration

```javascript
class MathematicalAssessment {
    constructor() {
        this.fc = new FractionalCore();
        this.acceptInstitutionalCovenant();
    }
    
    async acceptInstitutionalCovenant() {
        const covenant = {
            humanitarianCommitment: true,
            cancerResearchSupport: true,
            openScienceCommitment: true,
            institutionName: "Educational Institution",
            contributionPlan: "Mathematical literacy advancement and student scholarships"
        };
        
        this.fc.acceptCovenant("Educational-Platform", covenant);
    }
    
    generateMathematicalCAPTCHA() {
        const expressions = this.fc.getStandardFractions();
        const correct = expressions[Math.floor(Math.random() * expressions.length)];
        const incorrect = ["4-2", "2×3", "5+1"];
        
        return {
            question: `Which expression equals 1?`,
            options: [correct.expr, ...incorrect.slice(0, 2)],
            correctAnswer: correct.expr
        };
    }
    
    validateStudentResponse(expression, expectedValue = 1) {
        return this.fc.verify(expression, expectedValue);
    }
}
```

### DeFi Authentication Integration

```javascript
class DeFiAuthentication {
    constructor() {
        this.fc = new FractionalCore();
        this.acceptDeFiCovenant();
    }
    
    async acceptDeFiCovenant() {
        const covenant = {
            humanitarianCommitment: true,
            cancerResearchSupport: true,
            openScienceCommitment: true,
            institutionName: "DeFi Platform",
            contributionPlan: "Transaction fee percentage to cancer research fund"
        };
        
        this.fc.acceptCovenant("DeFi-Platform", covenant);
    }
    
    generateUserChallenge(userAddress) {
        const personalSet = this.fc.generateIdentitySet(userAddress, 5);
        const challengeExpressions = personalSet.slice(0, 3);
        
        return {
            userAddress,
            challenges: challengeExpressions.map(expr => ({
                expression: expr.expr,
                latex: expr.latex
            })),
            timestamp: Date.now()
        };
    }
    
    verifyUserResponse(userAddress, responses) {
        const personalSet = this.fc.generateIdentitySet(userAddress, 5);
        const expectedExpressions = personalSet.slice(0, 3);
        
        return responses.every((response, index) => {
            return this.fc.verify(expectedExpressions[index].expr, 1);
        });
    }
}
```

### Supply Chain Verification

```javascript
class SupplyChainVerification {
    constructor() {
        this.fc = new FractionalCore();
        this.acceptSupplyChainCovenant();
    }
    
    async acceptSupplyChainCovenant() {
        const covenant = {
            humanitarianCommitment: true,
            cancerResearchSupport: true,
            openScienceCommitment: true,
            institutionName: "Supply Chain Platform",
            contributionPlan: "Pharmaceutical authentication preventing counterfeit cancer drugs"
        };
        
        this.fc.acceptCovenant("SupplyChain-Platform", covenant);
    }
    
    generateProductAuthentication(productId, batchNumber, manufacturer) {
        const authExpressions = [
            `√${productId * productId}/${productId}`,  // Resolves to 1
            `${batchNumber}^0`,                        // Any number^0 = 1
            `|${manufacturer.length - manufacturer.length}| + 1` // |0| + 1 = 1
        ];
        
        return {
            productId,
            batchNumber,
            manufacturer,
            authentication: authExpressions,
            timestamp: Date.now(),
            verifiable: authExpressions.every(expr => {
                try {
                    return eval(expr.replace('√', 'Math.sqrt').replace('^', '**')) === 1;
                } catch {
                    return false;
                }
            })
        };
    }
    
    verifyProductAuthenticity(authenticationData) {
        return authenticationData.authentication.every(expr => {
            return this.fc.verify(expr, 1);
        });
    }
}
```

---

## Examples and Tutorials

### Complete Working Example

```javascript
const FractionalCore = require('fractional-core');

async function demonstrateFC() {
    console.log("=== Fractional Core Demonstration ===\n");
    
    // 1. Initialize and accept covenant
    const fc = new FractionalCore();
    const covenant = {
        humanitarianCommitment: true,
        cancerResearchSupport: true,
        openScienceCommitment: true,
        institutionName: "Research Demo",
        contributionPlan: "Educational materials and mathematical literacy promotion"
    };
    
    try {
        fc.acceptCovenant("Demo-2025", covenant);
        console.log("✓ Memorial Covenant accepted\n");
    } catch (error) {
        console.error("✗ Covenant error:", error.message);
        return;
    }
    
    // 2. Display available expressions
    console.log("Available mathematical expressions:");
    const expressions = fc.getStandardFractions().slice(0, 5);
    expressions.forEach(expr => {
        console.log(`  ${expr.expr} = ${expr.value()}`);
    });
    console.log();
    
    // 3. Encode and decode message
    const message = "MATH";
    console.log(`Original message: "${message}"`);
    
    const encoded = fc.encode(message);
    console.log("Encoded with FC:");
    encoded.forEach((row, i) => {
        console.log(`  Row ${i+1}: ${row.join(' ')}`);
    });
    
    const decoded = fc.decode(encoded);
    console.log(`Decoded message: "${decoded}"`);
    console.log(`Round-trip success: ${message === decoded}\n`);
    
    // 4. Demonstrate verification
    console.log("Mathematical expression verification:");
    const testExpressions = ["√1", "0!", "7^0", "(2+2)/4"];
    testExpressions.forEach(expr => {
        const valid = fc.verify(expr, 1);
        console.log(`  ${expr} = 1? ${valid ? '✓' : '✗'}`);
    });
    console.log();
    
    // 5. Generate personal identity set
    console.log("Personal identity set for 'Demo':");
    const personalSet = fc.generateIdentitySet("Demo", 6);
    personalSet.forEach((expr, i) => {
        console.log(`  FC${i+1}: ${expr.expr} = ${expr.value()}`);
    });
    console.log();
    
    // 6. Show covenant impact
    console.log("Memorial Covenant Impact:");
    console.log(`  Total verifications: ${fc.verificationCount}`);
    console.log(`  Institution: ${fc.institutionId}`);
    console.log(`  Memorial: ${fc.FC_ORIGIN}`);
    
    console.log("\n=== Demo Complete ===");
    console.log("Every verification contributes to cancer research 🎗️");
}

// Run demonstration
demonstrateFC().catch(console.error);
```

### Educational Assessment Example

```javascript
// Complete educational assessment system
class FCEducationalAssessment {
    constructor(institutionName, contributionPlan) {
        this.fc = new FractionalCore();
        this.students = new Map();
        this.assessments = new Map();
        
        // Accept covenant for educational use
        const covenant = {
            humanitarianCommitment: true,
            cancerResearchSupport: true,
            openScienceCommitment: true,
            institutionName: institutionName,
            contributionPlan: contributionPlan
        };
        
        this.fc.acceptCovenant(`Education-${Date.now()}`, covenant);
    }
    
    createAssessment(assessmentId, difficulty = 'basic') {
        const expressions = difficulty === 'advanced' ? 
            this.fc.getAdvancedFractions() : 
            this.fc.getStandardFractions();
            
        const questions = [];
        for (let i = 0; i < 10; i++) {
            const correct = expressions[i % expressions.length];
            const incorrect = this.generateIncorrectOptions();
            
            questions.push({
                id: i + 1,
                question: `Which expression equals 1?`,
                options: this.shuffleArray([correct.expr, ...incorrect]),
                correctAnswer: correct.expr,
                explanation: `${correct.expr} = ${correct.value()}`
            });
        }
        
        this.assessments.set(assessmentId, {
            id: assessmentId,
            questions: questions,
            difficulty: difficulty,
            created: Date.now()
        });
        
        return assessmentId;
    }
    
    submitResponse(studentId, assessmentId, responses) {
        const assessment = this.assessments.get(assessmentId);
        if (!assessment) {
            throw new Error("Assessment not found");
        }
        
        let score = 0;
        const results = [];
        
        assessment.questions.forEach((question, index) => {
            const studentAnswer = responses[index];
            const isCorrect = studentAnswer === question.correctAnswer;
            
            // Verify the mathematical correctness
            const verified = this.fc.verify(question.correctAnswer, 1);
            
            if (isCorrect && verified) {
                score++;
            }
            
            results.push({
                questionId: question.id,
                studentAnswer: studentAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                verified: verified,
                explanation: question.explanation
            });
        });
        
        const studentResult = {
            studentId: studentId,
            assessmentId: assessmentId,
            score: score,
            totalQuestions: assessment.questions.length,
            percentage: Math.round((score / assessment.questions.length) * 100),
            results: results,
            completed: Date.now()
        };
        
        // Store student result
        if (!this.students.has(studentId)) {
            this.students.set(studentId, []);
        }
        this.students.get(studentId).push(studentResult);
        
        return studentResult;
    }
    
    generateIncorrectOptions() {
        return ["2+2", "3×2", "√9"];  // None equal 1
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    getStudentProgress(studentId) {
        const studentResults = this.students.get(studentId) || [];
        
        return {
            studentId: studentId,
            totalAssessments: studentResults.length,
            averageScore: studentResults.reduce((sum, result) => 
                sum + result.percentage, 0) / studentResults.length || 0,
            improvements: this.calculateImprovement(studentResults),
            lastAssessment: studentResults[studentResults.length - 1]
        };
    }
    
    calculateImprovement(results) {
        if (results.length < 2) return null;
        
        const first = results[0].percentage;
        const last = results[results.length - 1].percentage;
        return last - first;
    }
}

// Usage example
const assessment = new FCEducationalAssessment(
    "Demo High School", 
    "Student scholarships for mathematical excellence"
);

const assessmentId = assessment.createAssessment("math-101", "basic");
const studentResponses = ["√1", "2+2", "0!", "3×2", "7^0", "|−1|", "√4", "1+1", "(2+2)/4", "√9"];
const result = assessment.submitResponse("student123", assessmentId, studentResponses);

console.log("Student Assessment Result:", result);
```

---

## API Constants and Enums

### Mathematical Expression Types

```javascript
const FC_EXPRESSION_TYPES = {
    ALGEBRAIC: 'algebraic',
    FACTORIAL: 'factorial', 
    EXPONENTIAL: 'exponential',
    TRIGONOMETRIC: 'trigonometric',
    ABSOLUTE_VALUE: 'absolute',
    COMPLEX: 'complex'
};
```

### Covenant Status Codes

```javascript
const FC_COVENANT_STATUS = {
    NOT_ACCEPTED: 0,
    ACCEPTED: 1,
    VIOLATED: -1,
    EXPIRED: 2
};
```

### Error Types

```javascript
const FC_ERROR_TYPES = {
    COVENANT_NOT_ACCEPTED: 'CovenantNotAcceptedError',
    MATHEMATICAL_ERROR: 'MathematicalExpressionError',
    ENCODING_ERROR: 'EncodingError',
    VERIFICATION_ERROR: 'VerificationError',
    INITIALIZATION_ERROR: 'InitializationError'
};
```

---

## Conclusion

This API reference provides comprehensive documentation for implementing Fractional Core in academic, educational, and research applications. The framework combines mathematical elegance with humanitarian purpose, ensuring every implementation contributes to Lev Goukassian's mission of advancing cancer research and mathematical literacy.

**Key Integration Points**:
- **Memorial Covenant**: Required acceptance ensures humanitarian compliance
- **Mathematical Verification**: Cognitive authentication through mathematical literacy
- **Educational Applications**: Tools for mathematical assessment and learning
- **Research Support**: Academic validation and reproducible implementations
- **Community Impact**: Every verification contributes to cancer research advancement

**Mission Integration**: Every API call, every verification, every mathematical expression processed through FC carries forward the message "Truth is fractional. Hope is not." while contributing to the ultimate goal of eliminating cancer at its root.

---

**Developer Support**:
- **Technical Issues**: technical@fc-goukassian.org
- **Implementation Questions**: api@fc-goukassian.org
- **Educational Applications**: education@fc-goukassian.org
- **Research Collaborations**: research@fc-goukassian.org

**Additional Documentation**:
- **Quick Start Guide**: [docs/QUICK_START.md](../QUICK_START.md)
- **General FAQ**: [docs/GENERAL_FAQ.md](../GENERAL_FAQ.md)
- **Safety Guidelines**: [docs/MANDATORY.md](../MANDATORY.md)
- **Academic Validation**: [docs/ACADEMIC_VALIDATION.md](../ACADEMIC_VALIDATION.md)

---

Created by Lev Goukassian • ORCID: 0009-0006-5966-1243  
Email: leogouk@gmail.com  
Successor Contact: support@fc-goukassian.org  
See Succession Charter [FC-SUCCESSION-CHARTER.md](/FC-SUCCESSION-CHARTER.md)
