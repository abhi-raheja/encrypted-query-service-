# Master Plan - Encrypted Query Service

## Planning & Execution Document - Project Chimera

**Owner:** Development Team  
**Objective:** Build the "Project Chimera" demo as defined in the PRD by August 29, 2025, using AI coding agents and simple web technologies.  
**Guiding Principle:** Simplicity over complexity. We are telling a story, not building a product.

### Original Planning Framework

**Phase 1: Setup & Design** 

1. **Finalize PRD:** Read the PRD above. Do you agree with it? Is it clear? This is your blueprint.
2. **Paper Wireframe:** **Do not skip this.** On a piece of paper, draw the screen. Where does the input box go? The button? The results? The "Show Data" toggle? This simple drawing will be your primary input for the AI agent.
3. **Setup Tools:**
    - Install a code editor: **Visual Studio Code** (it's free and user-friendly).
    - Create a folder on your desktop named `sunscreen-demo`.
    - Inside, create three empty files: `index.html`, `style.css`, and `script.js`.

**Phase 2: Core Logic** 

1. **Goal:** Get the basic logic working without any UI.
2. **AI Prompting (for `script.js`):**
    - **Prompt 1:** "In vanilla JavaScript, create a constant variable named `mapleCEX_Data`. It should be a JavaScript object. Populate it with this data: `{'user-123': ['Flagged_KYC'], 'user-456': ['Velocity_Withdrawals'], 'user-789': ['Flagged_KYC', 'Velocity_Withdrawals']}`."
    - **Prompt 2:** "Now, write a JavaScript function called `checkUser` that takes one argument, `userID`. This function should look inside the `mapleCEX_Data` object. If the `userID` exists as a key, the function should return the array of tags associated with it. If it does not exist, it should return the string 'No Match Found'."
    - **Prompt 3:** "Show me how to test this function by calling it with `checkUser('user-456')` and `checkUser('user-999')` and printing the results to the console."
3. **Action:** Copy the code into `script.js`. Open `index.html` in Chrome, open the Developer Tools (Right Click -> Inspect -> Console), and see if the test results are correct.

**Phase 3: Building the UI**

1. **Goal:** Create the visual layout.
2. **AI Prompting (for `index.html` and `style.css`):**
    - **Prompt (using your wireframe):** "Using HTML and CSS, create a webpage layout. It should have a main title 'Sunscreen Demo'. Below this, it should have two columns side-by-side. The left column should have a heading 'CoinFlex (You)' and the right column should have a heading 'Maple CEX (Partner)'. The left column needs a text input box and a button below it that says 'Check User with Sunscreen'. Below that, create an empty `div` for showing results."
    - **Action:** Paste the HTML into `index.html` and the CSS into `style.css`. Link them together in the HTML file (you can ask the AI "how do I link my CSS file to my HTML file?"). Open `index.html` in your browser to see how it looks.

**Phase 4: Integration & Polish** 

1. **Goal:** Make the button do something.
2. **AI Prompting (for `script.js`):**
    - **Prompt:** "In my HTML, I have an input with the ID 'userInput' and a button with the ID 'checkButton'. I also have a `div` with the ID 'resultsPanel'. Write the JavaScript code to add an event listener. When the 'checkButton' is clicked, it should get the value from the 'userInput' box, call the `checkUser` function with that value, and display the returned result inside the 'resultsPanel'."
3. **Action:** Test it! The demo should now be functional.

**Phase 5: The "Aha!" Feature & Rehearsal**

1. **Goal:** Build the reveal toggle and start practicing your pitch.
2. **AI Prompting:**
    - **Prompt 1:** "Add a toggle switch button to my HTML labeled 'Show Partner Data'. In the right column, add a `div` with the ID 'partnerDataPanel' which is hidden by default."
    - **Prompt 2:** "Write the JavaScript so that when the toggle switch is turned on, the 'partnerDataPanel' becomes visible. When it's on, it should display the contents of the `mapleCEX_Data` object in a nicely formatted way. When the toggle is off, the panel should be hidden again."
3. **Action:** Rehearse your pitch while clicking through the demo. Does it feel smooth? Is the story clear?

---

## Comprehensive Development Plan

Based on the PRD and planning framework, here's our detailed implementation strategy:

### 🎯 **Core Objectives**
1. **Tell a Story**: Create a compelling narrative about private data coordination
2. **Generate "Aha!" Moment**: The reveal toggle is crucial for building trust
3. **Keep It Simple**: Vanilla HTML/CSS/JS only - no frameworks
4. **Test-Driven Development**: Write tests first, then implement features

### 📋 **Implementation Phases**

#### **Phase 1: Project Setup & Foundation** ✅
- [x] Repository setup and initial structure
- [x] PRD and planning documents created
- [x] Basic file structure (`index.html`, `style.css`, `script.js`)
- [ ] Initial wireframe/design validation

#### **Phase 2: Core Business Logic (TDD Approach)** ✅
- [x] **Tests First**: Create test cases for `checkUser` function
- [x] Implement dummy data structure (`mapleCEX_Data`)
- [x] Implement core `checkUser` logic
- [x] Validate all test cases pass

#### **Phase 3: User Interface Development** ✅
- [x] **Tests First**: Create UI interaction tests
- [x] Build basic HTML structure (two-column layout)
- [x] Style with CSS (clean, professional look)
- [x] Implement responsive design basics

#### **Phase 4: Interactive Features** ✅
- [x] **Tests First**: Test user input and button interactions
- [x] Connect UI to business logic
- [x] Add form validation and error handling
- [x] Implement results display

#### **Phase 5: Advanced Features & Animation**
- [ ] **Tests First**: Test animation and visual effects
- [ ] Add Sunscreen API visual element with animations
- [ ] Implement loading states and transitions
- [ ] Add visual feedback for user actions

#### **Phase 6: "Aha!" Moment Feature**
- [ ] **Tests First**: Test reveal toggle functionality
- [ ] Implement partner data reveal toggle
- [ ] Format partner data display beautifully
- [ ] Add smooth show/hide animations

#### **Phase 7: Polish & Demo Readiness**
- [ ] **Integration Tests**: Test complete user flow
- [ ] Cross-browser testing and fixes
- [ ] Performance optimization
- [ ] Demo script preparation and rehearsal

### 🛠 **Technical Architecture**

**File Structure:**
```
/
├── index.html          # Main demo page
├── style.css           # Styling and layout
├── script.js           # Core business logic
├── tests/
│   ├── test.html       # Test runner page
│   └── tests.js        # Test cases
├── README.md           # Project overview
├── PRD.md              # Product requirements
└── instructions.md     # This file (master plan)
```

**Key Components:**
1. **Data Layer**: Hardcoded `mapleCEX_Data` object
2. **Logic Layer**: `checkUser()` function and validation
3. **UI Layer**: Two-column layout with interactive elements
4. **Animation Layer**: Visual feedback and transitions

### 🎨 **Design Principles**
- **Clean & Professional**: Builds trust with investors
- **Clear Visual Hierarchy**: Story flows naturally
- **Responsive Design**: Works on laptops and tablets
- **Accessibility**: Proper contrast and keyboard navigation

### 🧪 **Testing Strategy**
- **Unit Tests**: Test `checkUser` function with various inputs
- **Integration Tests**: Test UI interactions and data flow
- **User Experience Tests**: Validate story clarity and "aha!" moment
- **Cross-browser Tests**: Ensure compatibility

### 📊 **Success Criteria**
- [ ] Demo tells complete story in under 60 seconds
- [ ] "Aha!" moment is clear and impactful
- [ ] All tests pass and code is bug-free
- [ ] Non-technical audience can understand the value proposition
- [ ] Ready for investor presentations

### 🚀 **Next Steps**
1. Start with Phase 2: Core Logic (TDD approach)
2. Create comprehensive test cases first
3. Implement features incrementally
4. Test early and often
5. Prepare for demo presentation

---

## Development Notes
- This file serves as the master reference for the project
- All development decisions should align with the plan outlined above
- Following TDD approach: write tests first, then implement
- Focus on story-telling over technical complexity
- Any changes to the plan should be updated in this file 