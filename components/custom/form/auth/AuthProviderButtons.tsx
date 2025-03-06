import { FaApple, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { FaMicrosoft } from "react-icons/fa";

export default function AuthProviderButtons({ variant, size }: any) {
  const authProviders = [
    { name: "Apple", icon: FaApple, provider: "apple", active: false },
    { name: "GitHub", icon: FaGithub, provider: "github", active: true },
    { name: "Google", icon: FcGoogle, provider: "google", active: true },
    { name: "Microsoft", icon: FaMicrosoft, provider: "microsoft", active: false },
  ];

  return (
    <div className="flex gap-2 w-full">
      {authProviders
        .filter((authProvider) => authProvider.active) // Filter out inactive providers
        .map((authProvider) => (
          <div key={authProvider.name} className="w-full">
            <Button
              className="w-full" // Ensure button takes full width
              variant={variant}
              size={size}
              onClick={async () => {
                "use server";
                await signIn(authProvider.provider, { redirectTo: "/dashboard" });
              }}
            >
              <authProvider.icon />
            </Button>
          </div>
        ))}
    </div>
  );
}
