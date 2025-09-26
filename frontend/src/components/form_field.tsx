// A reusable component for form fields
type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  required?: boolean;
  children?: React.ReactNode;
};

export default function FormField({ label, name, type = "text", value, onChange, required, children }: FormFieldProps) {
  const commonProps = {
    name,
    id: name, // Important for accessibility
    value,
    onChange,
    required,
    className: "mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={4} />
      ) : type === "select" ? (
        <select {...commonProps}>{children}</select>
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
}