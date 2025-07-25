// ========================================
// PROJECT CHIMERA - REALISTIC EXCHANGE DEMO
// Using Industry-Standard SHA-256 Hashing & Cryptographic Proof Receipts
// ========================================

// ===== SHA-256 HELPER FUNCTION =====
// Modern browsers can do this securely. This simulates what an exchange's backend would do.
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// ===== TEST SUITE =====
class TestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    addTest(name, testFn) {
        this.tests.push({ name, testFn });
    }

    async runAllTests() {
        console.log('🧪 Running Sunscreen Demo Test Suite...\n');
        this.results = [];

        for (const test of this.tests) {
            try {
                const result = await test.testFn();
                if (result === true) {
                    console.log(`✅ PASS: ${test.name}`);
                    this.results.push({ name: test.name, status: 'PASS' });
                } else {
                    console.log(`❌ FAIL: ${test.name} - ${result}`);
                    this.results.push({ name: test.name, status: 'FAIL', error: result });
                }
            } catch (error) {
                console.log(`❌ ERROR: ${test.name} - ${error.message}`);
                this.results.push({ name: test.name, status: 'ERROR', error: error.message });
            }
        }

        this.printSummary();
    }

    printSummary() {
        const passed = this.results.filter(r => r.status === 'PASS').length;
        const total = this.results.length;
        console.log(`\n📊 Test Summary: ${passed}/${total} tests passed\n`);
    }
}

// ===== DATA LAYER (As specified in PRD) =====
// TODO: Implement mapleCEX_Data constant

// ===== BUSINESS LOGIC =====
// TODO: Implement checkUser function

// ===== TEST CASES (Written First - TDD Approach) =====
const testSuite = new TestSuite();

// Test 1: Verify SHA-256 function and hashed database exist and are properly structured
testSuite.addTest('SHA-256 function and hashed database should exist', () => {
    if (typeof sha256 === 'undefined') {
        return 'sha256 function is not defined';
    }
    
    if (typeof mapleCEX_HashDatabase === 'undefined') {
        return 'mapleCEX_HashDatabase is not defined';
    }

    // Check if demo users mapping exists
    if (typeof demoUsers === 'undefined') {
        return 'demoUsers mapping is not defined';
    }

    // Check if risk database has proper structure
    const firstProfile = Object.values(mapleCEX_HashDatabase)[0];
    if (!firstProfile.risk_tags || !firstProfile.flagged_quarter || !firstProfile.status) {
        return 'Hashed database missing required fields';
    }

    return true;
});

// Test 2: Cryptographic proof system should exist
testSuite.addTest('Cryptographic proof system should exist', () => {
    if (typeof proofSystem === 'undefined') {
        return 'CryptographicProofSystem instance not defined';
    }
    
    if (typeof performEnhancedRiskCheck === 'undefined') {
        return 'performEnhancedRiskCheck function is not defined';
    }

    if (typeof checkUser === 'undefined') {
        return 'checkUser function is not defined';
    }

    return true;
});

// Test 3: Async SHA-256 hashing should work correctly  
testSuite.addTest('SHA-256 hashing should work correctly', async () => {
    if (typeof sha256 === 'undefined') {
        return 'sha256 function not implemented yet';
    }

    try {
        const testHash = await sha256('test@example.com');
        if (typeof testHash !== 'string' || testHash.length !== 64) {
            return 'SHA-256 should return 64-character hex string';
        }

        // Test that same input produces same hash
        const testHash2 = await sha256('test@example.com');
        if (testHash !== testHash2) {
            return 'SHA-256 should be deterministic';
        }

        return true;
    } catch (error) {
        return `SHA-256 hashing failed: ${error.message}`;
    }
});

// Test 4: Cryptographic proof system should detect known bad actors
testSuite.addTest('Proof system should detect alex.chen@gmail.com as high risk', async () => {
    if (typeof proofSystem === 'undefined') {
        return 'proofSystem not implemented yet';
    }

    try {
        const proofReceipt = await proofSystem.performRiskQuery('alex.chen@gmail.com');
        
        if (!proofReceipt.result.match_found) {
            return 'alex.chen@gmail.com should be detected as high risk';
        }

        if (!proofReceipt.result.risk_tags.includes('Velocity_Withdrawals')) {
            return 'alex.chen@gmail.com should have Velocity_Withdrawals flag';
        }

        if (proofReceipt.result.status !== 'BANNED') {
            return 'alex.chen@gmail.com should have BANNED status';
        }

        if (!proofReceipt.signature || proofReceipt.signature.length !== 64) {
            return 'Proof receipt should have valid SHA-256 signature';
        }

        return true;
    } catch (error) {
        return `Proof generation failed: ${error.message}`;
    }
});

// Test 5: Cryptographic proof system should clear clean users
testSuite.addTest('Proof system should clear unknown users', async () => {
    if (typeof proofSystem === 'undefined') {
        return 'proofSystem not implemented yet';
    }

    try {
        const proofReceipt = await proofSystem.performRiskQuery('clean-user@example.com');
        
        if (proofReceipt.result.match_found) {
            return 'clean-user@example.com should not have any risk flags';
        }

        if (!proofReceipt.result.recommendation.includes('APPROVE')) {
            return 'Clean users should get APPROVE recommendation';
        }

        if (!proofReceipt.compliance || !proofReceipt.compliance.auditable) {
            return 'Proof receipt should be compliance-ready';
        }

        return true;
    } catch (error) {
        return `Clean user proof generation failed: ${error.message}`;
    }
});

// Test 6: Quarter conversion should work for privacy
testSuite.addTest('Date to quarter conversion should preserve privacy', () => {
    if (typeof proofSystem === 'undefined') {
        return 'proofSystem not defined';
    }

    // Test various dates
    const q4_2023 = proofSystem.dateToQuarter('2023-12-10T16:45:00Z');
    const q4_2023_2 = proofSystem.dateToQuarter('2023-11-22T09:12:00Z');
    const q4_2023_3 = proofSystem.dateToQuarter('2023-10-05T12:30:00Z');

    if (q4_2023 !== 'Q4 2023') {
        return `Expected Q4 2023, got ${q4_2023}`;
    }

    if (q4_2023_2 !== 'Q4 2023') {
        return `Expected Q4 2023, got ${q4_2023_2}`;
    }

    if (q4_2023_3 !== 'Q4 2023') {
        return `Expected Q4 2023, got ${q4_2023_3}`;
    }

    return true;
});

// ===== AUTO-RUN TESTS AND INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Sunscreen Demo - Project Chimera');
    console.log('📋 Industry-Standard Cryptographic Proof System');
    console.log('===============================================\n');
    
    // Run core logic tests (now async)
    console.log('Running Cryptographic Proof System Tests:');
    await testSuite.runAllTests();
    
    // Initialize UI after DOM is ready
    setTimeout(() => {
        console.log('\n🎨 Initializing User Interface...');
        try {
            initializeUI();
            console.log('✅ UI initialization completed successfully');
        } catch (error) {
            console.error('❌ UI initialization failed:', error);
            console.error('Error details:', error.stack);
        }
        
        console.log('\n🎯 Demo Ready!');
        console.log('Try the multi-field user onboarding demo!');
    }, 100);
});

