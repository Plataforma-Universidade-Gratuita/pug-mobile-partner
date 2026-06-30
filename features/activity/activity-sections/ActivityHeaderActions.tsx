import React, { useMemo } from "react";

import { SlidersHorizontal } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { HeaderActionButton } from "@/components";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ActivityHeaderActionsProps } from "@/types/client";

import { createStyles } from "../styles";

export function ActivityHeaderActions({
	disabled,
	onOpenFilters,
}: ActivityHeaderActionsProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.headerActions}>
			<HeaderActionButton
				accessibilityLabel={t("activity.actions.filters")}
				disabled={disabled}
				icon={SlidersHorizontal}
				onPress={onOpenFilters}
			/>
		</View>
	);
}
