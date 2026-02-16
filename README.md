# Task Board Application

A modern, responsive task management board with drag-and-drop functionality, built with React, Vite, and Ant Design.

## Features

- **Authentication**: Static login with hardcoded credentials (`intern@demo.com` / `intern123`)
- **Remember Me**: Persistent login via localStorage
- **Task Management**: Create, edit, delete tasks with title, description, priority, due date
- **Kanban Board**: Drag & drop tasks across Todo, Doing, and Done columns
- **Search & Filter**: Search by title, filter by priority, sort by due date
- **Activity Log**: Real-time tracking of all task actions
- **Persistence**: All data stored in localStorage with safety checks
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Neumorphic UI**: Modern design using Ant Design components

## Tech Stack

- **Frontend**: React 19.2.0 + Vite 7.3.1
- **State Management**: Context API (Auth + Task)
- **Drag & Drop**: @dnd-kit/core & @dnd-kit/sortable
- **UI Library**: Ant Design 5.6.0
- **Styling**: CSS with neumorphism theme
- **Testing**: Vitest + React Testing Library

## Setup & Installation

### Prerequisites
- Node.js >= 20.19.0 (or >= 22.12.0)
- npm >= 10.7.0

### Local Development

1. **Clone the repository**:
   ```bash
   cd task-board-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5173` (or next available port)

4. **Login with credentials**:
   - Email: `intern@demo.com`
   - Password: `intern123`

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx        # Authentication state & logic
│   └── TaskContext.jsx         # Task management & localStorage
├── pages/
│   ├── Login.jsx              # Login form with validation
│   └── Board.jsx              # Main kanban board layout
├── components/
│   ├── TaskCard.jsx           # Individual task card (draggable)
│   ├── Column.jsx             # Drop zone for tasks
│   ├── TaskForm.jsx           # Create/edit task form
│   └── ActivityLog.jsx        # Activity tracking display
├── styles/
│   └── neumorphism.css        # Neumorphic design theme
├── App.jsx                    # Routing & protected routes
├── main.jsx                   # App entry point
├── index.css                  # Global styles
└── tests/                     # Vitest test files
```

## Available Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Build for production (dist/)
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Testing

Run tests with:
```bash
npm run test
```

Current test coverage includes:
- Login validation (incorrect credentials)
- Task deletion verification
- Column filtering by priority

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repo to [Vercel](https://vercel.com)
3. Vercel auto-detects Vite config and deploys
4. Environment: Use default settings (Vite build is pre-configured)

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Drag `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)
   OR connect GitHub repo directly for auto-deployment

### Deploy to GitHub Pages

1. Update `vite.config.js`:
   ```js
   export default {
     base: '/your-repo-name/',
     // ... rest of config
   }
   ```
2. Build and push `dist/` to gh-pages branch

## State Management

### AuthContext
- Manages login/logout state
- Stores "Remember Me" preference in localStorage
- Provides `ProtectedRoute` wrapper for board access

### TaskContext
- Manages all task CRUD operations
- Handles drag & drop status updates
- Maintains activity log
- Persists to localStorage with error safeguards

## Data Persistence

All data stored in browser localStorage:
- `auth` — authentication state (true/false)
- `tasks` — array of task objects
- `activityLog` — array of action logs

Data is automatically saved on every change and loaded on app start.

## Known Limitations

- Backend not implemented (storage is browser-only; data resets on browser cache clear)
- No user account system (hardcoded credentials only)
- Tags are in data schema but no UI to manage them

## Future Enhancements

- Backend API integration (Node.js/Express or Firebase)
- User authentication with JWT
- Tag management UI
- Task notifications/reminders
- Export board to CSV/PDF
- Dark mode toggle

## License

MIT – Feel free to use for personal/commercial projects.