// ===== IMPLEMENTATION AREA =====
// TODO: Now implement the actual functionality to make tests pass

// ===== REALISTIC HASHED EXCHANGE DATABASE =====
// This simulates Maple CEX's actual risk database using privacy-protected identifiers
// Keys are cryptographic hashes of user emails (industry standard)

const mapleCEX_HashDatabase = {
    // Privacy-protected hash of: 'alex.chen@gmail.com'
    "4a283f357be6639bcf06457b59bd6754e06e3c1d1b917b0eb76a7f27aa32a289": {
        user_data: {
            email: "alex.chen@gmail.com",
            phone: "+1-555-0123",
            country: "United States",
            document_type: "Passport",
            document_number: "US123456789"
        },
        risk_tags: ["Velocity_Withdrawals", "Suspicious_Patterns"],
        flagged_quarter: "Q4 2023",
        exact_flagged_date: "2023-12-10T16:45:00Z", // Internal only
        status: "BANNED",
        investigation_notes: "Withdrew $50K in 24hrs, ignored KYC requests",
        wallet_addresses: ["1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4"],
        compliance_officer: "J.Smith",
        internal_case_id: "RISK-2023-1247"
    },
    
    // Privacy-protected hash of: 'crypto.trader2024@protonmail.com'  
    "86fd7e480273a8712be320b7d403a5a15733d0dc39732d44088acf35ad04721a": {
        user_data: {
            email: "crypto.trader2024@protonmail.com",
            phone: "+44-20-7946-0958",
            country: "United Kingdom", 
            document_type: "Passport",
            document_number: "UK987654321"
        },
        risk_tags: ["Sanctions_List_Hit", "Multiple_Accounts", "VPN_Usage"],
        flagged_quarter: "Q4 2023",
        exact_flagged_date: "2023-11-22T09:12:00Z", // Internal only
        status: "BLOCKED",
        investigation_notes: "Matched OFAC sanctions list, used multiple identities",
        wallet_addresses: ["3FupnQyrcbUH2cMjHjH2qEQgcBMKL9g7gy"],
        compliance_officer: "M.Davis",
        internal_case_id: "SANCTIONS-2023-0892"
    },

    // Privacy-protected hash of: 'fraud-user-1@email.com'
    "7ee64bc27fce592d32610fea7ac0a971440b3bed040f905d9b35ef23095aa169": {
        user_data: {
            email: "fraud-user-1@email.com",
            phone: "+1-555-0987",
            country: "Canada",
            document_type: "Driver License",
            document_number: "CA654321987"
        },
        risk_tags: ["High_Velocity_Withdrawals"],
        flagged_quarter: "Q3 2024", 
        exact_flagged_date: "2024-08-15T10:30:00Z", // Internal only
        status: "UNDER_REVIEW",
        investigation_notes: "Multiple large withdrawals to new addresses",
        wallet_addresses: ["bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"],
        compliance_officer: "A.Johnson", 
        internal_case_id: "VELOCITY-2024-0156"
    },

    // Privacy-protected hash of: 'sanctioned-user@email.com'
    "e4d2e6f0de586fb0a9b4d7f9df0ede8290a617fbfbf0edff05129e5810788e41": {
        user_data: {
            email: "sanctioned-user@email.com",
            phone: "+86-138-0013-8000",
            country: "China",
            document_type: "National ID",
            document_number: "CN123456789012345"
        },
        risk_tags: ["Sanctions_List_Hit", "Flagged_KYC"],
        flagged_quarter: "Q2 2023",
        exact_flagged_date: "2023-05-20T18:00:00Z", // Internal only
        status: "BLOCKED",
        investigation_notes: "Verified match on OFAC SDN list",
        wallet_addresses: ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"],
        compliance_officer: "K.Wilson",
        internal_case_id: "OFAC-2023-0445"
    },
    
    // Test case for cross-contamination: Same passport as alex.chen but different email/phone
    "a1b2c3d4e5f6789abcdef012345678901234567890abcdef123456789abcdef": {
        user_data: {
            email: "different-user@example.com",
            phone: "+1-555-9999",
            country: "United States",
            document_type: "Passport", 
            document_number: "US123456789"  // Same passport as alex.chen - CONFLICT SCENARIO
        },
        risk_tags: ["Identity_Theft_Suspected"],
        flagged_quarter: "Q3 2024",
        exact_flagged_date: "2024-08-15T10:30:00Z",
        status: "UNDER_INVESTIGATION",
        investigation_notes: "Possible identity document theft or fraud",
        wallet_addresses: ["bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"],
        compliance_officer: "A.Thompson",
        internal_case_id: "IDENTITY-2024-0789"
    },
    
    // Test case: Same phone as alex.chen but different email/document
    "fedcba9876543210987654321098765432109876543210987654321098765432": {
        user_data: {
            email: "phone-thief@scammer.com",
            phone: "+1-555-0123",  // Same phone as alex.chen - CONFLICT SCENARIO
            country: "Mexico",
            document_type: "National ID",
            document_number: "MX999888777"
        },
        risk_tags: ["SIM_Swap_Attack", "Phone_Number_Hijacking"],
        flagged_quarter: "Q1 2024", 
        exact_flagged_date: "2024-02-10T14:20:00Z",
        status: "BANNED",
        investigation_notes: "Confirmed SIM swap attack using stolen phone number",
        wallet_addresses: ["3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"],
        compliance_officer: "R.Garcia",
        internal_case_id: "SIMSWAP-2024-0234"
    }
};

// ===== DEMO USER MAPPING (for easy testing) =====
const demoUsers = {
    "alex.chen@gmail.com": "High-risk user, previously banned for velocity withdrawals",
    "crypto.trader2024@protonmail.com": "Extreme risk, OFAC sanctions list hit", 
    "maria.rodriguez@yahoo.com": "Clean user, no risk flags",
    "fraud-user-1@email.com": "Under review for high-velocity withdrawals",
    "sanctioned-user@email.com": "Blocked, verified OFAC sanctions match"
};

// ===== CRYPTOGRAPHIC PROOF SYSTEM =====
// This creates industry-standard proof receipts that exchanges would actually use

class CryptographicProofSystem {
    // Convert exact dates to quarters for privacy-preserving reporting
    dateToQuarter(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        let quarter;
        if (month <= 3) quarter = 'Q1';
        else if (month <= 6) quarter = 'Q2';
        else if (month <= 9) quarter = 'Q3';
        else quarter = 'Q4';
        
        return `${quarter} ${year}`;
    }

    // Main query function - this is what CoinFlex would call
    async performRiskQuery(userEmail) {
        // Legacy single email support
        const userData = { email: userEmail };
        return this.performMultiFieldRiskQuery(userData);
    }
    
