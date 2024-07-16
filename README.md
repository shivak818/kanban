# kanban
# ReactJS Kanban Board

This project implements a Kanban board in ReactJS, allowing users to manage tasks across different stages: To Do, In Progress, Peer Review, and Done. It supports drag-and-drop functionality for task movement, search filtering by task title, and task creation restrictions.

## Kanban Board Layout

The Kanban board is structured into four columns:

- **To Do**: Tasks that are yet to be started.
- **In Progress**: Tasks currently being worked on.
- **Peer Review**: Tasks under review by peers.
- **Done**: Completed tasks.

## Task Cards

Each task card displays:
- Task Title
- Shortened Task Description

## Features

### Drag-and-Drop Functionality

Tasks can be dragged between columns, allowing for easy movement across stages.

### Search Functionality

A search bar is provided at the top of the board to filter tasks based on their title. As users type in the search bar, matching tasks are displayed, while non-matching tasks are hidden.

### Task Creation

A floating button allows users to create new tasks, which can only be added to the To Do column.

### Optional Components

1. **External Services**: You can integrate external services for additional functionality.
2. **Database Integration**: Use of local storage for storing/retrieving task information, or integrate with a database (DB credentials required for review purposes).

## Getting Started

To run this project locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start'
