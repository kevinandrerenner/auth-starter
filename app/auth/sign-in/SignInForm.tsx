"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SignInSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/server/actions/login";

export function SignInForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await login(data);

      if (response?.error) {
        setError(response.error);
      } else if (response?.success) {
        setSuccess(response.success);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              
                <div className={"flex justify-between"}>
              <FormLabel>
                  Password
              </FormLabel>
                <Link href={"/auth/forgot-password"} className={"text-sm underline text-muted-foreground hover:text-foreground"}>
                  Forgot password?
                </Link>
                </div>
              <div className="relative">
                <Input
                  className="pr-10"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:cursor-pointer hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}
