/**
 *
 *
 *
 *      email: string email regexp
 *      password: string min 3 max 40
 *      username:
 *
 *
 */

type formadjoTypes = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'unknown';
export class FormadjoField {
  private readonly __NAME__: string;

  private __isRequired: boolean;

  private __dependOn: string;

  private __minLength: number;

  private __maxLength: number;

  private __regexpValidation: object | void; // /[0-9]{1..3}/ has type object;

  private __type: formadjoTypes;

  private __customErrors: { [key: string]: string };

  private __body: { [key: string]: FormadjoField } | null;

  constructor(name: string, type: formadjoTypes) {
    this.__NAME__ = name;
    this.__isRequired = false;
    this.__type = type;
    this.__maxLength = -1;
    this.__minLength = -1;
    this.__regexpValidation = void 0;
    this.__customErrors = {};
    this.__body = null;
    this.__dependOn = '';
  }

  public get isRequired(): boolean {
    return this.__isRequired;
  }

  public get dependOn(): string {
    return this.__dependOn;
  }

  public setDependingField(val: string, customError: string | null = null) {
    this.__dependOn = val;
    if (typeof customError === 'string') {
      this.__customErrors.__dependOn_error = customError;
    }
    return this;
  }

  public setBody(val: { [key: string]: FormadjoField }) {
    if (this.__type === 'object') {
      this.__body = val;
    } else {
      throw Error('Only object type can have body');
    }
  }

  public setIsRequired(val: boolean, customError: string | null = null) {
    this.__isRequired = val;
    if (typeof customError === 'string') {
      this.__customErrors.__isRequired_error = customError;
    }
    return this;
  }

  public setType(val: formadjoTypes, customError: string | null = null) {
    this.__type = val;
    if (typeof customError === 'string') {
      this.__customErrors.__type_error = customError;
    }
    return this;
  }

  public setMaxLength(val: number, customError: string | null = null) {
    this.__maxLength = val;
    if (typeof customError === 'string') {
      this.__customErrors.__maxLength_error = customError;
    }
    return this;
  }

  public setMinLength(val: number, customError: string | null = null) {
    this.__minLength = val;
    if (typeof customError === 'string') {
      this.__customErrors.__minLength_error = customError;
    }
    return this;
  }

  public setRegexpValidation(val: object, customError: string | null = null) {
    this.__regexpValidation = val;
    if (typeof customError === 'string') {
      this.__customErrors.__regexpValidation_error = customError;
    }
    return this;
  }

  public getRegexp() {
    return this.__regexpValidation;
  }

  public validateField<T>(value: T): { isError: boolean, errorMessage: string } {
    if (typeof value !== `${this.__type}`) {
      return { isError: true, errorMessage: `Type mismatch, expects: ${this.__type} but got: ${typeof value}` };
    }
    switch (typeof value) {
      case 'string':
        if (this.__regexpValidation !== void 0 && (<RegExp> this.__regexpValidation).test) {
          const isValid = (<RegExp> this.getRegexp()).test(value.trim());
          if (!isValid) {
            return { isError: true, errorMessage: `Invalid ${this.__NAME__}` };
          }
        }
        if (this.__maxLength !== -1 && value.length > this.__maxLength) {
          return { isError: true, errorMessage: `Length of ${this.__NAME__} should be less than ${this.__maxLength}` };
        }
        if (this.__minLength !== -1 && value.length < this.__minLength) {
          return { isError: true, errorMessage: `Length of ${this.__NAME__} should be bigger than ${this.__minLength}` };
        }
        break;
      case 'number':
        if (this.__maxLength !== -1 && value > this.__maxLength) {
          return { isError: true, errorMessage: `Value of ${this.__NAME__} should be less than ${this.__maxLength}` };
        }
        if (this.__minLength !== -1 && value < this.__minLength) {
          return { isError: true, errorMessage: `Value of ${this.__NAME__} should be bigger than ${this.__minLength}` };
        }
        break;
      case 'object':
        if (this.__body !== null) {
          return this.validateField(this.__body);
        }
        break;
      default:
        break;
    }
    return { isError: false, errorMessage: '' };
  }
}
