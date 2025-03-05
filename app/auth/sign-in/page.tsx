import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Divider } from "@/components/custom/form/auth/Divider";
import AuthProviderButtons from "@/components/custom/form/auth/AuthProviderButtons";
import { SignInForm } from "@/app/auth/sign-in/SignInForm";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="w-full max-w-sm mx-auto">
        <Card className="w-full shadow-lg min-w-sm gap-y-5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center ">
              Sign in to continue
            </CardTitle>
            <CardDescription className="text-center">
              Sign in in to get access to your account
            </CardDescription>
          </CardHeader>
          {/* OAuth Login */}
          <CardContent className="space-y-5">
            {/* Sign Up Form */}
            <SignInForm />
            {/* Divider */}
            <Divider />
            <AuthProviderButtons variant={"outline"} className="" />
          </CardContent>
          <CardFooter className="flex justify-center space-x-2">
            {/* Signup Redirect */}
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?
              <Link
                href="./sign-up"
                className="ml-1 text-muted-foreground underline hover:text-foreground"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
