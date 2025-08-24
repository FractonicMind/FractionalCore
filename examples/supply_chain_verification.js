/**
 * Supply Chain Verification Implementation
 * Fractional Core (FC) Framework
 * 
 * Demonstrates mathematical diversity for transparent tracking,
 * authentication, and verification across global supply chains.
 * 
 * Memorial Covenant: Protected under 11 pre-authorized institutions
 * Created by Lev Goukassian • ORCID: 0009-0006-5966-1243
 */

const FractionalCore = require('../fractional-core.js');

class SupplyChainVerification {
    constructor() {
        this.fc = new FractionalCore();
        this.products = new Map();
        this.locations = new Map();
        this.shipments = new Map();
        this.verifications = new Map();
        this.chain = [];
    }

    /**
     * Register product with mathematical identity
     */
    registerProduct(productId, details) {
        // Create unique mathematical identity for product
        const identity = {
            id: productId,
            name: details.name,
            batch: details.batch,
            quantity: details.quantity,
            origin: details.origin,
            expressions: [
                `${details.quantity}`,                              // Direct quantity
                `∏(prime[i]) for ${productId.length} primes`,     // Prime product
                `φ(${details.batch})`,                             // Euler's totient
                `${details.quantity}!/(${details.quantity}-1)!`,   // Factorial ratio
                `Σ(char(${productId}[i]))`,                        // Character sum
                `hash(${productId}) mod 1000000`                   // Hash modulo
            ],
            certifications: details.certifications || [],
            timestamp: Date.now(),
            signature: this._generateSignature(productId, details)
        };

        this.products.set(productId, {
            identity: this.fc.encode(identity),
            details,
            created: new Date().toISOString(),
            status: 'registered',
            history: []
        });

        this._addToChain('PRODUCT_REGISTERED', {
            productId,
            quantity: details.quantity,
            origin: details.origin
        });

        return {
            productId,
            identity: identity.expressions,
            registration: this.products.get(productId)
        };
    }

    /**
     * Track location update with verification
     */
    updateLocation(productId, location, handler) {
        const product = this.products.get(productId);
        if (!product) throw new Error('Product not found');

        // Generate location proof with coordinates
        const locationProof = {
            productId,
            location: {
                name: location.name,
                coordinates: location.coordinates,
                type: location.type // warehouse, port, transit, retail
            },
            mathematical: this._generateLocationProof(location.coordinates),
            handler: {
                id: handler.id,
                name: handler.name,
                certification: handler.certification
            },
            timestamp: Date.now(),
            temperature: location.temperature,
            humidity: location.humidity,
            condition: location.condition || 'good'
        };

        const locationId = `LOC-${Date.now()}-${productId}`;
        this.locations.set(locationId, {
            proof: this.fc.encode(locationProof),
            verified: this._verifyHandler(handler),
            timestamp: new Date().toISOString()
        });

        // Update product history
        product.history.push({
            type: 'location_update',
            locationId,
            location: location.name,
            timestamp: new Date().toISOString()
        });

        this._addToChain('LOCATION_UPDATE', {
            productId,
            locationId,
            coordinates: location.coordinates,
            handler: handler.name
        });

        return {
            locationId,
            verification: this.locations.get(locationId),
            chain: product.history.length
        };
    }

