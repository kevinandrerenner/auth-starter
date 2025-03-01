# **Next.js, Docker, Prisma, and Auth.js Starter Kit**

This repository provides a complete **Next.js Starter Kit** with **Docker, Prisma, Auth.js, ESLint, Prettier, and Storybook** preconfigured. Follow the steps below to set up and run the project.

---

## **📌 1. Setup Instructions**

### **1️⃣ Clone the Repository**
```bash
git clone <repo-url>
cd <project-folder>
```

### **2️⃣ Install Dependencies**
```bash
pnpm install
```

### **3️⃣ Configure Environment Variables**
1. Copy the example `.env` file:
```bash
cp .env.example .env
```
2. Generate an **Auth Secret**:
```bash
pnpx auth secret >> .env && echo 'AUTH_SECRET='$(tail -n 1 .env) >> .env
```
3. Fill in the `.env` file with required credentials (e.g., database connection, OAuth keys).

### **4️⃣ Start Docker for PostgreSQL**
```bash
docker-compose up -d
```

### **5️⃣ Apply Prisma Migrations & Seed Database**
```bash
pnpx prisma migrate dev && pnpx prisma db seed
```

### **6️⃣ Start Development Server**
```bash
pnpm dev
```

### **7️⃣ (Optional) Run Storybook**
```bash
pnpm storybook
```

---

## **📌 2. Additional Information**

- For a complete **setup guide**, including **manual installation**, refer to the detailed documentation:
  [Setup Guide](./SETUP_GUIDE.md)
- Need help? Refer to the official documentation:
    - [Next.js Docs](https://nextjs.org/docs)
    - [Prisma Docs](https://www.prisma.io/docs)
    - [Auth.js Docs](https://authjs.dev/)
    - [Docker Docs](https://docs.docker.com/)
    - [Storybook Docs](https://storybook.js.org/docs/react/get-started/introduction)

---

## **📌 3. Contributing**
Feel free to contribute and improve this starter kit! 🚀

1. Fork the repo.
2. Create a new feature branch:
```bash
git checkout -b feature-branch
```
3. Make changes and commit:
```bash
git commit -m "Added new feature"
```
4. Push changes:
```bash
git push origin feature-branch
```
5. Create a **Pull Request**.

---

## **📌 4. License**
This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

