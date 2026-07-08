
import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { BrandScreenHeader, Button } from "@/components";
import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";

export function AttendancesScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader title={t("attendances.title")} />

			<View style={styles.content}>
				<View style={styles.shell}>
					<View style={styles.panel}>
						<Label
							role="field"
							style={styles.title}
						>
							{t("attendances.placeholder.title")}
						</Label>
						<Label role="helper">
							{t("attendances.placeholder.description")}
						</Label>
					</View>

					<Button
						onPress={() => {
							router.push("../attendance/scan");
						}}
					>
						{t("attendances.actions.scanQr")}
					</Button>
				</View>
			</View>
		</View>
	);
}
