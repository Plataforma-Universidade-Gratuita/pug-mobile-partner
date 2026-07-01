import React, { useMemo } from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";

const QUICK_ACTION_SKELETON_KEYS = [
	"discover",
	"enrollments",
	"activity",
	"profile",
];
const SNAPSHOT_SKELETON_KEYS = ["enrollment", "attendance"];
const SUMMARY_METRIC_SKELETON_KEYS = ["active", "pending", "attendances"];
const META_SKELETON_KEYS = ["dueDate", "remainingDays"];

export function HomeLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<>
			<View style={styles.summarySection}>
				<LoadingBlock
					width={112}
					height={28}
					radius={theme.radius.circle}
				/>

				<View style={styles.headerCopy}>
					<LoadingBlock
						width="58%"
						height={28}
					/>
					<LoadingBlock
						width="74%"
						height={16}
					/>
				</View>

				<View style={styles.progressBlock}>
					<View style={styles.progressHeader}>
						<LoadingBlock
							width={132}
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

				<View style={styles.metricsGrid}>
					{SUMMARY_METRIC_SKELETON_KEYS.map(key => (
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
								width="70%"
								height={14}
							/>
							<LoadingBlock
								width="42%"
								height={22}
							/>
						</View>
					))}
				</View>

				<View style={styles.metaRow}>
					{META_SKELETON_KEYS.map(key => (
						<View
							key={key}
							style={styles.metaItem}
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
			</View>

			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<LoadingBlock
						width={144}
						height={18}
					/>
					<LoadingBlock
						width="66%"
						height={14}
					/>
				</View>

				<View style={styles.actionsGrid}>
					{QUICK_ACTION_SKELETON_KEYS.map(key => (
						<View
							key={key}
							style={[
								styles.actionCard,
								{
									backgroundColor: spec.panelBackground,
									borderColor: spec.panelBorder,
								},
							]}
						>
							<LoadingBlock
								width={36}
								height={36}
								radius={theme.radius.lg}
							/>

							<View style={styles.actionCopy}>
								<LoadingBlock
									width="72%"
									height={18}
								/>
								<LoadingBlock
									width="88%"
									height={14}
								/>
							</View>
						</View>
					))}
				</View>
			</View>

			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<LoadingBlock
						width={120}
						height={18}
					/>
					<LoadingBlock
						width="62%"
						height={14}
					/>
				</View>

				<View style={styles.snapshotStack}>
					{SNAPSHOT_SKELETON_KEYS.map(key => (
						<View
							key={key}
							style={[
								styles.snapshotCard,
								{
									backgroundColor: spec.panelBackground,
									borderColor: spec.panelBorder,
								},
							]}
						>
							<View style={styles.snapshotHeader}>
								<View style={styles.snapshotCopy}>
									<LoadingBlock
										width="40%"
										height={14}
									/>
									<LoadingBlock
										width="82%"
										height={20}
									/>
								</View>

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

							<View style={styles.snapshotAction}>
								<LoadingBlock
									width={148}
									height={theme.form.controlHeight}
									radius={theme.form.controlRadius}
								/>
							</View>
						</View>
					))}
				</View>
			</View>
		</>
	);
}
