# Leadflow — Lead Management Workspace

A full-stack, multi-user Lead Manager built with the MERN stack for the Meru Technosoft Full Stack Developer screening assignment. The application includes every required workflow from the brief, the listed bonus features, and additional pipeline tools.

## Highlights

- Secure signup and login with JWT authentication and bcrypt password hashing
- Private user workspaces: every lead query is scoped to its owner
- Create, view, edit and delete leads with a confirmation step
- Required lead fields: name, email, phone, company, source and status
- Additional lead fields: priority (Low / Medium / High), notes and next follow-up date
- Frontend and backend validation with clear API errors
- Search by name, email or company; filter by status and source
- Dashboard totals for all four pipeline statuses and a visual distribution view
- Follow-up reminder count for due / overdue leads on the current page
- Server-side pagination and sorting
- CSV export of the currently displayed page (including priority, notes and follow-up date)
- Responsive layout, polished dashboard UI and a light / dark theme toggle
- Helmet security headers, CORS configuration, JSON payload limit and authentication rate limiting
- API health endpoint and automated API tests

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router, Axios, Lucide React |
| Backend | Node.js, Express, Mongoose, JWT, bcryptjs, express-validator |
| Database | MongoDB |
| Tests | Jest, Supertest, mongodb-memory-server |

## Project structure

```text
LeadFlow-main/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # Auth and lead business logic
│   │   ├── middleware/      # JWT protection and API errors
│   │   ├── models/          # User and Lead schemas
│   │   ├── routes/          # REST API routes
│   │   └── utils/           # Request validation rules
│   └── tests/
└── frontend/
    └── src/
        ├── api/             # Axios API client
        ├── components/      # Reusable UI components
        ├── context/         # Authentication state
        └── pages/           # Login, signup and dashboard
```

## Run locally

### Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend setup

```bash
cd backend
cp .env.example .env
```

The supplied `.env.example` uses the requested local configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/lead_manager
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Replace `JWT_SECRET` with a long random secret before using the application. Never commit `.env`.

```bash
npm install
npm run dev
```

The API starts at `http://localhost:5000`.

### 2. Frontend setup

Open a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173` and create your account.

## API reference

All lead endpoints require `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | Register and return a token |
| POST | `/api/auth/login` | Authenticate and return a token |
| GET | `/api/auth/me` | Get the authenticated user |
| GET | `/api/leads` | List, search, filter, sort and paginate owned leads |
| POST | `/api/leads` | Create a lead |
| PUT | `/api/leads/:id` | Update an owned lead |
| DELETE | `/api/leads/:id` | Delete an owned lead |
| GET | `/api/leads/dashboard` | Get status counts for the current user |
| GET | `/api/health` | API health check |

### List query parameters

- `page` (default `1`)
- `limit` (default `8`, maximum `50`)
- `search` (matches name, email and company)
- `status` (`New`, `Contacted`, `Qualified`, `Lost`)
- `source` (`Website`, `Referral`, `Social Media`, `Cold Call`, `Advertisement`, `Other`)
- `sortBy` (`createdAt`, `name`, `status`, `company`)
- `order` (`asc` or `desc`)

### Example lead payload

```json
{
  "name": "Jordan Lee",
  "email": "jordan@example.com",
  "phone": "+91 98765 43210",
  "company": "Acme Systems",
  "source": "Website",
  "status": "New",
  "priority": "High",
  "notes": "Interested in a product walkthrough.",
  "followUpDate": "2026-11-25"
}
```

`priority`, `notes` and `followUpDate` are additional fields. Priority defaults to `Medium`; notes and follow-up date are optional.

## Automated tests

```bash
cd backend
npm install
npm test
```

The test suite uses `mongodb-memory-server`; the first run may need internet access to download a MongoDB test binary.

## Deployment notes

### MongoDB Atlas

1. Create a MongoDB Atlas cluster and database user.
2. Add the backend hosting provider to Network Access.
3. Set `MONGODB_URI` to the Atlas connection string.

### Backend — Render / Railway

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `NODE_ENV=production`, `MONGODB_URI`, a strong `JWT_SECRET`, `JWT_EXPIRES_IN=7d`, and `CLIENT_URL` set to the exact frontend origin.

### Frontend — Vercel / Netlify

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://<your-backend-host>/api`
- Keep the included SPA rewrite configuration so direct navigation resolves to the React app.

After deployment, set the backend `CLIENT_URL` to the deployed frontend origin and redeploy the backend.

## Assumptions and design decisions

- A lead belongs to exactly one user. Ownership is enforced in database queries for listing, updating and deleting, and update fields are allow-listed.
- Lead email is not globally unique because different users may independently manage the same contact.
- Status, source and priority use fixed enumerations for consistent filtering and reporting.
- Dashboard aggregates only the authenticated user's leads.
- Pagination is server-side to avoid loading an unbounded list into the browser.
- CSV export includes the currently displayed filtered/sorted page.
- Follow-up dates are optional and are stored as dates; the UI prevents selecting a past date.

## What I would improve with more time

- Refresh-token rotation and secure HttpOnly cookie-based sessions
- Lead activity timeline, reminders/notifications and collaboration between teammates
- Bulk lead actions and export-all support
- More integration tests for ownership isolation, update/delete, sorting and pagination
- End-to-end browser tests, accessibility review and structured production logging

## Submission note

The most important design decision was enforcing user-level data isolation in the database layer, rather than relying on the frontend to hide other users' records. I also added priority, notes and follow-up dates so a lead can be managed beyond its basic contact details.

**Assignment reminder:** the brief asks for a public Git repository link and meaningful commit history. Use this ZIP as your working copy, push the project to your GitHub repository, and submit the repository URL rather than emailing the ZIP.
