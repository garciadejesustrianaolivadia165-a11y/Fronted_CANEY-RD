type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-400 ${
          error ? "ring-2 ring-error-400" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
    </div>
  );
}
