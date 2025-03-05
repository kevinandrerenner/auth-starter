import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignUpForm } from "@/app/auth/sign-up/SignUpForm";
import { Divider } from "@/components/custom/form/auth/Divider";
import AuthProviderButtons from "@/components/custom/form/auth/AuthProviderButtons";
import AcceptTermsPrivacy from "@/components/custom/form/auth/AcceptTermsPrivacy";

export default function SignUpPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen min-w-90">
      {/* Card Wrapper - Centered */}
      <div className="w-full max-w-sm m-5 ">
        <Card className="w-sm gap-y-5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          {/* Sign Up Form */}
          <CardContent className="space-y-5">
            <SignUpForm />

            {/* Divider */}
            <Divider />

            <AuthProviderButtons variant={"outline"} />
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-center space-x-2">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?
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

      {/* Accept Terms & Privacy - Positioned at the bottom */}
      <div>
        <AcceptTermsPrivacy />
      </div>
    </div>
  );
}
