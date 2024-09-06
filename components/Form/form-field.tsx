import type { FC } from "react";
import { TextInputProps, View } from "react-native";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Muted } from "../ui/typography";

interface FormFieldProps extends TextInputProps {
  name: string;
  label: string;
  description?: string;
}

export const FormField: FC<FormFieldProps> = ({
  name,
  label,
  description,
  ...props
}) => {
  return (
    <View>
      <Label nativeID={name}>{label}</Label>
      <Input aria-labelledby={name} {...props} />
      {description && <Muted>{description}</Muted>}
    </View>
  );
};
