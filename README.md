# Kenia Client Monorepo

A modern, scalable frontend monorepo for the Kenia School Management System built with Turborepo, Next.js, and TypeScript.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [Applications](#applications)
5. [Packages](#packages)
6. [Getting Started](#getting-started)
7. [Development Workflow](#development-workflow)
8. [Architecture Decisions](#architecture-decisions)
9. [Contributing](#contributing)

## Introduction

This monorepo contains the frontend components of the Kenia School Management System. It uses Turborepo for efficient management of multiple packages and applications, providing a streamlined development experience across all components.

## Technology Stack

- **Build Tool**: Turborepo
- **Package Manager**: Yarn
- **Core Language**: TypeScript
- **Main Framework**: Next.js
- **UI Components**: React
- **Styling**: Tailwind CSS + shadcn/ui
- **Documentation**: Storybook
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library

## Applications

### 1. Web App (`apps/web`)

The main Next.js application serving the Kenia School Management System.

#### Features

- Server-side rendering
- API route handling
- Authentication flows
- Role-based access control
- Responsive design
- Progressive Web App capabilities

#### Key Directories

```bash
apps/web/
├── app/             # Next.js app directory
├── components/      # React components
├── lib/            # Utility functions
├── styles/         # Global styles
└── types/          # TypeScript definitions
```

### 2. Storybook (`apps/storybook`)

Component documentation and testing environment.

#### Features

- Component playground
- Documentation
- Visual testing
- Interaction testing
- Accessibility checks

#### Key Directories

```bash
apps/storybook/
├── .storybook/     # Storybook configuration
├── src/
│   ├── stories/    # Component stories
│   └── hooks/      # Custom hooks
└── public/         # Static assets
```

## Packages

### 1. UI Library (`packages/ui`)

Shared component library built with shadcn/ui.

#### Features

- Atomic design structure
- Theme customization
- Accessibility-first components
- TypeScript support
- Storybook documentation

### 2. Configuration Packages

#### Tailwind Config (`packages/tailwind-config`)

- Shared Tailwind configuration
- Custom theme settings
- Utility classes

#### ESLint Config (`packages/eslint-config`)

- Shared ESLint rules
- TypeScript support
- React best practices

#### TypeScript Config (`packages/typescript-config`)

- Base TypeScript configuration
- Path aliases
- Strict type checking

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn >= 1.22
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LoganXav/KeniaClientMonorepo.git
cd KeniaClientMonorepo
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cd apps/web
cp .env.example .env.local
```

4. Start development servers:

```bash
yarn dev
```

This will start:

- Web app on http://localhost:3000
- Storybook on http://localhost:6006

## Development Workflow

### Commands

```bash
# Start all applications
yarn dev

# Build all applications
yarn build

# Run tests
yarn test

# Lint code
yarn lint

# Format code
yarn format

# Clean build artifacts
yarn clean
```

## Architecture Decisions

### Monorepo Structure

```bash
kenia/
├── apps/
│   ├── web/           # Next.js application
│   └── storybook/     # Component documentation
├── packages/
│   ├── ui/            # Shared components
│   ├── tailwind-config/
│   ├── eslint-config/
│   └── typescript-config/
├── .turbo/
└── package.json
```

### Code Organization

- **Atomic Design**: Components are organized following atomic design principles
- **Feature-First**: Business logic is organized by feature
- **Shared Utils**: Common utilities are extracted into shared packages
- **Type Safety**: Strict TypeScript configuration across all packages

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

### Code Style

- Follow the ESLint configuration
- Write meaningful commit messages
- Include tests for new features
- Document components in Storybook
