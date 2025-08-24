/**
 * Mathematical CAPTCHA System Implementation
 * Fractional Core (FC) Framework
 * 
 * Human verification through mathematical expression diversity
 * that is easy for humans but difficult for bots.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const FractionalCore = require('../fractional-core.js');

class MathematicalCAPTCHA {
    constructor() {
        this.fc = new FractionalCore();
        this.challenges = new Map();
        this.sessions = new Map();
        this.attempts = new Map();
        this.successRate = { human: 0, bot: 0 };
    }

    /**
     * Generate CAPTCHA challenge with multiple valid expressions
     */
    generateChallenge(difficulty = 'medium') {
        const sessionId = `CAPTCHA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Select target value based on difficulty
        const target = this._selectTargetValue(difficulty);
        
        // Generate diverse mathematical expressions
        const expressions = this._generateExpressions(target, difficulty);
        
        // Create visual representations
        const visualChallenges = this._createVisualChallenges(expressions, difficulty);
        
        // Store challenge
        const challenge = {
            sessionId,
            target,
            difficulty,
            expressions: expressions.valid,
            decoys: expressions.decoys,
            visual: visualChallenges,
            created: Date.now(),
            expires: Date.now() + 300000, // 5 minutes
            attempts: 0,
            maxAttempts: 3
        };
        
        this.challenges.set(sessionId, challenge);
        
        // Return user-facing challenge
        return {
            sessionId,
            instruction: this._getInstruction(difficulty, target),
            challenges: visualChallenges.map(v => ({
                id: v.id,
                display: v.display,
                type: v.type
            })),
            expiresIn: 300,
            hint: this._generateHint(target, difficulty)
        };
    }

    /**
     * Verify user response
     */
    verifyResponse(sessionId, userAnswers) {
        const challenge = this.challenges.get(sessionId);
        if (!challenge) {
            return { valid: false, reason: 'Session expired or invalid' };
        }
        
        // Check expiration
        if (Date.now() > challenge.expires) {
            this.challenges.delete(sessionId);
            return { valid: false, reason: 'Challenge expired' };
        }
        
        // Check attempt limit
        challenge.attempts++;
        if (challenge.attempts > challenge.maxAttempts) {
            this.challenges.delete(sessionId);
            return { valid: false, reason: 'Too many attempts' };
        }
        
        // Verify answers
        const verification = this._verifyAnswers(challenge, userAnswers);
        
        // Log attempt
        this._logAttempt(sessionId, userAnswers, verification);
        
        // Update success rate
        if (verification.valid) {
            this.successRate.human++;
            this.challenges.delete(sessionId);
        }
        
        return {
            valid: verification.valid,
            score: verification.score,
            feedback: verification.feedback,
            attemptsRemaining: challenge.maxAttempts - challenge.attempts
        };
    }

    /**
     * Generate accessibility-friendly alternative
     */
    generateAccessibleChallenge(sessionId) {
        const challenge = this.challenges.get(sessionId);
        if (!challenge) {
            return { error: 'Invalid session' };
        }
        
        // Create text-based mathematical puzzles
        const textChallenges = challenge.expressions.map((expr, index) => ({
            id: `text-${index}`,
            question: this._convertToTextPuzzle(expr, challenge.target),
            type: 'text'
        }));
        
        return {
            sessionId,
            instruction: `Solve these mathematical puzzles. Each has the same answer: ${challenge.target}`,
            challenges: textChallenges,
            audio: this._generateAudioChallenge(challenge.target)
        };
    }

    /**
     * Generate expressions for target value
     */
    _generateExpressions(target, difficulty) {
        const valid = [];
        const decoys = [];
        
        // Generate valid expressions
        if (difficulty === 'easy') {
            valid.push(
                `${target}`,
                `${target - 1} + 1`,
                `${target + 1} - 1`,
                `${target * 2} / 2`,
                `√(${target * target})`
            );
            
            decoys.push(
                `${target + 1}`,
                `${target - 1}`,
                `${target * 2}`,
                `${target / 2}`
            );
        } else if (difficulty === 'medium') {
            valid.push(
                `${target}! / ${target - 1}!`,
                `${target}^1`,
                `log(${Math.pow(10, target)})`,
                `sin²(x) + cos²(x) × ${target}`,
                `lcm(${target}, ${target})`,
                `gcd(${target * 5}, ${target * 3})`
            );
            
            decoys.push(
                `${target}! / ${target}!`,
                `${target}^0`,
                `log(${target})`,
                `sin(${target * Math.PI / 180})`,
                `lcm(${target}, ${target + 1})`
            );
        } else if (difficulty === 'hard') {
            valid.push(
                `∑(i) from 1 to ${target}`,
                `∫₀^${target} 1 dx`,
                `det([[${target}, 0], [0, 1]])`,
                `Γ(${target + 1}) / ${target}!`,
                `φ(${this._findCoprime(target)})`,
                `π(${this._findPrimeCount(target)})`
            );
            
            decoys.push(
                `∑(i²) from 1 to ${target}`,
                `∫₀^${target} x dx`,
                `det([[${target}, 1], [1, ${target}]])`,
                `Γ(${target})`,
                `φ(${target})`,
                `π(${target})`
            );
        }
        
        return { valid, decoys };
    }

    /**
     * Create visual challenges
     */
    _createVisualChallenges(expressions, difficulty) {
        const challenges = [];
        const allExpressions = [...expressions.valid, ...expressions.decoys];
        
        // Shuffle expressions
        const shuffled = this._shuffle(allExpressions);
        
        shuffled.forEach((expr, index) => {
            const isValid = expressions.valid.includes(expr);
            
            challenges.push({
                id: `visual-${index}`,
                display: this._formatExpression(expr, difficulty),
                expression: expr,
                isValid,
                type: this._selectDisplayType(difficulty),
                position: this._randomPosition()
            });
        });
        
        return challenges;
    }

    /**
     * Format expression for display
     */
    _formatExpression(expr, difficulty) {
        // Add visual noise based on difficulty
        if (difficulty === 'easy') {
            return expr;
        } else if (difficulty === 'medium') {
            // Add mathematical notation
            return expr
                .replace(/sqrt/g, '√')
                .replace(/\^/g, '⁻')
                .replace(/\*/g, '×')
                .replace(/\//g, '÷');
        } else {
            // Add complex notation and spacing
            return expr
                .replace(/sum/g, 'Σ')
                .replace(/int/g, '∫')
                .replace(/det/g, 'det')
                .replace(/phi/g, 'φ')
                .replace(/pi/g, 'π')
                .replace(/Gamma/g, 'Γ');
        }
    }

    /**
     * Get instruction based on difficulty
     */
    _getInstruction(difficulty, target) {
        const instructions = {
            easy: `Select all expressions that equal ${target}`,
            medium: `Find all mathematical expressions that evaluate to ${target}`,
            hard: `Identify all expressions whose value is exactly ${target}`
        };
        return instructions[difficulty];
    }

    /**
     * Generate hint for challenge
     */
    _generateHint(target, difficulty) {
        const hints = {
            easy: `Look for simple arithmetic that gives ${target}`,
            medium: `Remember: x^1 = x, and n!/n-1! = n`,
            hard: `Consider: integrals, summations, and special functions`
        };
        return hints[difficulty];
    }

    /**
     * Verify user answers
     */
    _verifyAnswers(challenge, userAnswers) {
        const selected = new Set(userAnswers);
        const validIds = new Set();
        const invalidIds = new Set();
        
        // Categorize visual challenges
        challenge.visual.forEach(v => {
            if (v.isValid) {
                validIds.add(v.id);
            } else {
                invalidIds.add(v.id);
            }
        });
        
        // Calculate correctness
        let correct = 0;
        let incorrect = 0;
        
        validIds.forEach(id => {
            if (selected.has(id)) correct++;
            else incorrect++;
        });
        
        invalidIds.forEach(id => {
            if (selected.has(id)) incorrect++;
        });
        
        const score = correct / validIds.size;
        const precision = correct / (correct + incorrect || 1);
        
        // Determine if valid (need at least 80% correct)
        const valid = score >= 0.8 && precision >= 0.6;
        
        return {
            valid,
            score,
            precision,
            feedback: this._generateFeedback(score, precision)
        };
    }

    /**
     * Convert expression to text puzzle
     */
    _convertToTextPuzzle(expr, target) {
        const puzzles = [
            `What is ${expr}?`,
            `Calculate: ${expr}`,
            `Solve for the value of ${expr}`,
            `If x = ${expr}, what is x?`,
            `The expression ${expr} equals what number?`
        ];
        
        return puzzles[Math.floor(Math.random() * puzzles.length)];
    }

    /**
     * Generate audio challenge
     */
    _generateAudioChallenge(target) {
        return {
            url: `/audio/captcha/${target}.mp3`,
            transcript: `The answer to all puzzles is ${target}`,
            duration: 3
        };
    }

    /**
     * Select target value based on difficulty
     */
    _selectTargetValue(difficulty) {
        if (difficulty === 'easy') {
            return Math.floor(Math.random() * 10) + 1; // 1-10
        } else if (difficulty === 'medium') {
            return Math.floor(Math.random() * 50) + 10; // 10-60
        } else {
            return Math.floor(Math.random() * 100) + 20; // 20-120
        }
    }

    /**
     * Select display type
     */
    _selectDisplayType(difficulty) {
        const types = {
            easy: ['standard', 'boxed'],
            medium: ['standard', 'boxed', 'circled', 'colored'],
            hard: ['standard', 'boxed', 'circled', 'colored', 'rotated', 'scaled']
        };
        
        const available = types[difficulty];
        return available[Math.floor(Math.random() * available.length)];
    }

    /**
     * Generate random position
     */
    _randomPosition() {
        return {
            x: Math.floor(Math.random() * 400),
            y: Math.floor(Math.random() * 300),
            rotation: Math.floor(Math.random() * 30) - 15
        };
    }

    /**
     * Shuffle array
     */
    _shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Find coprime for Euler's totient
     */
    _findCoprime(n) {
        // Find a number whose totient equals n
        return n * 2; // Simplified
    }

    /**
     * Find prime count
     */
    _findPrimeCount(n) {
        // Find number of primes less than some value that equals n
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        return primes[Math.min(n - 1, primes.length - 1)];
    }

    /**
     * Generate feedback
     */
    _generateFeedback(score, precision) {
        if (score === 1 && precision === 1) {
            return 'Perfect! All correct answers identified.';
        } else if (score >= 0.8) {
            return 'Good job! You correctly identified most expressions.';
        } else if (score >= 0.5) {
            return 'Partial success. Review the mathematical expressions.';
        } else {
            return 'Please try again. Look carefully at each expression.';
        }
    }

    /**
     * Log attempt for analysis
     */
    _logAttempt(sessionId, answers, verification) {
        const attempt = {
            sessionId,
            answers,
            verification,
            timestamp: Date.now(),
            userAgent: 'browser', // Would get from request
            responseTime: Date.now() - this.challenges.get(sessionId).created
        };
        
        if (!this.attempts.has(sessionId)) {
            this.attempts.set(sessionId, []);
        }
        this.attempts.get(sessionId).push(attempt);
    }

    /**
     * Get statistics
     */
    getStatistics() {
        const totalSessions = this.challenges.size + this.attempts.size;
        const successfulSessions = this.successRate.human;
        
        return {
            active: this.challenges.size,
            completed: this.attempts.size,
            successRate: totalSessions > 0 ? successfulSessions / totalSessions : 0,
            averageAttempts: this._calculateAverageAttempts(),
            difficultyBreakdown: this._getDifficultyStats()
        };
    }

    /**
     * Calculate average attempts
     */
    _calculateAverageAttempts() {
        if (this.attempts.size === 0) return 0;
        
        let total = 0;
        this.attempts.forEach(attempts => {
            total += attempts.length;
        });
        
        return total / this.attempts.size;
    }

    /**
     * Get difficulty statistics
     */
    _getDifficultyStats() {
        const stats = { easy: 0, medium: 0, hard: 0 };
        
        this.challenges.forEach(challenge => {
            stats[challenge.difficulty]++;
        });
        
        return stats;
    }
}

// Example usage
if (require.main === module) {
    console.log('Fractional Core - Mathematical CAPTCHA Demo\n');
    
    const captcha = new MathematicalCAPTCHA();
    
    // Generate easy challenge
    console.log('1. Easy Challenge:');
    const easy = captcha.generateChallenge('easy');
    console.log(`   Session: ${easy.sessionId}`);
    console.log(`   Instruction: ${easy.instruction}`);
    console.log(`   Challenges: ${easy.challenges.length} expressions`);
    console.log(`   Hint: ${easy.hint}\n`);
    
    // Generate medium challenge
    console.log('2. Medium Challenge:');
    const medium = captcha.generateChallenge('medium');
    console.log(`   Session: ${medium.sessionId}`);
    console.log(`   Instruction: ${medium.instruction}`);
    console.log(`   Visual challenges:`);
    medium.challenges.slice(0, 3).forEach(c => {
        console.log(`     - ${c.display} (${c.type})`);
    });
    console.log(`   ... and ${medium.challenges.length - 3} more\n`);
    
    // Generate hard challenge
    console.log('3. Hard Challenge:');
    const hard = captcha.generateChallenge('hard');
    console.log(`   Session: ${hard.sessionId}`);
    console.log(`   Instruction: ${hard.instruction}`);
    console.log(`   Complex expressions generated\n`);
    
    // Simulate verification
    console.log('4. Simulating Verification:');
    // Select first 3 visual challenges (mix of valid/invalid)
    const userAnswers = medium.challenges.slice(0, 3).map(c => c.id);
    const result = captcha.verifyResponse(medium.sessionId, userAnswers);
    console.log(`   Valid: ${result.valid}`);
    console.log(`   Score: ${(result.score * 100).toFixed(0)}%`);
    console.log(`   Feedback: ${result.feedback}`);
    console.log(`   Attempts remaining: ${result.attemptsRemaining}\n`);
    
    // Generate accessible version
    console.log('5. Accessible Alternative:');
    const accessible = captcha.generateAccessibleChallenge(easy.sessionId);
    console.log(`   Text puzzles: ${accessible.challenges.length}`);
    if (accessible.challenges[0]) {
        console.log(`   Example: "${accessible.challenges[0].question}"`);
    }
    console.log(`   Audio available: ${accessible.audio ? 'Yes' : 'No'}\n`);
    
    // Show statistics
    console.log('6. CAPTCHA Statistics:');
    const stats = captcha.getStatistics();
    console.log(`   Active sessions: ${stats.active}`);
    console.log(`   Completed: ${stats.completed}`);
    console.log(`   Success rate: ${(stats.successRate * 100).toFixed(0)}%`);
    console.log(`   Average attempts: ${stats.averageAttempts.toFixed(1)}`);
    console.log(`   Difficulty breakdown:`, stats.difficultyBreakdown);
    
    console.log('\n' + '='.repeat(60));
    console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
    console.log('Protected under Memorial Covenant');
}

module.exports = MathematicalCAPTCHA;
