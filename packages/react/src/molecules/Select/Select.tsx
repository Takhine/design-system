import React, { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps {
  label?: string;
  options?: SelectOption[];
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
}

// <Select label onOptionSelected options={[{ label: '', value: ''}]} />
const Select: React.FC<SelectProps> = ({
  label = "Please select option",
  options = [],
  onOptionSelected: handler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onLabelClick = () => setIsOpen(!isOpen);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(!isOpen);
    if (handler) {
      handler(option, optionIndex);
    }
  };
  return (
    <div>
      <button onClick={() => onLabelClick()}>{label}</button>
      {isOpen ? (
        <ul>
          {options.map((option, optionIndex) => {
            return (
              <li
                key={option.value}
                onClick={() => onOptionSelected(option, optionIndex)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

Select.displayName = "Select";

export default Select;
