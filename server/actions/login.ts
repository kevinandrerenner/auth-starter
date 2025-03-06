"use server";

import { SignInSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/prisma/prisma";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs"; // ✅ Needed for password comparison
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof SignInSchema>) => {
  // ✅ Use safeParse() to prevent exceptions
  const validatedData = SignInSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid Credentials" };
  }

  const { email, password } = validatedData.data;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  // ✅ Correct user existence check
  if (!user || !user.password) {
    return { error: "Email not found" };
  }

  // ✅ Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch)
  if (!passwordMatch) {
    return { error: "Invalid Credentials" };
  }

  try {
    await signIn("credentials", {
      email: user.email,
      password, // ✅ Send plain password (NextAuth will handle verification)
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };

        default:
          return { error: "Please confirm your email address" };
      }
    }
    throw error;
  }

  return { success: "User signed in successfully" };
};
