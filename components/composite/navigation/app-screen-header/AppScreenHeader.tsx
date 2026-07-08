import React, { useMemo } from "react";

import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import type { AppScreenHeaderProps } from "@/types/client";

import { AppBackButton } from "../app-back-button";
import { createStyles } from "./styles";

export function AppScreenHeader({
	title,
	subtitle,
	showBackButton = false,
	leftAccessory,
	rightAccessory,
}: AppScreenHeaderProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const resolvedLeftAccessory =
		leftAccessory ?? (showBackButton ? <AppBackButton /> : null);

	return (
		<View style={styles.header}>
			<View style={styles.headerRow}>
				{resolvedLeftAccessory ? resolvedLeftAccessory : null}

				<View style={styles.headerCopy}>
					<Label role="title">{title}</Label>
					{subtitle ? <Label role="helper">{subtitle}</Label> : null}
				</View>

				{rightAccessory ? (
					<View style={styles.rightAccessory}>{rightAccessory}</View>
				) : null}
			</View>
		</View>
	);
}
