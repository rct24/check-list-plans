# Stage 1 Implementation Example
## Static Foundation - Simplified Architecture

This document demonstrates how to implement Stage 1 of the Incremental Development Plan, showing the simplest possible version of the Check List Plans application.

## Simplified Components

### 1. Basic PDF Viewer
```jsx
// components/SimplePdfViewer.jsx
export default function SimplePdfViewer({ planName }) {
  const fileName = `${planName}.pdf`;
  
  return (
    <div className="pdf-container">
      <iframe
        src={`/plans/${fileName}`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
}
```

### 2. Static Checklist Display
```jsx
// components/StaticChecklist.jsx
const STATIC_CHECKLIST = {
  "Elevatie": [
    { text: "Titlu si scara", checked: false },
    { text: "Cotare capat stalp", checked: false },
    { text: "Cota gabarit", checked: false }
  ],
  "Sectiuni": [
    { text: "Titluri si scara", checked: false },
    { text: "Cote pe X", checked: false },
    { text: "Cota pe Y", checked: false }
  ]
};

export default function StaticChecklist() {
  return (
    <div className="checklist-container">
      {Object.entries(STATIC_CHECKLIST).map(([section, items]) => (
        <div key={section} className="checklist-section">
          <h5>{section}</h5>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <input 
                  type="checkbox" 
                  disabled 
                  defaultChecked={item.checked}
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

### 3. Simple Layout
```jsx
// components/SimpleLayout.jsx
import SimplePdfViewer from './SimplePdfViewer';
import StaticChecklist from './StaticChecklist';

export default function SimpleLayout() {
  return (
    <div className="app-layout">
      <div className="pdf-section">
        <SimplePdfViewer planName="R501_Plan_cofraj_stalp_S1" />
      </div>
      <div className="checklist-section">
        <StaticChecklist />
      </div>
    </div>
  );
}
```

### 4. Basic CSS
```css
/* styles/simple-layout.css */
.app-layout {
  display: flex;
  height: 100vh;
}

.pdf-section {
  flex: 2;
  padding: 1rem;
}

.checklist-section {
  flex: 1;
  padding: 1rem;
  border-left: 1px solid #ccc;
  overflow-y: auto;
}

.checklist-section h5 {
  margin-bottom: 0.5rem;
  color: #333;
}

.checklist-section ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.checklist-section li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.checklist-section input[type="checkbox"] {
  margin-right: 0.5rem;
}
```

## Key Design Principles for Stage 1

### 1. **Minimal Complexity**
- No state management (React useState/Context)
- No user interactions beyond viewing
- Hardcoded data for quick setup
- Static components only

### 2. **Clear Separation of Concerns**
- PDF viewing logic isolated in `SimplePdfViewer`
- Checklist rendering isolated in `StaticChecklist`
- Layout logic in `SimpleLayout`
- Styling in dedicated CSS file

### 3. **Foundation for Future Growth**
- Component props prepared for data injection
- CSS classes ready for interactive states
- Modular structure allows easy replacement
- Clear naming conventions established

## Benefits of This Approach

1. **Immediate Value**: Users can see the core concept working
2. **Quick Feedback**: Stakeholders can validate the basic idea
3. **Low Risk**: Minimal code means fewer bugs
4. **Clear Vision**: Demonstrates the end goal simply
5. **Easy Testing**: Simple components are easy to test

## Transition to Stage 2

When moving to Stage 2 (Basic Interactivity), you would:

1. Replace disabled checkboxes with interactive ones
2. Add `useState` to track checked state
3. Add plan selection dropdown
4. Replace static data with dynamic data structure

The beauty of this approach is that the architecture is already prepared for these changes - you're adding functionality, not restructuring.

## Code Evolution Example

**Stage 1 (Static):**
```jsx
<input type="checkbox" disabled defaultChecked={item.checked} />
```

**Stage 2 (Interactive):**
```jsx
<input 
  type="checkbox" 
  checked={item.checked}
  onChange={(e) => onItemToggle(sectionIndex, itemIndex, e.target.checked)}
/>
```

The transition is clean and additive, following the Incremental Development principle of building on what works.