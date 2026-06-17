import type { TextInputProps } from "react-native";

export interface TextAreaProps extends Omit<
	TextInputProps,
	"style" | "onChange" | "onChangeText"
> {
	error?: boolean;
	onChangeText?: (text: string) => void;
}
