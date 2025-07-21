// ========================================
// PROJECT CHIMERA - CORE BUSINESS LOGIC
// Following TDD Approach: Tests First
// ========================================

// ===== TEST SUITE =====
class TestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    addTest(name, testFn) {
        this.tests.push({ name, testFn });
    }

    runAllTests() {
        console.log('🧪 Running Sunscreen Demo Test Suite...\n');
        this.results = [];

        this.tests.forEach(test => {
            try {
                const result = test.testFn();
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
        });

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

// Test 1: Verify coinflexUsers and mapleCEXRiskDatabase exist and are properly structured
testSuite.addTest('Exchange data should exist and be properly structured', () => {
    if (typeof coinflexUsers === 'undefined') {
        return 'coinflexUsers is not defined';
    }
    
    if (typeof mapleCEXRiskDatabase === 'undefined') {
        return 'mapleCEXRiskDatabase is not defined';
    }

    // Check if required test users exist in CoinFlex onboarding queue
    const requiredEmails = ['alex.chen@gmail.com', 'maria.rodriguez@yahoo.com', 'crypto.trader2024@protonmail.com'];
    for (let email of requiredEmails) {
        if (!(email in coinflexUsers)) {
            return `Required user ${email} not found in CoinFlex data`;
        }
    }

    // Check if risk database has proper structure
    const firstProfile = Object.values(mapleCEXRiskDatabase)[0];
    if (!firstProfile.emailHash || !firstProfile.riskFlags || !firstProfile.riskScore) {
        return 'Risk database missing required fields';
    }

    return true;
});

// Test 2: Privacy-preserving matcher should exist
testSuite.addTest('Privacy-preserving functions should exist', () => {
    if (typeof matcher === 'undefined') {
        return 'PrivacyPreservingMatcher instance not defined';
    }
    
    if (typeof performEnhancedRiskCheck === 'undefined') {
        return 'performEnhancedRiskCheck function is not defined';
    }

    if (typeof checkUser === 'undefined') {
        return 'checkUser function is not defined';
    }

    return true;
});

// Test 3: Enhanced risk check should detect known bad actors
testSuite.addTest('Enhanced risk check should detect alex.chen@gmail.com as high risk', () => {
    if (typeof performEnhancedRiskCheck === 'undefined') {
        return 'performEnhancedRiskCheck function not implemented yet';
    }

    const result = performEnhancedRiskCheck('alex.chen@gmail.com');
    if (!result.matchFound) {
        return 'alex.chen@gmail.com should be detected as high risk';
    }

    if (!result.riskFlags.includes('Velocity_Withdrawals')) {
        return 'alex.chen@gmail.com should have Velocity_Withdrawals flag';
    }

    if (result.status !== 'BANNED') {
        return 'alex.chen@gmail.com should have BANNED status';
    }

    return true;
});

// Test 4: Enhanced risk check should clear clean users
testSuite.addTest('Enhanced risk check should clear maria.rodriguez@yahoo.com', () => {
    if (typeof performEnhancedRiskCheck === 'undefined') {
        return 'performEnhancedRiskCheck function not implemented yet';
    }

    const result = performEnhancedRiskCheck('maria.rodriguez@yahoo.com');
    if (result.matchFound) {
        return 'maria.rodriguez@yahoo.com should be clean (no risk flags)';
    }

    if (!result.message.includes('clear for onboarding')) {
        return 'Clean users should get positive onboarding message';
    }

    return true;
});

// Test 5: Privacy-preserving hashing should work
testSuite.addTest('Privacy-preserving identifier hashing should work', () => {
    if (typeof matcher === 'undefined') {
        return 'matcher not defined';
    }

    const emailHash = matcher.hashIdentifier('email', 'alex.chen@gmail.com');
    const phoneHash = matcher.hashIdentifier('phone', '+1-555-0123');

    if (!emailHash.includes('sha256_email_alex_chen_gmail_com')) {
        return 'Email hashing not working correctly';
    }

    if (!phoneHash.includes('sha256_phone_1_555_0123')) {
        return 'Phone hashing not working correctly';
    }

    return true;
});

// Test 6: Quarter conversion should work for privacy
testSuite.addTest('Date to quarter conversion should preserve privacy', () => {
    if (typeof matcher === 'undefined') {
        return 'matcher not defined';
    }

    // Test various dates
    const q4_2023 = matcher.dateToQuarter('2023-12-10T16:45:00Z');
    const q4_2023_2 = matcher.dateToQuarter('2023-11-22T09:12:00Z');
    const q4_2023_3 = matcher.dateToQuarter('2023-10-05T12:30:00Z');

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
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sunscreen Demo - Project Chimera');
    console.log('📋 Phase 4: Interactive Features & Integration');
    console.log('==============================================\n');
    
    // Run core logic tests
    console.log('Running Core Logic Tests:');
    testSuite.runAllTests();
    
    // Initialize UI after DOM is ready
    setTimeout(() => {
        console.log('\n🎨 Initializing User Interface...');
        initializeUI();
        
        console.log('\n🎯 Demo Ready!');
        console.log('Try entering: alex.chen@gmail.com, maria.rodriguez@yahoo.com, or crypto.trader2024@protonmail.com');
        console.log('Don\'t forget to toggle "Show Partner\'s Internal Data" for the aha! moment');
    }, 100);
});

// ===== IMPLEMENTATION AREA =====
// TODO: Now implement the actual functionality to make tests pass

// ===== REALISTIC EXCHANGE DATA =====

// CoinFlex onboarding queue
const coinflexUsers = {
    "alex.chen@gmail.com": {
        email: "alex.chen@gmail.com",
        phone: "+1-555-0123",
        walletAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        kycDocHash: "sha256_abc123def456",
        deviceFingerprint: "Mozilla_Chrome_MacOS_12345",
        registrationIP: "192.168.1.100",
        submittedAt: "2024-01-15T10:30:00Z"
    },
    "maria.rodriguez@yahoo.com": {
        email: "maria.rodriguez@yahoo.com", 
        phone: "+1-555-0456",
        walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        kycDocHash: "sha256_xyz789abc123",
        deviceFingerprint: "Mozilla_Firefox_Windows_67890",
        registrationIP: "10.0.0.50",
        submittedAt: "2024-01-15T14:22:00Z"
    },
    "crypto.trader2024@protonmail.com": {
        email: "crypto.trader2024@protonmail.com",
        phone: "+44-20-7946-0958",
        walletAddress: "3FupnQyrcbUH2cMjHjH2qEQgcBMKL9g7gy",
        kycDocHash: "sha256_suspect123",
        deviceFingerprint: "Mozilla_Chrome_Ubuntu_99999",
        registrationIP: "185.220.101.5", // Suspicious TOR exit node
        submittedAt: "2024-01-16T03:15:00Z"
    }
};

// Maple CEX risk database (with hashed identifiers for privacy)
const mapleCEXRiskDatabase = {
    "risk_profile_001": {
        emailHash: "sha256_email_alex_chen_gmail_com", 
        phoneHash: "sha256_phone_1_555_0123",
        walletAddresses: ["1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4"],
        riskFlags: ["Velocity_Withdrawals", "Suspicious_Patterns"],
        flaggedDate: "2023-12-10T16:45:00Z",
        investigationNotes: "Withdrew $50K in 24hrs, ignored KYC requests",
        riskScore: 8.5,
        status: "BANNED"
    },
    "risk_profile_002": {
        emailHash: "sha256_email_crypto_trader2024_protonmail_com",
        phoneHash: "sha256_phone_44_20_7946_0958", 
        walletAddresses: ["3FupnQyrcbUH2cMjHjH2qEQgcBMKL9g7gy"],
        riskFlags: ["Sanctions_List_Hit", "Multiple_Accounts", "VPN_Usage"],
        flaggedDate: "2023-11-22T09:12:00Z",
        investigationNotes: "Matched OFAC sanctions list, used multiple identities",
        riskScore: 9.8,
        status: "BLOCKED"
    },
    "risk_profile_003": {
        emailHash: "sha256_email_different_user",
        phoneHash: "sha256_phone_different",
        walletAddresses: ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"],
        riskFlags: ["Flagged_KYC"],
        flaggedDate: "2023-10-05T12:30:00Z",
        investigationNotes: "KYC documents failed verification",
        riskScore: 6.2,
        status: "UNDER_REVIEW"
    }
};

// Privacy-preserving matching logic
class PrivacyPreservingMatcher {
    hashIdentifier(type, value) {
        // Simulate privacy-preserving hashing
        return `sha256_${type}_${value.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
    }

    // Convert exact dates to quarters for privacy
    dateToQuarter(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        
        let quarter;
        if (month <= 3) quarter = 'Q1';
        else if (month <= 6) quarter = 'Q2';
        else if (month <= 9) quarter = 'Q3';
        else quarter = 'Q4';
        
        return `${quarter} ${year}`;
    }

    checkUserRisk(userEmail) {
        const user = coinflexUsers[userEmail];
        if (!user) return { matchFound: false, message: 'User not in onboarding queue' };

        const userEmailHash = this.hashIdentifier('email', user.email);
        const userPhoneHash = this.hashIdentifier('phone', user.phone);
        const userWallet = user.walletAddress;

        // Search through risk database for matches
        for (const [profileId, riskProfile] of Object.entries(mapleCEXRiskDatabase)) {
            if (riskProfile.emailHash === userEmailHash || 
                riskProfile.phoneHash === userPhoneHash ||
                riskProfile.walletAddresses.includes(userWallet)) {
                
                return {
                    matchFound: true,
                    matchType: riskProfile.emailHash === userEmailHash ? 'email' : 
                              riskProfile.phoneHash === userPhoneHash ? 'phone' : 'wallet',
                    profileId: profileId,
                    riskFlags: riskProfile.riskFlags,
                    flaggedQuarter: this.dateToQuarter(riskProfile.flaggedDate),
                    status: riskProfile.status,
                    notes: riskProfile.investigationNotes,
                    originalUser: user
                };
            }
        }

        return {
            matchFound: false,
            message: 'No risk flags found - user clear for onboarding',
            originalUser: user
        };
    }
}

const matcher = new PrivacyPreservingMatcher();

// Updated checkUser function for backwards compatibility
function checkUser(userEmail) {
    if (!userEmail || userEmail.trim() === '') {
        return 'No Match Found';
    }

    const result = matcher.checkUserRisk(userEmail);
    
    if (result.matchFound) {
        return result.riskFlags;
    } else {
        return 'No Match Found';
    }
}

// Enhanced query function for the new demo
function performEnhancedRiskCheck(userEmail) {
    return matcher.checkUserRisk(userEmail);
}

// ===== UI INTERACTION LOGIC =====

// UI Test Suite
const uiTestSuite = new TestSuite();

// Add UI tests
uiTestSuite.addTest('Required DOM elements should exist', () => {
    const requiredElements = [
        'userInput', 'checkButton', 'resultsPanel', 
        'revealToggle', 'partnerDataPanel', 'partnerDataDisplay'
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
    const userInput = document.getElementById('userInput');
    const checkButton = document.getElementById('checkButton');
    const resultsPanel = document.getElementById('resultsPanel');
    const revealToggle = document.getElementById('revealToggle');
    const partnerDataPanel = document.getElementById('partnerDataPanel');
    const partnerDataDisplay = document.getElementById('partnerDataDisplay');
    const apiStatus = document.getElementById('apiStatus');
    const sunscreenAPI = document.getElementById('sunscreenAPI');

    // Handle user query
    async function handleUserQuery() {
        const userEmail = userInput.value.trim();
        
        if (!userEmail) {
            showError('Please enter a user email address');
            return;
        }

        // Show loading state
        showLoadingState();
        
        // Simulate API call delay for demo effect
        await simulateAPICall();
        
        // Get enhanced result from our privacy-preserving logic
        const result = performEnhancedRiskCheck(userEmail);
        
        // Display result
        displayEnhancedResult(userEmail, result);
    }

    function showLoadingState() {
        apiStatus.textContent = 'Processing...';
        apiStatus.style.background = '#ffc107';
        sunscreenAPI.style.transform = 'scale(1.05)';
        
        resultsPanel.innerHTML = `
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

    function displayEnhancedResult(userEmail, result) {
        // Reset API visual
        apiStatus.textContent = 'Ready';
        apiStatus.style.background = '#28a745';
        sunscreenAPI.style.transform = 'scale(1)';

        let responseHTML;
        
        if (!result.matchFound) {
            responseHTML = `
                <div class="api-response no-match">
                    <h4>🟢 Query Complete - User Clear</h4>
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Result:</strong> No risk flags found across partner network</p>
                    <p><strong>Recommendation:</strong> ✅ Approve for onboarding</p>
                    <div style="margin-top: 0.75rem; padding: 0.5rem; background: #d4edda; border-radius: 4px; font-size: 0.9rem;">
                        <strong>🔒 Privacy Note:</strong> Query was processed without revealing user identity to partners
                    </div>
                </div>
            `;
        } else {
            // Determine risk level based on status and flags rather than score
            const isExtreme = result.status === 'BLOCKED' || result.riskFlags.includes('Sanctions_List_Hit');
            const isHigh = result.status === 'BANNED' || result.riskFlags.includes('Velocity_Withdrawals');
            
            const riskLevel = isExtreme ? 'EXTREME' : isHigh ? 'HIGH' : 'MODERATE';
            const riskColor = isExtreme ? '#dc3545' : isHigh ? '#fd7e14' : '#ffc107';
            
            responseHTML = `
                <div class="api-response" style="border-left: 4px solid ${riskColor};">
                    <h4>⚠️ Risk Alert - ${riskLevel} RISK</h4>
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Flagged Date:</strong> ${result.flaggedQuarter}</p>
                    <p><strong>Match Type:</strong> ${result.matchType.toUpperCase()} match found</p>
                    <p><strong>Status:</strong> <span style="background: ${riskColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">${result.status}</span></p>
                    <div style="margin: 0.75rem 0;">
                        <strong>Risk Flags:</strong><br/>
                        ${result.riskFlags.map(flag => `<span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8rem; margin: 2px;">${flag}</span>`).join('')}
                    </div>
                    <div style="margin-top: 0.75rem; padding: 0.5rem; background: #f8d7da; border-radius: 4px; font-size: 0.9rem;">
                        <strong>Investigation Notes:</strong> "${result.notes}"
                    </div>
                    <div style="margin-top: 0.75rem; padding: 0.5rem; background: #fff3cd; border-radius: 4px; font-size: 0.9rem;">
                        <strong>🔒 Privacy Preserved:</strong> Partner never learned you were investigating this user
                    </div>
                    <p style="margin-top: 0.75rem;"><strong>Recommendation:</strong> ❌ Do not onboard - High risk user</p>
                </div>
            `;
        }

        resultsPanel.innerHTML = responseHTML;
    }

    function showError(message) {
        resultsPanel.innerHTML = `
            <div class="api-response no-match">
                <h4>❌ Error</h4>
                <p>${message}</p>
            </div>
        `;
    }

    // Handle partner data reveal toggle
    function handleDataReveal() {
        const isRevealed = revealToggle.checked;
        
        if (isRevealed) {
            // Show partner data - the "AHA!" moment
            partnerDataPanel.classList.remove('hidden');
            displayPartnerData();
        } else {
            // Hide partner data
            partnerDataPanel.classList.add('hidden');
            partnerDataDisplay.innerHTML = '<p style="color: #6c757d; font-style: italic;">Data hidden for privacy</p>';
        }
    }

    function displayPartnerData() {
        const formattedData = Object.entries(mapleCEXRiskDatabase)
            .map(([profileId, riskProfile]) => {
                const tagList = riskProfile.riskFlags.map(tag => 
                    `<span style="background: #dc3545; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8rem;">${tag}</span>`
                ).join(' ');
                
                return `<div style="margin-bottom: 1.5rem; padding: 1rem; border-left: 3px solid #6f42c1; background: #f8f9fa; border-radius: 4px;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                        <strong style="color: #6f42c1;">${profileId}</strong>
                        <span style="background: ${riskProfile.status === 'BANNED' ? '#dc3545' : riskProfile.status === 'BLOCKED' ? '#fd7e14' : '#ffc107'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: bold;">${riskProfile.status}</span>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Flagged Date:</strong> ${new Date(riskProfile.flaggedDate).toLocaleDateString()} |
                        <strong>Reported as:</strong> ${matcher.dateToQuarter(riskProfile.flaggedDate)}
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Identifiers:</strong> ${riskProfile.emailHash}, ${riskProfile.phoneHash}
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Wallets:</strong> <code style="font-size: 0.8rem;">${riskProfile.walletAddresses.join(', ')}</code>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Flags:</strong> ${tagList}
                    </div>
                    <div style="font-size: 0.9rem; color: #666; font-style: italic;">
                        "${riskProfile.investigationNotes}"
                    </div>
                </div>`;
            })
            .join('');

        partnerDataDisplay.innerHTML = `
            <div style="margin-bottom: 1rem; color: #6f42c1; font-weight: bold; font-size: 1.1rem;">
                🏛️ Maple CEX Internal Risk Database
            </div>
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #e7f3ff; border-radius: 4px; font-size: 0.9rem;">
                <strong>📊 Database Stats:</strong> ${Object.keys(mapleCEXRiskDatabase).length} risk profiles | 
                Last updated: ${new Date().toLocaleDateString()}
            </div>
            ${formattedData}
            <div style="margin-top: 1.5rem; padding: 1rem; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <div style="font-weight: bold; color: #856404; margin-bottom: 0.5rem;">💡 The "Aha!" Moment:</div>
                <div style="font-size: 0.9rem; color: #856404;">
                                         This detailed risk database exists at Maple CEX, but when CoinFlex makes a query through Sunscreen:
                     <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                         <li><strong>CoinFlex only learns:</strong> Risk flags and quarter when flagged (not exact dates)</li>
                         <li><strong>Maple CEX never sees:</strong> Who CoinFlex is investigating</li>
                         <li><strong>Privacy preserved:</strong> Temporal info shared in quarterly buckets only</li>
                     </ul>
                    <strong>That's the power of encrypted coordination!</strong>
                </div>
            </div>
        `;
    }

    // Event listeners
    checkButton.addEventListener('click', handleUserQuery);
    
    // Allow Enter key to trigger search
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserQuery();
        }
    });
    
    revealToggle.addEventListener('change', handleDataReveal);

    // Initialize partner data display
    handleDataReveal();

    console.log('✅ UI initialized successfully');
    
    // Run UI tests
    console.log('\n🧪 Running UI Tests...');
    uiTestSuite.runAllTests();
}

// ===== ENHANCED PAGE INITIALIZATION ===== 