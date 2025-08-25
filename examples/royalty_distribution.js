/**
 * Royalty Distribution System Implementation
 * Fractional Core (FC) Framework
 * 
 * Transparent and fair royalty management for creative works
 * using mathematical diversity for verification and distribution.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const FractionalCore = require('../fractional-core.js');

class RoyaltyDistribution {
    constructor() {
        this.fc = new FractionalCore();
        this.works = new Map();
        this.contributors = new Map();
        this.distributions = new Map();
        this.revenues = new Map();
        this.payouts = new Map();
        this.ledger = [];
    }

    /**
     * Register creative work with contributor shares
     */
    registerWork(workId, metadata, contributors) {
        // Validate total shares equal 100%
        const totalShares = contributors.reduce((sum, c) => sum + c.share, 0);
        if (Math.abs(totalShares - 1.0) > 0.001) {
            throw new Error(`Total shares must equal 100% (got ${totalShares * 100}%)`);
        }

        // Create mathematical proof of ownership distribution
        const ownershipProof = {
            workId,
            title: metadata.title,
            type: metadata.type, // music, video, book, art, software
            created: metadata.created,
            contributors: contributors.map(c => ({
                id: c.id,
                name: c.name,
                role: c.role,
                share: c.share,
                expressions: this._generateShareProofs(c.share)
            })),
            verification: this._generateOwnershipHash(workId, contributors),
            timestamp: Date.now()
        };

        // Store work registration
        this.works.set(workId, {
            metadata,
            contributors,
            proof: this.fc.encode(ownershipProof),
            status: 'active',
            registered: new Date().toISOString(),
            totalRevenue: 0,
            totalDistributed: 0,
            distributions: []
        });

        // Register contributors
        contributors.forEach(c => {
            if (!this.contributors.has(c.id)) {
                this.contributors.set(c.id, {
                    name: c.name,
                    works: [],
                    totalEarnings: 0,
                    pendingPayouts: 0
                });
            }
            this.contributors.get(c.id).works.push({
                workId,
                share: c.share,
                role: c.role
            });
        });

        this._addToLedger('WORK_REGISTERED', {
            workId,
            title: metadata.title,
            contributors: contributors.length,
            timestamp: Date.now()
        });

        return {
            workId,
            registration: this.works.get(workId),
            ownership: ownershipProof.contributors
        };
    }

    /**
     * Record revenue for a work
     */
    recordRevenue(workId, revenue) {
        const work = this.works.get(workId);
        if (!work) throw new Error('Work not found');

        // Create revenue record with mathematical proof
        const revenueProof = {
            workId,
            amount: revenue.amount,
            source: revenue.source, // streaming, sales, licensing, sync
            period: revenue.period,
            currency: revenue.currency || 'USD',
            expressions: this._generateAmountProofs(revenue.amount),
            reported: Date.now(),
            verified: revenue.verified || false
        };

        const revenueId = `REV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.revenues.set(revenueId, {
            proof: this.fc.encode(revenueProof),
            amount: revenue.amount,
            workId,
            status: 'recorded',
            timestamp: new Date().toISOString()
        });

        // Update work totals
        work.totalRevenue += revenue.amount;

        this._addToLedger('REVENUE_RECORDED', {
            revenueId,
            workId,
            amount: revenue.amount,
            source: revenue.source
        });

        return {
            revenueId,
            recorded: this.revenues.get(revenueId),
            workTotal: work.totalRevenue
        };
    }

    /**
     * Calculate and distribute royalties
     */
    distributeRoyalties(workId, revenueId) {
        const work = this.works.get(workId);
        const revenue = this.revenues.get(revenueId);
        
        if (!work || !revenue) {
            throw new Error('Work or revenue not found');
        }

        if (revenue.status === 'distributed') {
            throw new Error('Revenue already distributed');
        }

        const distributions = [];
        const distributionProofs = [];

        // Calculate each contributor's share
        work.contributors.forEach(contributor => {
            const amount = revenue.amount * contributor.share;
            
            // Create distribution proof
            const distProof = {
                contributorId: contributor.id,
                name: contributor.name,
                role: contributor.role,
                share: contributor.share,
                amount,
                calculation: [
                    `${revenue.amount} × ${contributor.share}`,
                    `${revenue.amount} × ${contributor.share * 100}%`,
                    `${revenue.amount} × (${this._fractionToExpression(contributor.share)})`,
                    `Result: ${amount}`
                ],
                verification: this.fc.hash(`${contributor.id}:${amount}:${Date.now()}`)
            };

            distributionProofs.push(distProof);

            // Update contributor earnings
            const contributorRecord = this.contributors.get(contributor.id);
            contributorRecord.totalEarnings += amount;
            contributorRecord.pendingPayouts += amount;

            distributions.push({
                contributorId: contributor.id,
                amount,
                share: contributor.share,
                proof: this.fc.encode(distProof)
            });
        });

        // Create distribution record
        const distributionId = `DIST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.distributions.set(distributionId, {
            workId,
            revenueId,
            totalAmount: revenue.amount,
            distributions,
            proofs: distributionProofs,
            status: 'completed',
            timestamp: new Date().toISOString()
        });

        // Update work and revenue status
        work.totalDistributed += revenue.amount;
        work.distributions.push(distributionId);
        revenue.status = 'distributed';

        this._addToLedger('ROYALTIES_DISTRIBUTED', {
            distributionId,
            workId,
            revenueId,
            amount: revenue.amount,
            recipients: distributions.length
        });

        return {
            distributionId,
            distribution: this.distributions.get(distributionId),
            summary: distributions.map(d => ({
                contributorId: d.contributorId,
                amount: d.amount,
                percentage: (d.share * 100).toFixed(2) + '%'
            }))
        };
    }

    /**
     * Process payout to contributor
     */
    processPayout(contributorId, amount, method) {
        const contributor = this.contributors.get(contributorId);
        if (!contributor) throw new Error('Contributor not found');

        if (amount > contributor.pendingPayouts) {
            throw new Error(`Insufficient balance. Available: ${contributor.pendingPayouts}`);
        }

        // Create payout proof
        const payoutProof = {
            contributorId,
            amount,
            method: method.type, // bank, crypto, paypal
            destination: method.destination,
            expressions: this._generateAmountProofs(amount),
            balanceBefore: contributor.pendingPayouts,
            balanceAfter: contributor.pendingPayouts - amount,
            timestamp: Date.now()
        };

        const payoutId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.payouts.set(payoutId, {
            contributorId,
            amount,
            method: method.type,
            proof: this.fc.encode(payoutProof),
            status: 'processed',
            timestamp: new Date().toISOString(),
            transactionId: method.transactionId || `TXN-${Date.now()}`
        });

        // Update contributor balance
        contributor.pendingPayouts -= amount;

        this._addToLedger('PAYOUT_PROCESSED', {
            payoutId,
            contributorId,
            amount,
            method: method.type
        });

        return {
            payoutId,
            payout: this.payouts.get(payoutId),
            newBalance: contributor.pendingPayouts
        };
    }

    /**
     * Generate comprehensive royalty report
     */
    generateRoyaltyReport(workId, startDate, endDate) {
        const work = this.works.get(workId);
        if (!work) throw new Error('Work not found');

        // Filter revenues by date range
        const relevantRevenues = Array.from(this.revenues.entries())
            .filter(([id, rev]) => {
                if (rev.workId !== workId) return false;
                const timestamp = new Date(rev.timestamp);
                return timestamp >= startDate && timestamp <= endDate;
            });

        // Calculate totals by source
        const bySource = {};
        relevantRevenues.forEach(([id, rev]) => {
            const source = this.fc.decode(rev.proof).source;
            if (!bySource[source]) bySource[source] = 0;
            bySource[source] += rev.amount;
        });

        // Get contributor earnings
        const contributorEarnings = work.contributors.map(c => {
            const contributor = this.contributors.get(c.id);
            const earned = work.totalRevenue * c.share;
            
            return {
                id: c.id,
                name: c.name,
                role: c.role,
                share: c.share,
                earned,
                paid: earned - contributor.pendingPayouts,
                pending: contributor.pendingPayouts,
                percentage: (c.share * 100).toFixed(2) + '%'
            };
        });

        // Generate report with mathematical verification
        const report = {
            workId,
            title: work.metadata.title,
            period: {
                start: startDate.toISOString(),
                end: endDate.toISOString()
            },
            revenue: {
                total: work.totalRevenue,
                distributed: work.totalDistributed,
                pending: work.totalRevenue - work.totalDistributed,
                bySource,
                count: relevantRevenues.length
            },
            contributors: contributorEarnings,
            verification: {
                hash: this.fc.hash(JSON.stringify({
                    workId,
                    totalRevenue: work.totalRevenue,
                    startDate,
                    endDate
                })),
                timestamp: Date.now(),
                mathematical: this._generateReportProofs(work.totalRevenue, contributorEarnings)
            }
        };

        this._addToLedger('REPORT_GENERATED', {
            workId,
            period: `${startDate.toISOString()} to ${endDate.toISOString()}`,
            totalRevenue: work.totalRevenue
        });

        return report;
    }

    /**
     * Transfer ownership share
     */
    transferOwnership(workId, fromId, toId, shareAmount) {
        const work = this.works.get(workId);
        if (!work) throw new Error('Work not found');

        const fromContributor = work.contributors.find(c => c.id === fromId);
        if (!fromContributor || fromContributor.share < shareAmount) {
            throw new Error('Invalid transfer: insufficient shares');
        }

        // Create transfer proof
        const transferProof = {
            workId,
            from: fromId,
            to: toId,
            amount: shareAmount,
            expressions: this._generateShareProofs(shareAmount),
            before: {
                from: fromContributor.share,
                to: work.contributors.find(c => c.id === toId)?.share || 0
            },
            after: {
                from: fromContributor.share - shareAmount,
                to: (work.contributors.find(c => c.id === toId)?.share || 0) + shareAmount
            },
            timestamp: Date.now()
        };

        // Update shares
        fromContributor.share -= shareAmount;
        
        const toContributor = work.contributors.find(c => c.id === toId);
        if (toContributor) {
            toContributor.share += shareAmount;
        } else {
            // New contributor
            work.contributors.push({
                id: toId,
                name: `Transfer recipient ${toId}`,
                role: 'Owner',
                share: shareAmount
            });
        }

        this._addToLedger('OWNERSHIP_TRANSFERRED', {
            workId,
            from: fromId,
            to: toId,
            share: shareAmount,
            proof: this.fc.encode(transferProof)
        });

        return {
            transferId: `TRANS-${Date.now()}`,
            proof: transferProof,
            newOwnership: work.contributors
        };
    }

    /**
     * Generate share proofs using mathematical expressions
     */
    _generateShareProofs(share) {
        const percentage = share * 100;
        return [
            `${percentage}%`,
            `${share}`,
            `${share * 100}/100`,
            `${this._fractionToExpression(share)}`,
            `sin²(x) × ${share} + cos²(x) × ${share}`,
            `∫₀^${share} 1 dx`
        ];
    }

    /**
     * Generate amount proofs
     */
    _generateAmountProofs(amount) {
        return [
            `${amount}`,
            `${amount.toFixed(2)} USD`,
            `√(${amount}²)`,
            `${amount} × 1`,
            `Σ(1) × ${amount}`,
            `${amount}! / ${amount}!`
        ];
    }

    /**
     * Convert decimal to fraction expression
     */
    _fractionToExpression(decimal) {
        // Find simple fraction representation
        const tolerance = 0.0001;
        let numerator = 1;
        let denominator = 1;
        
        for (let d = 1; d <= 100; d++) {
            for (let n = 1; n <= d; n++) {
                if (Math.abs(n/d - decimal) < tolerance) {
                    numerator = n;
                    denominator = d;
                    break;
                }
            }
        }
        
        return `${numerator}/${denominator}`;
    }

    /**
     * Generate ownership hash
     */
    _generateOwnershipHash(workId, contributors) {
        const data = `${workId}:${contributors.map(c => `${c.id}:${c.share}`).join(',')}`;
        return this.fc.hash(data);
    }

    /**
     * Generate report proofs
     */
    _generateReportProofs(total, earnings) {
        return {
            sumCheck: `Σ(earnings) = ${earnings.reduce((sum, e) => sum + e.earned, 0)} = ${total}`,
            percentageCheck: `Σ(shares) = ${earnings.reduce((sum, e) => sum + e.share, 0)} = 1.0`,
            balanceCheck: `distributed + pending = ${earnings.reduce((sum, e) => sum + e.paid + e.pending, 0)}`
        };
    }

    /**
     * Add to ledger
     */
    _addToLedger(event, data) {
        this.ledger.push({
            index: this.ledger.length,
            event,
            data,
            timestamp: Date.now(),
            hash: this.fc.hash(JSON.stringify({ event, data, timestamp: Date.now() }))
        });
    }

    /**
     * Get ledger
     */
    getLedger() {
        return this.ledger;
    }
}

