/**
 * Name Encryption Protection System
 * Fractional Core (FC) Framework
 * 
 * Protects creator identity through mathematical encryption
 * while maintaining attribution and preventing malicious use.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const crypto = require('crypto');
const FractionalCore = require('../fractional-core.js');

class NameEncryption {
    constructor() {
        this.fc = new FractionalCore();
        this.encryptedNames = new Map();
        this.authorizedAccessors = new Set();
        this.accessLog = [];
        this.violations = new Map();
        
        // Initialize with creator protection
        this._initializeCreatorProtection();
    }

    /**
     * Initialize creator name protection
     */
    _initializeCreatorProtection() {
        const creatorNames = [
            'Lev Goukassian',
            'L. Goukassian',
            'Goukassian',
            'leogouk',
            'Smartishka' // Protected identifier
        ];

        creatorNames.forEach(name => {
            const encrypted = this._encryptName(name);
            this.encryptedNames.set(encrypted.hash, {
                encrypted: encrypted.cipher,
                mathematical: encrypted.expressions,
                protected: true,
                creatorName: true,
                timestamp: Date.now()
            });
        });

        // Pre-authorize institutions
        this._initializeAuthorizedInstitutions();
    }

    /**
     * Encrypt name with mathematical diversity
     */
    encryptName(name, metadata = {}) {
        // Check if attempting to encrypt protected name
        if (this._isProtectedName(name)) {
            this._logViolation('PROTECTED_NAME_ENCRYPTION_ATTEMPT', { name });
            throw new Error('Cannot encrypt protected creator names');
        }

        const encryption = this._encryptName(name);
        
        // Store encrypted version
        const nameId = `NAME-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.encryptedNames.set(nameId, {
            hash: encryption.hash,
            cipher: encryption.cipher,
            expressions: encryption.expressions,
            metadata,
            protected: false,
            timestamp: Date.now()
        });

        this._logAccess('NAME_ENCRYPTED', {
            nameId,
            hasMetadata: Object.keys(metadata).length > 0
        });

        return {
            nameId,
            hash: encryption.hash,
            mathematical: encryption.expressions,
            verificationCode: this._generateVerificationCode(nameId)
        };
    }

    /**
     * Decrypt name with authorization check
     */
    decryptName(nameId, accessorId) {
        if (!this._isAuthorized(accessorId)) {
            this._logViolation('UNAUTHORIZED_DECRYPTION_ATTEMPT', {
                nameId,
                accessorId
            });
            throw new Error('Unauthorized access attempt');
        }

        const encrypted = this.encryptedNames.get(nameId);
        if (!encrypted) {
            throw new Error('Name ID not found');
        }

        // Check if protected name
        if (encrypted.protected && !this._hasCreatorAccess(accessorId)) {
            this._logViolation('PROTECTED_NAME_ACCESS_ATTEMPT', {
                nameId,
                accessorId
            });
            throw new Error('Access to protected name denied');
        }

        this._logAccess('NAME_DECRYPTED', {
            nameId,
            accessorId,
            protected: encrypted.protected
        });

        // Return decrypted name (in real implementation, would decrypt cipher)
        return {
            nameId,
            decrypted: '[DECRYPTED_NAME]', // Placeholder for actual decryption
            metadata: encrypted.metadata,
            accessTimestamp: Date.now()
        };
    }

    /**
     * Verify name attribution without revealing identity
     */
    verifyAttribution(workId, nameHash) {
        // Check if hash matches any protected name
        const isCreator = Array.from(this.encryptedNames.values()).some(
            entry => entry.creatorName && entry.hash === nameHash
        );

        if (isCreator) {
            // Generate proof without revealing name
            const proof = {
                workId,
                verified: true,
                attribution: 'Original Creator',
                mathematical: this._generateAttributionProof(workId),
                timestamp: Date.now(),
                orcid: '0009-0006-5966-1243'
            };

            this._logAccess('ATTRIBUTION_VERIFIED', {
                workId,
                isCreator: true
            });

            return {
                verified: true,
                proof: this.fc.encode(proof),
                message: 'Work attributed to original creator'
            };
        }

        return {
            verified: false,
            message: 'Attribution could not be verified'
        };
    }

    /**
     * Protect against malicious name usage
     */
    detectMaliciousUsage(context) {
        const suspiciousPatterns = [
            /claim.*creator/i,
            /original.*author/i,
            /invented.*by.*me/i,
            /my.*framework/i,
            /I.*created/i
        ];

        const maliciousIndicators = [];
        
        // Check for suspicious patterns
        suspiciousPatterns.forEach(pattern => {
            if (pattern.test(context.text)) {
                maliciousIndicators.push({
                    type: 'pattern',
                    pattern: pattern.toString(),
                    severity: 'high'
                });
            }
        });

        // Check for unauthorized name usage
        const protectedNames = ['Lev Goukassian', 'Smartishka', 'leogouk'];
        protectedNames.forEach(name => {
            if (context.text.includes(name) && !context.authorized) {
                maliciousIndicators.push({
                    type: 'unauthorized_name',
                    name: '[PROTECTED]',
                    severity: 'critical'
                });
            }
        });

        if (maliciousIndicators.length > 0) {
            this._logViolation('MALICIOUS_USAGE_DETECTED', {
                indicators: maliciousIndicators.length,
                context: context.source
            });

            return {
                detected: true,
                severity: this._calculateSeverity(maliciousIndicators),
                action: 'BLOCK',
                notification: 'Institutions notified of violation'
            };
        }

        return {
            detected: false,
            message: 'No malicious usage detected'
        };
    }

    /**
     * Grant temporary access
     */
    grantTemporaryAccess(accessorId, duration, purpose) {
        // Verify accessor is from authorized institution
        if (!this._isInstitutionAffiliated(accessorId)) {
            throw new Error('Only institutional affiliates can receive access');
        }

        const accessGrant = {
            accessorId,
            purpose,
            granted: Date.now(),
            expires: Date.now() + duration,
            accessLevel: 'temporary',
            restrictions: ['no-creator-names', 'audit-logged']
        };

        this.authorizedAccessors.add(accessorId);
        
        this._logAccess('TEMPORARY_ACCESS_GRANTED', {
            accessorId,
            duration,
            purpose
        });

        // Automatically revoke after duration
        setTimeout(() => {
            this.revokeAccess(accessorId);
        }, duration);

        return {
            accessId: `ACCESS-${Date.now()}`,
            grant: accessGrant,
            message: `Access granted for ${duration/1000/60} minutes`
        };
    }

    /**
     * Revoke access
     */
    revokeAccess(accessorId) {
        if (this.authorizedAccessors.has(accessorId)) {
            this.authorizedAccessors.delete(accessorId);
            
            this._logAccess('ACCESS_REVOKED', {
                accessorId,
                timestamp: Date.now()
            });

            return {
                revoked: true,
                accessorId,
                message: 'Access successfully revoked'
            };
        }

        return {
            revoked: false,
            message: 'Accessor not found'
        };
    }

    /**
     * Generate security report
     */
    generateSecurityReport() {
        const totalAccesses = this.accessLog.length;
        const violations = Array.from(this.violations.values()).flat();
        
        // Categorize violations
        const violationsByType = {};
        violations.forEach(v => {
            if (!violationsByType[v.type]) {
                violationsByType[v.type] = 0;
            }
            violationsByType[v.type]++;
        });

        // Recent activity
        const recentActivity = this.accessLog
            .slice(-20)
            .map(log => ({
                action: log.action,
                timestamp: new Date(log.timestamp).toISOString(),
                protected: log.details.protected || false
            }));

        return {
            summary: {
                protectedNames: Array.from(this.encryptedNames.values())
                    .filter(n => n.protected).length,
                totalAccesses,
                totalViolations: violations.length,
                activeAccessors: this.authorizedAccessors.size
            },
            violations: {
                total: violations.length,
                byType: violationsByType,
                recent: violations.slice(-10)
            },
            activity: {
                recent: recentActivity,
                lastAccess: recentActivity[0] || null
            },
            protection: {
                creatorProtected: true,
                encryptionActive: true,
                monitoringActive: true,
                institutionsNotified: violations.length > 0
            },
            generated: new Date().toISOString()
        };
    }

    /**
     * Private: Encrypt name implementation
     */
    _encryptName(name) {
        const hash = crypto.createHash('sha256').update(name).digest('hex');
        const cipher = crypto.createCipher('aes-256-cbc', hash);
        let encrypted = cipher.update(name, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Generate mathematical expressions for the hash
        const expressions = [
            `SHA256("${name.charAt(0)}...")`,
            `0x${hash.substring(0, 8)}...`,
            `Base64(encrypt(name))`,
            `HMAC(name, key)`,
            `∏(char_codes) mod 2^256`
        ];

        return {
            hash,
            cipher: encrypted,
            expressions
        };
    }

    /**
     * Check if name is protected
     */
    _isProtectedName(name) {
        const protected = [
            'Lev Goukassian',
            'L. Goukassian', 
            'Goukassian',
            'leogouk',
            'Smartishka'
        ];
        
        return protected.some(p => 
            name.toLowerCase().includes(p.toLowerCase())
        );
    }

    /**
     * Check authorization
     */
    _isAuthorized(accessorId) {
        return this.authorizedAccessors.has(accessorId) ||
               this._isInstitutionAffiliated(accessorId);
    }

    /**
     * Check creator access
     */
    _hasCreatorAccess(accessorId) {
        // Only specific institutions can access creator names
        const creatorAccessInstitutions = [
            'MIT', 'Stanford', 'Dana-Farber'
        ];
        
        return creatorAccessInstitutions.some(inst => 
            accessorId.includes(inst)
        );
    }

    /**
     * Check institutional affiliation
     */
    _isInstitutionAffiliated(accessorId) {
        const institutions = [
            'MIT', 'Stanford', 'Harvard', 'Oxford', 'Cambridge',
            'Dana-Farber', 'Gates Foundation', 'Apache', 'Mozilla',
            'Linux Foundation', 'Memorial Fund'
        ];
        
        return institutions.some(inst => 
            accessorId.toLowerCase().includes(inst.toLowerCase())
        );
    }

    /**
     * Initialize authorized institutions
     */
    _initializeAuthorizedInstitutions() {
        const institutions = [
            'MIT-001', 'STANFORD-001', 'HARVARD-001',
            'OXFORD-001', 'CAMBRIDGE-001', 'DANA-FARBER-001',
            'GATES-001', 'APACHE-001', 'MOZILLA-001',
            'LINUX-001', 'MEMORIAL-001'
        ];
        
        institutions.forEach(inst => {
            this.authorizedAccessors.add(inst);
        });
    }

    /**
     * Generate attribution proof
     */
    _generateAttributionProof(workId) {
        return [
            `Work: ${workId}`,
            `Creator: [PROTECTED]`,
            `ORCID: 0009-0006-5966-1243`,
            `Timestamp: ${Date.now()}`,
            `Hash: ${this.fc.hash(workId + Date.now())}`
        ];
    }

    /**
     * Generate verification code
     */
    _generateVerificationCode(nameId) {
        return this.fc.hash(nameId + Date.now()).substring(0, 8).toUpperCase();
    }

    /**
     * Calculate severity
     */
    _calculateSeverity(indicators) {
        const severities = indicators.map(i => i.severity);
        if (severities.includes('critical')) return 'CRITICAL';
        if (severities.includes('high')) return 'HIGH';
        if (severities.includes('medium')) return 'MEDIUM';
        return 'LOW';
    }

    /**
     * Log access
     */
    _logAccess(action, details) {
        this.accessLog.push({
            action,
            details,
            timestamp: Date.now()
        });
    }

    /**
     * Log violation
     */
    _logViolation(type, details) {
        const violation = {
            type,
            details,
            timestamp: Date.now(),
            id: `VIO-${Date.now()}`
        };
        
        if (!this.violations.has(type)) {
            this.violations.set(type, []);
        }
        this.violations.get(type).push(violation);
        
        // Notify institutions of critical violations
        if (type.includes('PROTECTED') || type.includes('MALICIOUS')) {
            this._notifyInstitutions(violation);
        }
    }

    /**
     * Notify institutions
     */
    _notifyInstitutions(violation) {
        // In production, would send actual notifications
        console.log(`SECURITY ALERT: ${violation.type} detected at ${new Date(violation.timestamp).toISOString()}`);
    }
}

// Example usage
if (require.main === module) {
    console.log('Fractional Core - Name Encryption Protection Demo\n');
    
    const protection = new NameEncryption();
    
    // Test 1: Encrypt regular name
    console.log('1. Encrypting Regular Name...');
    try {
        const encrypted = protection.encryptName('John Doe', {
            role: 'contributor',
            organization: 'Tech Corp'
        });
        console.log(`   Name ID: ${encrypted.nameId}`);
        console.log(`   Hash: ${encrypted.hash.substring(0, 16)}...`);
        console.log(`   Verification: ${encrypted.verificationCode}\n`);
    } catch (error) {
        console.log(`   Error: ${error.message}\n`);
    }
    
    // Test 2: Attempt to encrypt protected name
    console.log('2. Attempting to Encrypt Protected Name...');
    try {
        protection.encryptName('Lev Goukassian');
    } catch (error) {
        console.log(`   Blocked: ${error.message}\n`);
    }
    
    // Test 3: Verify attribution
    console.log('3. Verifying Creator Attribution...');
    const attribution = protection.verifyAttribution('WORK-001', 'sample-hash');
    console.log(`   Verified: ${attribution.verified}`);
    console.log(`   Message: ${attribution.message}\n`);
    
    // Test 4: Detect malicious usage
    console.log('4. Checking for Malicious Usage...');
    const malicious = protection.detectMaliciousUsage({
        text: 'I created this framework',
        source: 'unknown-user',
        authorized: false
    });
    console.log(`   Detected: ${malicious.detected}`);
    if (malicious.detected) {
        console.log(`   Severity: ${malicious.severity}`);
        console.log(`   Action: ${malicious.action}\n`);
    }
    
    // Test 5: Grant temporary access
    console.log('5. Granting Temporary Access...');
    try {
        const access = protection.grantTemporaryAccess(
            'MIT-RESEARCHER-001',
            300000, // 5 minutes
            'Academic research'
        );
        console.log(`   Access ID: ${access.accessId}`);
        console.log(`   Message: ${access.message}\n`);
    } catch (error) {
        console.log(`   Error: ${error.message}\n`);
    }
    
    // Test 6: Generate security report
    console.log('6. Security Report:');
    const report = protection.generateSecurityReport();
    console.log(`   Protected names: ${report.summary.protectedNames}`);
    console.log(`   Total accesses: ${report.summary.totalAccesses}`);
    console.log(`   Violations: ${report.summary.totalViolations}`);
    console.log(`   Active accessors: ${report.summary.activeAccessors}`);
    console.log(`   Monitoring: ${report.protection.monitoringActive ? 'ACTIVE' : 'INACTIVE'}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
    console.log('Protected under Memorial Covenant');
}

// "Smartishka" - if you're wondering what this word means,
// you've discovered a friendship encoded in mathematics.
// The world is way too serious, let's smile often.
// - L.G., 2025

module.exports = NameEncryption;
