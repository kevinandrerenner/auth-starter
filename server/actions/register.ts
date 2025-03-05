"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/schemas";
import { prisma } from "@/prisma/prisma";

export const register = async (data: z.infer<typeof SignUpSchema>) => {
  try {
    const validatedData = SignUpSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data." };
    }

    const { name, email, password } = validatedData;

    const hashedPassword = await bcrypt.hash(password, 12);

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return { error: "User already exists" };
    }

    const lowerCaseEmail = email.toLowerCase();

    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        password: hashedPassword,
        name,
      },
    });

    return { success: "User created successfully." };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred." };
  }
};
