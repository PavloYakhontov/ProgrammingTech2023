import { FormadjoField } from './Formadjo';

export type FormadjoValidator = { [key: string]: FormadjoField }

export type formValuesType = string | number | boolean | object | null;

export type errorPart = {
  isError: boolean;
  errorMessage: string;
};

export type errorRes = { [key: string]: errorPart };

export class Formadjo {
  private readonly __FORM: FormadjoValidator;

  private _form_error_last_number: number;

  public constructor(form: FormadjoValidator) {
    this.__FORM = form;
    this._form_error_last_number = 0;
  }

  public validateForm(formValues: {[key: string]: formValuesType}): errorRes {
    const result: errorRes = {};
    const formAsArray = Object.entries(this.__FORM);
    for (const [label, value] of formAsArray) {
      if (value.isRequired && formValues[label] === void 0) {
        result[label] = { errorMessage: `Form field ${label} is not appear in form values`, isError: true };
      } else {
        result[label] = value.validateField(formValues[label]);
        if (value.dependOn && formValues[label] !== formValues[value.dependOn]) {
          result[label] = { errorMessage: `${value.dependOn}s are not equal!`, isError: true };
        }
      }
    }
    return result;
  }
}
