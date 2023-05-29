import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { FormadjoFormer } from '@core/Validators/FormadjoFormer';
import { IBasicInformationFormTemplate } from '@utils/forms';
import { Formadjo, FormadjoValidator, errorPart, formValuesType } from './MainFormadjo';

export type FormadjoSubmitFn<T extends object> = (values: T, addExtendedError: (k: keyof T, v: errorPart) => void) => void;
export type FormadjoAsyncSubmitFn<T extends object> = (values: T, addExtendedError: (k: keyof T, v: errorPart) => void) => Promise<void>;

type formadjoFormFuncValue<T> = {
  onSubmit(values: any): void;
  errorsList: { [key in keyof T]: errorPart };
  values: { [key in keyof T]: T[key] };
  updateFormState(k: keyof T, v: formValuesType): void;
  updateManyFormState(properties: { [key in keyof T]: formValuesType }): void;
};

type formadjoFormProps<T extends object> = {
  form: FormadjoFormer<T>;
  onFinishSubmit: FormadjoSubmitFn<T> | FormadjoAsyncSubmitFn<T>;
  children?: (data: formadjoFormFuncValue<T>) => JSX.Element;
  initialProps: { [key in keyof T]: formValuesType };
  customErrorMessages?: Partial<{ [key in keyof T]:string }>;
  reduxStore?: {
    storeKey: string;
  };
  removeErrorOnChange?: boolean;
};

type formadjoAction = {
  type: string;
  payload: any;
}

type reducerBody = {
  errorNumberFields: { [key in keyof reducerBody['formValues']]: errorPart };
  formValues: { [key: string]: formValuesType };
}

type Action = { type: 'CLEAR_ERRORS', payload: { [key: string]: errorPart } } |
  { type: 'UPDATE_FORM_VALUE', payload: { [key: string]: formValuesType } } |
  { type: 'UPDATE_ERROR_VALUE', payload: { [key: string]: formValuesType } };

function formadjoReducer(state: reducerBody, action: Action) {
  switch (action.type) {
    case 'UPDATE_FORM_VALUE':
      return { ...state, formValues: { ...state.formValues, ...action.payload } };
    case 'UPDATE_ERROR_VALUE':
      return { ...state, errorNumberFields: { ...state.errorNumberFields, ...action.payload as { [k: string]: errorPart } } };
    case 'CLEAR_ERRORS':
      return { ...state, errorNumberFields: action.payload };
    default:
      return state;
  }
}

const FormadjoForm = <T extends object>({
  children,
  initialProps,
  customErrorMessages,
  form,
  onFinishSubmit,
  removeErrorOnChange,
}: formadjoFormProps<T>) => {
  const initialErrorList = useMemo(() => Object.keys({ ...initialProps }).reduce((acc, curr) => ({
    ...acc, [curr as keyof T]: { isError: false, errorMessage: '' },
  }), {}), [initialProps]);

  function getCustomErrorByName(key: string, defaultValue: string = '') {
    if (customErrorMessages) {
      return (customErrorMessages as {[key: string]: string})[key] || defaultValue;
    }
    return defaultValue;
  }

  const initialReducerProps: reducerBody = useMemo(() => ({
    errorNumberFields: { ...initialErrorList },
    formValues: { ...initialProps || {} },
  }), [initialProps, initialErrorList]);

  const [state, dispatch] = useReducer(formadjoReducer, initialReducerProps, void 0);

  const setErrorField = useCallback((k: keyof T, v: errorPart) => {
    const customError = getCustomErrorByName(k as string);
    if (customError) {
      v.errorMessage = customError;
    }
    dispatch({ type: 'UPDATE_ERROR_VALUE', payload: { [k]: v } });
  }, [getCustomErrorByName]);

  const onSubmit = useCallback(() => {
    dispatch({ type: 'CLEAR_ERRORS', payload: { ...initialErrorList } });
    const errorList = new Formadjo(form.get);
    const res = errorList.validateForm(state.formValues);
    const filteredEntries = Object.entries(res).filter((el) => {
      const [_, value] = el;
      return value.isError;
    });
    if (filteredEntries.length > 0) {
      for (const [key, value] of filteredEntries) {
        setErrorField(key as keyof T, value);
      }
    } else {
      onFinishSubmit && onFinishSubmit(state.formValues as any, setErrorField);
    }
  }, [initialErrorList, form.get, state.formValues, setErrorField, onFinishSubmit]);

  const updateFormState = useCallback((k: keyof T, v: formValuesType) => {
    if (removeErrorOnChange && state.errorNumberFields[k as string].isError) {
      setErrorField(k, { isError: false, errorMessage: '' });
    }
    dispatch({ type: 'UPDATE_FORM_VALUE', payload: { [k]: v } });
  }, [state, dispatch]);

  useEffect(() => {
  }, [state]);

  const updateManyFormState = useCallback((properties: { [key in keyof T]: formValuesType }) => {
    dispatch({ type: 'UPDATE_FORM_VALUE', payload: { ...properties } });
  }, [state, dispatch]);

  return (
    <React.Fragment>
      {
        children ? children({
          onSubmit,
          errorsList: state.errorNumberFields as { [key in keyof T]: errorPart; },
          values: state.formValues as { [key in keyof T]: T[key]; },
          updateFormState,
          updateManyFormState,
        }) : null
      }
    </React.Fragment>
  );
};

export { FormadjoForm };
