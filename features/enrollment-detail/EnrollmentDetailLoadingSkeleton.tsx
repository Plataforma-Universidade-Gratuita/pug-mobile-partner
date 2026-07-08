
import React, { useMemo } from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";

const ATTENDANCE_SKELETON_KEYS = ["first", "second", "third"];

export function EnrollmentDetailLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.content}>
			<View style={styles.shell}>
				<View style={styles.projectSection}>
					<View style={styles.projectTitleCopy}>
						<View style={styles.projectHeader}>
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
							width="94%"
							height={14}
						/>
						<LoadingBlock
							width="78%"
							height={14}
						/>
					</View>
					<View style={styles.progressBlock}>
						<LoadingBlock
							width={112}
							height={14}
						/>
						<LoadingBlock
							width="100%"
							height={10}
							radius={theme.radius.circle}
						/>
					</View>
					<LoadingBlock
						width="100%"
						height={theme.form.controlHeight}
						radius={theme.form.controlRadius}
					/>
					<LoadingBlock
						width={148}
						height={theme.form.controlHeight}
						radius={theme.form.controlRadius}
					/>
				</View>

				<View style={styles.attendanceSection}>
					<View style={styles.sectionHeader}>
						<LoadingBlock
							width={160}
							height={18}
						/>
						<LoadingBlock
							width="72%"
							height={14}
						/>
					</View>
					{ATTENDANCE_SKELETON_KEYS.map(key => (
						<View
							key={key}
							style={styles.attendanceSkeletonCard}
						>
							<View style={styles.attendanceSkeletonCopy}>
								<LoadingBlock
									width="72%"
									height={20}
								/>
								<LoadingBlock
									width="42%"
									height={14}
								/>
								<LoadingBlock
									width="36%"
									height={14}
								/>
							</View>
							<LoadingBlock
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}
