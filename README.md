# Task Manager

Task Manager is a straightforward task management application built with React and TypeScript using Vite for blazing fast development. This application provides core features such as adding, editing, and deleting tasks; searching and filtering tasks; and persisting data using localStorage. The UI is styled with Tailwind CSS and optionally enhanced using Shadcn components.

--------------------------------------------------
## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Built With](#built-with)
- [License](#license)

--------------------------------------------------
## Features

- Dashboard view to display and manage tasks
- Create, edit, and delete tasks
- Task details include title, description, due date, and priority (High, Medium, Low)
- Search functionality for quick task look-up
- Filtering tasks based on priority and status
- Data persistence using the browser’s localStorage

--------------------------------------------------
## Installation

1. Ensure you have Node.js installed on your machine.
2. Clone this repository:
   ```
   git clone https://github.com/your-username/task-manager.git
   ```
3. Change into the project directory:
   ```
   cd task-manager
   ```
4. Install the project dependencies using pnpm:
   ```
   pnpm install
   ```
5. Configure Tailwind CSS by ensuring the Tailwind directives are included in the CSS files (see [Tailwind CSS docs](https://tailwindcss.com/docs/installation)).

--------------------------------------------------
## Usage

1. Start the development server with Vite:
   ```
   pnpm run dev
   ```
2. Open your browser and navigate to the URL provided in the terminal (usually [http://localhost:3000](http://localhost:3000)) to see the application in action.
3. Use the dashboard to add new tasks, search/filter through existing tasks, and manage task details. Task data is automatically stored in your browser’s localStorage.

--------------------------------------------------
## Project Structure

The project is organized as follows:

```
/task-manager/
├── /public/
│   └── index.html
├── /src/
│   ├── /components/
│   │   ├── Dashboard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx   (optional: for individual task display)
│   │   ├── TaskSearch.tsx
│   │   └── Filter.tsx
│   ├── /styles/
│   │   └── tailwind.css
│   ├── /utils/
│   │   └── storage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

--------------------------------------------------
## Built With

- React with TypeScript
- Vite for fast development
- pnpm for package management
- Tailwind CSS for styling
- Shadcn (optional) for component enhancements
- localStorage for client-side persistence

--------------------------------------------------
## License

This project is licensed under the MIT License.
