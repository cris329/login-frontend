// Dibuja los campos definidos en config. Los que comparten pair van en dos columnas.
function Field({ field, value, onChange, prefix }) {
  const id = prefix + "-" + field.name
  return (
    <div>
      <label htmlFor={id}>
        {field.label} {field.optional ? <span>opcional</span> : null}
      </label>
      <input
        id={id}
        name={field.name}
        type={field.type || "text"}
        inputMode={field.inputMode}
        autoComplete={field.autoComplete}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  )
}

export default function Fields({ fields, values, onChange, prefix }) {
  const blocks = []
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i]
    const next = fields[i + 1]
    if (field.pair && next && next.pair === field.pair) {
      blocks.push(
        <div className="pair" key={field.pair}>
          <Field field={field} value={values[field.name]} onChange={onChange} prefix={prefix} />
          <Field field={next} value={values[next.name]} onChange={onChange} prefix={prefix} />
        </div>,
      )
      i += 1
    } else {
      blocks.push(
        <Field key={field.name} field={field} value={values[field.name]} onChange={onChange} prefix={prefix} />,
      )
    }
  }
  return blocks
}
