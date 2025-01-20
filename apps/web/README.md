# Web App - Kenia School Management System

This directory contains the web application for the Kenia School Management System. It is designed to provide both staff and students with a seamless and user-friendly experience for managing school-related tasks.

## Features

- Staff portal for managing administrative tasks.
- Student portal for accessing assignments, grades, and resources.
- Theme-aware design with light and dark mode support.
- Optimized for responsive performance across devices.

## Tech Stack

- **Next.js**: The React framework for building fast, server-rendered web applications.
- **TypeScript**: Type-safe JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Query**: Data fetching and caching.
- **Zustand**: Lightweight state management.
- **React Hook Form**: Efficient form handling.
- **Axios**: HTTP client for API integration.
- **Sentry**: Application monitoring and error reporting.

## Folder Structure

This web application follows a modular Next.js project structure:

```bash
web-app/
├── public/
├── apis/
├── app/
│   ├── @protected/
│   ├── @private/
│   ├── layout.tsx
│   ├── error.tsx
│   ├── ...
├── components/
│   ├── data-table/
│   ├── ...
├── config/
├── hooks/
├── lib/
├── .env
├── env.mjs
├── instrumentation.ts
├── next.config.js
├── tailwind.config.js
├── sentry.constants.js
├── package.json
└── tsconfig.json

```
