import { minValue } from "@vuelidate/validators";

const validations = {
  required: {
    en: "is required.",
    es: "es obligatorio.",
  },
  email: {
    en: "does not have an email format.",
    es: "no tiene un formato de email.",
  },
  minLength: {
    en: "does not have an the minimum required.",
    es: "no tiene el mínimo requerido.",
  },
  minValue: {
    en: "is less than the minimum allowed.",
    es: "es menor que el mínimo permitido.",
  },
  maxValue: {
    en: "exceeds the max allowed.",
    es: "excede el máximo permitido.",
  },
};
const fieldPrefix = (field, lang) => {
  switch (lang) {
    case "en": {
      return "this field";
    }
    case "es": {
      return "Este campo ";
    }
  }
};
export const translate = (field, validation, lang, custom_error) => {
  return (
    custom_error ??
    fieldPrefix(field, lang) + " " + validations[validation][lang]
  );
};
