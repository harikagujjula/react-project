export default function UFInput({label, id, error, ...props}) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      {/* Type, name, onChange, value and other extra props show up using props. */}
      <input id={id}
      />
      {/* Validating input on every key stroke. */}
      {error &&
        <div className="control-error">{error}</div>
      }
    </div>
  );
}
