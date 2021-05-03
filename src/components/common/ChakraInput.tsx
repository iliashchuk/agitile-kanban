import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';
import { FieldProps, FieldRenderProps, Field } from 'react-final-form';

type Props = {
  inputProps?: Omit<InputProps, 'value' | 'onChange' | 'name'>;
} & FieldProps<any, FieldRenderProps<any>>;

export const ChakraInput = (props: Props) => (
  <Field
    render={(fieldProps) => (
      <Input
        name={fieldProps.input.name}
        value={fieldProps.input.value}
        onChange={fieldProps.input.onChange}
        {...props.inputProps}
      ></Input>
    )}
    {...props}
  />
);
