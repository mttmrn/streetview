import { useState } from "react";
import { Field } from "react-final-form";
import { cn } from "../Util/classNameHelper";

const TextInput = function ({
  name,
  label,
  labelCmp = null,
  filter = null,
  children,
  type = "text",
  autocomplete = null,
  placeholder = null,
}) {
  const filterFn = filter ? filter : (x) => (x ? x : "");
  const [focus, setFocus] = useState(false);

  return (
    <Field
      name={name}
      format={filterFn}
      parse={filterFn}
      render={function ({ input, meta }) {
        const error = meta.touched && meta.error;

        return (
          <div
            className={cn("form-item", [
              [error, "error"],
              [focus, "focus"],
            ])}
          >
            <label>
              {labelCmp ? (
                labelCmp
              ) : label ? (
                <span className="label">{label}</span>
              ) : null}
              <input
                placeholder={placeholder}
                autoComplete={autocomplete}
                type={type}
                {...input}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              {children}
            </label>
            {error && <div className="validation-msg">{meta.error}</div>}
          </div>
        );
      }}
    />
  );
};

export default TextInput;