    // Multi-field risk query with hierarchical consistency matching
    async performMultiFieldRiskQuery(userData) {
        const providedFields = Object.keys(userData).filter(k => userData[k] && k !== 'timestamp');
        console.log(`🔍 Multi-field query: ${providedFields.join(', ')}`);
        
        // Collect ALL potential matches for analysis
        const potentialMatches = [];
        
        for (const [hash, riskData] of Object.entries(mapleCEX_HashDatabase)) {
            if (!riskData.user_data) {
                console.warn(`Risk data for hash ${hash.substring(0, 8)}... missing user_data`);
                continue;
            }
            
            const fieldMatches = [];
            const fieldConflicts = [];
            
            // Check each field systematically
            if (userData.email) {
                if (riskData.user_data.email === userData.email) {
                    fieldMatches.push('email');
                } else if (riskData.user_data.email) {
                    fieldConflicts.push('email');
                }
            }
            
            if (userData.phone) {
                if (riskData.user_data.phone === userData.phone) {
                    fieldMatches.push('phone');
                } else if (riskData.user_data.phone) {
                    fieldConflicts.push('phone');
                }
            }
            
            if (userData.country) {
                if (riskData.user_data.country && 
                    riskData.user_data.country.toLowerCase() === userData.country.toLowerCase()) {
                    fieldMatches.push('country');
                } else if (riskData.user_data.country) {
                    fieldConflicts.push('country');
                }
            }
            
            if (userData.doc_type && userData.doc_number) {
                if (riskData.user_data.document_type === userData.doc_type &&
                    riskData.user_data.document_number === userData.doc_number) {
                    fieldMatches.push('document');
                } else if (riskData.user_data.document_type || riskData.user_data.document_number) {
                    fieldConflicts.push('document');
                }
            }
            
            // Only consider records with actual matches
            if (fieldMatches.length > 0) {
                potentialMatches.push({
                    hash,
                    riskData,
                    matchedFields: fieldMatches,
                    conflictingFields: fieldConflicts,
                    matchStrength: fieldMatches.length,
                    hasConflicts: fieldConflicts.length > 0
                });
            }
        }
        
        // Analyze matches for consistency and conflicts
        return this.analyzeMatches(potentialMatches, userData, providedFields);
    }
    
    // Analyze potential matches for consistency and determine final result
    async analyzeMatches(potentialMatches, userData, providedFields) {
        if (potentialMatches.length === 0) {
            console.log('❌ No matches found');
            return this.generateNoMatchReceipt(await sha256(JSON.stringify(userData)), userData);
        }
        
        console.log(`📊 Found ${potentialMatches.length} potential match(es)`);
        
        // Sort by match strength (number of matching fields)
        potentialMatches.sort((a, b) => b.matchStrength - a.matchStrength);
        
        const strongestMatch = potentialMatches[0];
        const providedFieldCount = providedFields.length;
        
        // SCENARIO 1: Single field query - allow but mark as partial
        if (providedFieldCount === 1) {
            console.log(`✅ Single-field match on: ${strongestMatch.matchedFields.join(', ')}`);
            return this.generatePartialMatchReceipt(strongestMatch, userData, 'single_field');
        }
        
        // SCENARIO 2: Multi-field query - validate consistency
        if (providedFieldCount > 1) {
            return this.validateMultiFieldConsistency(potentialMatches, userData, providedFields);
        }
        
        // Fallback
        return this.generateNoMatchReceipt(await sha256(JSON.stringify(userData)), userData);
    }
    
    // Validate multi-field query consistency
    async validateMultiFieldConsistency(potentialMatches, userData, providedFields) {
        const strongestMatch = potentialMatches[0];
        const providedFieldCount = providedFields.length;
        
        // Check if strongest match covers ALL provided fields
        const allFieldsMatch = strongestMatch.matchedFields.length === providedFieldCount;
        
        if (allFieldsMatch && !strongestMatch.hasConflicts) {
            console.log(`✅ Full consistency match on: ${strongestMatch.matchedFields.join(', ')}`);
            return this.generateMultiFieldProofReceipt(
                strongestMatch.hash, 
                strongestMatch.riskData, 
                userData, 
                strongestMatch.matchedFields
            );
        }
        
        // Check for partial matches with conflicts
        if (strongestMatch.hasConflicts) {
            console.log(`⚠️ Partial match with conflicts: matched ${strongestMatch.matchedFields.join(', ')}, conflicts on ${strongestMatch.conflictingFields.join(', ')}`);
            return this.generateConflictedMatchReceipt(strongestMatch, userData);
        }
        
        // Multiple potential matches - might be cross-contamination
        if (potentialMatches.length > 1) {
            console.log(`🚨 Multiple potential matches detected - possible cross-contamination`);
            return this.generateAmbiguousMatchReceipt(potentialMatches, userData);
        }
        
        // Partial match (some fields match, others not provided)
        console.log(`⚠️ Partial match: ${strongestMatch.matchedFields.join(', ')} out of ${providedFieldCount} fields`);
        return this.generatePartialMatchReceipt(strongestMatch, userData, 'partial_fields');
    }
    
    // Generate receipt for conflicted matches (data inconsistency detected)
    async generateConflictedMatchReceipt(match, userData) {
        const timestamp = new Date().toISOString();
        
        return {
            provider: "MapleCEX",
            query_hash: match.hash,
            timestamp: timestamp,
            result: {
                match_found: false,
                match_quality: "CONFLICTED",
                matched_fields: match.matchedFields,
                conflicted_fields: match.conflictingFields,
                reason: "Data inconsistency detected - provided fields contain conflicting information"
            },
            compliance: {
                query_id: `QUERY-${Date.now()}`,
                auditable: true,
                regulation_compliance: ["BSA", "KYC", "OFAC"],
                security_flag: "POTENTIAL_FRAUD_INDICATOR"
            },
            signature: await sha256(JSON.stringify({ match: match.matchedFields, conflicts: match.conflictingFields, timestamp }))
        };
    }
    
    // Generate receipt for ambiguous matches (multiple users match different fields)  
    async generateAmbiguousMatchReceipt(matches, userData) {
        const timestamp = new Date().toISOString();
        
        return {
            provider: "MapleCEX", 
            query_hash: await sha256(JSON.stringify(userData)),
            timestamp: timestamp,
            result: {
                match_found: false,
                match_quality: "AMBIGUOUS",
                potential_matches: matches.length,
                reason: "Multiple users match different provided fields - unable to determine single identity"
            },
            compliance: {
                query_id: `QUERY-${Date.now()}`,
                auditable: true,
                regulation_compliance: ["BSA", "KYC", "OFAC"],
                security_flag: "CROSS_CONTAMINATION_DETECTED"
            },
            signature: await sha256(JSON.stringify({ ambiguous: true, count: matches.length, timestamp }))
        };
    }
    
    // Generate receipt for partial matches
    async generatePartialMatchReceipt(match, userData, matchType) {
        const timestamp = new Date().toISOString();
        
        return {
            provider: "MapleCEX",
            query_hash: match.hash,
            timestamp: timestamp,
            result: {
                match_found: true,
                match_quality: matchType.toUpperCase(),
                risk_tags: match.riskData.risk_tags,
                flagged_quarter: match.riskData.flagged_quarter,
                matched_fields: match.matchedFields,
                confidence_level: matchType === 'single_field' ? 'LOW' : 'MEDIUM'
            },
            compliance: {
                query_id: `QUERY-${Date.now()}`,
                auditable: true,
                regulation_compliance: ["BSA", "KYC", "OFAC"]
            },
            signature: await sha256(JSON.stringify({ 
                match: match.matchedFields, 
                type: matchType, 
                timestamp 
            }))
        };
    }

