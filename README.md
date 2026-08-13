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




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
