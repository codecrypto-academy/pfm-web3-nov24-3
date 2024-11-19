interface InputFormProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
}

export const InputForm = ({
  label,
  name,
  placeholder,
  type,
}: InputFormProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
};