    /**
     * Create shipment with route verification
     */
    createShipment(products, route, carrier) {
        // Verify all products exist
        products.forEach(pid => {
            if (!this.products.has(pid)) {
                throw new Error(`Product ${pid} not found`);
            }
        });

        // Generate shipment proof
        const shipmentProof = {
            products,
            route: {
                origin: route.origin,
                destination: route.destination,
                waypoints: route.waypoints || [],
                estimatedDays: route.estimatedDays
            },
            carrier: {
                id: carrier.id,
                name: carrier.name,
                license: carrier.license,
                insurance: carrier.insurance
            },
            mathematical: {
                productCount: products.length,
                routeHash: this._generateRouteHash(route),
                expressions: [
                    `${products.length} products`,
                    `distance: ${this._calculateDistance(route)} km`,
                    `checksum: ${this._calculateChecksum(products)}`,
                    `route_complexity: ${route.waypoints.length + 2}`
                ]
            },
            timestamp: Date.now(),
            status: 'in_transit'
        };

        const shipmentId = `SHIP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.shipments.set(shipmentId, {
            proof: this.fc.encode(shipmentProof),
            products,
            route,
            carrier,
            created: new Date().toISOString(),
            status: 'active',
            checkpoints: []
        });

        // Update product status
        products.forEach(pid => {
            const product = this.products.get(pid);
            product.status = 'in_transit';
            product.currentShipment = shipmentId;
        });

        this._addToChain('SHIPMENT_CREATED', {
            shipmentId,
            products: products.length,
            origin: route.origin.name,
            destination: route.destination.name
        });

        return {
            shipmentId,
            shipment: this.shipments.get(shipmentId),
            tracking: this._generateTrackingCode(shipmentId)
        };
    }

    /**
     * Verify authenticity at checkpoint
     */
    verifyAuthenticity(productId, verifierId, methods) {
        const product = this.products.get(productId);
        if (!product) throw new Error('Product not found');

        // Multi-method verification
        const verificationResults = {
            productId,
            verifier: {
                id: verifierId,
                timestamp: Date.now()
            },
            methods: {},
            mathematical: []
        };

        // Apply each verification method
        if (methods.rfid) {
            verificationResults.methods.rfid = this._verifyRFID(productId, methods.rfid);
            verificationResults.mathematical.push(`RFID: ${methods.rfid}`);
        }

        if (methods.qrCode) {
            verificationResults.methods.qrCode = this._verifyQRCode(productId, methods.qrCode);
            verificationResults.mathematical.push(`QR: hash(${methods.qrCode})`);
        }

        if (methods.blockchain) {
            verificationResults.methods.blockchain = this._verifyBlockchain(productId, methods.blockchain);
            verificationResults.mathematical.push(`Chain: block#${methods.blockchain}`);
        }

        if (methods.chemical) {
            verificationResults.methods.chemical = this._verifyChemical(methods.chemical);
            verificationResults.mathematical.push(`Chemical: ${methods.chemical.marker}`);
        }

        // Calculate overall authenticity score
        const scores = Object.values(verificationResults.methods);
        const authenticityScore = scores.reduce((a, b) => a + b, 0) / scores.length;

        const verificationId = `VER-${Date.now()}-${productId}`;
        this.verifications.set(verificationId, {
            proof: this.fc.encode(verificationResults),
            score: authenticityScore,
            passed: authenticityScore >= 0.8, // 80% threshold
            timestamp: new Date().toISOString()
        });

        // Update product history
        product.history.push({
            type: 'verification',
            verificationId,
            score: authenticityScore,
            verifier: verifierId,
            timestamp: new Date().toISOString()
        });

        this._addToChain('AUTHENTICITY_VERIFIED', {
            productId,
            verificationId,
            score: authenticityScore,
            passed: authenticityScore >= 0.8
        });

