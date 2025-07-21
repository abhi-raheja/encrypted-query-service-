# Product Requirements Document (PRD) - Encrypted Query Service

## Sunscreen Demo: "Project Chimera"

- **Version:** 1.0
- **Author:** You (Project Lead)
- **Status:** Final
- **Target Completion:** August 29, 2025
- **Last Updated:** July 21, 2025

**1. Overview & Goal**

This document outlines the requirements for a stateless, web-based demo of the Sunscreen platform, codenamed "Project Chimera." The primary goal is to provide a tangible, visual proof-of-concept for our "Stripe for Data" vision. It must clearly and simply illustrate how two organizations can coordinate on sensitive data without sharing the underlying raw data.

This demo is a critical sales and fundraising tool. It is not a production system; it contains no real encryption, no user accounts, and no database. **Its purpose is to tell a story.**

**2. Target Audience**

- Potential Investors (Seed/Series A)
- Potential Design Partners (Crypto Exchanges)
- Internal Team Alignment

**3. The Core User Story & Narrative**

The demo will walk the audience through a simple, powerful scenario:

> Scenario: "CoinFlex" (Exchange A) is onboarding a new user. They want to check if this user is a known risk across a network of trusted partners, like "Maple CEX" (Exchange B), without revealing the user's ID to the entire network or asking Maple CEX for their whole customer list.

**The "Magic" of the Demo:**

1. A user at CoinFlex enters a new customer's ID (`user-456`) into a simple interface.
2. They click "Check User with Sunscreen."
3. An animated request is sent to a "black box" labeled **Sunscreen API**.
4. The Sunscreen API "privately coordinates" with Maple CEX's data.
5. The Sunscreen API returns a clear, simple result to CoinFlex: **"Match Found: Risk Tags [Velocity_Withdrawals]"**.
6. **Crucially, CoinFlex never sees Maple CEX's data, and Maple CEX never sees who CoinFlex was searching for.** The demo makes this abstraction visually clear.

**4. Key Features & Functionality**

**Frontend (What the user sees):**

- **UI Layout:** A clean, single-page web interface, split into two columns representing "CoinFlex (You)" and "Maple CEX (Partner)."
- **Input Field:** In the "CoinFlex" column, a text box to enter a User ID.
- **Action Button:** A button labeled "Check User with Sunscreen."
- **Results Panel:** A space below the button to display the results from the "API." This should look like a clean API response.
- **The "Sunscreen API" Visual:** A central box or graphic between the two columns. When the button is clicked, an animation (e.g., a glowing line) should go from CoinFlex to the box, the box should "think" (e.g., with a spinner), and then a result line should go back to CoinFlex's results panel.
- **The 'Reveal' Toggle (The "Aha!" Moment):** A toggle button labeled "Show Partner's Internal Data." When turned on, the "Maple CEX" column will display its hardcoded dummy data, proving that the demo is referencing a real list and isn't just generating random results. This is key for building trust with the audience.

**Backend (Simulated Logic - No real server needed):**

- **Stateless Logic:** All logic will be handled in the browser using JavaScript.
- **Dummy Data:** The "Maple CEX" data will be a hardcoded JavaScript object (a dictionary or map).
- **Core Function:** A single function `checkUser(userID)` will:
    1. Take the `userID` from the input field.
    2. Check if this `userID` exists as a key in the hardcoded dummy data object.
    3. If it exists, return the associated array of tags (e.g., `['Velocity_Withdrawals']`).
    4. If it does not exist, return a "No Match Found" message.

**5. Data Requirements (Dummy Data)**

The hardcoded data for "Maple CEX" will be simple key-value pairs.

**Example JavaScript Object:**

```javascript
const mapleCEX_Data = {
  "user-123": ["Flagged_KYC"],
  "user-456": ["Velocity_Withdrawals"],
  "user-789": ["Flagged_KYC", "Velocity_Withdrawals"],
  "user-abc": ["Sanctions_List_Hit"] // Another potential tag
};
```

**6. Non-Functional Requirements**

- **Performance:** Must be instant as it's all running locally in the browser.
- **Technology:** Must be built with the simplest possible stack: **HTML, CSS, and vanilla JavaScript.** No frameworks (like React/Vue) are needed, which will make it easier for an AI agent to generate and for you to understand.
- **Hosting:** Will be hosted on a free, simple service like GitHub Pages.

**7. Success Metrics**

- The demo successfully conveys the core value proposition in under 60 seconds.
- It reliably generates an "aha!" moment when the "Show Partner Data" toggle is used.
- Non-technical investors can clearly articulate what the company does after seeing it.

---

## Implementation Status
- [ ] Requirements gathering complete
- [ ] Technical architecture defined
- [ ] Development started
- [ ] Testing phase
- [ ] Demo ready 