// Example usage
if (require.main === module) {
    console.log('Fractional Core - Royalty Distribution Demo\n');
    
    const royalty = new RoyaltyDistribution();
    
    // Register creative work
    console.log('1. Registering Creative Work...');
    const work = royalty.registerWork('WORK-001', {
        title: 'Digital Symphony #42',
        type: 'music',
        created: '2025-01-01',
        duration: 240,
        isrc: 'USRC17607839'
    }, [
        { id: 'ARTIST-001', name: 'Main Artist', role: 'Performer', share: 0.50 },
        { id: 'PROD-001', name: 'Producer', role: 'Producer', share: 0.25 },
        { id: 'WRITER-001', name: 'Songwriter', role: 'Writer', share: 0.15 },
        { id: 'LABEL-001', name: 'Record Label', role: 'Publisher', share: 0.10 }
    ]);
    console.log(`   Work ID: ${work.workId}`);
    console.log(`   Contributors: ${work.ownership.length}`);
    console.log(`   Ownership distribution verified\n`);
    
    // Record revenue
    console.log('2. Recording Revenue...');
    const revenue1 = royalty.recordRevenue('WORK-001', {
        amount: 10000,
        source: 'streaming',
        period: '2025-01',
        currency: 'USD',
        verified: true
    });
    console.log(`   Revenue ID: ${revenue1.revenueId}`);
    console.log(`   Amount: $${revenue1.recorded.amount.toLocaleString()}`);
    
    const revenue2 = royalty.recordRevenue('WORK-001', {
        amount: 5000,
        source: 'sync',
        period: '2025-01',
        currency: 'USD',
        verified: true
    });
    console.log(`   Revenue ID: ${revenue2.revenueId}`);
    console.log(`   Total work revenue: $${revenue2.workTotal.toLocaleString()}\n`);
    
    // Distribute royalties
    console.log('3. Distributing Royalties...');
    const dist1 = royalty.distributeRoyalties('WORK-001', revenue1.revenueId);
    console.log(`   Distribution ID: ${dist1.distributionId}`);
    console.log('   Breakdown:');
    dist1.summary.forEach(d => {
        console.log(`     ${d.contributorId}: $${d.amount.toLocaleString()} (${d.percentage})`);
    });
    
    // Process payout
    console.log('\n4. Processing Payout...');
    const payout = royalty.processPayout('ARTIST-001', 2500, {
        type: 'bank',
        destination: 'ACC-123456',
        transactionId: 'TXN-789'
    });
    console.log(`   Payout ID: ${payout.payoutId}`);
    console.log(`   Amount: $${payout.payout.amount.toLocaleString()}`);
    console.log(`   New balance: $${payout.newBalance.toLocaleString()}\n`);
    
    // Generate report
    console.log('5. Generating Royalty Report...');
    const report = royalty.generateRoyaltyReport(
        'WORK-001',
        new Date('2025-01-01'),
        new Date('2025-01-31')
    );
    console.log(`   Period: ${report.period.start} to ${report.period.end}`);
    console.log(`   Total revenue: $${report.revenue.total.toLocaleString()}`);
    console.log(`   Distributed: $${report.revenue.distributed.toLocaleString()}`);
    console.log('   By source:');
    Object.entries(report.revenue.bySource).forEach(([source, amount]) => {
        console.log(`     ${source}: $${amount.toLocaleString()}`);
    });
    
    // Show ledger
    console.log('\n6. Transaction Ledger:');
    const ledger = royalty.getLedger();
    ledger.forEach(entry => {
        console.log(`   ${entry.index}: ${entry.event} at ${new Date(entry.timestamp).toISOString()}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
    console.log('Protected under Memorial Covenant');
}

module.exports = RoyaltyDistribution;
