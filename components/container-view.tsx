import { View, type ViewProps } from "react-native";

export type ContainerViewProps = ViewProps & {
  backgroundColor?: string;
};

export function ContainerView({
  style,
  backgroundColor = "#232320",
  ...otherProps
}: ContainerViewProps) {
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
