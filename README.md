# FamBoard

FamBoard is a collaborative task management web app designed for families. It helps you and your siblings organize, assign, and track tasks with both a list view and a calendar view. Easily monitor everyone's to-dos and keep your family on track!

## Features

- 📝 **Task List View:** See all tasks in a sortable, filterable list.
- 📅 **Calendar View:** Visualize tasks by due date on a calendar.
- 🚦 **Priority & Status:** Assign priorities and track progress (Pending, In Progress, Completed).
- 👨‍👩‍👧‍👦 **Collaborative:** Designed for use by families or small groups.
- ⚡ **Modern UI:** Built with React, Tailwind CSS v4, and Vite for a fast, responsive experience.
- 🗄️ **Backend:** Node.js, Express, and MongoDB for robust data storage.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/FamBoard.git
   cd FamBoard
   ```

2. **Install dependencies:**

   - For the backend:
     ```sh
     cd server
     npm install
     ```

   - For the frontend:
     ```sh
     cd ../client
     npm install
     ```

3. **Configure environment variables:**

   - In `server/.env`, set your MongoDB connection string:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```

4. **Run the backend:**
   ```sh
   cd server
   npm start
   ```

5. **Run the frontend:**
   ```sh
   cd ../client
   npm run dev
   ```

6. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
FamBoard/
  client/    # React frontend (Vite + Tailwind CSS)
  server/    # Express backend (Node.js + MongoDB)
```

## Usage

- Add, edit, and delete tasks for you and your siblings.
- Switch between list and calendar views to monitor progress.
- Use priorities and statuses to organize your workflow.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

**Made with ❤️ for families who love to stay organized!**