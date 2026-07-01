import React, { useMemo } from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "../styles";

const ACTIVITY_SKELETON_KEYS = ["one", "two", "three"];

export function ActivityLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<>
			<View style={styles.summarySection}>
				<View style={styles.summaryStrip}>
					{["active", "pending", "attendances"].map(key => (
						<View
							key={key}
							style={[
								styles.summaryCard,
								{
									backgroundColor: spec.panelBackground,
									borderColor: spec.panelBorder,
								},
							]}
						>
							<LoadingBlock
								width="64%"
								height={14}
							/>
							<LoadingBlock
								width="48%"
								height={28}
							/>
						</View>
					))}
				</View>
				<View style={styles.focusCard}>
					<LoadingBlock
						width="56%"
						height={22}
					/>
					<LoadingBlock
						width="88%"
						height={14}
					/>
					<View style={styles.chipRow}>
						{["first", "second"].map(key => (
							<LoadingBlock
								key={key}
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
						))}
					</View>
				</View>
			</View>

			<View
				style={[
					styles.segmented,
					{
						backgroundColor: spec.panelBackground,
						borderColor: spec.panelBorder,
					},
				]}
			>
				{["left", "right"].map(key => (
					<View
						key={key}
						style={styles.segmentButton}
					>
						<LoadingBlock
							width="72%"
							height={14}
							radius={theme.radius.circle}
						/>
					</View>
				))}
			</View>

			<View style={styles.activityList}>
				<View style={styles.sectionHeader}>
					<LoadingBlock
						width={136}
						height={18}
					/>
					<LoadingBlock
						width="76%"
						height={14}
					/>
				</View>
				{ACTIVITY_SKELETON_KEYS.map(key => (
					<View
						key={key}
						style={[
							styles.card,
							{
								backgroundColor: spec.panelBackground,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<View style={styles.cardBodyRow}>
							<View style={styles.cardCopy}>
								<LoadingBlock
									width="72%"
									height={20}
								/>
								<LoadingBlock
									width="48%"
									height={14}
								/>
								<LoadingBlock
									width="38%"
									height={14}
								/>
							</View>
							<LoadingBlock
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
						</View>
					</View>
				))}
			</View>
		</>
	);
}
