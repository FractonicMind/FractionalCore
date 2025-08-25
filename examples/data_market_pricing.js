/**
 * Data Market Pricing System Implementation
 * Fractional Core (FC) Framework
 * 
 * Dynamic pricing and valuation for data assets using
 * mathematical diversity for transparent price discovery.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const FractionalCore = require('../fractional-core.js');

class DataMarketPricing {
    constructor() {
        this.fc = new FractionalCore();
        this.datasets = new Map();
        this.providers = new Map();
        this.consumers = new Map();
        this.transactions = new Map();
        this.pricingHistory = new Map();
        this.marketMetrics = {
            totalVolume: 0,
            totalTransactions: 0,
            averagePrice: 0
        };
    }

    /**
     * Register data asset with quality metrics
     */
    registerDataset(datasetId, metadata, provider) {
        // Calculate data quality score
        const qualityScore = this._calculateQualityScore(metadata);
        
        // Generate initial pricing based on characteristics
        const basePricing = this._calculateBasePricing(metadata, qualityScore);
        
        // Create mathematical proof of data value
        const valueProof = {
            datasetId,
            name: metadata.name,
            type: metadata.type, // structured, unstructured, real-time, historical
            size: metadata.size,
            records: metadata.records,
            quality: {
                score: qualityScore,
                completeness: metadata.completeness,
                accuracy: metadata.accuracy,
                timeliness: metadata.timeliness,
                uniqueness: metadata.uniqueness
            },
            pricing: {
                base: basePricing,
                expressions: this._generatePricingProofs(basePricing),
                factors: this._getPricingFactors(metadata, qualityScore)
            },
            provider: {
                id: provider.id,
                name: provider.name,
                reputation: provider.reputation || 0
            },
            timestamp: Date.now()
        };

        this.datasets.set(datasetId, {
            metadata,
            provider,
            proof: this.fc.encode(valueProof),
            pricing: basePricing,
            qualityScore,
            status: 'active',
            registered: new Date().toISOString(),
            sales: 0,
            revenue: 0,
            ratings: []
        });

        // Register provider if new
        if (!this.providers.has(provider.id)) {
            this.providers.set(provider.id, {
                name: provider.name,
                datasets: [],
                totalSales: 0,
                totalRevenue: 0,
                reputation: provider.reputation || 0
            });
        }
        this.providers.get(provider.id).datasets.push(datasetId);

        this._recordPricingHistory(datasetId, basePricing, 'initial');

        return {
            datasetId,
            dataset: this.datasets.get(datasetId),
            pricing: {
                base: basePricing,
                quality: qualityScore,
                factors: valueProof.pricing.factors
            }
        };
    }

    /**
     * Calculate dynamic pricing based on demand
     */
    calculateDynamicPrice(datasetId, consumerId, usage) {
        const dataset = this.datasets.get(datasetId);
        if (!dataset) throw new Error('Dataset not found');

        // Get consumer profile
        const consumer = this._getOrCreateConsumer(consumerId);
        
        // Calculate demand-based multipliers
        const demandMultiplier = this._calculateDemandMultiplier(datasetId);
        const volumeDiscount = this._calculateVolumeDiscount(usage.volume);
        const loyaltyDiscount = this._calculateLoyaltyDiscount(consumer);
        const timeMultiplier = this._calculateTimeMultiplier(usage.duration);
        
        // Calculate final price
        const basePrice = dataset.pricing;
        const adjustedPrice = basePrice * demandMultiplier * volumeDiscount * loyaltyDiscount * timeMultiplier;
        
        // Create pricing proof
        const pricingProof = {
            datasetId,
            consumerId,
            basePrice,
            adjustedPrice,
            calculations: [
                `Base: ${basePrice}`,
                `Demand: × ${demandMultiplier.toFixed(2)}`,
                `Volume: × ${volumeDiscount.toFixed(2)}`,
                `Loyalty: × ${loyaltyDiscount.toFixed(2)}`,
                `Duration: × ${timeMultiplier.toFixed(2)}`,
                `Final: ${adjustedPrice.toFixed(2)}`
            ],
            mathematical: this._generatePricingProofs(adjustedPrice),
            factors: {
                demand: demandMultiplier,
                volume: volumeDiscount,
                loyalty: loyaltyDiscount,
                time: timeMultiplier
            },
            usage,
            timestamp: Date.now()
        };

        return {
            price: adjustedPrice,
            proof: this.fc.encode(pricingProof),
            breakdown: pricingProof.calculations,
            savings: basePrice - adjustedPrice
        };
    }

    /**
     * Execute data purchase transaction
     */
    purchaseData(datasetId, consumerId, pricing, accessRights) {
        const dataset = this.datasets.get(datasetId);
        const consumer = this.consumers.get(consumerId);
        
        if (!dataset) throw new Error('Dataset not found');
        if (!consumer) throw new Error('Consumer not found');

        // Create transaction proof
        const transactionProof = {
            datasetId,
            consumerId,
            price: pricing.price,
            accessRights: {
                type: accessRights.type, // full, sample, streaming, one-time
                duration: accessRights.duration,
                usage: accessRights.usage,
                restrictions: accessRights.restrictions || []
            },
            dataHash: this._generateDataHash(datasetId, dataset.metadata),
            expressions: this._generatePricingProofs(pricing.price),
            timestamp: Date.now()
        };

        const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.transactions.set(transactionId, {
            proof: this.fc.encode(transactionProof),
            datasetId,
            consumerId,
            price: pricing.price,
            status: 'completed',
            timestamp: new Date().toISOString(),
            accessToken: this._generateAccessToken(transactionId, accessRights)
        });

        // Update dataset metrics
        dataset.sales++;
        dataset.revenue += pricing.price;

        // Update consumer history
        consumer.purchases.push({
            transactionId,
            datasetId,
            price: pricing.price,
            timestamp: Date.now()
        });
        consumer.totalSpent += pricing.price;

        // Update provider metrics
        const provider = this.providers.get(dataset.provider.id);
        provider.totalSales++;
        provider.totalRevenue += pricing.price;

        // Update market metrics
        this.marketMetrics.totalVolume += pricing.price;
        this.marketMetrics.totalTransactions++;
        this.marketMetrics.averagePrice = 
            this.marketMetrics.totalVolume / this.marketMetrics.totalTransactions;

        this._recordPricingHistory(datasetId, pricing.price, 'sale');

        return {
            transactionId,
            transaction: this.transactions.get(transactionId),
            access: {
                token: this.transactions.get(transactionId).accessToken,
                rights: accessRights,
                expires: new Date(Date.now() + accessRights.duration * 24 * 60 * 60 * 1000)
            }
        };
    }

    /**
     * Rate dataset quality and adjust pricing
     */
    rateDataset(datasetId, consumerId, rating) {
        const dataset = this.datasets.get(datasetId);
        const consumer = this.consumers.get(consumerId);
        
        if (!dataset) throw new Error('Dataset not found');
        if (!consumer) throw new Error('Consumer not found');
        
        // Verify consumer purchased this dataset
        const hasPurchased = consumer.purchases.some(p => p.datasetId === datasetId);
        if (!hasPurchased) throw new Error('Consumer has not purchased this dataset');

        // Add rating
        dataset.ratings.push({
            consumerId,
            score: rating.score, // 1-5
            feedback: rating.feedback,
            timestamp: Date.now()
        });

        // Recalculate quality score
        const avgRating = dataset.ratings.reduce((sum, r) => sum + r.score, 0) / dataset.ratings.length;
        const newQualityScore = (dataset.qualityScore + avgRating) / 2;
        
        // Adjust pricing based on new quality
        const oldPrice = dataset.pricing;
        const newPrice = this._adjustPricingByQuality(oldPrice, newQualityScore, dataset.qualityScore);
        
        dataset.qualityScore = newQualityScore;
        dataset.pricing = newPrice;

        this._recordPricingHistory(datasetId, newPrice, 'quality_adjustment');

        return {
            datasetId,
            newQualityScore,
            oldPrice,
            newPrice,
            adjustment: ((newPrice - oldPrice) / oldPrice * 100).toFixed(2) + '%',
            totalRatings: dataset.ratings.length
        };
    }

    /**
     * Generate market analytics
     */
    generateMarketAnalytics(timeframe) {
        const now = Date.now();
        const startTime = now - (timeframe * 24 * 60 * 60 * 1000); // days to ms
        
        // Filter transactions by timeframe
        const recentTransactions = Array.from(this.transactions.entries())
            .filter(([_, txn]) => new Date(txn.timestamp).getTime() > startTime);
        
        // Calculate metrics by dataset type
        const byType = {};
        const byProvider = {};
        
        recentTransactions.forEach(([_, txn]) => {
            const dataset = this.datasets.get(txn.datasetId);
            const type = dataset.metadata.type;
            const providerId = dataset.provider.id;
            
            if (!byType[type]) byType[type] = { volume: 0, count: 0 };
            byType[type].volume += txn.price;
            byType[type].count++;
            
            if (!byProvider[providerId]) byProvider[providerId] = { volume: 0, count: 0 };
            byProvider[providerId].volume += txn.price;
            byProvider[providerId].count++;
        });

        // Top datasets
        const topDatasets = Array.from(this.datasets.entries())
            .map(([id, ds]) => ({
                id,
                name: ds.metadata.name,
                sales: ds.sales,
                revenue: ds.revenue,
                quality: ds.qualityScore
            }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        // Price trends
        const priceTrends = this._analyzePriceTrends(timeframe);

        return {
            timeframe: `${timeframe} days`,
            period: {
                start: new Date(startTime).toISOString(),
                end: new Date(now).toISOString()
            },
            market: {
                totalVolume: this.marketMetrics.totalVolume,
                totalTransactions: this.marketMetrics.totalTransactions,
                averagePrice: this.marketMetrics.averagePrice,
                recentVolume: recentTransactions.reduce((sum, [_, t]) => sum + t.price, 0),
                recentTransactions: recentTransactions.length
            },
            breakdown: {
                byType,
                byProvider
            },
            topDatasets,
            priceTrends,
            mathematical: {
                volumeHash: this.fc.hash(this.marketMetrics.totalVolume.toString()),
                trendsProof: this._generateTrendProofs(priceTrends)
            }
        };
    }

    /**
     * Calculate quality score
     */
    _calculateQualityScore(metadata) {
        const weights = {
            completeness: 0.25,
            accuracy: 0.25,
            timeliness: 0.25,
            uniqueness: 0.25
        };
        
        return (
            metadata.completeness * weights.completeness +
            metadata.accuracy * weights.accuracy +
            metadata.timeliness * weights.timeliness +
            metadata.uniqueness * weights.uniqueness
        );
    }

    /**
     * Calculate base pricing
     */
    _calculateBasePricing(metadata, qualityScore) {
        // Base price factors
        const sizeFacto = Math.log10(metadata.size + 1) * 10;
        const recordsFactor = Math.log10(metadata.records + 1) * 5;
        const qualityFactor = qualityScore * 100;
        const typeFactor = this._getTypeFactor(metadata.type);
        
        return sizeFacto + recordsFactor + qualityFactor + typeFactor;
    }

    /**
     * Get type factor for pricing
     */
    _getTypeFactor(type) {
        const factors = {
            'real-time': 50,
            'structured': 30,
            'unstructured': 20,
            'historical': 15
        };
        return factors[type] || 10;
    }

    /**
     * Generate pricing proofs
     */
    _generatePricingProofs(price) {
        return [
            `${price}`,
            `${price.toFixed(2)} units`,
            `10^(log₁₀(${price}))`,
            `${price} × 1⁰`,
            `∑(1) × ${price}`,
            `∫₀^${price} 1 dx`
        ];
    }

    /**
     * Get pricing factors
     */
    _getPricingFactors(metadata, qualityScore) {
        return {
            size: `${(metadata.size / 1024 / 1024).toFixed(2)} MB`,
            records: metadata.records.toLocaleString(),
            quality: `${(qualityScore * 100).toFixed(0)}%`,
            type: metadata.type,
            freshness: metadata.timeliness
        };
    }

    /**
     * Get or create consumer
     */
    _getOrCreateConsumer(consumerId) {
        if (!this.consumers.has(consumerId)) {
            this.consumers.set(consumerId, {
                id: consumerId,
                purchases: [],
                totalSpent: 0,
                loyaltyTier: 'bronze',
                joined: Date.now()
            });
        }
        return this.consumers.get(consumerId);
    }

    /**
     * Calculate demand multiplier
     */
    _calculateDemandMultiplier(datasetId) {
        const dataset = this.datasets.get(datasetId);
        const recentSales = dataset.sales;
        
        // High demand increases price
        if (recentSales > 100) return 1.5;
        if (recentSales > 50) return 1.3;
        if (recentSales > 20) return 1.1;
        return 1.0;
    }

    /**
     * Calculate volume discount
     */
    _calculateVolumeDiscount(volume) {
        if (volume > 1000000) return 0.7;  // 30% discount
        if (volume > 100000) return 0.8;   // 20% discount
        if (volume > 10000) return 0.9;    // 10% discount
        return 1.0;
    }

    /**
     * Calculate loyalty discount
     */
    _calculateLoyaltyDiscount(consumer) {
        const purchases = consumer.purchases.length;
        if (purchases > 50) return 0.85;  // 15% discount
        if (purchases > 20) return 0.9;   // 10% discount
        if (purchases > 5) return 0.95;   // 5% discount
        return 1.0;
    }

    /**
     * Calculate time multiplier
     */
    _calculateTimeMultiplier(duration) {
        // Longer access periods cost more
        if (duration > 365) return 2.0;
        if (duration > 180) return 1.5;
        if (duration > 30) return 1.2;
        return 1.0;
    }

    /**
     * Generate data hash
     */
    _generateDataHash(datasetId, metadata) {
        return this.fc.hash(`${datasetId}:${metadata.size}:${metadata.records}`);
    }

    /**
     * Generate access token
     */
    _generateAccessToken(transactionId, rights) {
        const token = {
            txn: transactionId,
            rights: rights.type,
            expires: Date.now() + rights.duration * 24 * 60 * 60 * 1000
        };
        return this.fc.hash(JSON.stringify(token)).substring(0, 32);
    }

    /**
     * Adjust pricing by quality
     */
    _adjustPricingByQuality(currentPrice, newQuality, oldQuality) {
        const qualityChange = newQuality - oldQuality;
        const adjustment = 1 + (qualityChange * 0.2); // 20% change per quality point
        return currentPrice * adjustment;
    }

    /**
     * Record pricing history
     */
    _recordPricingHistory(datasetId, price, reason) {
        if (!this.pricingHistory.has(datasetId)) {
            this.pricingHistory.set(datasetId, []);
        }
        
        this.pricingHistory.get(datasetId).push({
            price,
            reason,
            timestamp: Date.now()
        });
    }

    /**
     * Analyze price trends
     */
    _analyzePriceTrends(timeframe) {
        const trends = {};
        
        this.datasets.forEach((dataset, id) => {
            const history = this.pricingHistory.get(id) || [];
            if (history.length < 2) return;
            
            const oldPrice = history[0].price;
            const newPrice = history[history.length - 1].price;
            const change = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
            
            trends[id] = {
                start: oldPrice,
                current: newPrice,
                change: change + '%',
                direction: newPrice > oldPrice ? 'up' : 'down'
            };
        });
        
        return trends;
    }

    /**
     * Generate trend proofs
     */
    _generateTrendProofs(trends) {
        const values = Object.values(trends).map(t => t.current);
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        
        return [
            `Average: ${avg.toFixed(2)}`,
            `Sum: ${sum.toFixed(2)}`,
            `Count: ${values.length}`
        ];
    }
}

// Example usage
if (require.main === module) {
    console.log('Fractional Core - Data Market Pricing Demo\n');
    
    const market = new DataMarketPricing();
    
    // Register dataset
    console.log('1. Registering Dataset...');
    const dataset = market.registerDataset('DATA-001', {
        name: 'Global Weather Patterns 2025',
        type: 'real-time',
        size: 5000000000, // 5GB
        records: 10000000,
        completeness: 0.95,
        accuracy: 0.98,
        timeliness: 0.99,
        uniqueness: 0.85
    }, {
        id: 'PROVIDER-001',
        name: 'Climate Data Corp',
        reputation: 0.9
    });
    console.log(`   Dataset ID: ${dataset.datasetId}`);
    console.log(`   Quality Score: ${(dataset.pricing.quality * 100).toFixed(0)}%`);
    console.log(`   Base Price: $${dataset.pricing.base.toFixed(2)}\n`);
    
    // Calculate dynamic pricing
    console.log('2. Calculating Dynamic Price...');
    const pricing = market.calculateDynamicPrice('DATA-001', 'CONSUMER-001', {
        volume: 500000,  // 500k records
        duration: 90     // 90 days
    });
    console.log(`   Base Price: $${dataset.pricing.base.toFixed(2)}`);
    console.log(`   Adjusted Price: $${pricing.price.toFixed(2)}`);
    console.log(`   Savings: $${pricing.savings.toFixed(2)}`);
    console.log('   Breakdown:');
    pricing.breakdown.forEach(calc => console.log(`     ${calc}`));
    
    // Purchase data
    console.log('\n3. Purchasing Data...');
    const purchase = market.purchaseData('DATA-001', 'CONSUMER-001', pricing, {
        type: 'streaming',
        duration: 90,
        usage: 'analytics',
        restrictions: ['no-resale', 'no-redistribution']
    });
    console.log(`   Transaction ID: ${purchase.transactionId}`);
    console.log(`   Access Token: ${purchase.access.token}`);
    console.log(`   Expires: ${purchase.access.expires.toISOString()}\n`);
    
    // Rate dataset
    console.log('4. Rating Dataset...');
    const rating = market.rateDataset('DATA-001', 'CONSUMER-001', {
        score: 4.5,
        feedback: 'High quality, timely updates'
    });
    console.log(`   New Quality Score: ${(rating.newQualityScore * 100).toFixed(0)}%`);
    console.log(`   Price Adjustment: ${rating.adjustment}`);
    console.log(`   New Price: $${rating.newPrice.toFixed(2)}\n`);
    
    // Generate analytics
    console.log('5. Market Analytics (30 days):');
    const analytics = market.generateMarketAnalytics(30);
    console.log(`   Total Volume: $${analytics.market.totalVolume.toFixed(2)}`);
    console.log(`   Total Transactions: ${analytics.market.totalTransactions}`);
    console.log(`   Average Price: $${analytics.market.averagePrice.toFixed(2)}`);
    console.log('   Top Dataset:');
    if (analytics.topDatasets[0]) {
        const top = analytics.topDatasets[0];
        console.log(`     ${top.name}: $${top.revenue.toFixed(2)} (${top.sales} sales)`);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
    console.log('Protected under Memorial Covenant');
}

module.exports = DataMarketPricing;
