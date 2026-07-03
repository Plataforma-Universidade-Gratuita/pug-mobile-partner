import React, { useMemo } from "react";

import { View } from "react-native";

import { BrandScreenHeader } from "@/components";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";

export function HomeScreen() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(spec.screenBackground), [spec]);

	return (
		<View style={styles.screen}>
			<BrandScreenHeader title="Home" />
		</View>
	);
}
