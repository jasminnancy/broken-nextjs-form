import { Dispatch, SetStateAction } from "react";
import routes from "routes";

type AltButtonTextType = Dispatch<SetStateAction<boolean>>;

export const PLATFORM_OPTIONS = [
  {
    label: "Please select one",
    value: "",
    disabled: true,
  },
  {
    label: "Active Campaign",
    value: "ActiveCampaign",
    displayOrder: 1,
    hidden: false,
    readOnly: false,
  },
  {
    label: "Automizy",
    value: "Automizy",
    displayOrder: 2,
    hidden: false,
    readOnly: false,
  },
  {
    label: "AWeber",
    value: "AWeber",
    displayOrder: 3,
    hidden: false,
    readOnly: false,
  },
  {
    label: "Buttondown",
    value: "ButtonDown",
    displayOrder: 7,
    hidden: false,
    readOnly: false,
  },
  {
    label: "Buy Me a Coffee",
    value: "Buy Me a Coffee",
    displayOrder: 8,
    hidden: false,
    readOnly: false,
  },
];

export const FEATURES_OPTIONS = [
  { label: "", hidden: true, disabled: true },
  {
    label: "Referral program",
    value: "Referral program",
    displayOrder: 1,
    hidden: false,
    readOnly: false,
  },
  {
    label: "Ad Network",
    value: "Ad Network",
    displayOrder: 2,
    hidden: false,
    readOnly: false,
  },
  {
    label: "3D analytics",
    value: "3D analytics",
    displayOrder: 3,
    hidden: false,
    readOnly: false,
  },
  {
    label: "Polls",
    value: "Polls",
    displayOrder: 4,
    hidden: false,
    readOnly: false,
  },
];

export const HIDDEN_FORM_ITEMS = [
  {
    name: "type",
    value: "Prospect",
    required: false,
    hidden: true,
    objectTypeId: "0-2",
  },
  {
    name: "lead_type",
    value: "Customer",
    required: false,
    hidden: true,
    objectTypeId: "0-1",
  },
  {
    name: "hs_buying_role",
    value: "DECISION_MAKER",
    required: false,
    hidden: true,
    objectTypeId: "0-1",
  },
  {
    name: "qualification",
    value: "migrating",
    hidden: true,
    objectTypeId: "0-1",
  },
  {
    name: "hs_lead_status",
    type: "OPEN",
    hidden: true,
    objectTypeId: "0-2",
  },
];

const handleValidation = (
  input: string | string[],
  validationQuery: string,
  setAltButtonText?: AltButtonTextType
) => {
  if (typeof input === "string") {
    if (validationQuery === "email") {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
      return emailRegex.test(input);
    }

    if (validationQuery === "url") {
      const urlRegex =
        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
      return urlRegex.test(input);
    }

    if (setAltButtonText) {
      const mustSignUp = parseInt(input) < parseInt(validationQuery);
      setAltButtonText(mustSignUp);
      return mustSignUp;
    }
  }
};

export const FORM_JSON = [
  {
    name: "name",
    type: "string",
    label: "What is the name of your website?",
    placeholder: "Website Name",
    required: true,
    objectTypeId: "0-2",
  },
  {
    name: "website",
    type: "string",
    label: "What is your website url?",
    placeholder: "website.com",
    validation: (input: string | string[]) => handleValidation(input, "url"),
    validationError: "Please enter a valid URL",
    required: true,
    objectTypeId: "0-2",
  },
  {
    name: "followers",
    type: "integer",
    label: "How many followers do you have?",
    placeholder: "100,000+",
    validation: (
      input: string | string[],
      setAltButtonText?: AltButtonTextType
    ) => handleValidation(input, "100000", setAltButtonText),
    validationMessage: "Please enter a number, ex. 100000 rather than 100k",
    required: true,
    objectTypeId: "0-2",
  },
  {
    name: "platform",
    type: "enumeration",
    label: "Which platform do you currently use?",
    placeholder: "Please select one",
    required: true,
    options: PLATFORM_OPTIONS,
    objectTypeId: "0-2",
  },
  {
    name: "paid_followers",
    type: "boolean",
    label: "Do you have paid/premium followers?",
    placeholder: "Check for yes.",
    required: false,
    default: false,
    objectTypeId: "0-2",
  },
  {
    name: "features",
    type: "enumeration",
    label: "Which features are you most interested in?",
    subtext: "Please select up to three:",
    required: false,
    options: FEATURES_OPTIONS,
    min: 1,
    max: 3,
    objectTypeId: "0-2",
  },
  {
    name: "firstname",
    type: "string",
    label: "First Name",
    placeholder: "Emily",
    required: true,
    objectTypeId: "0-1",
  },
  {
    name: "lastname",
    type: "string",
    label: "Last Name",
    placeholder: "Jones",
    required: true,
    objectTypeId: "0-1",
  },
  {
    name: "email",
    type: "string",
    label: "Email Address",
    placeholder: "email@mail.com",
    validation: (input: string | string[]) => handleValidation(input, "email"),
    validationError: "Please enter a valid email",
    required: true,
    objectTypeId: "0-1",
  },
];

type formObjectKey = {
  [key: string]: string | string[];
};

export const getFormJSONKeys = () => {
  const keys: formObjectKey = {};
  FORM_JSON.forEach(({ name, max }) => {
    keys[name] = max ? [] : "";
  });

  HIDDEN_FORM_ITEMS.forEach(({ name, value }) => {
    keys[name] = value || "";
  });

  return keys;
};

export const FORM_INFO = {
  submitButton: "Request a demo",
  signUpButton: "Create an account",
  signUpHelperText:
    "Thank you for your interest in our company. Since you have less than 100,000 followers, our guided onboarding will assist you with your account creation. Click the button below to get started!",
  signUpLink: routes.internal.privacy,
  formSubmittedText:
    "Thank you for reaching out, we will be in contact soon. In the mean time, ",
  formSubmittedLinkText:
    "please create a free account to start exploring the platform",
  formSubmittedSecondaryText: ".",
};
