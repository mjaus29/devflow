import { Control, FieldPath } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldWrapperProps<T extends Record<string, any>> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  isTextarea?: boolean;
  rows?: number;
}

const FormFieldWrapper = <T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  required = false,
  type = "text",
  isTextarea = false,
  rows = 3,
}: FormFieldWrapperProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3.5">
          <FormLabel className="paragraph-semibold text-dark400_light800">
            {label} {required && <span className="text-primary-500">*</span>}
          </FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                rows={rows}
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                type={type}
                className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
