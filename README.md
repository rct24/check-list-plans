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
        │   ├── CheckList.jsx
        │   ├── ListItem.jsx
        │   ├── MobileBlocker.jsx
        │   ├── PdfViewer.jsx
        │   ├── ResizeHandle.jsx
        │   ├── Sidebar.jsx
        │   └── TabBar.jsx
        ├── constants/
        │   └── constants.js
        ├── containers/
        │   ├── CheckListContainer.jsx
        │   ├── ListItemContainer.jsx
        │   └── SidebarContainer.jsx
        ├── context/
        │   ├── AppContext.jsx
        │   ├── AppContextProvider.jsx
        │   ├── SideBarContext.jsx
        │   └── SideBarContextProvider.jsx
        └── styles/
            └── Sidebar.css

```

# Check List Plans

A web application designed for desktop use that helps engineers manage checklists for engineering plans. The app allows users to select a plan, view its associated checklist, and mark items as complete. It also provides a unique drawing feature where users can add visual checkmarks and text directly onto the PDF of the plan.

## Features

- **Dynamic Checklists**: Pre-defined checklists for different engineering plans (e.g., `cofraj pana`, `armare pana`, `cofraj stalp`).
- **Plan Selection**: Easily switch between different engineering plans to load the corresponding checklist.
- **Interactive PDF Viewer**: View the PDF plan and interact with it.
- **Drawing Mode**: Activate a "Draw" mode to place green checkmarks and text on the PDF, correlating with items on the checklist.
- **Sidebar Management**:
  - Add and delete new sections to a checklist.
  - Add, edit, and delete individual items within a section.
  - Edit section names.
- **Responsive Design**: Optimized for desktop viewing, with a mobile blocker to ensure the best user experience.
- **Persistent Data**: Changes to checklists are managed by React state, allowing for a dynamic user experience.

## Development

## Technologies Used

- **React**: The core library for building the user interface.
- **Vite**: A fast and lightweight build tool for modern web projects.
- **Bootstrap**: Provides a responsive and modern CSS framework.
- **ESLint**: Configured for code quality and consistency.

## Installation and Usage 🚀

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/rct24/check-list-plans.git](https://github.com/rct24/check-list-plans.git)
    cd check-list-plans
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

### Building for Production

1.  **Build the project:**
    ```bash
    npm run build
    ```
