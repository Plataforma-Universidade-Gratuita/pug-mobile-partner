import type { StyleProp, ViewStyle } from "react-native";

export interface PrimitiveLoadingBlockProps {
	width?: ViewStyle["width"];
	height?: ViewStyle["height"];
	radius?: number;
	style?: StyleProp<ViewStyle>;
}
