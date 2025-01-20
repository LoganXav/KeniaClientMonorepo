# Kenia Client Monorepo

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Code Architecture](#code-architecture)
4. [Folder Structure](#folder-structure)
5. [Setup Instructions](#setup-instructions)

---

## Introduction

This monorepo contains the frontend components of the Kenia School Management System. It is built using Turborepo for efficient management of multiple packages and applications. The system includes dedicated portals for staff and students, providing tools for managing academic records, attendance, assignments, and administrative tasks. This architecture ensures a streamlined experience across all user roles, promoting efficient school operations.

---

## Project Overview

<details>
<summary>[-]</summary>

The monorepo consists of the following projects:

1. **Web App**: A Next.js application for the main user interface.
2. **Storybook**: A Storybook setup for UI component documentation and testing.
3. **Shared Packages**:
   - **@repo/ui**: A component library built using `shadcn`.
   - **tailwind-config**: Shared Tailwind CSS configuration.
   - **eslint-config**: Shared ESLint configuration.
   - **typescript-config**: Shared TypeScript configuration.

</details>

---

## Code Architecture

<details>
<summary>[-]</summary>

The project uses a modular architecture where shared packages are extracted into standalone libraries, promoting reusability and consistency across applications.

- **Web App**: Contains the main Next.js application.
- **Storybook**: Hosts the Storybook instance for visualizing and testing UI components.
- **Packages**:
  - **@repo/ui**: Shared component library.
  - **tailwind-config**: Centralized Tailwind CSS configuration for consistent styling.
  - **eslint-config**: Shared ESLint rules.
  - **typescript-config**: Shared TypeScript configuration for type safety.

The monorepo structure is managed using Turborepo, allowing for efficient builds and dependency management.

</details>

---

## Folder Structure

<details>
<summary>[-]</summary>

```bash

kenia/
├── apps/
│   ├── web/
│   ├── storybook/
├── packages/
│   ├── ui/
│   ├── tailwind-config/
│   ├── eslint-config/
│   ├── typescript-config/
├── .turbo.json/
├── package.json
└── README.md

```

## Setup Instructions

<details>
<summary>[-]</summary>

To set up Kenia locally, follow these steps:

- Set environment variables in .env.dev file based on .env.example.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/LoganXav/KeniaClientMonorepo.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd KeniaClientMonorepo
   ```

3. **Install the dependencies**:

   ```bash
   yarn
   ```

4. **Start the application**:

   ```bash
   turbo dev
   ```
