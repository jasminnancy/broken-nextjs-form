import React, { Dispatch, SetStateAction, useState } from "react";
import {
  PLATFORM_OPTIONS,
  FEATURES_OPTIONS,
  FORM_JSON,
  getFormJSONKeys,
} from "components/Form/static-data";
const FORM_KEYS = getFormJSONKeys();

// components
import ChipList, { ChipListTarget } from "components/ChipList";

interface createInputLabelProps {
  name: string;
  label: string;
  type: string;
  subtext?: string;
  required?: boolean;
  passedClasses?: string;
}

interface createInputProps {
  type: string;
  name: string;
  options?: typeof PLATFORM_OPTIONS | typeof FEATURES_OPTIONS;
  placeholder?: string;
  required?: boolean;
  default?: boolean;
  min?: number;
  max?: number;
  validation?:
    | ((
        input: string | string[],
        setAltButtonText?: Dispatch<SetStateAction<boolean>>
      ) => boolean)
    | undefined;
  validationMessage?: string;
  validationError?: string;
}

type ItemProps =
  | (createInputLabelProps & createInputProps)
  | typeof FORM_JSON[number];

interface InputItemProps {
  item: ItemProps;
  formContent: typeof FORM_KEYS;
  setFormContent: React.Dispatch<React.SetStateAction<typeof FORM_KEYS>>;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlternateButtonText: React.Dispatch<React.SetStateAction<boolean>>;
  passedClasses?: string;
  passedLabelClasses?: string;
  reversed?: boolean;
}

const InputItem: React.FC<InputItemProps> = ({
  item,
  formContent,
  setFormContent,
  setButtonDisabled,
  setShowAlternateButtonText,
  passedClasses,
  passedLabelClasses,
  reversed = false,
}) => {
  const [isValid, setIsValid] = useState<boolean | undefined>();

  const createInputItem = (item: createInputProps | ItemProps) => {
    const {
      type,
      name,
      options,
      placeholder = "",
      required = true,
      validation,
      validationError,
      min,
      max,
    } = item;
    const handleFormChange = ({
      target,
    }: React.SyntheticEvent | ChipListTarget) => {
      let formValue: string | string[] = "";
      let id: string;

      const isChipListTarget = (
        target: EventTarget | ChipListTarget["target"]
      ): target is ChipListTarget["target"] => {
        return (target as ChipListTarget["target"]).isChip !== undefined;
      };

      if (isChipListTarget(target)) {
        id = target.id;
        const existingItemArray: string[] = Array.from(formContent[id]);

        if (existingItemArray.length < 3) {
          formValue = !existingItemArray.includes(target.value)
            ? [target.value, ...existingItemArray]
            : existingItemArray.filter((i: string) => i !== target.value);
        } else if (existingItemArray.includes(target.value)) {
          formValue = existingItemArray.filter(
            (i: string) => i !== target.value
          );
        } else {
          formValue = formContent[id];
        }
      } else {
        const { value, id: eventTargetId } = target as HTMLInputElement;
        if (type === "integer") {
          formValue = value.split(/ /)[0].replace(/[^\d]/g, "");
        } else {
          formValue = value;
        }
        id = eventTargetId;
      }

      let validityStatus;
      if (validation) {
        validityStatus = validation(formValue, setShowAlternateButtonText);
        setIsValid(validityStatus);
      }

      const missingRequiredItems = !!FORM_JSON.filter((item) => {
        if (item.required) {
          return item.name !== id
            ? !formContent[item.name].length
            : !formValue.length;
        }
      }).length;

      const isButtonDisabled = missingRequiredItems || validityStatus === false;
      setButtonDisabled(isButtonDisabled);

      setFormContent({
        ...formContent,
        [id]: formValue,
      });
    };

    if (type === "enumeration") {
      const isMultiple = Boolean(min && max);
      if (isMultiple) {
        return (
          <ChipList
            {...item}
            chips={options}
            chipType={name}
            handleChipClick={handleFormChange}
            selectedItems={formContent[name]}
          />
        );
      }

      const selectValue = formContent[name as keyof typeof FORM_KEYS];

      return (
        <select
          className={`w-full rounded text-base mt-2 ${
            selectValue === "" ? "text-gray-400" : ""
          }`}
          onChange={handleFormChange}
          id={name}
          name={name}
          value={selectValue || ""}
          required={required}
          multiple={Boolean(min && max)}
        >
          {options?.map(({ hidden, value, label, disabled = false }) => {
            if (hidden) {
              return null;
            }

            return (
              <option
                key={`platform-options-${value}`}
                value={value}
                disabled={disabled}
              >
                {label}
              </option>
            );
          })}
        </select>
      );
    }

    const showValidationErrorMessage =
      validationError &&
      isValid === false &&
      formContent[name as keyof typeof FORM_KEYS] !== "";

    return (
      <>
        <input
          className={`border-[rgba(231,_231,_237,_1)] ${
            type === "boolean"
              ? "rounded-sm cursor-pointer"
              : "w-full rounded text-base mt-2"
          }`}
          id={name}
          onChange={handleFormChange}
          type={type === "boolean" ? "checkbox" : "text"}
          placeholder={placeholder}
          required={required}
          value={formContent[name as keyof typeof FORM_KEYS] || ""}
        />
        {showValidationErrorMessage && (
          <div className="text-sm font-medium mt-2 text-[#9CA3AF]">
            {validationError}
          </div>
        )}
      </>
    );
  };

  const createInputLabel = ({
    name,
    label,
    type,
    subtext,
    required = true,
    passedClasses = "",
  }: createInputLabelProps) => (
    <label
      className={`font-medium ${
        type === "boolean" ? "cursor-pointer" : ""
      } ${passedClasses}`}
      htmlFor={name}
    >
      {label}
      {required && " "}
      {required && <span className="text-red-400">*</span>}
      {subtext && <br />}
      {subtext && <span className="text-gray-500 text-sm">{subtext}</span>}
    </label>
  );

  return (
    <div
      className={`font-sans flex-auto w-full mb-4 ${passedClasses || ""} ${
        item.type === "boolean" ? "cursor-pointer" : ""
      }`}
    >
      {!reversed &&
        createInputLabel({ ...item, passedClasses: passedLabelClasses })}
      {createInputItem(item)}
      {reversed &&
        createInputLabel({ ...item, passedClasses: passedLabelClasses })}
    </div>
  );
};

export default InputItem;
