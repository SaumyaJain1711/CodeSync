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
3. Svix is used to verify the webhook signature.
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
1. Clone the repository
git clone https://github.com/SaumyaJain1711/CodeSync.git
cd CodeSync
2. Install dependencies
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
5. Start the Convex development server

In a separate terminal:

npx convex dev

Then open:

http://localhost:3000
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
🔐 Security

Authentication is handled through Clerk.

Webhook requests from Clerk are verified using Svix signatures before user data is synchronized with Convex.

Environment variables containing credentials and secrets are kept in .env.local and excluded from version control.

👩‍💻 Author

Saumya Jain