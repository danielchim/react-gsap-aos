interface CheckboxFieldsetProps {
  label: string;
  checked: boolean;
  onChangeValue: (value: boolean) => void;
}

export default function CheckboxFieldset({
  label,
  checked,
  onChangeValue,
}: CheckboxFieldsetProps) {
  return (
    <fieldset className="fieldset">
      <label className="label h-10">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={(event) => {
            onChangeValue(event.currentTarget.checked);
          }}
        />
        {label}
      </label>
    </fieldset>
  );
}
