# README for Contactify

[![Stack](https://skillicons.dev/icons?i=nextjs,ts,express,postgres)](https://skillicons.dev)

## Overview

**Contactify** is a contact management starter project designed to streamline the organization and sharing of contact information. This project utilizes a monorepo structure managed by Turborepo, which contains two applications: **API** and **Frontend**, along with a shared package for database management called **prisma-db**.

## What's inside?

This Turborepo includes the following packages and apps:

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Apps and Packages](#apps-and-packages)
- [Installation](#installation)
- [Utilities](#utilities)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with Contactify, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/contactify.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd contactify
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Project Structure

The project follows a monorepo structure organized as follows:

```
contactify/
├── apps/
│   ├── api/
│   └── frontend/
├── packages/
│   └── prisma-db/
└── package.json
```

- **apps/**: Contains the two applications (API and Frontend).
- **packages/**: Houses shared libraries and utilities, including the `prisma-db` package.

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `frontend`: a [Next.js](https://nextjs.org/) app
- `@repo/database`: a Shared [Prisma] module for both the apps
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Installation

### Step-by-Step Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/contactify.git
   ```

2. Change into the project directory:

   ```bash
   cd contactify
   ```

3. Install dependencies at the root level:
   ```bash
   npm install
   ```

## Configuration

### Setting Up Environment Variables

#### API Application

1. Navigate to the API application directory:

   ```bash
   cd apps/api
   ```

2. Rename the `.env.bak` file to `.env`:

   ```bash
   mv .env.bak .env
   ```

3. Open the `.env` file and fill in the required environment variables.

#### Frontend Application

1. Navigate to the Frontend application directory:

   ```bash
   cd ../frontend
   ```

2. Rename the `.env.bak` file to `.env`:

   ```bash
   mv .env.bak .env
   ```

3. Open the `.env` file and fill in the required environment variables.

## Usage

### Running Applications

To run both applications, navigate to the root directory of your project and execute:

```bash
npm run dev
```

This command will start both the API and Frontend applications concurrently, allowing you to develop and test your application seamlessly.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
