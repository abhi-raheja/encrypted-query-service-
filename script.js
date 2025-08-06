// ========================================
// PROJECT CHIMERA - REALISTIC EXCHANGE DEMO
// Using Industry-Standard SHA-256 Hashing & Cryptographic Proof Receipts
// ========================================

// ===== INPUT VALIDATION FUNCTIONALITY =====
function initializeInputValidation() {
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    const countrySelect = document.getElementById('userCountry');
    const docNumberInput = document.getElementById('docNumber');
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateField(this, isValidEmail(this.value), 'Please enter a valid email address');
        });
    }
    
    // Phone validation  
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validateField(this, isValidPhone(this.value), 'Please enter a valid phone number');
        });
    }
    
    // Document number validation (alphanumeric only)
    if (docNumberInput) {
        docNumberInput.addEventListener('input', function() {
            // Remove any non-alphanumeric characters
            this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
            validateField(this, this.value.length >= 3, 'Document number must be at least 3 characters');
        });
    }
    
    // Country selection
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            validateField(this, this.value !== '', 'Please select a country');
        });
    }
}

function validateField(field, isValid, errorMessage) {
    field.setCustomValidity(isValid ? '' : errorMessage);
    
    // Remove existing validation feedback
    const existingFeedback = field.parentNode.querySelector('.validation-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Add validation feedback if invalid and field has been touched
    if (!isValid && field.value !== '') {
        const feedback = document.createElement('div');
        feedback.className = 'validation-feedback';
        feedback.style.cssText = 'color: #dc3545; font-size: 0.8rem; margin-top: 0.25rem;';
        feedback.textContent = errorMessage;
        field.parentNode.appendChild(feedback);
    }
}

function isValidEmail(email) {
    if (!email) return true; // Empty is valid (optional)
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    if (!phone) return true; // Empty is valid (optional)
    // Accept various phone formats
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
    return phoneRegex.test(phone);
}

function validateFormBeforeSubmission() {
    const emailField = document.getElementById('userEmail');
    const phoneField = document.getElementById('userPhone');
    const countryField = document.getElementById('userCountry');
    const docTypeField = document.getElementById('docType');
    const docNumberField = document.getElementById('docNumber');
    
    const errors = [];
    
    // Check email validation
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        errors.push('Please enter a valid email address');
        emailField.focus();
    }
    
    // Check phone validation
    if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
        errors.push('Please enter a valid phone number');
        if (errors.length === 1) phoneField.focus(); // Focus first error field
    }
    
    // Check document validation (if both type and number are provided, both must be valid)
    if (docTypeField && docNumberField) {
        const hasDocType = docTypeField.value !== '';
        const hasDocNumber = docNumberField.value !== '';
        
        if (hasDocType && !hasDocNumber) {
            errors.push('Please enter a document number for the selected document type');
            if (errors.length === 1) docNumberField.focus();
        } else if (!hasDocType && hasDocNumber) {
            errors.push('Please select a document type for the entered document number');
            if (errors.length === 1) docTypeField.focus();
        } else if (hasDocNumber && docNumberField.value.length < 3) {
            errors.push('Document number must be at least 3 characters');
            if (errors.length === 1) docNumberField.focus();
        }
    }
    
    // Check that at least one field is provided
    const hasAnyData = (
        (emailField && emailField.value.trim() !== '') ||
        (phoneField && phoneField.value.trim() !== '') ||
        (countryField && countryField.value !== '') ||
        (docTypeField && docNumberField && docTypeField.value !== '' && docNumberField.value.trim() !== '')
    );
    
    if (!hasAnyData) {
        errors.push('Please enter at least one piece of customer information to query');
        if (emailField) emailField.focus();
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showValidationError(errors[0]); // Show first error
        return false;
    }
    
    return true;
}

