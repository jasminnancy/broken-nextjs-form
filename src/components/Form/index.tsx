import React, { useState, useEffect, useRef } from "react";
import {
  HIDDEN_FORM_ITEMS,
  FORM_JSON,
  getFormJSONKeys,
  FORM_INFO,
} from "./static-data";

// components
import Link from "next/link";
import Button from "components/Button";
import InputItem from "components/InputItem";

// types
const FORM_KEYS = getFormJSONKeys();

type formattedFormObject = {
  fields: {
    objectTypeId: string;
    name: string;
    value: string | string[] | number;
  }[];
  pageName: string;
};

const Form: React.FC<{ formId: string }> = ({ formId }) => {
  const [formContent, setFormContent] = useState<typeof FORM_KEYS>(FORM_KEYS);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [showAlternateButtonText, setShowAlternateButtonText] =
    useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const handleHiddenFieldChange = ({ name, value }: HTMLInputElement) => {
      setFormContent({
        ...formContent,
        [name]: value,
      });
    };

    const targets = inputRefs.current;
    if (targets) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList" || mutation.type === "attributes") {
            const hiddenInput = mutation.target as HTMLInputElement;
            handleHiddenFieldChange(hiddenInput);
          }
        }
      });

      HIDDEN_FORM_ITEMS.forEach(({ name }) => {
        const item = targets[name];
        if (item) {
          observer.observe(item, {
            childList: true,
            attributes: true,
          });
        }
      });

      return () => {
        observer.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRefs]);

  const {
    submitButton,
    signUpButton,
    signUpHelperText,
    signUpLink,
    formSubmittedText,
    formSubmittedLinkText,
    formSubmittedSecondaryText,
  } = FORM_INFO;

  const handleFormSubmit = (
    e: React.SyntheticEvent,
    showAlternateButtonText?: boolean
  ) => {
    e.preventDefault();

    if (!showAlternateButtonText) {
      const formattedFormSubmittion: formattedFormObject = {
        fields: [],
        pageName: window.location.pathname,
      };

      const handleFormFormatting = ({
        objectTypeId,
        name,
      }: {
        objectTypeId: string;
        name: string;
      }) => {
        let formattedValue: string | string[] | number = formContent[name];
        if (name === "followers") {
          formattedValue = parseInt(formContent[name] as string);
        } else if (typeof formattedValue !== "string") {
          formattedValue = formattedValue.join(", ");
        }

        return {
          objectTypeId,
          name,
          value: formattedValue,
        };
      };

      [...FORM_JSON, ...HIDDEN_FORM_ITEMS].forEach((item) =>
        formattedFormSubmittion.fields.push(handleFormFormatting(item))
      );

      // usually fetches here
      console.log(formattedFormSubmittion);
      setFormSubmitted(true);
    }
  };

  const createSubmitButtonText = () => {
    if (showAlternateButtonText) {
      return signUpButton;
    }
    if (formSubmitted) {
      return "Submitted ✓";
    }
    return submitButton;
  };

  return (
    <form id={formId} onSubmit={handleFormSubmit} className="grid my-2">
      {!formSubmitted && (
        <div>
          <InputItem
            item={FORM_JSON[0]}
            formContent={formContent}
            setFormContent={setFormContent}
            setButtonDisabled={setButtonDisabled}
            setShowAlternateButtonText={setShowAlternateButtonText}
          />
          <InputItem
            item={FORM_JSON[1]}
            formContent={formContent}
            setFormContent={setFormContent}
            setButtonDisabled={setButtonDisabled}
            setShowAlternateButtonText={setShowAlternateButtonText}
          />

          <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <InputItem
              item={FORM_JSON[2]}
              passedClasses="order-1 pr-0 lg:pr-4 lg:!mb-0"
              formContent={formContent}
              setFormContent={setFormContent}
              setButtonDisabled={setButtonDisabled}
              setShowAlternateButtonText={setShowAlternateButtonText}
            />
            <InputItem
              item={FORM_JSON[3]}
              passedClasses="order-3 lg:order-2 lg:!mb-0"
              formContent={formContent}
              setFormContent={setFormContent}
              setButtonDisabled={setButtonDisabled}
              setShowAlternateButtonText={setShowAlternateButtonText}
            />
            <InputItem
              item={FORM_JSON[4]}
              passedClasses="-mt-2 lg:mt-2 order-2 lg:order-3"
              passedLabelClasses="text-xs ml-2"
              reversed
              formContent={formContent}
              setFormContent={setFormContent}
              setButtonDisabled={setButtonDisabled}
              setShowAlternateButtonText={setShowAlternateButtonText}
            />
          </div>

          <InputItem
            item={FORM_JSON[5]}
            formContent={formContent}
            setFormContent={setFormContent}
            setButtonDisabled={setButtonDisabled}
            setShowAlternateButtonText={setShowAlternateButtonText}
          />

          <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <InputItem
              item={FORM_JSON[6]}
              formContent={formContent}
              passedClasses=" pr-0 lg:pr-4"
              setFormContent={setFormContent}
              setButtonDisabled={setButtonDisabled}
              setShowAlternateButtonText={setShowAlternateButtonText}
            />
            <InputItem
              item={FORM_JSON[7]}
              formContent={formContent}
              setFormContent={setFormContent}
              setButtonDisabled={setButtonDisabled}
              setShowAlternateButtonText={setShowAlternateButtonText}
            />
          </div>

          <InputItem
            item={FORM_JSON[8]}
            formContent={formContent}
            setFormContent={setFormContent}
            setButtonDisabled={setButtonDisabled}
            setShowAlternateButtonText={setShowAlternateButtonText}
          />
        </div>
      )}

      {HIDDEN_FORM_ITEMS.map(({ name, required }) => (
        <input
          id={name}
          ref={(el) => (inputRefs.current[name] = el)}
          key={`hidden-item-${name}`}
          type="hidden"
          name={name}
          required={required}
          value={formContent[name]}
        />
      ))}

      <div className="font-sans flex-auto w-full">
        {!buttonDisabled && !formSubmitted && showAlternateButtonText && (
          <div className="mt-2 mb-5 text-sm">{signUpHelperText}</div>
        )}
        <Button
          type="submit"
          onClick={(e) => handleFormSubmit(e, showAlternateButtonText)}
          colorScheme={"pink"}
          className="font-medium p-4 rounded-xl"
          disabled={formSubmitted || buttonDisabled}
        >
          {createSubmitButtonText()}
        </Button>
        {formSubmitted && (
          <div className="my-2">
            {formSubmittedText}
            <Link href={signUpLink} className="underline text-blue-400">
              {formSubmittedLinkText}
            </Link>
            {formSubmittedSecondaryText}
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
