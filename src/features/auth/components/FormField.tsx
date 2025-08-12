import { Label } from "@/components/ui/label";
import { ErrorMessage, Field } from "formik";
import type { IconType } from "react-icons/lib";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  Icon?: IconType;
}

export default function FormField({
  id,
  label,
  name,
  type,
  placeholder,
  Icon,
}: FormFieldProps) {
  return (
    <div className="w-full">
      <Label className="text-dark-text" htmlFor={id}>
        {label}
      </Label>
      <div className="relative flex items-center mt-2">
        {Icon && <Icon className="absolute text-gray-300 size-5 left-5" />}
        <Field
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          className="w-full pl-12 h-11 focus:ring-2 focus:ring-brand-primary outline-none text-white bg-white/20 border border-white/30 rounded"
        />
      </div>
      <ErrorMessage
        name={name}
        component="span"
        className="text-sm text-error"
      />
    </div>
  );
}
