import type { FC } from "react";
import { TextInputProps, View } from "react-native";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Muted, Small } from "../ui/typography";

interface FormFieldProps extends TextInputProps {
  nativeID: string;
  label: string;
  errorMsg?: string;
  description?: string;
}

export const FormField: FC<FormFieldProps> = ({
  nativeID,
  label,
  errorMsg,
  description,
  ...props
}) => {
  return (
    <View className="gap-0.5">
      <Label nativeID={nativeID}>{label}</Label>
      <Input aria-labelledby={nativeID} autoCapitalize="none" {...props} />
      {description && <Muted>{description}</Muted>}
      {errorMsg && <Small className="text-destructive">{errorMsg}</Small>}
    </View>
  );
};
