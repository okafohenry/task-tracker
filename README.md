# Task Tracker Application

This is a task tracker application built with Nextjs, Redux Toolkit, and MOCK Api (https://mock-api.binaryboxtuts.com/) for user Authentication.

## Features

- Display a kanban board with 4 columns: Open, Pending, In Progress, Completed.
- Allow users to add, edit, and delete tasks.
- User authentication (Sign up and Sign in) using Redux Toolkit and MOCK Api (https://mock-api.binaryboxtuts.com/).
- Responsive design using Tailwind CSS.
- Draggable task between columns using react-beautiful-dnd

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)

## Getting Started

1. Clone the repository:

   - ``` git clone https://github.com/okafohenry/task-tracker.git ```
   - ```cd task-tracker-app```

2. Install dependencies:
  - ```npm install```

3. Run the application:
 - ```npm run dev```

The application will be accessible at http://localhost:3000 in your web browser.

## Usage

- Register or login to your account.
- Add tasks on the kanban board by clicking on **Create** tab from the side nav.
- Edit, and delete tasks by left-clicking on the a task title
- View task description by left-clicking on the **angle down** icon

## Constraints

- Tracka utilizes redux-persist feature additionally to retain added tasks, this feature displays all tasks added irrespective of user logged-in, this is because the logic made available on the third-party endpoint has a logic deficiency to provide the frontend needs required for smooth and faultless running of the task-tracka application.


## Additional Information

- This is a basic implementation that uses redux-persist to retain data in the browser's localStorage, which can be enhanced by storing data in a db, also additional features can as needed.

- For a production environment, ensure proper security measures and consider deploying the application to a hosting service.
