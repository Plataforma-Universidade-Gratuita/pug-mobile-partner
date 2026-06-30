import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Label, OverflowActionSheet } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ApplyEnrollmentSheetProps } from "@/types/client";

import { createStyles } from "./styles";
import {
	createApplyEnrollmentOptionStyle,
	createCloseSheetOptionStyle,
} from "./utils";

export function ApplyEnrollmentSheet({
	visible,
	projectName,
	isBusy,
	onApply,
	onDismiss,
}: ApplyEnrollmentSheetProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<OverflowActionSheet
			visible={visible}
			onDismiss={() => {
				if (!isBusy) {
					onDismiss();
				}
			}}
		>
			<View style={styles.sheetContent}>
				<View style={styles.sheetHeader}>
					<Label role="caption">{t("projectDetail.apply.caption")}</Label>
					<Label role="field">{projectName}</Label>
					<Label role="helper">{t("projectDetail.apply.subtitle")}</Label>
				</View>

				<View style={styles.sheetOptions}>
					<Pressable
						disabled={isBusy}
						onPress={onApply}
						style={({ pressed }) => [
							styles.sheetOption,
							createApplyEnrollmentOptionStyle(theme, isBusy, pressed),
						]}
					>
						<View style={styles.sheetOptionCopy}>
							<Label role="field">{t("projectDetail.actions.apply")}</Label>
							<Label role="helper">
								{t("projectDetail.apply.applyHelper")}
							</Label>
						</View>
					</Pressable>

					<Pressable
						disabled={isBusy}
						onPress={onDismiss}
						style={({ pressed }) => [
							styles.sheetOption,
							createCloseSheetOptionStyle(theme, spec, isBusy, pressed),
						]}
					>
						<View style={styles.sheetOptionCopy}>
							<Label role="field">{t("projectDetail.actions.close")}</Label>
							<Label role="helper">
								{t("projectDetail.apply.closeHelper")}
							</Label>
						</View>
					</Pressable>
				</View>
			</View>
		</OverflowActionSheet>
	);
}
