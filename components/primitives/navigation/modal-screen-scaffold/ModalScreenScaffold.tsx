import React, { useMemo } from "react";

import { View } from "react-native";

import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ModalScreenScaffoldProps } from "@/types/client";

import { Label } from "../../forms";
import { createStyles } from "./styles";

export function ModalScreenScaffold({
	title,
	subtitle,
	subtitleNumberOfLines,
	children,
	footer,
	leftAccessory,
	rightAccessory,
	compactHeader = false,
	actionSlotMinWidth,
}: ModalScreenScaffoldProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const subtitleProps =
		subtitleNumberOfLines != null
			? { numberOfLines: subtitleNumberOfLines }
			: {};

	return (
		<View
			style={[styles.modalScreen, { backgroundColor: spec.screenBackground }]}
		>
			<View
				style={[
					styles.modalContent,
					compactHeader ? styles.modalContentCompact : null,
				]}
			>
				<View style={styles.modalHeaderRow}>
					{leftAccessory ? (
						<View
							style={[
								styles.modalActionSlot,
								actionSlotMinWidth != null
									? { minWidth: actionSlotMinWidth }
									: null,
							]}
						>
							{leftAccessory}
						</View>
					) : null}

					<View style={styles.modalHeaderCopy}>
						<Label role="title">{title}</Label>
						{subtitle ? (
							<Label
								role="helper"
								{...subtitleProps}
							>
								{subtitle}
							</Label>
						) : null}
					</View>

					{rightAccessory ? (
						<View
							style={[
								styles.modalActionSlot,
								actionSlotMinWidth != null
									? { minWidth: actionSlotMinWidth }
									: null,
							]}
						>
							{rightAccessory}
						</View>
					) : null}
				</View>

				<View style={styles.modalBody}>{children}</View>
			</View>

			{footer ? <View style={styles.modalFooter}>{footer}</View> : null}
		</View>
	);
}
