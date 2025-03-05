import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function TextInput({ field, placeholder, type, label }: any) {
  return (
    <FormItem>
      <FormControl>
        <Input placeholder={placeholder} {...field} type={type}  />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}