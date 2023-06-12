import * as LabelPrimitive from "@radix-ui/react-label";
import React, { createContext, useContext, useState } from "react";
import {
  PatternFormatProps,
  type NumericFormatProps,
} from "react-number-format";
import { mapDataAttributes } from "../../../functions";

type Data = {
  placeholder?: boolean;
  touched?: boolean;
  value?: boolean;
};

type State = {
  touched?: boolean;
  value?: string;
};

const Context = createContext<
  {
    data?: { [key: string]: boolean };
    name: string;
    setState?: React.Dispatch<React.SetStateAction<State>>;
    state?: State;
  } & Pick<React.HTMLProps<HTMLInputElement>, "onChange"> &
    Pick<React.HTMLProps<HTMLInputElement>, "placeholder">
>(null);

export function Root({
  children,
  name,
  placeholder,
  ...props
}: React.PropsWithChildren<React.HTMLProps<HTMLDivElement>> &
  Pick<React.HTMLProps<HTMLInputElement>, "name"> &
  Pick<React.HTMLProps<HTMLInputElement>, "placeholder">) {
  if (name === undefined) {
    throw new Error("Field requires a name");
  }

  const [state, setState] = useState<State>({
    touched: false,
    value: "",
  });

  const data = mapDataAttributes<Data>({
    ...state,
    placeholder: !!placeholder,
    value: state.value?.length > 0,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange !== undefined) onChange(event);
    if (state.touched === false)
      setState((value) => ({ ...value, touched: true }));
    setState((value) => ({ ...value, value: event.target.value }));
  };

  return (
    <Context.Provider
      value={{ data, name, onChange, placeholder, setState, state }}
    >
      <div {...data} {...props}>
        {children}
      </div>
    </Context.Provider>
  );
}

function Input({
  as = "input",
  ...props
}: (
  | React.HTMLProps<HTMLInputElement>
  | NumericFormatProps
  | PatternFormatProps
) & {
  as?: React.ElementType;
}) {
  const Component = as;
  const { data, name, placeholder } = useField();
  props = {
    id: name,
    name,
    placeholder,
    ...data,
    ...props,
  };

  return <Component {...props} />;
}

function Label({ children, ...props }: React.PropsWithChildren) {
  const { data, name, placeholder } = useField();

  return (
    <LabelPrimitive.Root htmlFor={name} {...data} {...props}>
      {children ?? placeholder}
    </LabelPrimitive.Root>
  );
}

export const Field = Object.assign(Root, {
  Input,
  Label,
});

export function useField() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useField must be used within a Field");
  }

  return context;
}
