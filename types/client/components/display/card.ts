import type { ReactNode } from "react";

import type { TextProps, ViewProps } from "react-native";

export interface CardProps extends ViewProps {
	children?: ReactNode;
}

export interface CardHeaderProps extends ViewProps {
	children?: ReactNode;
	icon?: ReactNode;
}

export interface CardTitleProps extends TextProps {
	children?: ReactNode;
}

export interface CardDescriptionProps extends TextProps {
	children?: ReactNode;
}

export interface CardContentProps extends ViewProps {
	children?: ReactNode;
}

export interface CardFooterProps extends ViewProps {
	children?: ReactNode;
}
