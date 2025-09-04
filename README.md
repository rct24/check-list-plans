# site link: https://rct24.github.io/check-list-plans/

## Directory Structure

The project is organized as follows:

```
Directory structure:
└── rct24-check-list-plans/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── CheckList.jsx
        │   ├── ListItem.jsx
        │   └── MobileBlocker.jsx
        ├── constants/
        │   └── constants.js
        └── containers/
            ├── CheckListContainer.jsx
            └── ListItemContainer.jsx

```


# Check List Plans App

This React application helps you verify the completeness of engineering plans, by using structured checklists. For each plan, you can organize and track all required information within dedicated sections, ensuring nothing important is missing.

## Features ✨

* **Plan Selection**: Choose from a predefined list of engineering plans using a dropdown menu.
* **Dynamic Sections**: Add custom sections to your checklist for a selected plan.
* **Interactive Items**: Within each section, you can add, edit, and delete checklist items.
* **Pre-populated Data**: The app comes with two sample plans, "cofraj" and "armare," which are populated with default checklist data from `src/utilitary.js`.

## Technologies 🛠️

This project is built using:

* **React**: A JavaScript library for building user interfaces.
* **Vite**: A fast build tool that provides a rapid development experience.
* **ESLint**: Used for linting to maintain code quality and consistency.
* **Bootstrap 5**: For modern, responsive UI components and styling.

## Installation and Usage 🚀

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:
    ```bash
    cd rct24-check-list-plans
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Project

To run the application in development mode, use the following command:

```bash
npm run dev
```

### Notes
Only accessible from desktop browsers.
All data is stored in memory (no backend).