    // Generate a cryptographically signed proof receipt for matches
    async generateProofReceipt(queryHash, riskData, originalEmail) {
        const timestamp = new Date().toISOString();
        
        // This is what CoinFlex receives - NO internal details exposed
        const proofObject = {
            provider: "MapleCEX",
            query_hash: queryHash,
            timestamp: timestamp,
            result: {
                match_found: true,
                risk_tags: riskData.risk_tags,
                flagged_quarter: riskData.flagged_quarter, // Privacy-preserving date
                match_field: "email" // What field was matched
                // NOTE: No status or recommendation from Maple CEX - they only provide raw risk data
            },
            compliance: {
                query_id: `QUERY-${Date.now()}`,
                auditable: true,
                regulation_compliance: ["BSA", "KYC", "OFAC"]
            },
            // Cryptographic signature proves authenticity
            signature: ""
        };

        // Generate cryptographic signature of Maple CEX's raw data response
        const signatureContent = `${proofObject.provider}${proofObject.timestamp}${proofObject.query_hash}${JSON.stringify(proofObject.result)}`;
        proofObject.signature = await sha256(signatureContent);

        // Now Sunscreen processes the raw data and adds its own recommendation
        const sunscreenRecommendation = this.generateSunscreenRecommendation(riskData.status, riskData.risk_tags);
        
        // Final proof receipt includes both Maple CEX data + Sunscreen's analysis
        const finalProofReceipt = {
            ...proofObject,
            sunscreen_analysis: {
                recommendation: sunscreenRecommendation,
                risk_level: this.calculateRiskLevel(riskData.risk_tags),
                compliance_guidance: "Review recommended based on partner data"
            }
        };

        // For demo purposes, also return internal data for the "aha!" moment
        finalProofReceipt._internal_demo_data = {
            original_email: originalEmail,
            exact_flagged_date: riskData.exact_flagged_date,
            investigation_notes: riskData.investigation_notes,
            compliance_officer: riskData.compliance_officer,
            internal_case_id: riskData.internal_case_id,
            wallet_addresses: riskData.wallet_addresses
        };

        return finalProofReceipt;
    }
    
    // Generate proof receipt for multi-field matches
    async generateMultiFieldProofReceipt(queryHash, riskData, originalUserData, matchedFields) {
        const timestamp = new Date().toISOString();
        
        // What the querying exchange actually receives (minimal info)
        const externalResult = {
            match_found: true,
            risk_tags: riskData.risk_tags,
            flagged_quarter: riskData.flagged_quarter, // Privacy-preserving date
            matched_fields: matchedFields // What fields were matched
            // NOTE: No status or recommendation from Maple CEX - they only provide raw risk data
        };
        
        const proofContent = {
            provider: "MapleCEX", 
            timestamp: timestamp,
            query_hash: queryHash,
            result: externalResult,
            compliance: {
                query_id: `QRY-${Date.now()}`,
                regulation_basis: "BSA/KYC compliance check",
                data_retention_days: 2555, // 7 years
                classification: "RESTRICTED"
            }
        };

        // Generate cryptographic signature of Maple CEX's raw data response
        const signatureContent = `${proofContent.provider}${proofContent.timestamp}${proofContent.query_hash}${JSON.stringify(proofContent.result)}`;
        const signature = await sha256(signatureContent);
        
        // Now Sunscreen processes the raw data and adds its own recommendation
        const sunscreenRecommendation = this.generateSunscreenRecommendation(riskData.status, riskData.risk_tags);
        
        // Final proof receipt includes both Maple CEX data + Sunscreen's analysis
        const finalProofReceipt = {
            ...proofContent,
            signature: signature,
            sunscreen_analysis: {
                recommendation: sunscreenRecommendation,
                risk_level: this.calculateRiskLevel(riskData.risk_tags),
                compliance_guidance: "Review recommended based on partner data"
            }
        };

        // For demo purposes, also return internal data for the "aha!" moment
        finalProofReceipt._internal_demo_data = {
            original_user_data: originalUserData,
            internal_case_id: riskData.internal_case_id,
            compliance_officer: riskData.compliance_officer,
            investigation_notes: riskData.investigation_notes,
            wallet_addresses: riskData.wallet_addresses,
            exact_flagged_date: riskData.exact_flagged_date,
            internal_status: riskData.status, // Internal status stays internal
            reported_quarter: riskData.flagged_quarter,
            matched_user_data: riskData.user_data
        };

        return finalProofReceipt;
    }

    // Generate receipt for clean users (no match)
    async generateNoMatchReceipt(queryHash, originalUserData) {
        const timestamp = new Date().toISOString();
        
        const baseReceipt = {
            provider: "MapleCEX", 
            query_hash: queryHash,
            timestamp: timestamp,
            result: {
                match_found: false,
                searched_fields: Object.keys(originalUserData).filter(key => originalUserData[key])
            },
            compliance: {
                query_id: `QUERY-${Date.now()}`,
                auditable: true,
                regulation_compliance: ["BSA", "KYC", "OFAC"]
            }
        };
        
        // Generate signature for no-match response
        const signatureContent = `${baseReceipt.provider}${baseReceipt.timestamp}${baseReceipt.query_hash}${JSON.stringify(baseReceipt.result)}`;
        baseReceipt.signature = await sha256(signatureContent);
        
        // Sunscreen adds its analysis for no-match cases
        const finalReceipt = {
            ...baseReceipt,
            sunscreen_analysis: {
                recommendation: "APPROVE - No risk flags detected in partner network",
                risk_level: "CLEAN",
                compliance_guidance: "No risk indicators found - proceed with standard onboarding"
            },
            _internal_demo_data: {
                original_user_data: originalUserData,
                note: "This user is not in Maple CEX's risk database",
                total_records_checked: Object.keys(mapleCEX_HashDatabase).length
            }
        };
        
        return finalReceipt;
    }

    // Generate compliance recommendations
    // Sunscreen's recommendation logic (not Maple CEX's)
    generateSunscreenRecommendation(status, riskTags) {
        if (status === 'BLOCKED' || riskTags.includes('Sanctions_List_Hit')) {
            return "REJECT - Extreme compliance risk detected";
        } else if (status === 'BANNED' || riskTags.includes('Velocity_Withdrawals')) {
            return "REJECT - High risk user, manual review required";
        } else {
            return "MANUAL_REVIEW - Moderate risk flags detected";
        }
    }
    
    // Calculate risk level based on tags (Sunscreen's analysis)
    calculateRiskLevel(riskTags) {
        if (riskTags.includes('Sanctions_List_Hit')) return 'EXTREME';
        if (riskTags.includes('High_Velocity_Withdrawals') || riskTags.includes('Velocity_Withdrawals')) return 'HIGH';
        if (riskTags.includes('Flagged_KYC')) return 'MODERATE';
        return 'LOW';
    }
}

const proofSystem = new CryptographicProofSystem();

// Query audit log for Maple CEX dashboard
const queryAuditLog = [];

// Compliance audit log for CoinFlex regulatory purposes
const complianceAuditLog = [];

// Backwards compatibility functions
async function performEnhancedRiskCheck(userEmail) {
    return await proofSystem.performRiskQuery(userEmail);
}

async function checkUser(userEmail) {
    if (!userEmail || userEmail.trim() === '') {
        return 'No Match Found';
    }
    
    const result = await proofSystem.performRiskQuery(userEmail);
    
    if (result.result.match_found) {
        return result.result.risk_tags;
    } else {
        return 'No Match Found';
    }
}

