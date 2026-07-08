
import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Label, OverflowActionSheet } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProfileLogoutSheetProps } from "@/types/client";

import { createStyles } from "../styles";
import {
	createSignOutDeviceOptionStyle,
	createSignOutEverywhereOptionStyle,
	createStaySignedInOptionStyle,
} from "./utils";

export function ProfileLogoutSheet({
	isBusy,
	onDismiss,
	onSignOut,
	onSignOutAll,
	visible,
}: ProfileLogoutSheetProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<OverflowActionSheet
			visible={visible}
			onDismiss={onDismiss}
		>
			<View style={styles.sheetContent}>
				<View style={styles.sheetHeader}>
					<Label
						role="caption"
						style={styles.sheetCaption}
					>
						{t("profile.sections.session")}
					</Label>
					<Label
						role="field"
						style={styles.sheetTitle}
					>
						{t("profile.logout.title")}
					</Label>
					<Label
						role="helper"
						style={styles.sheetSubtitle}
					>
						{t("profile.logout.subtitle")}
					</Label>
				</View>

				<View style={styles.sheetOptions}>
					<Pressable
						disabled={isBusy}
						onPress={onDismiss}
						style={({ pressed }) => [
							styles.logoutOption,
							createStaySignedInOptionStyle(theme, spec, isBusy, pressed),
						]}
					>
						<View style={styles.logoutOptionCopy}>
							<Label
								role="field"
								style={styles.logoutOptionTitle}
							>
								{t("profile.logout.stay")}
							</Label>
							<Label
								role="helper"
								style={styles.logoutOptionHelper}
							>
								{t("profile.logout.stayHelper")}
							</Label>
						</View>
					</Pressable>
					<Pressable
						disabled={isBusy}
						onPress={onSignOutAll}
						style={({ pressed }) => [
							styles.logoutOption,
							createSignOutEverywhereOptionStyle(theme, isBusy, pressed),
						]}
					>
						<View style={styles.logoutOptionCopy}>
							<Label
								role="field"
								style={styles.logoutWarningTitle}
							>
								{t("profile.logout.everywhere")}
							</Label>
							<Label
								role="helper"
								style={styles.logoutWarningHelper}
							>
								{t("profile.logout.everywhereHelper")}
							</Label>
						</View>
					</Pressable>
					<Pressable
						disabled={isBusy}
						onPress={onSignOut}
						style={({ pressed }) => [
							styles.logoutOption,
							createSignOutDeviceOptionStyle(theme, isBusy, pressed),
						]}
					>
						<View style={styles.logoutOptionCopy}>
							<Label
								role="field"
								style={styles.logoutDangerTitle}
							>
								{t("profile.logout.device")}
							</Label>
							<Label
								role="helper"
								style={styles.logoutDangerHelper}
							>
								{t("profile.logout.deviceHelper")}
							</Label>
						</View>
					</Pressable>
				</View>
			</View>
		</OverflowActionSheet>
	);
}