        return {
            verificationId,
            authentic: authenticityScore >= 0.8,
            score: authenticityScore,
            details: verificationResults.methods,
            mathematical: verificationResults.mathematical
        };
    }

    /**
     * Generate supply chain proof for end consumer
     */
    generateConsumerProof(productId) {
        const product = this.products.get(productId);
        if (!product) throw new Error('Product not found');

        // Collect complete journey
        const journey = product.history.map(event => {
            if (event.type === 'location_update') {
                const loc = this.locations.get(event.locationId);
                return {
                    type: 'location',
                    name: event.location,
                    timestamp: event.timestamp,
                    verified: loc.verified
                };
            } else if (event.type === 'verification') {
                const ver = this.verifications.get(event.verificationId);
                return {
                    type: 'verification',
                    score: event.score,
                    timestamp: event.timestamp,
                    authentic: ver.passed
                };
            }
            return event;
        });

        // Generate consumer-friendly proof
        const consumerProof = {
            product: {
                id: productId,
                name: product.details.name,
                batch: product.details.batch
            },
            origin: {
                location: product.details.origin,
                registered: product.created
            },
            journey: {
                steps: journey.length,
                locations: journey.filter(j => j.type === 'location').length,
                verifications: journey.filter(j => j.type === 'verification').length,
                timeline: journey
            },
            authenticity: {
                verified: journey.filter(j => j.type === 'verification' && j.authentic).length,
                lastCheck: journey.filter(j => j.type === 'verification').pop(),
                score: this._calculateOverallScore(journey)
            },
            mathematical: {
                productHash: this.fc.hash(productId),
                journeyHash: this.fc.hash(JSON.stringify(journey)),
                verificationCode: this._generateVerificationCode(productId, journey)
            },
            qrCode: this._generateQRData(productId, journey)
        };

        this._addToChain('CONSUMER_PROOF_GENERATED', {
            productId,
            steps: journey.length,
            score: consumerProof.authenticity.score
        });

        return consumerProof;
    }

    /**
     * Generate location proof using coordinates
     */
    _generateLocationProof(coordinates) {
        const lat = coordinates.latitude;
        const lon = coordinates.longitude;
        
        return [
            `(${lat}, ${lon})`,                          // Direct coordinates
            `√(${lat}² + ${lon}²)`,                      // Distance from origin
            `atan2(${lat}, ${lon})`,                     // Angle from origin
            `haversine(${lat}, ${lon})`,                 // Haversine formula component
            `geohash(${Math.floor(lat)}, ${Math.floor(lon)})` // Geohash
        ];
    }

    /**
     * Calculate distance for route
     */
    _calculateDistance(route) {
        // Simplified distance calculation
        const points = [route.origin, ...route.waypoints, route.destination];
        let distance = 0;
        
        for (let i = 0; i < points.length - 1; i++) {
            if (points[i].coordinates && points[i + 1].coordinates) {
                // Haversine formula (simplified)
                const dlat = points[i + 1].coordinates.latitude - points[i].coordinates.latitude;
                const dlon = points[i + 1].coordinates.longitude - points[i].coordinates.longitude;
                distance += Math.sqrt(dlat * dlat + dlon * dlon) * 111; // km approximation
            }
        }
        
        return Math.round(distance);
    }

    /**
     * Generate cryptographic signature
     */
    _generateSignature(productId, details) {
        const data = `${productId}:${details.batch}:${details.quantity}:${Date.now()}`;
        return this.fc.hash(data);
    }

    /**
     * Verify handler credentials
     */
    _verifyHandler(handler) {
        // Check certification validity
        return handler.certification && handler.certification.valid;
    }

    /**
     * Generate route hash
     */
    _generateRouteHash(route) {
        const routeString = JSON.stringify({
            origin: route.origin.name,
            destination: route.destination.name,
            waypoints: route.waypoints.map(w => w.name)
        });
        return this.fc.hash(routeString);
    }

    /**
     * Calculate checksum for products
     */
    _calculateChecksum(products) {
        return products.reduce((sum, pid) => {
            return sum + pid.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        }, 0);
    }

    /**
     * Generate tracking code
     */
    _generateTrackingCode(shipmentId) {
        const hash = this.fc.hash(shipmentId);
        return hash.substring(0, 10).toUpperCase();
    }

    /**
     * Verification methods (simplified)
     */
    _verifyRFID(productId, rfidData) {
        return rfidData === this.fc.hash(productId).substring(0, 16) ? 1.0 : 0.0;
    }

    _verifyQRCode(productId, qrData) {
        return qrData.includes(productId) ? 1.0 : 0.5;
    }

    _verifyBlockchain(productId, blockData) {
        return blockData > 0 ? 0.9 : 0.0;
    }

    _verifyChemical(chemicalData) {
        return chemicalData.marker === chemicalData.expected ? 1.0 : 0.0;
    }

    /**
     * Calculate overall score from journey
     */
    _calculateOverallScore(journey) {
        const verifications = journey.filter(j => j.type === 'verification');
        if (verifications.length === 0) return 0;
        
        const sum = verifications.reduce((total, v) => total + v.score, 0);
        return sum / verifications.length;
    }

    /**
     * Generate QR code data
     */
    _generateQRData(productId, journey) {
        return {
            url: `https://verify.fc-goukassian.org/product/${productId}`,
            hash: this.fc.hash(JSON.stringify(journey)).substring(0, 8),
            steps: journey.length
        };
    }

    /**
     * Generate verification code for consumer
     */
    _generateVerificationCode(productId, journey) {
        const data = `${productId}:${journey.length}:${Date.now()}`;
        return this.fc.hash(data).substring(0, 6).toUpperCase();
    }

    /**
     * Add event to blockchain
     */
    _addToChain(event, data) {
        this.chain.push({
            index: this.chain.length,
            event,
            data,
            timestamp: Date.now(),
            hash: this.fc.hash(JSON.stringify({ event, data, timestamp: Date.now() })),
            previousHash: this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '0'
        });
    }

    /**
     * Get complete chain
     */
    getChain() {
        return this.chain;
    }
}

