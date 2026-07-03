/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";

export function AttendanceDetailLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.shell}>
			<View style={styles.heroSection}>
				<View style={styles.heroHeader}>
					<View style={styles.heroCopy}>
						<View style={styles.titleRow}>
							<LoadingBlock
								width="68%"
								height={28}
							/>
							<LoadingBlock
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
						</View>
						<LoadingBlock
							width="62%"
							height={14}
						/>
					</View>
				</View>
			</View>

			<View style={styles.metricGrid}>
				{["created", "validated", "validator"].map(key => (
					<View
						key={key}
						style={[
							styles.metricCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<LoadingBlock
							width="54%"
							height={14}
						/>
						<LoadingBlock
							width="72%"
							height={18}
						/>
					</View>
				))}
			</View>

			<View style={styles.validationSection}>
				<LoadingBlock
					width={132}
					height={18}
				/>
				<View style={styles.rowGroup}>
					{["duration", "student", "registration"].map(key => (
						<View
							key={key}
							style={styles.row}
						>
							<LoadingBlock
								width="34%"
								height={14}
							/>
							<LoadingBlock
								width="56%"
								height={18}
							/>
						</View>
					))}
				</View>
			</View>

			<View style={styles.actions}>
				<LoadingBlock
					width="100%"
					height={theme.form.controlHeight}
					radius={theme.form.controlRadius}
				/>
				<LoadingBlock
					width="100%"
					height={theme.form.controlHeight}
					radius={theme.form.controlRadius}
				/>
			</View>
		</View>
	);
}
