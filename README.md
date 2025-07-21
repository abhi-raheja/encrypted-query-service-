# 🔒 Sunscreen: Encrypted Query Service for Crypto Exchanges

**Live Demo:** [https://abhi-raheja.github.io/encrypted-query-service-/](https://abhi-raheja.github.io/encrypted-query-service-/)

> A privacy-preserving data coordination platform that allows competing crypto exchanges to share risk intelligence without revealing sensitive user information or compromising competitive advantages.

---

## 🎯 **The Problem We Solve**

### **Current Challenge in Crypto Exchanges:**
- **Manual Investigation Hours:** Each exchange independently investigates the same bad actors
- **Information Silos:** Valuable risk intelligence trapped within individual exchanges  
- **Privacy Concerns:** Exchanges can't share user data due to privacy regulations and competitive sensitivity
- **Regulatory Pressure:** Need for better fraud prevention while maintaining user privacy
- **Slow Response Times:** Bad actors can exploit multiple exchanges before coordination happens

### **What If Exchanges Could Coordinate Without Compromising Privacy?**

**Sunscreen** enables crypto exchanges to **query each other's risk databases** without ever revealing:
- ❌ Who they're investigating
- ❌ Raw user personally identifiable information (PII)  
- ❌ Internal business logic or case details
- ❌ Complete customer lists or database contents

---

## 🚀 **How It Works - The Demo Experience**

### **👤 CoinFlex Perspective (Querying Exchange)**
You are **CoinFlex**, onboarding a new user. You want to check if this user has been flagged by trusted partner exchanges.

**What You Can Do:**
1. **Enter a user email** (try: `alex.chen@gmail.com`)
2. **Get instant risk assessment** from partner networks
3. **Receive minimal data only:** Risk tags, flagged quarter, match field
4. **See Sunscreen's recommendation** based on aggregated intelligence
5. **Access cryptographic proof receipts** for compliance audit trails

**What You Never See:**
- Partner's internal case details, investigation notes, or exact dates
- Raw user data from other exchanges
- Internal business logic or compliance processes

### **🏛️ Maple CEX Perspective (Partner Exchange)**  
Toggle to see **Maple CEX's** perspective - you're the partner exchange providing risk data.

**What You Can Monitor:**
1. **📊 Real-time Query Dashboard:** See all incoming queries and what data you shared
2. **🔍 Query Audit Log:** Track every request with timestamps and shared data points
3. **📈 Statistics:** Total queries processed, matches found, data points shared
4. **🗄️ Internal Risk Database:** Your rich, detailed risk profiles (never shared externally)

**Privacy Protection in Action:**
- Partners query your data without seeing raw details
- You never learn who they're investigating  
- Only minimal, privacy-preserving data gets shared
- Complete audit trail for regulatory compliance

---

## 🔧 **Technical Implementation**

### **Industry-Standard Cryptographic Security**
- **SHA-256 Hashing:** All PII is hashed locally before transmission
- **Cryptographic Signatures:** Tamper-evident proof receipts using Web Crypto API
- **Zero Raw Data Sharing:** Only hashed identifiers cross exchange boundaries
- **Quarterly Date Reporting:** Temporal patterns without exact investigation dates

### **Privacy-Preserving Architecture**  
```
CoinFlex Query:           Sunscreen Service:         Maple CEX Response:
"alex.chen@gmail.com"  →  Hash + Route + Analyze  →  Only: risk_tags, 
    ↓                                                      flagged_quarter,
SHA-256 Hash                                              match_field
    ↓                                                       ↓
"4a283f357be6..."     →  Encrypted Coordination    →  No internal details
```

### **Compliance-Ready Features**
- **Audit Trail:** Every query generates a cryptographically signed receipt
- **Regulatory Support:** BSA, KYC, and OFAC compliance tracking
- **Data Retention:** 7-year audit log capability
- **Tamper Evidence:** SHA-256 signatures prove data integrity

---

## 🎮 **Try the Demo - Interactive Scenarios**

### **📧 Test Email Addresses:**

| Email | Risk Level | Expected Result |
|-------|------------|-----------------|
| `alex.chen@gmail.com` | **HIGH RISK** | Velocity withdrawals, flagged Q4 2023 |
| `sanctioned-user@email.com` | **EXTREME RISK** | OFAC sanctions hit, blocked Q2 2023 |  
| `fraud-user-1@email.com` | **UNDER REVIEW** | High velocity pattern, Q3 2024 |
| `clean-user@example.com` | **CLEAN** | No risk flags found |

### **🔄 Demo Flow:**
1. **Start in CoinFlex view** → Experience the querying exchange perspective
2. **Try a high-risk email** → See minimal data sharing in action
3. **Click "Show Technical Details"** → Explore cryptographic implementation  
4. **Toggle to Maple CEX view** → See the partner exchange perspective
5. **Check the audit dashboard** → Understand transparency and monitoring
6. **Notice the privacy protection** → Rich internal data vs. minimal external sharing

---

## 💡 **Key Value Propositions**

### **For Crypto Exchanges:**
- **⚡ Faster Fraud Detection:** Query partner networks instantly during onboarding
- **🔒 Privacy Protection:** Share intelligence without exposing sensitive data
- **📋 Regulatory Compliance:** Auditable, compliant risk coordination
- **💰 Reduced Investigation Costs:** Leverage network effects for better coverage
- **🤝 Competitive Collaboration:** Work together without revealing business secrets

### **For Regulators:**
- **📊 Enhanced Oversight:** Better fraud prevention across the ecosystem
- **🔍 Audit Transparency:** Cryptographic proof receipts for every coordination
- **🛡️ Privacy Compliance:** No raw PII sharing between institutions
- **📈 Network Effects:** Bad actors can't exploit information silos

### **For Users:**
- **🔐 Privacy Protection:** Personal data never shared between exchanges
- **⚡ Faster Onboarding:** Instant risk assessment without lengthy investigations  
- **🛡️ Better Security:** Enhanced fraud protection across the ecosystem
- **⚖️ Fair Treatment:** Consistent risk assessment based on behavior, not bias

---

## 🏗️ **Technical Architecture**

### **Core Components:**
- **🔐 Cryptographic Hashing:** SHA-256 for all PII before transmission
- **🔄 Privacy-Preserving Matching:** Query by hash, return minimal data
- **📊 Real-time Audit Dashboard:** Monitor all data coordination activities
- **🎯 Intelligent Risk Analysis:** Sunscreen service layer provides recommendations
- **📋 Compliance Framework:** Regulatory-ready audit trails and signatures

### **Data Flow:**
1. **Local Hashing:** User email → SHA-256 hash (locally at querying exchange)
2. **Encrypted Query:** Hash sent to Sunscreen API (no raw PII transmitted)
3. **Partner Lookup:** Sunscreen queries partner databases using hash
4. **Minimal Response:** Partners return only: risk tags, flagged quarter, match field
5. **Intelligence Layer:** Sunscreen adds recommendation and risk analysis
6. **Proof Receipt:** Cryptographically signed response for audit compliance

---

## 🎨 **Demo Features Showcase**

### **🔧 Technical Details (Expandable)**
- Full cryptographic proof receipts (JSON format)
- SHA-256 hash details for transparency
- Privacy analysis explaining protection mechanisms
- Signature verification for tamper evidence

### **📊 Query Audit Dashboard**
- **Real-time Statistics:** Total queries, matches found, data points shared
- **Query Log:** Timestamped history of all coordination activities  
- **Shared Data Tracking:** Exactly what information crossed exchange boundaries
- **Privacy Metrics:** Demonstrating minimal data sharing principles

### **🔀 Dual Perspective Toggle**
- **CoinFlex View:** Clean business interface focused on onboarding decisions
- **Maple CEX View:** Partner perspective with rich internal database and audit capabilities
- **Seamless Switching:** Toggle between perspectives to see both sides of the coordination

---

## 🚀 **Getting Started**

1. **Visit the Live Demo:** [https://abhi-raheja.github.io/encrypted-query-service-/](https://abhi-raheja.github.io/encrypted-query-service-/)
2. **Follow the Demo Steps:** Interactive guidance walks you through the experience
3. **Try Different Scenarios:** Test with various risk levels and user types
4. **Explore Both Perspectives:** Toggle between CoinFlex and Maple CEX views
5. **Dive into Technical Details:** Expand cryptographic implementation details

---

## 🎯 **Perfect For**

### **👥 Audiences:**
- **Crypto Exchange Leadership:** See business value and competitive advantages
- **Technical Teams:** Explore cryptographic implementation and API design
- **Compliance Officers:** Understand audit trails and regulatory benefits  
- **Investors:** Grasp market opportunity and technical differentiation
- **Regulators:** Evaluate privacy protection and oversight capabilities

### **🎪 Demo Scenarios:**
- **Sales Presentations:** Interactive value demonstration
- **Technical Due Diligence:** Deep-dive into implementation details
- **Regulatory Discussions:** Privacy and compliance showcase
- **Partnership Meetings:** Collaborative intelligence benefits
- **Investor Pitches:** Market opportunity and solution demonstration

---

## 🛡️ **Privacy & Security Guarantees**

### **What Gets Shared:**
- ✅ Risk tags (e.g., "Velocity_Withdrawals", "Flagged_KYC")
- ✅ Flagged quarter (e.g., "Q3 2024") - temporal patterns without exact dates
- ✅ Match field indicator ("email_hash")  
- ✅ Cryptographic proof signatures

### **What Stays Private:**
- ❌ Raw email addresses or PII
- ❌ Internal case IDs or investigation notes
- ❌ Compliance officer assignments
- ❌ Exact flagged dates or detailed timelines
- ❌ Internal business status or decisions
- ❌ Complete customer databases or lists

---

## 🔮 **The Future of Exchange Collaboration**

**Sunscreen represents the next evolution in financial crime prevention** - enabling institutions to work together while maintaining the privacy and competitive advantages they need to thrive.

This demo showcases how **privacy-preserving coordination** can transform the crypto ecosystem, making it safer for users while respecting the business realities of competitive markets.

---

**Ready to explore the future of secure data coordination?**  
**[🚀 Launch the Demo](https://abhi-raheja.github.io/encrypted-query-service-/)**
