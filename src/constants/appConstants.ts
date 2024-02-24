interface JOI_VALIDATION_TYPE {
  ANY_ONLY: string;
  STRING_LENGTH: string;
  STRING_PATTERN: string;
  STRING_EMAIL: string;
  STRING_BASE: string;
  ARRAY_INCLUDE_REQUIRED: string;
  REQUIRED: string;
  OBJECT_MISSNG: string;
}

interface IAppConstant {
  JOI_VALIDATION_TYPE: JOI_VALIDATION_TYPE;
}

export const APP_CONSTANT: IAppConstant = Object.freeze({
  JOI_VALIDATION_TYPE: {
    ANY_ONLY: 'any.only',
    STRING_LENGTH: 'string.length',
    STRING_PATTERN: 'string.pattern.base',
    STRING_EMAIL: 'string.email',
    STRING_BASE: 'string.base',
    ARRAY_INCLUDE_REQUIRED: 'array.includesRequiredUnknowns',
    REQUIRED: 'any.required',
    OBJECT_MISSNG: 'object.missing'
  },
});