// Example usage
if (require.main === module) {
    console.log('Fractional Core - Supply Chain Verification Demo\n');
    
    const supply = new SupplyChainVerification();
    
    // Register product
    console.log('1. Registering Product...');
    const product = supply.registerProduct('PROD-2025-001', {
        name: 'Organic Coffee Beans',
        batch: 'BATCH-789',
        quantity: 1000,
        origin: 'Colombia',
        certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance']
    });
    console.log(`   Product ID: ${product.productId}`);
    console.log(`   Mathematical identity: ${product.identity.length} expressions generated\n`);
    
    // Update location - Farm
    console.log('2. Location Updates...');
    const loc1 = supply.updateLocation('PROD-2025-001', {
        name: 'Finca El Paraiso Farm',
        coordinates: { latitude: 4.5709, longitude: -74.2973 },
        type: 'farm',
        temperature: 22,
        humidity: 65,
        condition: 'excellent'
    }, {
        id: 'HANDLER-001',
        name: 'Juan Rodriguez',
        certification: { valid: true, type: 'Organic Handler' }
    });
    console.log(`   Farm location logged: ${loc1.locationId}`);
    
    // Update location - Port
    const loc2 = supply.updateLocation('PROD-2025-001', {
        name: 'Port of Cartagena',
        coordinates: { latitude: 10.3910, longitude: -75.4794 },
        type: 'port',
        temperature: 25,
        humidity: 70
    }, {
        id: 'HANDLER-002',
        name: 'Port Authority',
        certification: { valid: true, type: 'Export License' }
    });
    console.log(`   Port location logged: ${loc2.locationId}\n`);
    
    // Create shipment
    console.log('3. Creating Shipment...');
    const shipment = supply.createShipment(
        ['PROD-2025-001'],
        {
            origin: { name: 'Cartagena', coordinates: { latitude: 10.3910, longitude: -75.4794 } },
            destination: { name: 'Los Angeles', coordinates: { latitude: 34.0522, longitude: -118.2437 } },
            waypoints: [
                { name: 'Panama Canal', coordinates: { latitude: 9.0800, longitude: -79.6800 } }
            ],
            estimatedDays: 14
        },
        {
            id: 'CARRIER-001',
            name: 'Global Shipping Co',
            license: 'IMO-123456',
            insurance: 'POL-789'
        }
    );
    console.log(`   Shipment ID: ${shipment.shipmentId}`);
    console.log(`   Tracking: ${shipment.tracking}\n`);
    
    // Verify authenticity
    console.log('4. Verifying Authenticity...');
    const verification = supply.verifyAuthenticity('PROD-2025-001', 'INSPECTOR-001', {
        rfid: supply.fc.hash('PROD-2025-001').substring(0, 16),
        qrCode: 'QR-PROD-2025-001-VALID',
        blockchain: 12345,
        chemical: { marker: 'TRACER-X', expected: 'TRACER-X' }
    });
    console.log(`   Verification ID: ${verification.verificationId}`);
    console.log(`   Authentic: ${verification.authentic ? 'YES' : 'NO'}`);
    console.log(`   Score: ${(verification.score * 100).toFixed(0)}%\n`);
    
    // Generate consumer proof
    console.log('5. Generating Consumer Proof...');
    const proof = supply.generateConsumerProof('PROD-2025-001');
    console.log(`   Journey steps: ${proof.journey.steps}`);
    console.log(`   Locations tracked: ${proof.journey.locations}`);
    console.log(`   Verifications: ${proof.journey.verifications}`);
    console.log(`   Overall authenticity: ${(proof.authenticity.score * 100).toFixed(0)}%`);
    console.log(`   Verification code: ${proof.mathematical.verificationCode}`);
    console.log(`   QR URL: ${proof.qrCode.url}\n`);
    
    // Show blockchain
    console.log('6. Supply Chain Blockchain:');
    const chain = supply.getChain();
    chain.forEach(block => {
        console.log(`   Block ${block.index}: ${block.event} at ${new Date(block.timestamp).toISOString()}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('Created by Lev Goukassian • ORCID: 0009-0006-5966-1243');
    console.log('Protected under Memorial Covenant');
}

module.exports = SupplyChainVerification;
