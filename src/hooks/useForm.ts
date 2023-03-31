import { useState, ChangeEvent } from "react";
/*
interface IInputValues {
  [key: string]: string | number;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
   
      const { value, name } = evt.target;
      setValues((prevState) => ({ ...prevState, [name]: value }));
   
  };

  const clearValue = (name: string) => {
    const isString = typeof inputValues[name] === "string";
    setValues((prevState) => ({ ...prevState, [name]: isString ? "" : -1 }));
  };

  return { values, handleChange, setValues, clearValue };
}*/
type TInputValues = {
  [key: string]: {
    value: string;
    onlyDigits?: boolean;
  };
};

type TUseForm<T> = {
  values: T;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  clearValue: (name: string) => void;
};

export function useForm<T extends TInputValues>(inputValues: T): TUseForm<T> {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;

    if (values[name].onlyDigits && !value.match('^[0-9]*$')) {
      return;
    }

    setValues((prevState) => ({
      ...prevState,
      [name]: {
        value,
        onlyDigits: prevState[`${name}`]?.onlyDigits,
      },
    }));
  };

  const clearValue = (name: string) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: {
        value: '',
        onlyDigits: prevState[`${name}`]?.onlyDigits,
      },
    }));
  };

  return {
    values,
    handleChange,
    clearValue,
  };
}
