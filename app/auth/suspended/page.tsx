import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuspendedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-sm gap-y-5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Account Suspended
          </CardTitle>
          <CardDescription className="text-sm font-light">
            Your account has been suspended. Please contact support.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
