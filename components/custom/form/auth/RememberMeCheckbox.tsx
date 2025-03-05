import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

export function RememberMeCheckbox({ field }: any) {
  return (
    <FormItem>
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="h-4 w-4"
            />
          </FormControl>
          <FormLabel className="text-sm font-medium leading-none">
            Remember Me
          </FormLabel>
        </div>
        <Link href="/reset-password">
          <span className="text-sm text-gradientLink hover:underline">
            Forgot password?
          </span>
        </Link>
      </div>
    </FormItem>
  );
}