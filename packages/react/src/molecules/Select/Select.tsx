import React, { useEffect, useRef, useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

export interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}
interface SelectProps {
  label?: string;
  options?: SelectOption[];
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

// <Select label onOptionSelected options={[{ label: '', value: ''}]} />
const Select: React.FC<SelectProps> = ({
  label = "Please select option",
  options = [],
  onOptionSelected: handler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const labelRef = useRef<HTMLButtonElement>(null)
  const [overlayTopValue, setOverlayTop] = useState<number>(0);


  const onLabelClick = () => setIsOpen(!isOpen);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(!isOpen);
    if (handler) {
      handler(option, optionIndex);
    }
  };

  useEffect(() => {

    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)

  },[labelRef.current?.offsetHeight])
  return (
    <div className="dse-select">
      <button ref={labelRef} className="dse-select__label" onClick={() => onLabelClick()}>
        <span>{label}</span>
        <svg
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
          width="1rem"
          height="1rem"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen ? (
        <ul style={{top: overlayTopValue}} className="dse-select__overlay">
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
