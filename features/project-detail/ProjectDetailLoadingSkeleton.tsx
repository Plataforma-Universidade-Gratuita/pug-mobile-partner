
import React, { useMemo } from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./project-detail-sections/styles";

const PROJECT_DETAIL_METRIC_KEYS = ["active", "max", "completed", "offered"];
const PROJECT_DETAIL_STAFF_KEYS = ["one", "two"];

export function ProjectDetailLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<>
			<View style={styles.overviewSection}>
				<View style={styles.cardHeader}>
					<View style={styles.titleCopy}>
						<View style={styles.titleRow}>
							<LoadingBlock
								width="68%"
								height={26}
							/>
							<LoadingBlock
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
						</View>
						<LoadingBlock
							width="92%"
							height={14}
						/>
						<LoadingBlock
							width="74%"
							height={14}
						/>
					</View>
				</View>

				<View style={styles.metricsGrid}>
					{PROJECT_DETAIL_METRIC_KEYS.map(key => (
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
								width="62%"
								height={14}
							/>
							<LoadingBlock
								width="56%"
								height={18}
							/>
						</View>
					))}
				</View>

				<View style={styles.progressBlock}>
					<View style={styles.progressHeader}>
						<LoadingBlock
							width={112}
							height={14}
						/>
						<LoadingBlock
							width={64}
							height={14}
						/>
					</View>
					<LoadingBlock
						width="100%"
						height={10}
						radius={theme.radius.circle}
					/>
				</View>
			</View>

			<View style={styles.entitySection}>
				<LoadingBlock
					width={136}
					height={18}
				/>

				<View style={styles.entityHeaderBlock}>
					<LoadingBlock
						width="54%"
						height={24}
					/>
					<View style={styles.entityMetaGrid}>
						{["city", "cnpj"].map(key => (
							<View
								key={key}
								style={[
									styles.entityMetaCard,
									{
										backgroundColor: theme.colors.surface2,
										borderColor: spec.panelBorder,
									},
								]}
							>
								<LoadingBlock
									width="48%"
									height={14}
								/>
								<LoadingBlock
									width="78%"
									height={18}
								/>
							</View>
						))}
					</View>

					<View
						style={[
							styles.entityAddressCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<LoadingBlock
							width="32%"
							height={14}
						/>
						<LoadingBlock
							width="94%"
							height={18}
						/>
					</View>
				</View>

				<View style={styles.staffBlock}>
					<LoadingBlock
						width={124}
						height={18}
					/>
					<View style={styles.staffList}>
						{PROJECT_DETAIL_STAFF_KEYS.map(key => (
							<View
								key={key}
								style={[
									styles.staffItem,
									{
										backgroundColor: theme.colors.surface2,
										borderColor: spec.panelBorder,
									},
								]}
							>
								<LoadingBlock
									width={44}
									height={44}
									radius={theme.radius.circle}
								/>
								<View style={styles.staffCopy}>
									<LoadingBlock
										width="52%"
										height={18}
									/>
									<LoadingBlock
										width="76%"
										height={14}
									/>
								</View>
							</View>
						))}
					</View>
				</View>
			</View>
		</>
	);
}
