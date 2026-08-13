# CodeSync

CodeSync is a technical interview collaboration platform designed to connect candidates and interviewers in a structured interview environment.

The project is being built with Next.js, TypeScript, Clerk, Convex, and Stream.

## 🚀 Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Backend & Database:** Convex
- **Video Infrastructure:** Stream Video SDK
- **Webhook Verification:** Svix

## ✨ Current Features

- 🔐 Authentication with Clerk
- 👤 Candidate and interviewer roles
- 🗄️ Convex database integration
- 🔗 Clerk + Convex authentication integration
- 🔄 Clerk webhook-based user synchronization
- 🛡️ Svix webhook signature verification
- 📹 Stream Video SDK integration foundation
- ⚡ Next.js App Router architecture
- 🧩 Server and client component architecture

## 🏗️ Architecture

CodeSync uses Clerk for authentication and Convex for backend data management.

When a new user is created in Clerk:

1. Clerk generates a `user.created` webhook event.
2. The event is sent to the CodeSync Convex HTTP endpoint.
3. Svix verifies the webhook signature.
4. The verified event is processed by the Convex backend.
5. User information is synchronized with the Convex `users` table.
6. New users are assigned the default `candidate` role.

### User Data

The Convex `users` table currently stores:

- Name
- Email
- Profile image
- Clerk user ID
- User role

An index on `clerkId` is used for efficient user lookups.

## 📂 Project Structure

```text
CodeSync/
├── convex/
│   ├── _generated/
│   ├── auth.config.ts
│   ├── http.ts
│   ├── schema.ts
│   └── users.ts
│
├── src/
│   ├── app/
│   ├── components/
│   └── ...
│
├── public/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

⚙️ Getting Started

Follow these steps to run CodeSync locally.

1. Clone the repository
git clone https://github.com/SaumyaJain1711/CodeSync.git
cd CodeSync

2. Install Dependencies
npm install

3. Configure environment variables

Create a .env.local file in the project root.

Add the required credentials for Clerk, Convex, and Stream:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=

CLERK_FRONTEND_API_URL=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=

Never commit .env.local or expose secret keys publicly.

4. Start the Next.js development server
npm run dev

The application will be available at:

http://localhost:3000

5. 5. Start the Convex development server

Open a second terminal in the project directory:
npx convex dev

Keep this terminal running while developing the application.

🔐 Authentication & User Synchronization

CodeSync uses Clerk for authentication and Convex for backend data management.

The authentication flow works as follows:

User
  │
  ▼
Clerk Authentication
  │
  ▼
user.created Webhook
  │
  ▼
Convex HTTP Action
  │
  ▼
Svix Signature Verification
  │
  ▼
Convex users.syncUser Mutation
  │
  ▼
Convex Users Table

When a new user signs up:

Clerk creates the user.
Clerk sends a user.created webhook.
Convex receives the webhook through /clerk-webhook.
Svix verifies the webhook signature.
Convex executes the syncUser mutation.
The user is added to the Convex users table.
The user receives the default candidate role.


🗄️ Database

The project currently contains a users table in Convex.

Each user contains:

Field	Description
name	User's name
email	User's email
image	Optional profile image
clerkId	Unique Clerk user ID
role	candidate or interviewer

The clerkId field has an index named:

by_clerk_id

This allows efficient user lookups using the Clerk ID.

🔔 Webhooks

CodeSync uses a Convex HTTP endpoint to receive Clerk webhook events.

Endpoint:

/clerk-webhook

Webhook requests are verified using Svix before user data is written to Convex.

This prevents unverified requests from modifying the database.

🛡️ Security
Authentication is handled through Clerk.
Clerk webhook signatures are verified using Svix.
Secret credentials are stored in environment variables.
.env.local is excluded from version control.
Clerk IDs are used to associate authenticated users with Convex records.

Never commit CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET, STREAM_SECRET_KEY, or other private credentials to GitHub.

🛣️ Roadmap
 Interview room creation
 Real-time video interviews
 Screen sharing
 Screen recording
 Collaborative coding environment
 Interview scheduling
 Candidate dashboard
 Interviewer dashboard
 Interview history
 Interview session management
 Role-based interview workflows
📈 Project Status

CodeSync is currently under active development.

The initial application foundation, authentication system, Convex backend, database schema, Clerk webhook integration, and user synchronization workflow have been implemented.

Additional interview and collaboration functionality will be added incrementally.

👩‍💻 Author

Saumya Jain

GitHub: https://github.com/SaumyaJain1711