import React from 'react';
import {
  Box,
  HStack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';

interface GroupProps {
  value: number;
  name: string;
  onChange(value: number): void;
}

const checkedColor = 'green.500';

const StoryPointRadio: React.FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: checkedColor,
          borderColor: checkedColor,
          color: 'white',
        }}
        p={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export const StoryPointRadioGroup: React.FC<GroupProps> = ({
  onChange,
  value,
  name,
}) => {
  const options = [1, 2, 3, 5, 8, 13, 20, 40, 100];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    onChange: (value) => onChange(+value),
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value, enterKeyHint: '' });
        return (
          <StoryPointRadio key={value} {...radio}>
            {value}
          </StoryPointRadio>
        );
      })}
    </HStack>
  );
};
