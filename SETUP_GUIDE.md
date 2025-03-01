# Next.js, Docker, Prisma, and Auth.js Setup Guide

## 1. Introduction

This guide provides a **detailed** step-by-step setup for a **Next.js** application with **Docker**, **Prisma**, **ESLint**, **Prettier**, **Storybook**, and **OAuth authentication (Google & GitHub)**, incorporating key insights from the official documentation of each framework.

---

## **2. Tech Stack Overview**

- **Next.js**: A React-based framework that provides **server-side rendering (SSR)**, **API routes**, and optimized front-end performance.
- **Docker**: A containerization platform that allows running PostgreSQL as an isolated database instance.
- **Prisma**: A modern **ORM (Object-Relational Mapper)** for interacting with the database.
- **Auth.js (formerly NextAuth.js)**: A complete authentication solution that integrates with multiple OAuth providers.
- **ESLint**: A tool for identifying and fixing code issues in JavaScript/TypeScript.
- **Prettier**: A code formatter that ensures consistent code style.
- **Storybook**: A UI development environment for building, testing, and documenting components in isolation.

### 2.1 Tech Stack Description

| Technology | Description | Link |
| --- | --- | --- |
| **Next.js** | Server-Side Rendering, API routes, Performance optimization | [Next.js Docs](https://nextjs.org/docs) |
| **Docker** | Containerized PostgreSQL database | [Docker Docs](https://docs.docker.com/) |
| **Prisma** | ORM for relational databases | [Prisma Docs](https://www.prisma.io/docs) |
| **Auth.js** | OAuth & JWT authentication | [Auth.js Docs](https://authjs.dev/) |
| **ESLint** | Code linting and quality analysis | [ESLint Docs](https://eslint.org/docs/latest/) |
| **Prettier** | Automated code formatting | [Prettier Docs](https://prettier.io/docs/en/) |
| **Storybook** | UI development and documentation | [Storybook Docs](https://storybook.js.org/docs/react/get-started/introduction) |

---

## **3. Setting Up a Next.js Project**

To create a **Next.js** project, run:

```bash
pnpx create-next-app@latest . -d
```

This command will:

- Create a new Next.js project in the current directory.
- Set up a default project structure (`pages`, `app`, `public`, etc.).
- Install dependencies required for Next.js.
- Enable TypeScript support (if prompted).

For more details, refer to the [Next.js documentation](https://nextjs.org/docs/getting-started).

---

## **4. Setting Up PostgreSQL with Docker**

Instead of installing PostgreSQL manually, we will use Docker to run it as a containerized service.

### **4.1 Creating `docker-compose.yml`**

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: my_postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - ./data/pg_data:/var/lib/postgresql/data

volumes:
  pg_data:

```

### **4.2 Running the PostgreSQL Container**

```bash
docker-compose up -d
```

This command will:

- Pull the latest PostgreSQL Docker image.
- Start the container in detached mode (`d`).
- Expose the database on port **5432**.
- Persist data using Docker volumes (`./data/pg_data`).

To verify that PostgreSQL is running, use:

```bash
docker ps
```

For more details, visit the [Docker documentation](https://docs.docker.com/compose/).

---

## **5. Configuring Prisma**

### **5.1 Installing Prisma**

```bash
pnpm add prisma --save-dev
```

### **5.2 Setting Up Database Connection**

Modify your **`.env`** file to include:

```dotenv
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"
```

This **connection string** follows PostgreSQL’s URI format:
`postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>`

### **5.3 Defining Prisma Schema**

The **`prisma/schema.prisma`** file defines how Prisma maps database tables.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id                 String  @id @default(cuid())
  userId             String  @map("user_id")
  type               String
  provider           String
  providerAccountId  String  @map("provider_account_id")
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map("email_verified")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  image         String?
  accounts      Account[]
  sessions      Session[]
  role          Role @default(user)

  @@map("users")
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

enum Role {
  admin
  user
  guest
}
```

### **5.4 Applying Prisma Migrations**

Run the following command to apply migrations:

```bash
pnpx prisma migrate dev --name init
```

This command:

- Generates a new migration script.
- Applies the migration to the PostgreSQL database.
- Keeps track of schema changes over time.

For full documentation, see the [Prisma Migrate guide](https://www.prisma.io/docs/concepts/components/prisma-migrate).

---

Now, the guide includes your **new database schema** along with the existing documentation references! 🚀

## **6. Setting Up Auth.js**

### **6.1 Installing Auth.js and Prisma Adapter**

```bash
pnpm add @auth/prisma-adapter
pnpm add next-auth@beta
```

### **6.2 Creating `auth.ts`**

```tsx
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})
```

### **6.3 Defining Authentication Providers (`auth.config.ts`)**

```tsx
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default { 
    providers: [
        GitHub({

        }),
        Google({
            
        }),
        Credentials({

        })
    ] 
} satisfies NextAuthConfig
```

- The **GitHub** and **Google** providers allow users to log in using their respective accounts.
- More providers can be added from the [Auth.js provider list](https://authjs.dev/reference/core/providers/).

### **6.4 Setting Up API Routes (`app/api/auth/[...nextauth]/route.ts`)**

```tsx
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

This enables the built-in Auth.js API endpoints, such as:

- `GET /api/auth/signin`
- `GET /api/auth/signout`
- `GET /api/auth/session`

For more details, see [Auth.js API documentation](https://authjs.dev/reference/core/providers/).

### **6.5 Adding Middleware for Authentication (`middleware.ts`)**

```tsx
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // Custom middleware logic here
})
```

This middleware:

- Ensures authenticated users can access protected routes.
- Can be extended to restrict access based on roles (e.g., admin-only pages).

---

## **7. Setting Up ESLint and Prettier**

To ensure a clean and consistent code style, we configure **ESLint** and **Prettier** to work together.

### **7.1 Installing Prettier**

```bash
pnpm add --save-dev --save-exact prettier
```

This installs **Prettier** as a dev dependency with an exact version.

### **7.2 Configuring ESLint (`eslint.config.mjs`)**

```tsx
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "indent": ["error", 4],
      "prettier/prettier": ["error", { "tabWidth": 4 }],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
    },
  }),
];

export default eslintConfig;
```

### **7.3 Configuring Prettier (`.prettierrc` or `package.json`)**

You can define Prettier settings in a separate `.prettierrc` file or inside `package.json`.

### **Option 1: `.prettierrc` file**

```json
{
  "tabWidth": 4
}
```

### **Option 2: Inside `package.json`**

```json
{
  "prettier": {
    "tabWidth": 4
  }
}
```

This ensures that all indentation uses **4 spaces**.

---

## **8. Setting Up Storybook**

Storybook is a tool for developing UI components in isolation.

### **8.1 Installing Storybook**

```bash
pnpm dlx storybook@latest init
```

This command:

- Installs Storybook dependencies.
- Detects **Next.js** and configures it automatically.
- Creates a `.storybook/` directory for configuration.

### **8.2 Configuring Storybook for Tailwind (Optional)**

If you use **TailwindCSS**, update `.storybook/preview.ts`:

```tsx
import type { Preview } from "@storybook/react";

const preview: Preview = {
    parameters: {
        layout: "centered",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
```

### **8.3 Running Storybook**

```bash
pnpm storybook
```

This starts Storybook at **`http://localhost:6006`**.

### **8.4 Creating a Story for a Component**

**`components/Button.tsx`**

```tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

**`components/Button.stories.tsx`**

```tsx
import React from "react";
import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    label: "Click Me",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
```

### **8.5 Building Storybook Static Site**

To generate a **static Storybook site**, run:

```bash
pnpm build-storybook
```

This creates a `storybook-static/` folder, which can be deployed.

---

## **9. Configuring WebStorm for Prettier**

To integrate Prettier with WebStorm manually:

1. **Open WebStorm Settings** (`Command + ,` on macOS / `Ctrl + Alt + S` on Windows/Linux).
2. Navigate to **Languages & Frameworks > JavaScript > Prettier**.
3. Under **Prettier Package**, select `node_modules/prettier` from your project.
4. **Enable**: `"On save" (Run Prettier automatically on file save)`.
5. Apply and save the changes.

For manual formatting, use:

- `Command + Option + L` (Mac)
- `Ctrl + Alt + L` (Windows/Linux)

For additional Prettier configuration options, refer to the [Prettier Docs](https://prettier.io/docs/en/options.html).

---

## **10. Setting Up OAuth Authentication with Google & GitHub**

OAuth allows users to log in using their Google or GitHub accounts.

### **10.1 Setting Up Google OAuth**

### **Step 1: Create Google OAuth Credentials**

1. **Go to** [Google Cloud Console](https://console.cloud.google.com/).
2. **Create a new project** (or select an existing one).
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth Client ID**.
5. Set **Application Type** to `Web application`.
6. Under **Authorized redirect URIs**, add:

    ```html
    http://localhost:3000/api/auth/callback/google
    ```

7. Click **Create**, then copy the **Client ID** and **Client Secret**.

### **Step 2: Add Credentials to `.env` File**

```dotenv
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

### **10.2 Setting Up GitHub OAuth**

### **Step 1: Create GitHub OAuth Credentials**

1. **Go to** [GitHub Developer Settings](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in the following fields:
    - **Application Name**: Your App Name
    - **Homepage URL**: `http://localhost:3000`
    - **Authorization callback URL**:

        ```html
        http://localhost:3000/api/auth/callback/github
        ```

4. Click **Register application**, then copy the **Client ID** and **Client Secret**.

### **Step 2: Add Credentials to `.env` File**

```dotenv
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

### **10.3 Configuring OAuth in `auth.config.ts`**

**`auth.config.ts`**

```tsx
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            // Configure username/password authentication if needed
        })
    ]
} satisfies NextAuthConfig;
```

### **10.4 Restart Your Next.js App to Apply Changes**

After adding OAuth credentials, restart your development server:

```bash
pnpm dev
```

Now, users should be able to sign in using **Google or GitHub OAuth**.

For more details, refer to the [**Auth.js OAuth documentation**](https://authjs.dev/reference/core/providers/).

---

## **11 Conclusion**

This guide covered:

- ✅ Setting up **Next.js**
- ✅ Running **PostgreSQL in Docker**
- ✅ Configuring **Prisma**
- ✅ Integrating **Auth.js**
- ✅ Adding **Google & GitHub OAuth authentication**
- ✅ Adding **role-based authentication**
- ✅ Setting up **ESLint and Prettier**
- ✅ Ensuring automatic code formatting with **WebStorm and Prettier**
- ✅ Fixing common ESLint issues and enforcing best practices
- ✅ Installing and using **Storybook** for UI component development
- ✅ Generating a static Storybook site for documentation

By following this guide, you now have a fully configured **Next.js application** with a robust **database setup, authentication system, UI component documentation, and code linting/formatting**. 🚀

---

## **12. Running the Application**

Start the development server with:

```bash
pnpm dev
```

### **Verify Everything Works:**

- ✅ Open `http://localhost:3000`
- ✅ Test user authentication
- ✅ Use `pnpx prisma studio` to explore the database
- ✅ Use `pnpm storybook` to explore the Components