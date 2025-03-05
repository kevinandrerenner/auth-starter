import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/app/auth/forgot-password/ForgotPasswoordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="w-full mx-auto">
        <Card className="shadow-lg w-sm gap-y-5 ">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center ">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          {/* OAuth Login */}
          <CardContent className="space-y-6">
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter className="flex justify-center space-x-2">
            {/* Signup Redirect */}
            <div className="text-center text-sm text-muted-foreground">
              Remember account?
              <Link
                href="./sign-in"
                className="ml-1 text-muted-foreground underline hover:text-foreground"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