// ===== UI INTERACTION LOGIC =====

// UI Test Suite
const uiTestSuite = new TestSuite();

// Add UI tests
uiTestSuite.addTest('Required DOM elements should exist', () => {
    const requiredElements = [
        'userEmail', 'userPhone', 'userCountry', 'docType', 'docNumber',
        'checkButton', 'resultsPanel', 'viewToggle', 'partnerDataDisplay'
    ];
    
    for (let elementId of requiredElements) {
        if (!document.getElementById(elementId)) {
            return `Element with ID '${elementId}' not found`;
        }
    }
    return true;
});

    // Initialize UI functionality
    function initializeUI() {
        // Get DOM elements and make them accessible to other functions
        window.checkButton = document.getElementById('checkButton');
        window.resultsPanel = document.getElementById('resultsPanel');
        window.partnerDataDisplay = document.getElementById('partnerDataDisplay');
        window.apiStatus = document.getElementById('apiStatus');
        window.sunscreenAPI = document.getElementById('sunscreenAPI');
        
        // View switching elements
        const viewToggle = document.getElementById('viewToggle');
        const coinflexView = document.getElementById('coinflexView');
        const mapleCEXView = document.getElementById('mapleCEXView');
        const viewDescription = document.getElementById('viewDescription');
        


    // Handle user query with cryptographic proof system
    async function handleUserQuery() {
        console.log('🔍 handleUserQuery called');
        
        // Get all form values with error checking
        const userData = {};
        
        try {
            console.log('📝 Gathering form data...');
            
            const emailField = document.getElementById('userEmail');
            const phoneField = document.getElementById('userPhone');
            const countryField = document.getElementById('userCountry');
            const docTypeField = document.getElementById('docType');
            const docNumberField = document.getElementById('docNumber');
            
            console.log('Form fields found:', {
                email: !!emailField,
                phone: !!phoneField, 
                country: !!countryField,
                docType: !!docTypeField,
                docNumber: !!docNumberField
            });
            
            userData.email = emailField ? emailField.value.trim() : '';
            userData.phone = phoneField ? phoneField.value.trim() : '';
            userData.country = countryField ? countryField.value.trim() : '';
            userData.doc_type = docTypeField ? docTypeField.value : '';
            userData.doc_number = docNumberField ? docNumberField.value.trim() : '';
            
            console.log('User data collected:', userData);
        } catch (error) {
            console.error('Error accessing form fields:', error);
            showError('Form fields not available. Please refresh the page.');
            return;
        }
        
        // Check if at least one field is filled
        const hasData = Object.values(userData).some(value => value !== '');
        
        if (!hasData) {
            console.log('❌ No data provided');
            showError('Please enter at least one piece of user information');
            return;
        }
        
        console.log('✅ Data validation passed, starting query...');
        
        // Show loading state
        showLoadingState();
        
        // Simulate API call delay for demo effect
        await simulateAPICall();
        
        try {
            console.log('🔍 Performing multi-field risk query...');
            
            // Get cryptographic proof receipt from Sunscreen API
            const proofReceipt = await proofSystem.performMultiFieldRiskQuery(userData);
            
            console.log('📋 Query result received:', proofReceipt);
            
            // Log the query for Maple CEX audit dashboard
            logQueryForAudit(userData, proofReceipt);
            
            // Log for CoinFlex compliance audit (full data retention)
            console.log('🔍 Logging compliance audit for:', userData);
            logComplianceAudit(userData, proofReceipt);
            console.log('📋 Compliance audit log now has', complianceAuditLog.length, 'entries');
            
            // Display the proof receipt
            displayProofReceipt(userData, proofReceipt);
            
            // Update dashboard if in Maple CEX view
            updateQueryDashboard();
            
            console.log('✅ Query completed successfully');
        } catch (error) {
            console.error('❌ Query execution failed:', error);
            console.error('Error stack:', error.stack);
            showError(`Query failed: ${error.message}`);
        }
    }

    function showLoadingState() {
        window.apiStatus.textContent = 'Processing...';
        window.apiStatus.style.background = '#ffc107';
        window.sunscreenAPI.style.transform = 'scale(1.05)';
        
        window.resultsPanel.innerHTML = `
            <div class="api-response">
                <p>🔄 Querying Sunscreen API...</p>
                <p>Coordinating with partner networks...</p>
            </div>
        `;
    }

    async function simulateAPICall() {
        // Simulate network delay for dramatic effect
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    function displayProofReceipt(userData, proofReceipt) {
        // Reset API visual
        window.apiStatus.textContent = 'Ready';
        window.apiStatus.style.background = '#28a745';
        window.sunscreenAPI.style.transform = 'scale(1)';

        // Store the actual data for toggling
        window.currentQueryData = {
            userData: userData,
            proofReceipt: proofReceipt,
            isDecrypted: false
        };

        // Always start with encrypted view
        renderQueryResult(false);
    }

    // Make renderQueryResult globally accessible for the toggle function
    window.renderQueryResult = function(isDecrypted) {
        const { userData, proofReceipt } = window.currentQueryData;
        const encryptedPlaceholder = "&lt;encrypted&gt;";
        
        let responseHTML;
        
        // Build user info display with encryption toggle
        const userInfoItems = [];
        if (userData.email) userInfoItems.push(`Email: ${isDecrypted ? userData.email : encryptedPlaceholder}`);
        if (userData.phone) userInfoItems.push(`Phone: ${isDecrypted ? userData.phone : encryptedPlaceholder}`);
        if (userData.country) userInfoItems.push(`Country: ${isDecrypted ? userData.country : encryptedPlaceholder}`);
        if (userData.doc_type && userData.doc_number) userInfoItems.push(`Document: ${isDecrypted ? userData.doc_type + ' ' + userData.doc_number : encryptedPlaceholder}`);
        const userInfoText = userInfoItems.join(' | ');
        
        // Decrypt button
        const decryptButton = `
            <button onclick="${isDecrypted ? '' : 'toggleDecryption()'}" class="decrypt-toggle-btn ${isDecrypted ? 'decrypted-state' : ''}">
                ${isDecrypted ? '🔓 Decrypted' : '🔓 Decrypt'}
            </button>
        `;
        
        if (!proofReceipt.result.match_found) {
            // Handle different types of non-matches
            const matchQuality = proofReceipt.result.match_quality;
            
            if (matchQuality === 'CONFLICTED') {
                responseHTML = `
                    <div class="api-response conflict-detected" style="border-left: 4px solid #dc3545;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>🚨 Data Conflict Detected</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Matched Fields:</strong> ${isDecrypted ? proofReceipt.result.matched_fields?.join(', ') || 'None' : encryptedPlaceholder}</p>
                        <p><strong>Conflicting Fields:</strong> ${isDecrypted ? proofReceipt.result.conflicted_fields?.join(', ') || 'None' : encryptedPlaceholder}</p>
                        <p><strong>Result:</strong> ${isDecrypted ? proofReceipt.result.reason : encryptedPlaceholder}</p>
                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #f8d7da; border-radius: 4px; font-size: 0.9rem;">
                            <strong>⚠️ Security Alert:</strong> ${isDecrypted ? 'Potential fraud indicator - user data inconsistency detected' : encryptedPlaceholder}
                        </div>
                    </div>
                `;
            } else if (matchQuality === 'AMBIGUOUS') {
                responseHTML = `
                    <div class="api-response ambiguous-match" style="border-left: 4px solid #fd7e14;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>⚠️ Multiple Identity Matches</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Potential Matches:</strong> ${isDecrypted ? proofReceipt.result.potential_matches : encryptedPlaceholder}</p>
                        <p><strong>Result:</strong> ${isDecrypted ? proofReceipt.result.reason : encryptedPlaceholder}</p>
                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #fff3cd; border-radius: 4px; font-size: 0.9rem;">
                            <strong>🚨 Cross-Contamination Alert:</strong> ${isDecrypted ? 'Multiple users match different provided fields' : encryptedPlaceholder}
                        </div>
                    </div>
                `;
            } else {
                // Standard no-match case
                responseHTML = `
                    <div class="api-response no-match">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>🟢 Query Complete - ${isDecrypted ? 'User Clear' : encryptedPlaceholder}</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Result:</strong> ${isDecrypted ? 'No risk flags found across partner network' : encryptedPlaceholder}</p>
                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #d4edda; border-radius: 4px; font-size: 0.9rem;">
                            <strong>🔐 Privacy Protected:</strong> Query processed without revealing user identity to partners
                        </div>
                    </div>
                `;
            }
        } else {
            // Handle matches - check for different match qualities
            const matchQuality = proofReceipt.result.match_quality;
            const confidenceLevel = proofReceipt.result.confidence_level;
            
            if (matchQuality === 'SINGLE_FIELD' || matchQuality === 'PARTIAL_FIELDS') {
                // Handle partial matches with confidence indicators
                const confidenceColor = confidenceLevel === 'LOW' ? '#ffc107' : confidenceLevel === 'MEDIUM' ? '#fd7e14' : '#dc3545';
                const matchedFields = proofReceipt.result.matched_fields || [];
                const matchedFieldsText = matchedFields.length > 0 ? matchedFields.join(', ') : 'None';
                
                responseHTML = `
                    <div class="api-response partial-match" style="border-left: 4px solid ${confidenceColor};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>⚠️ Partial Match - ${confidenceLevel} Confidence</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Matched Fields:</strong> ${isDecrypted ? matchedFieldsText : encryptedPlaceholder}</p>
                        <p><strong>Match Type:</strong> ${isDecrypted ? matchQuality.replace('_', ' ').toLowerCase() : encryptedPlaceholder}</p>
                        <p><strong>Flagged Quarter:</strong> ${isDecrypted ? proofReceipt.result.flagged_quarter : encryptedPlaceholder}</p>
        
                        <div style="margin: 0.75rem 0;">
                            <strong>Risk Flags:</strong><br/>
                            ${isDecrypted ? 
                                proofReceipt.result.risk_tags.map(flag => `<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8rem; margin: 2px;">${flag}</span>`).join('') :
                                `<span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8rem; margin: 2px;">${encryptedPlaceholder}</span>`
                            }
                        </div>
        
                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #fff3cd; border-radius: 4px; font-size: 0.9rem;">
                            <strong>⚠️ Partial Match Alert:</strong> ${isDecrypted ? `Only ${matchedFields.length} field(s) matched - consider additional verification` : encryptedPlaceholder}
                        </div>
                        <div style="margin-top: 0.5rem; padding: 0.5rem; background: #e7f3ff; border-radius: 4px; font-size: 0.9rem;">
                            <strong>🔐 Privacy Protected:</strong> Partner never learned you were investigating this user
                        </div>
                    </div>
                `;
            } else {
                // Handle full confidence matches
                const riskLevel = proofReceipt.sunscreen_analysis?.risk_level || 'MEDIUM';
                const isExtreme = riskLevel === 'EXTREME';
                const isHigh = riskLevel === 'HIGH';
                const riskColor = isExtreme ? '#dc3545' : isHigh ? '#fd7e14' : '#ffc107';
                
                const matchedFields = proofReceipt.result.matched_fields || (proofReceipt.result.match_field ? [proofReceipt.result.match_field] : []);
                const matchedFieldsText = matchedFields.length > 0 ? matchedFields.join(', ') : 'No matches detected';
                
                responseHTML = `
                    <div class="api-response" style="border-left: 4px solid ${riskColor};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>⚠️ Risk Alert</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Flagged Quarter:</strong> ${isDecrypted ? proofReceipt.result.flagged_quarter : encryptedPlaceholder}</p>
                        <p><strong>Matched Fields:</strong> ${isDecrypted ? matchedFieldsText : encryptedPlaceholder}</p>

                        <div style="margin: 0.75rem 0;">
                            <strong>Risk Flags:</strong><br/>
                            ${isDecrypted ? 
                                proofReceipt.result.risk_tags.map(flag => `<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8rem; margin: 2px;">${flag}</span>`).join('') :
                                `<span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8rem; margin: 2px;">${encryptedPlaceholder}</span>`
                            }
                        </div>

                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #fff3cd; border-radius: 4px; font-size: 0.9rem;">
                            <strong>🔐 Privacy Protected:</strong> Partner never learned you were investigating this user
                        </div>
                    </div>
                `;
            }
        }

        window.resultsPanel.innerHTML = responseHTML;
        window.currentQueryData.isDecrypted = isDecrypted;
    }

    // Make toggleDecryption globally accessible
    window.toggleDecryption = function() {
        const currentState = window.currentQueryData.isDecrypted;
        renderQueryResult(!currentState);
    }
    
    // Log queries for Maple CEX audit dashboard (privacy-preserving)
    function logQueryForAudit(userData, proofReceipt) {
        const queryEntry = {
            id: proofReceipt.compliance.query_id,
            timestamp: proofReceipt.timestamp,
            queryingPartner: "CoinFlex Exchange"
            // Note: In true encrypted queries, MapleCEX would never know:
            // - If a match was found
            // - What data was shared  
            // - What fields were searched
            // This preserves complete privacy for the querying exchange
        };
        
        queryAuditLog.unshift(queryEntry); // Add to beginning
        
        // Keep only last 10 queries for demo
        if (queryAuditLog.length > 10) {
            queryAuditLog.pop();
        }
    }

    // Log compliance audit entries for regulatory purposes
    function logComplianceAudit(userData, proofReceipt) {
        const auditEntry = {
            id: proofReceipt.compliance.query_id,
            timestamp: proofReceipt.timestamp,
            query_time_utc: new Date(proofReceipt.timestamp).toISOString(),
            query_time_local: new Date(proofReceipt.timestamp).toLocaleString(),
            cryptographic_signature: proofReceipt.signature,
            search_details: {
                email: userData.email || null,
                phone: userData.phone || null,
                country: userData.country || null,
                document_type: userData.doc_type || null,
                document_number: userData.doc_number || null
            },
            original_query_data: userData,
            original_response: proofReceipt,
            compliance_framework: "BSA/AML, OFAC, KYC",
            data_retention_period: "7 years",
            audit_trail_verified: true
        };
        
        complianceAuditLog.unshift(auditEntry); // Add to beginning
        
        // Keep extensive audit trail (regulatory requirement)
        if (complianceAuditLog.length > 100) {
            complianceAuditLog.pop();
        }
    }

    // Audit modal functions
    window.openAuditModal = function() {
        console.log('🏛️ Opening audit modal, compliance log has', complianceAuditLog.length, 'entries');
        document.getElementById('auditModal').style.display = 'block';
        renderAuditLog();
    }

    window.closeAuditModal = function() {
        document.getElementById('auditModal').style.display = 'none';
    }

    window.decryptAuditEntry = function(entryId) {
        const entry = complianceAuditLog.find(e => e.id === entryId);
        if (entry) {
            entry.isDecrypted = true;
            renderAuditLog();
        }
    }

    function renderAuditLog() {
        const container = document.getElementById('auditLogContainer');
        
        if (complianceAuditLog.length === 0) {
            container.innerHTML = `
                <div class="no-audit-entries">
                    <p>No queries in audit log. Perform a user risk check to see audit trail.</p>
                </div>
            `;
            return;
        }

        const auditHTML = complianceAuditLog.map(entry => {
            const encryptedPlaceholder = "&lt;encrypted&gt;";
            const isDecrypted = entry.isDecrypted || false;
            
            // Format search details
            const searchItems = [];
            if (entry.search_details.email) searchItems.push(`Email: ${isDecrypted ? entry.search_details.email : encryptedPlaceholder}`);
            if (entry.search_details.phone) searchItems.push(`Phone: ${isDecrypted ? entry.search_details.phone : encryptedPlaceholder}`);
            if (entry.search_details.country) searchItems.push(`Country: ${isDecrypted ? entry.search_details.country : encryptedPlaceholder}`);
            if (entry.search_details.document_type) searchItems.push(`Document: ${isDecrypted ? entry.search_details.document_type + ' ' + entry.search_details.document_number : encryptedPlaceholder}`);
            
            return `
                <div class="audit-entry">
                    <div class="audit-entry-header">
                        <h4>Query ID: ${entry.id}</h4>
                        <button onclick="decryptAuditEntry('${entry.id}')" class="audit-decrypt-btn ${isDecrypted ? 'decrypted-state' : ''}" ${isDecrypted ? 'disabled' : ''}>
                            ${isDecrypted ? '🔓 Decrypted' : '🔓 Decrypt Query Results'}
                        </button>
                    </div>
                    
                    <div class="audit-entry-details">
                        <div class="audit-detail-row">
                            <span class="audit-label">Query Time (UTC):</span>
                            <span class="audit-value">${entry.query_time_utc}</span>
                        </div>
                        <div class="audit-detail-row">
                            <span class="audit-label">Query Time (Local):</span>
                            <span class="audit-value">${entry.query_time_local}</span>
                        </div>
                                                 <div class="audit-detail-row">
                             <span class="audit-label">Cryptographic Signature by Responding Exchange:</span>
                             <span class="audit-value signature-hash">${entry.cryptographic_signature.substring(0, 32)}...</span>
                         </div>
                        <div class="audit-detail-row">
                            <span class="audit-label">Search Details:</span>
                            <span class="audit-value">${searchItems.join(' | ')}</span>
                        </div>
                        
                                                 ${isDecrypted ? `
                             <div class="audit-query-results">
                                 <h5>🔓 Decrypted Query Results:</h5>
                                 <div class="audit-result-content">
                                     <p><strong>Data Source Exchange:</strong> ${entry.original_response.provider || 'MapleCEX'}</p>
                                     ${(() => {
                                         const result = entry.original_response.result;
                                         const matchQuality = result.match_quality;
                                         
                                         if (result.match_found) {
                                             // Handle actual matches (with or without partial quality)
                                             const riskTags = result.risk_tags ? result.risk_tags.join(', ') : 'N/A';
                                             const matchedFields = result.matched_fields ? result.matched_fields.join(', ') : result.match_field || 'N/A';
                                             const confidenceLevel = result.confidence_level ? ` (${result.confidence_level} confidence)` : '';
                                             const matchType = matchQuality && (matchQuality === 'SINGLE_FIELD' || matchQuality === 'PARTIAL_FIELDS') ? ` - ${matchQuality.replace('_', ' ').toLowerCase()}` : '';
                                             
                                             return `<p><strong>Result:</strong> Risk Alert - User flagged${matchType}${confidenceLevel}</p>
                                                     <p><strong>Risk Tags:</strong> ${riskTags}</p>
                                                     <p><strong>Flagged Quarter:</strong> ${result.flagged_quarter || 'N/A'}</p>
                                                     <p><strong>Matched Fields:</strong> ${matchedFields}</p>
                                                     <p><strong>Provider Query ID:</strong> ${entry.original_response.compliance?.query_id || 'N/A'}</p>`;
                                         } else if (matchQuality === 'CONFLICTED') {
                                             // Handle data conflicts
                                             const matchedFields = result.matched_fields ? result.matched_fields.join(', ') : 'None';
                                             const conflictedFields = result.conflicted_fields ? result.conflicted_fields.join(', ') : 'None';
                                             
                                             return `<p><strong>Result:</strong> ❌ Data Conflict Detected</p>
                                                     <p><strong>Matched Fields:</strong> ${matchedFields}</p>
                                                     <p><strong>Conflicting Fields:</strong> ${conflictedFields}</p>
                                                     <p><strong>Security Flag:</strong> ${entry.original_response.compliance?.security_flag || 'POTENTIAL_FRAUD_INDICATOR'}</p>
                                                     <p><strong>Reason:</strong> ${result.reason || 'Data inconsistency detected'}</p>`;
                                         } else if (matchQuality === 'AMBIGUOUS') {
                                             // Handle ambiguous matches (cross-contamination)
                                             return `<p><strong>Result:</strong> ⚠️ Multiple Identity Matches Detected</p>
                                                     <p><strong>Potential Matches:</strong> ${result.potential_matches || 'Multiple'}</p>
                                                     <p><strong>Security Flag:</strong> ${entry.original_response.compliance?.security_flag || 'CROSS_CONTAMINATION_DETECTED'}</p>
                                                     <p><strong>Reason:</strong> ${result.reason || 'Multiple users match different provided fields'}</p>`;
                                         } else {
                                             // Handle genuine "User Clear" cases
                                             return `<p><strong>Result:</strong> User Clear - No risk flags found</p>
                                                     <p><strong>Network Coverage:</strong> Partner exchange network queried</p>`;
                                         }
                                     })()}
                                     <p><strong>Response Timestamp:</strong> ${entry.original_response.timestamp}</p>
                                 </div>
                             </div>
                         ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = auditHTML;
    }
    
    // Update the query dashboard statistics and log
    function updateQueryDashboard() {
        const totalQueries = queryAuditLog.length;
        
        // Update stats - only show total queries received
        document.getElementById('totalQueries').textContent = totalQueries;
        
        // Update query log display
        const queryLogDisplay = document.getElementById('queryLogDisplay');
        
        if (queryAuditLog.length === 0) {
            queryLogDisplay.innerHTML = `
                <div class="no-queries">
                    <p>No queries yet. Switch to CoinFlex view and try a search!</p>
                </div>
            `;
            return;
        }
        
        const logHTML = queryAuditLog.map(query => {
            const formattedDate = new Date(query.timestamp).toLocaleDateString();
            const formattedTime = new Date(query.timestamp).toLocaleTimeString();
            
            // Generate encrypted placeholders to show data exists but is encrypted
            const encryptedPlaceholder = "&lt;encrypted&gt;";
            
            return `
                <div class="query-entry">
                    <div class="query-header">
                        <span class="query-id">Query #${query.id}</span>
                        <span class="query-timestamp">${formattedDate} at ${formattedTime}</span>
                    </div>
                    <div class="query-details">
                        <span class="querying-partner">📊 Querying Partner: ${query.queryingPartner}</span>
                    </div>
                    
                    <div class="encrypted-query-result">
                        <h5>🔐 Encrypted Query Result (As Processed by MapleCEX):</h5>
                        <div class="encrypted-fields">
                                                         <div class="encrypted-field">
                                 <span class="field-label">User Email:</span>
                                 <span class="encrypted-value">${encryptedPlaceholder}</span>
                             </div>
                             <div class="encrypted-field">
                                 <span class="field-label">Phone Number:</span>
                                 <span class="encrypted-value">${encryptedPlaceholder}</span>
                             </div>
                             <div class="encrypted-field">
                                 <span class="field-label">Country:</span>
                                 <span class="encrypted-value">${encryptedPlaceholder}</span>
                             </div>
                             <div class="encrypted-field">
                                 <span class="field-label">Document Info:</span>
                                 <span class="encrypted-value">${encryptedPlaceholder}</span>
                             </div>
                             <div class="encrypted-field">
                                 <span class="field-label">Risk Data Response:</span>
                                 <span class="encrypted-value">${encryptedPlaceholder}</span>
                             </div>
                             <div class="encrypted-field">
                                 <span class="field-label">Match Result:</span>
                                 <span class="encrypted-value">${encryptedPlaceholder}</span>
                             </div>
                        </div>
                        <div class="encryption-notice">
                            <strong>🔒 Privacy Protection:</strong> All query data is encrypted - MapleCEX cannot see the actual user information or what data was shared with CoinFlex.
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        queryLogDisplay.innerHTML = logHTML;
    }

    function showError(message) {
        window.resultsPanel.innerHTML = `
            <div class="api-response no-match">
                <h4>❌ Error</h4>
                <p>${message}</p>
            </div>
        `;
    }



        function displayPartnerData() {
        const formattedData = Object.entries(mapleCEX_HashDatabase)
            .map(([emailHash, riskData]) => {
                const tagList = riskData.risk_tags.map(tag => 
                    `<span style="background: #dc3545; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8rem;">${tag}</span>`
                ).join(' ');
                
                return `<div style="margin-bottom: 1.5rem; padding: 1rem; border-left: 3px solid #6f42c1; background: #f8f9fa; border-radius: 4px;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                        <strong style="color: #6f42c1; font-family: monospace; font-size: 0.9rem;">Case ${riskData.internal_case_id}</strong>
                        <span style="background: ${riskData.status === 'BANNED' ? '#dc3545' : riskData.status === 'BLOCKED' ? '#fd7e14' : '#ffc107'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: bold;">${riskData.status}</span>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Case ID:</strong> ${riskData.internal_case_id} | 
                        <strong>Officer:</strong> ${riskData.compliance_officer}
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Exact Date:</strong> ${new Date(riskData.exact_flagged_date).toLocaleDateString()} | 
                        <strong>Reported Quarter:</strong> ${riskData.flagged_quarter}
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>User Data:</strong><br/>
                        <div style="margin-left: 1rem; font-size: 0.85rem;">
                            <strong>Email:</strong> ${riskData.user_data?.email || 'N/A'}<br/>
                            <strong>Phone:</strong> ${riskData.user_data?.phone || 'N/A'}<br/>
                            <strong>Country:</strong> ${riskData.user_data?.country || 'N/A'}<br/>
                            <strong>Document:</strong> ${riskData.user_data?.document_type || 'N/A'} ${riskData.user_data?.document_number || 'N/A'}
                        </div>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Wallets:</strong> <code style="font-size: 0.8rem;">${riskData.wallet_addresses.join(', ')}</code>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Risk Tags:</strong> ${tagList}
                    </div>
                    <div style="font-size: 0.9rem; color: #666; font-style: italic; margin-top: 0.5rem;">
                        <strong>Investigation:</strong> "${riskData.investigation_notes}"
                    </div>
                </div>`;
            })
            .join('');

        window.partnerDataDisplay.innerHTML = `
            <div style="margin-bottom: 1rem; color: #6f42c1; font-weight: bold; font-size: 1.1rem;">
                🏛️ Maple CEX Risk Database
            </div>
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #e7f3ff; border-radius: 4px; font-size: 0.9rem;">
                <strong>🔐 Security:</strong> Privacy-protected identifiers | <strong>📊 Records:</strong> ${Object.keys(mapleCEX_HashDatabase).length} risk profiles<br/>
                <strong>🗓️ Updated:</strong> ${new Date().toLocaleDateString()} | <strong>🔍 Compliance:</strong> BSA, KYC, OFAC compliant
            </div>
            ${formattedData}
            <div style="margin-top: 1.5rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #0066cc; border-radius: 4px;">
                <div style="font-weight: bold; color: #0066cc; margin-bottom: 0.5rem;">🎯 What Makes This Powerful:</div>
                <div style="font-size: 0.9rem; color: #0066cc;">
                    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                        <li><strong>Your data stays internal:</strong> Partners never see raw email addresses</li>
                        <li><strong>Quarterly reporting:</strong> Share temporal patterns, not exact dates</li>
                        <li><strong>Zero knowledge sharing:</strong> Coordination without data exposure</li>
                    </ul>
                    <strong>This enables secure inter-exchange collaboration!</strong>
                </div>
            </div>
        `;
    }

            // View switching function
        function toggleView() {
            const isMapleCEXView = viewToggle.checked;
            
            if (isMapleCEXView) {
                // Switch to Maple CEX view
                coinflexView.classList.add('hidden');
                mapleCEXView.classList.remove('hidden');
                viewDescription.textContent = 'You are Maple CEX. Your risk data helps partners detect bad actors while preserving privacy.';
            } else {
                // Switch to CoinFlex view
                mapleCEXView.classList.add('hidden');
                coinflexView.classList.remove('hidden');
                viewDescription.textContent = 'You are CoinFlex onboarding a new user. Check if they\'re flagged by partner exchanges.';
            }
        }



        // Event listeners
        window.checkButton.addEventListener('click', handleUserQuery);
        
        // Allow Enter key to trigger search on any input field
        ['userEmail', 'userPhone', 'userCountry', 'docNumber'].forEach(fieldId => {
            try {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            handleUserQuery();
                        }
                    });
                }
            } catch (error) {
                console.warn(`Could not add event listener to ${fieldId}:`, error);
            }
        });
        
        // View switching listener
        viewToggle.addEventListener('change', toggleView);
        


        // Initialize partner data display (always visible in Maple CEX view)
        displayPartnerData();
        
        // Initialize dashboard
        updateQueryDashboard();

        console.log('✅ UI initialized successfully');
        
        // Run UI tests
        console.log('\n🧪 Running UI Tests...');
        uiTestSuite.runAllTests();
    }

// ===== ENHANCED PAGE INITIALIZATION ===== 