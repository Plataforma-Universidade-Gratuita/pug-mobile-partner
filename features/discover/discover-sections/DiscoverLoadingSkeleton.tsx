import React, { useMemo } from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles as createProjectCardStyles } from "../project-card/styles";
import { createStyles } from "../styles";

const DISCOVER_SKELETON_KEYS = ["one", "two", "three"];

export function DiscoverLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const cardStyles = useMemo(
		() => createProjectCardStyles(theme, spec),
		[spec, theme],
	);

	return (
		<>
			<View style={styles.summarySection}>
				<View style={styles.summaryTop}>
					<LoadingBlock
						width={104}
						height={28}
						radius={theme.radius.circle}
					/>
					<LoadingBlock
						width={96}
						height={28}
						radius={theme.radius.circle}
					/>
				</View>
				<View style={styles.summaryCopy}>
					<LoadingBlock
						width="58%"
						height={20}
					/>
					<LoadingBlock
						width="82%"
						height={14}
					/>
				</View>
			</View>

			<View style={styles.resultsSection}>
				<View style={styles.resultsHeader}>
					<LoadingBlock
						width={136}
						height={18}
					/>
				</View>
				<View style={styles.projectList}>
					{DISCOVER_SKELETON_KEYS.map(key => (
						<View
							key={key}
							style={[
								cardStyles.card,
								{
									backgroundColor: spec.panelBackground,
									borderColor: spec.panelBorder,
								},
							]}
						>
							<View style={cardStyles.badgeRow}>
								<View style={cardStyles.badgeGroup}>
									<LoadingBlock
										width={96}
										height={28}
										radius={theme.radius.circle}
									/>
								</View>
							</View>

							<View style={cardStyles.titleRow}>
								<View style={cardStyles.titleCopy}>
									<LoadingBlock
										width="76%"
										height={20}
									/>
									<LoadingBlock
										width="52%"
										height={14}
									/>
								</View>
								<LoadingBlock
									width={18}
									height={18}
									radius={theme.radius.circle}
								/>
							</View>

							<LoadingBlock
								width="94%"
								height={14}
							/>
							<LoadingBlock
								width="72%"
								height={14}
							/>

							<View style={cardStyles.metricsRow}>
								{["hours", "seats"].map(metric => (
									<View
										key={metric}
										style={[
											cardStyles.metricCard,
											{
												backgroundColor: theme.colors.surface2,
												borderColor: spec.panelBorder,
											},
										]}
									>
										<LoadingBlock
											width="64%"
											height={14}
										/>
										<LoadingBlock
											width="78%"
											height={18}
										/>
									</View>
								))}
							</View>
						</View>
					))}
				</View>
			</View>
		</>
	);
}