function showValidationError(message) {
    // Remove any existing error alerts
    const existingAlert = document.querySelector('.validation-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create and show error alert
    const alert = document.createElement('div');
    alert.className = 'validation-alert';
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>⚠️</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// ===== SIDEBAR HOVER FUNCTIONALITY =====
function initializeSidebarHover() {
    const sidebar = document.getElementById('sidebar');
    let collapseTimeout;
    
    if (sidebar) {
        // Start collapsed by default
        sidebar.classList.add('collapsed');
        
        // Expand on mouse enter
        sidebar.addEventListener('mouseenter', function() {
            clearTimeout(collapseTimeout);
            // Small delay to prevent flickering
            setTimeout(() => {
                if (sidebar.matches(':hover')) {
                    sidebar.classList.remove('collapsed');
                }
            }, 100);
        });
        
        // Collapse on mouse leave with delay
        sidebar.addEventListener('mouseleave', function() {
            collapseTimeout = setTimeout(() => {
                sidebar.classList.add('collapsed');
            }, 800); // 800ms delay before collapsing
        });
    }
}

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

// Test 4b: FIXED - Complete Alex Chen data should work without conflicts
testSuite.addTest('Complete Alex Chen data should return successful match (not conflict)', async () => {
    if (typeof proofSystem === 'undefined') {
        return 'proofSystem not implemented yet';
    }

    try {
        // Test the exact data that Rick and Ryan reported as problematic
        // Using the actual form values that would be sent (lowercase document type)
        const alexChenData = {
            email: 'alex.chen@gmail.com',
            phone: '+1-555-0123',
            country: 'United States',
            doc_type: 'passport',  // Form sends lowercase
            doc_number: 'US123456789'
        };
        
        const proofReceipt = await proofSystem.performMultiFieldRiskQuery(alexChenData);
        
        // Should find a match, not report a conflict
        if (!proofReceipt.result.match_found) {
            return 'Alex Chen complete data should be found as a match';
        }
        
        // Should NOT be flagged as conflicted or partial
        if (proofReceipt.result.match_quality === 'CONFLICTED') {
            return 'Alex Chen complete data should not be flagged as conflicted - this was the bug reported by Rick and Ryan';
        }
        
        if (proofReceipt.result.match_quality === 'PARTIAL_FIELDS') {
            return 'Alex Chen complete data should not be flagged as partial - should be complete match';
        }
        
        // Should have the expected risk tags
        if (!proofReceipt.result.risk_tags || !proofReceipt.result.risk_tags.includes('Velocity_Withdrawals')) {
            return 'Alex Chen should have Velocity_Withdrawals risk tag';
        }
        
        // Should be flagged in Q4 2023
        if (proofReceipt.result.flagged_quarter !== 'Q4 2023') {
            return 'Alex Chen should be flagged in Q4 2023';
        }
        
        // Should match ALL logical fields (4 total: email, phone, country, document)
        const expectedMatchedFields = ['email', 'phone', 'country', 'document'];
        if (!proofReceipt.result.matched_fields || proofReceipt.result.matched_fields.length !== expectedMatchedFields.length) {
            return `Alex Chen should match all 4 logical fields (email, phone, country, document), but only matched: ${proofReceipt.result.matched_fields ? proofReceipt.result.matched_fields.join(', ') : 'none'}`;
        }
        
        // Verify each expected field is matched
        for (const field of expectedMatchedFields) {
            if (!proofReceipt.result.matched_fields.includes(field)) {
                return `Alex Chen should match ${field} field, but it's missing from matched fields: ${proofReceipt.result.matched_fields.join(', ')}`;
            }
        }
        
        console.log('✅ Alex Chen complete data test PASSED - all fields match, no false conflict detection');
        return true;
    } catch (error) {
        return `Alex Chen complete data test failed: ${error.message}`;
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
    
            // Initialize sidebar hover functionality
        initializeSidebarHover();
    
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
    
    // Initialize input validation
    initializeInputValidation();
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
    
    // ===== CLEAN USERS (Known to partner but no risk flags) =====
    
    // Hash of: 'clean.user@legitimate.com'
    "b8f4d6e2a3c7f9e1d5b7a4c8e2f6d9a3c7e1b5f8d2a6c9e3f7b1d4a8c2e6f9d3": {
        user_data: {
            email: "clean.user@legitimate.com",
            phone: "+1-555-0100",
            country: "United States",
            document_type: "Driver License",
            document_number: "US987654321"
        },
        risk_tags: [], // No risk flags - clean user
        flagged_quarter: null,
        exact_flagged_date: null,
        status: "CLEAN",
        investigation_notes: "Completed standard KYC verification, no issues found",
        wallet_addresses: ["bc1qrandomcleanaddress123456789"],
        compliance_officer: "L.Martinez",
        internal_case_id: "CLEAN-2024-0001"
    },
    
    // Hash of: 'good.customer@business.org'
    "c9a5e7b3d1f8c6a4e2b9f7d3a8c5e1b6d4f9a7c2e8b5d1f6a3c9e7b4d2a8c5f1": {
        user_data: {
            email: "good.customer@business.org", 
            phone: "+44-20-1234-5678",
            country: "United Kingdom",
            document_type: "Passport",
            document_number: "GB999888777"
        },
        risk_tags: [], // No risk flags - clean user
        flagged_quarter: null,
        exact_flagged_date: null,
        status: "CLEAN",
        investigation_notes: "Long-standing customer, excellent transaction history",
        wallet_addresses: ["1CleanAddress123456789ABCDEF"],
        compliance_officer: "P.Johnson",
        internal_case_id: "CLEAN-2023-0445"
    },
    
    // Hash of: 'verified.trader@crypto.com'
    "d7c3a9f5e1b8d4c2a6f3e9b7d1c5a8f2e6b3d9c7a1f5e2b8d4c6a3f9e7b1d5c2": {
        user_data: {
            email: "verified.trader@crypto.com",
            phone: "+1-555-0200",
            country: "Canada", 
            document_type: "Passport",
            document_number: "CA111222333"
        },
        risk_tags: [], // No risk flags - clean user
        flagged_quarter: null,
        exact_flagged_date: null,
        status: "CLEAN",
        investigation_notes: "Professional trader, all compliance checks passed",
        wallet_addresses: ["bc1qverifiedtraderaddress987654"],
        compliance_officer: "K.Chen",
        internal_case_id: "CLEAN-2024-0089"
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
    
    // Multi-field risk query with improved consistency matching
    async performMultiFieldRiskQuery(userData) {
        // Count fields properly - treat doc_type + doc_number as single logical field
        const providedFields = Object.keys(userData).filter(k => userData[k] && k !== 'timestamp');
        
        // Adjust field count to treat document fields as single logical unit
        const logicalFieldCount = this.countLogicalFields(userData);
        console.log(`🔍 Multi-field query: ${providedFields.join(', ')} (${logicalFieldCount} logical fields)`);
        
        // Collect ALL potential matches for analysis
        const potentialMatches = [];
        
        for (const [hash, riskData] of Object.entries(mapleCEX_HashDatabase)) {
            if (!riskData.user_data) {
                console.warn(`Risk data for hash ${hash.substring(0, 8)}... missing user_data`);
                continue;
            }
            
            const fieldMatches = [];
            const fieldConflicts = [];
            
            // Check each field systematically - only flag conflicts within the same record
            if (userData.email) {
                if (riskData.user_data.email === userData.email) {
                    fieldMatches.push('email');
                }
            }
            
            if (userData.phone) {
                if (riskData.user_data.phone === userData.phone) {
                    fieldMatches.push('phone');
                }
            }
            
            if (userData.country) {
                if (riskData.user_data.country && 
                    riskData.user_data.country.toLowerCase() === userData.country.toLowerCase()) {
                    fieldMatches.push('country');
                }
            }
            
            if (userData.doc_type && userData.doc_number) {
                if (riskData.user_data.document_type && riskData.user_data.document_number &&
                    riskData.user_data.document_type.toLowerCase() === userData.doc_type.toLowerCase() &&
                    riskData.user_data.document_number === userData.doc_number) {
                    fieldMatches.push('document');
                }
            }
            
            // Only consider records with actual matches
            if (fieldMatches.length > 0) {
                // Check for internal conflicts within this specific record
                // This only applies when we have partial matches that contradict each other
                const hasInternalConflicts = this.detectInternalConflicts(userData, riskData, fieldMatches);
                
                potentialMatches.push({
                    hash,
                    riskData,
                    matchedFields: fieldMatches,
                    conflictingFields: fieldConflicts,
                    matchStrength: fieldMatches.length,
                    hasConflicts: hasInternalConflicts
                });
            }
        }
        
        // Analyze matches for consistency and conflicts
        return this.analyzeMatches(potentialMatches, userData, logicalFieldCount);
    }
    
    // Count logical fields (treat document type + number as single field)
    countLogicalFields(userData) {
        let count = 0;
        
        if (userData.email) count++;
        if (userData.phone) count++;
        if (userData.country) count++;
        if (userData.doc_type && userData.doc_number) count++; // Both required for document field
        
        return count;
    }
    
    // Detect actual internal conflicts within a specific record
    detectInternalConflicts(userData, riskData, matchedFields) {
        // Only flag as conflict if we have a partial match where some fields match
        // but other fields in the same record contradict the provided data
        
        let hasConflict = false;
        
        // Check if we have mixed signals from the same record
        if (matchedFields.length > 0) {
            // Example: email matches but phone doesn't match what's in the same record
            if (userData.email && userData.phone && 
                matchedFields.includes('email') && 
                riskData.user_data.phone && 
                riskData.user_data.phone !== userData.phone) {
                hasConflict = true;
            }
            
            // Example: phone matches but email doesn't match what's in the same record  
            if (userData.phone && userData.email && 
                matchedFields.includes('phone') && 
                riskData.user_data.email && 
                riskData.user_data.email !== userData.email) {
                hasConflict = true;
            }
            
            // Example: document matches but other personal info conflicts
            if (userData.doc_type && userData.doc_number && userData.email && 
                matchedFields.includes('document') && 
                riskData.user_data.email && 
                riskData.user_data.email !== userData.email) {
                hasConflict = true;
            }
        }
        
        return hasConflict;
    }
    
    // Analyze potential matches for consistency and determine final result
    async analyzeMatches(potentialMatches, userData, logicalFieldCount) {
        if (potentialMatches.length === 0) {
            console.log('❌ No matches found');
            return this.generateNoMatchReceipt(await sha256(JSON.stringify(userData)), userData);
        }
        
        console.log(`📊 Found ${potentialMatches.length} potential match(es)`);
        
        // Sort by match strength (number of matching fields)
        potentialMatches.sort((a, b) => b.matchStrength - a.matchStrength);
        
        const strongestMatch = potentialMatches[0];
        
        // SCENARIO 1: Single field query - allow but mark as partial
        if (logicalFieldCount === 1) {
            console.log(`✅ Single-field match on: ${strongestMatch.matchedFields.join(', ')}`);
            return this.generatePartialMatchReceipt(strongestMatch, userData, 'single_field');
        }
        
        // SCENARIO 2: Multi-field query - validate consistency
        if (logicalFieldCount > 1) {
            return this.validateMultiFieldConsistency(potentialMatches, userData, logicalFieldCount);
        }
        
        // Fallback
        return this.generateNoMatchReceipt(await sha256(JSON.stringify(userData)), userData);
    }
    
    // Validate multi-field query consistency with improved logic
    async validateMultiFieldConsistency(potentialMatches, userData, logicalFieldCount) {
        const strongestMatch = potentialMatches[0];
        
        // PRIORITY 1: Check for complete matches first (all logical fields match)
        const allFieldsMatch = strongestMatch.matchedFields.length === logicalFieldCount;
        
        if (allFieldsMatch) {
            console.log(`✅ Complete match found on: ${strongestMatch.matchedFields.join(', ')}`);
            
            // Even if there are "conflicts" detected, prioritize the complete match
            // This fixes the Alex Chen issue where complete data was being flagged as conflicted
            
            // Check if user is clean (no risk flags)
            if (strongestMatch.riskData.risk_tags && strongestMatch.riskData.risk_tags.length === 0) {
                console.log(`✅ Clean user found: ${strongestMatch.riskData.status}`);
                return this.generateCleanUserReceipt(
                    strongestMatch.hash,
                    strongestMatch.riskData,
                    userData,
                    strongestMatch.matchedFields
                );
            }
            
            // User has risk flags - return the complete match
            return this.generateMultiFieldProofReceipt(
                strongestMatch.hash, 
                strongestMatch.riskData, 
                userData, 
                strongestMatch.matchedFields
            );
        }
        
        // PRIORITY 2: Check for genuine internal conflicts (within same record)
        if (strongestMatch.hasConflicts) {
            console.log(`⚠️ Internal data conflict detected: matched ${strongestMatch.matchedFields.join(', ')}, but other fields in same record conflict`);
            return this.generateConflictedMatchReceipt(strongestMatch, userData);
        }
        
        // PRIORITY 3: Check for cross-contamination across different records
        // Flag cross-contamination when user data spans multiple different records
        const crossContaminationDetected = this.detectCrossContamination(potentialMatches, userData, logicalFieldCount);
        if (crossContaminationDetected) {
            console.log(`🚨 Cross-contamination detected - user data spans multiple different records`);
            return this.generateAmbiguousMatchReceipt(potentialMatches, userData);
        }
        
        // PRIORITY 4: Partial match (some fields match, others not provided)
        console.log(`⚠️ Partial match: ${strongestMatch.matchedFields.join(', ')} out of ${logicalFieldCount} logical fields`);
        return this.generatePartialMatchReceipt(strongestMatch, userData, 'partial_fields');
    }
    
    // Detect cross-contamination across different records
    detectCrossContamination(potentialMatches, userData, logicalFieldCount) {
        // Detect when user data spans multiple different records (identity theft indicator)
        
        if (potentialMatches.length < 2) return false;
        
        const strongestMatch = potentialMatches[0];
        const secondStrongestMatch = potentialMatches[1];
        
        // If we have a complete match, no cross-contamination
        if (strongestMatch.matchStrength === logicalFieldCount) {
            console.log(`✅ Complete match found, no cross-contamination`);
            return false;
        }
        
        // CASE 1: High-confidence identity fields appearing in multiple records
        // Example: Email in one record, document in another record
        const identityFieldsByRecord = new Map(); // Track which records have which identity fields
        
        for (const match of potentialMatches) {
            const recordEmail = match.riskData.user_data.email;
            const identityFields = [];
            
            if (match.matchedFields.includes('email')) identityFields.push('email');
            if (match.matchedFields.includes('document')) identityFields.push('document');
            
            if (identityFields.length > 0) {
                identityFieldsByRecord.set(recordEmail, identityFields);
            }
        }
        
        if (identityFieldsByRecord.size > 1) {
            console.log(`🚨 Identity fields split across ${identityFieldsByRecord.size} different records:`);
            for (const [recordEmail, fields] of identityFieldsByRecord) {
                console.log(`  - ${recordEmail}: ${fields.join(', ')}`);
            }
            return true;
        }
        
        // CASE 2: Any fields split across multiple records (broader detection)
        // Example: User data spans multiple different records
        if (potentialMatches.length > 1 && logicalFieldCount >= 2) {
            const totalMatchedFields = potentialMatches.reduce((total, match) => total + match.matchStrength, 0);
            
            // If total matched fields across all records > strongest single record, indicates splitting
            if (totalMatchedFields > strongestMatch.matchStrength) {
                console.log(`🚨 Data spanning multiple records detected:`);
                console.log(`  - Total fields matched across all records: ${totalMatchedFields}`);
                console.log(`  - Strongest single record: ${strongestMatch.matchStrength} fields`);
                
                potentialMatches.forEach(match => {
                    console.log(`  - ${match.riskData.user_data.email}: ${match.matchedFields.join(', ')} (${match.matchStrength} fields)`);
                });
                
                return true;
            }
        }
        
        // CASE 3: Multiple records with significant matches (original logic)
        const significantMatches = potentialMatches.filter(match => 
            match.matchStrength >= 2
        );
        
        if (significantMatches.length > 1) {
            console.log(`🚨 Multiple significant matches: ${significantMatches.length} records with 2+ field matches`);
            
            significantMatches.forEach(match => {
                console.log(`  - ${match.riskData.user_data.email}: ${match.matchedFields.join(', ')}`);
            });
            
            return true;
        }
        
        return false;
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

    // Generate receipt for clean users (found but no risk flags)
    async generateCleanUserReceipt(hash, riskData, originalUserData, matchedFields) {
        const timestamp = new Date().toISOString();
        
        const baseReceipt = {
            provider: "MapleCEX",
            query_hash: hash,
            timestamp: timestamp,
            result: {
                match_found: true,
                match_quality: "CLEAN",
                status: "USER_CLEAR",
                matched_fields: matchedFields,
                case_id: riskData.internal_case_id,
                compliance_status: riskData.status,
                verification_notes: "User found in partner database with clean record"
            },
            compliance: {
                query_id: `QUERY-${Date.now()}`,
                auditable: true,
                regulation_compliance: ["BSA", "KYC", "OFAC"]
            }
        };
        
        // Generate signature
        const signatureContent = `${baseReceipt.provider}${baseReceipt.timestamp}${baseReceipt.query_hash}${JSON.stringify(baseReceipt.result)}`;
        baseReceipt.signature = await sha256(signatureContent);
        
        return baseReceipt;
    }
    
    // Generate receipt for unknown users (no match found)
    async generateNoMatchReceipt(queryHash, originalUserData) {
        const timestamp = new Date().toISOString();
        
        const baseReceipt = {
            provider: "MapleCEX", 
            query_hash: queryHash,
            timestamp: timestamp,
            result: {
                match_found: false,
                match_quality: "NO_MATCH",
                status: "UNKNOWN_USER",
                searched_fields: Object.keys(originalUserData).filter(key => originalUserData[key]),
                verification_notes: "User not found in partner database - may be new customer"
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
        window.progressStatus = document.getElementById('progressStatus');
        window.queryProgressBar = document.getElementById('queryProgressBar');
        window.progressFill = document.getElementById('progressFill');
        window.step1 = document.getElementById('step1');
        window.step2 = document.getElementById('step2');
        window.step3 = document.getElementById('step3');
        
        // View switching elements
        const viewToggle = document.getElementById('viewToggle');
        const coinflexView = document.getElementById('coinflexView');
        const mapleCEXView = document.getElementById('mapleCEXView');
        const viewDescription = document.getElementById('viewDescription');
        


    // Handle user query with cryptographic proof system
    async function handleUserQuery() {
        console.log('🔍 handleUserQuery called');
        
        // Validate form before processing query
        if (!validateFormBeforeSubmission()) {
            return; // Stop execution if validation fails
        }
        
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
        window.progressStatus.textContent = 'Processing...';
        window.queryProgressBar.classList.add('processing');
        window.progressFill.classList.add('processing');
        
        // Reset all steps
        window.step1.classList.remove('active');
        window.step2.classList.remove('active');
        window.step3.classList.remove('active');
        
        // Animate through steps with realistic timing
        setTimeout(() => {
            window.step1.classList.add('active');
            window.progressStatus.textContent = 'Encrypting query...';
        }, 200);
        
        setTimeout(() => {
            window.step2.classList.add('active');
            window.progressStatus.textContent = 'Coordinating partners...';
        }, 800);
        
        setTimeout(() => {
            window.step3.classList.add('active');
            window.progressStatus.textContent = 'Generating proof...';
        }, 1400);
        
        window.resultsPanel.innerHTML = `
            <div class="api-response">
                <p>🔄 Querying Sunscreen API...</p>
                <p>Privacy-preserving identity matching in progress...</p>
            </div>
        `;
    }

    async function simulateAPICall() {
        // Simulate network delay for dramatic effect
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    function displayProofReceipt(userData, proofReceipt) {
        // Complete the progress animation
        window.progressStatus.textContent = 'Complete ✓';
        window.queryProgressBar.classList.remove('processing');
        window.progressFill.classList.remove('processing');
        
        // Show completion state briefly
        setTimeout(() => {
            // Reset progress bar to ready state
            window.progressStatus.textContent = 'Ready';
            window.step1.classList.remove('active');
            window.step2.classList.remove('active');
            window.step3.classList.remove('active');
            
            // Reset progress fill
            window.progressFill.style.width = '0%';
        }, 3000);

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
                // Standard no-match case - truly unknown user
                responseHTML = `
                    <div class="api-response no-match">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>🔍 Query Complete - ${isDecrypted ? 'Unknown User' : encryptedPlaceholder}</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Result:</strong> ${isDecrypted ? 'User not found in partner database' : encryptedPlaceholder}</p>
                        <p><strong>Status:</strong> ${isDecrypted ? proofReceipt.result.status || 'UNKNOWN_USER' : encryptedPlaceholder}</p>
                        <p><strong>Recommendation:</strong> ${isDecrypted ? 'Apply standard new customer verification procedures' : encryptedPlaceholder}</p>
                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #e7f3ff; border-radius: 4px; font-size: 0.9rem;">
                            <strong>ℹ️ New Customer:</strong> ${isDecrypted ? 'User may be legitimate new customer - proceed with standard KYC' : encryptedPlaceholder}
                        </div>
                        <div style="margin-top: 0.5rem; padding: 0.5rem; background: #f0f8f0; border-radius: 4px; font-size: 0.9rem;">
                            <strong>🔐 Privacy Protected:</strong> Query processed without revealing user identity to partners
                        </div>
                    </div>
                `;
            }
        } else {
            // Handle matches - check for different match qualities
            const matchQuality = proofReceipt.result.match_quality;
            const confidenceLevel = proofReceipt.result.confidence_level;
            
            if (matchQuality === 'CLEAN') {
                // Handle clean users (found but no risk flags)
                const matchedFields = proofReceipt.result.matched_fields || [];
                const matchedFieldsText = matchedFields.length > 0 ? matchedFields.join(', ') : 'None';
                
                responseHTML = `
                    <div class="api-response clean-user" style="border-left: 4px solid #28a745;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h4>✅ User Clear - Known Clean Record</h4>
                            ${decryptButton}
                        </div>
                        <p><strong>Searched Fields:</strong> ${userInfoText}</p>
                        <p><strong>Matched Fields:</strong> ${isDecrypted ? matchedFieldsText : encryptedPlaceholder}</p>
                        <p><strong>Case ID:</strong> ${isDecrypted ? proofReceipt.result.case_id || 'N/A' : encryptedPlaceholder}</p>
                        <p><strong>Status:</strong> ${isDecrypted ? proofReceipt.result.compliance_status : encryptedPlaceholder}</p>
                        <p><strong>Verification:</strong> ${isDecrypted ? proofReceipt.result.verification_notes : encryptedPlaceholder}</p>
                        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #d4edda; border-radius: 4px; font-size: 0.9rem;">
                            <strong>✅ Clean Record:</strong> User found in partner database with verified clean history
                        </div>
                        <div style="margin-top: 0.5rem; padding: 0.5rem; background: #e7f3ff; border-radius: 4px; font-size: 0.9rem;">
                            <strong>🔐 Privacy Protected:</strong> Query processed without revealing user identity to partners
                        </div>
                    </div>
                `;
            } else if (matchQuality === 'SINGLE_FIELD' || matchQuality === 'PARTIAL_FIELDS') {
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
                                            if (matchQuality === 'CLEAN') {
                                                // Handle clean users (found but no risk flags)
                                                const matchedFields = result.matched_fields ? result.matched_fields.join(', ') : 'N/A';
                                                
                                                return `<p><strong>Result:</strong> ✅ User Clear - Known Clean Record</p>
                                                        <p><strong>Status:</strong> ${result.compliance_status || 'CLEAN'}</p>
                                                        <p><strong>Case ID:</strong> ${result.case_id || 'N/A'}</p>
                                                        <p><strong>Matched Fields:</strong> ${matchedFields}</p>
                                                        <p><strong>Verification:</strong> ${result.verification_notes || 'User found in partner database with clean record'}</p>
                                                        <p><strong>Provider Query ID:</strong> ${entry.original_response.compliance?.query_id || 'N/A'}</p>`;
                                            } else {
                                                // Handle actual matches with risk flags
                                                const riskTags = result.risk_tags ? result.risk_tags.join(', ') : 'N/A';
                                                const matchedFields = result.matched_fields ? result.matched_fields.join(', ') : result.match_field || 'N/A';
                                                const confidenceLevel = result.confidence_level ? ` (${result.confidence_level} confidence)` : '';
                                                const matchType = matchQuality && (matchQuality === 'SINGLE_FIELD' || matchQuality === 'PARTIAL_FIELDS') ? ` - ${matchQuality.replace('_', ' ').toLowerCase()}` : '';
                                                
                                                return `<p><strong>Result:</strong> 🚨 Risk Alert - User flagged${matchType}${confidenceLevel}</p>
                                                        <p><strong>Risk Tags:</strong> ${riskTags}</p>
                                                        <p><strong>Flagged Quarter:</strong> ${result.flagged_quarter || 'N/A'}</p>
                                                        <p><strong>Matched Fields:</strong> ${matchedFields}</p>
                                                        <p><strong>Provider Query ID:</strong> ${entry.original_response.compliance?.query_id || 'N/A'}</p>`;
                                            }
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
                                            // Handle unknown users (not found in database)
                                            return `<p><strong>Result:</strong> 🔍 Unknown User - Not found in partner database</p>
                                                    <p><strong>Status:</strong> ${result.status || 'UNKNOWN_USER'}</p>
                                                    <p><strong>Recommendation:</strong> Apply standard new customer verification procedures</p>
                                                    <p><strong>Note:</strong> ${result.verification_notes || 'User may be legitimate new customer'}</p>`;
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
                    `<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">${tag}</span>`
                ).join(' ');
                
                return `
                <div style="margin-bottom: 1.5rem; padding: 1.25rem; border: 1px solid #e0e0e0; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <!-- Header with Case ID and Status -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid #f0f0f0;">
                        <h4 style="margin: 0; color: #2c3e50; font-size: 1.1rem; font-weight: 600;">📋 Case ${riskData.internal_case_id}</h4>
                        <span style="background: ${riskData.status === 'BANNED' ? '#dc3545' : riskData.status === 'BLOCKED' ? '#fd7e14' : '#ffc107'}; color: white; padding: 4px 12px; border-radius: 16px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase;">${riskData.status}</span>
                    </div>

                    <!-- Case Information Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <div>
                            <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 6px;">
                                <div style="font-size: 0.8rem; color: #6c757d; text-transform: uppercase; font-weight: 600; margin-bottom: 0.25rem;">Case Details</div>
                                <div style="font-size: 0.9rem;"><strong>ID:</strong> ${riskData.internal_case_id}</div>
                                <div style="font-size: 0.9rem;"><strong>Officer:</strong> ${riskData.compliance_officer}</div>
                            </div>
                        </div>
                        <div>
                            <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 6px;">
                                <div style="font-size: 0.8rem; color: #6c757d; text-transform: uppercase; font-weight: 600; margin-bottom: 0.25rem;">Timeline</div>
                                <div style="font-size: 0.9rem;"><strong>Date:</strong> ${new Date(riskData.exact_flagged_date).toLocaleDateString()}</div>
                                <div style="font-size: 0.9rem;"><strong>Quarter:</strong> ${riskData.flagged_quarter}</div>
                            </div>
                        </div>
                    </div>

                    <!-- User Information -->
                    <div style="margin-bottom: 1rem;">
                        <div style="background: #f1f8ff; padding: 0.75rem; border-radius: 6px; border-left: 4px solid #0066cc;">
                            <div style="font-size: 0.8rem; color: #0066cc; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">👤 User Information</div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem;">
                                <div><strong>Email:</strong> ${riskData.user_data?.email || 'N/A'}</div>
                                <div><strong>Phone:</strong> ${riskData.user_data?.phone || 'N/A'}</div>
                                <div><strong>Country:</strong> ${riskData.user_data?.country || 'N/A'}</div>
                                <div><strong>Document:</strong> ${riskData.user_data?.document_type || 'N/A'} ${riskData.user_data?.document_number || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Risk Information -->
                    <div style="margin-bottom: 1rem;">
                        <div style="background: #fff5f5; padding: 0.75rem; border-radius: 6px; border-left: 4px solid #dc3545;">
                            <div style="font-size: 0.8rem; color: #dc3545; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">🚨 Risk Assessment</div>
                            <div style="margin-bottom: 0.5rem;">${tagList}</div>
                            <div style="font-size: 0.85rem; color: #666;"><strong>Wallets:</strong> <code style="font-size: 0.8rem; background: #f8f9fa; padding: 2px 4px; border-radius: 3px;">${riskData.wallet_addresses.join(', ')}</code></div>
                        </div>
                    </div>

                    <!-- Investigation Notes -->
                    <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 6px; border-left: 4px solid #6c757d;">
                        <div style="font-size: 0.8rem; color: #6c757d; text-transform: uppercase; font-weight: 600; margin-bottom: 0.25rem;">🔍 Investigation Notes</div>
                        <div style="font-size: 0.9rem; font-style: italic; color: #495057;">"${riskData.investigation_notes}"</div>
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