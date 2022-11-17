import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Text from "../../atoms/Text";

const KEY_CODES = {
  ENTER: "Enter",
  SPACE: " ",
  DOWN_ARROW: "ArrowDown",
  UP_ARROW: "ArrowUp",
  ESC: 'Escape'
};

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

const getPreviousOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if(currentIndex === null) {
    return 0;
  }

  // First item in the list
  if(currentIndex === 0) {
    return options.length-1;
  }

  return currentIndex - 1;
}

const getNextOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if(currentIndex === null) {
    return 0;
  }

  // Last item in the list
  if(currentIndex === options.length-1) {
    return 0;
  }

  return currentIndex + 1;
}

const Select: React.FC<SelectProps> = ({
  label = "Please select option",
  options = [],
  onOptionSelected: handler,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const labelRef = useRef<HTMLButtonElement>(null);

  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);

  const [overlayTopValue, setOverlayTop] = useState<number>(0);

  const onLabelClick = () => setIsOpen(!isOpen);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex);
    }
    setIsOpen(false);
    setSelectedIndex(optionIndex);
  };

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();
    console.log(event.key);

    if (
      [KEY_CODES.DOWN_ARROW, KEY_CODES.SPACE, KEY_CODES.ENTER].includes(
        event.key
      )
    ) {
      setIsOpen(true);

      // set focus on the list item
      highlightOption(0);
    }
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if(highlightedIndex !==null && isOpen) {
      const ref = optionRefs[highlightedIndex];
      if(ref && ref.current){ 
        ref.current.focus();
      }
    }
  },[isOpen, highlightedIndex])

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    // Close if ESC
    if(event.key === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    // Next item if ArrowDown
    if(event.key === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options))
    }
    if(event.key === KEY_CODES.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options))
    }

    if(event.key === KEY_CODES.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!)
    }
    
  }

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }
  return (
    <div className="dse-select">
      <button
        aria-aria-haspopup={true}
        aria-controls="dse-select-list"
        aria-expanded={isOpen ? true : undefined}
        ref={labelRef}
        className="dse-select__label"
        onClick={() => onLabelClick()}
        onKeyDown={onButtonKeyDown}
      >
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
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
        <ul
          role="menu"
          id="dse-select-list"
          style={{ top: overlayTopValue }}
          className="dse-select__overlay"
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;

            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps = {
              ref,
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: "menuitemradio",
                  "aria-label": option.label,
                  "aria-checked": isSelected ? true : undefined,
                  onKeyDown: onOptionKeyDown,
                  tabIndex: isHighlighted ? -1 : 0,
                  onMouseEnter: () => highlightOption(optionIndex),
                  onMouseLeave: () => highlightOption(null),
                  className: `dse-select__option
                      ${isSelected ? "dse-select__option--selected" : ""}
                      ${isHighlighted ? "dse-select__option--highlighted" : ""}
                  `,
                  key: option.value,
                  onClick: () => onOptionSelected(option, optionIndex),
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }
            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>

                {isSelected ? (
                  <svg
                    width="1rem"
                    height="1rem"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
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
