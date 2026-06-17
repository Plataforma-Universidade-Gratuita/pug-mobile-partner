import type { DimensionValue, ViewProps } from "react-native";

export interface SkeletonProps extends ViewProps {
	width?: DimensionValue;
	height?: DimensionValue;
	borderRadius?: number;
}
