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

import { createSectionStyles } from "./profile-sections/styles";
import { createStyles } from "./styles";

export function ProfileLoadingSkeleton() {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const sectionStyles = useMemo(
		() => createSectionStyles(theme, spec),
		[spec, theme],
	);

	return (
		<View style={styles.shell}>
			<View style={sectionStyles.identitySection}>
				<View style={sectionStyles.identityTop}>
					<View style={sectionStyles.identityCopy}>
						<LoadingBlock
							width={112}
							height={28}
							radius={theme.radius.circle}
						/>
						<LoadingBlock
							width="72%"
							height={32}
						/>
					</View>
					<LoadingBlock
						width={72}
						height={72}
						radius={theme.radius.xl}
					/>
				</View>
				<LoadingBlock
					width="54%"
					height={14}
				/>
			</View>

			<View style={sectionStyles.section}>
				<View style={sectionStyles.sectionHeader}>
					<LoadingBlock
						width={120}
						height={14}
					/>
				</View>
				<View style={sectionStyles.rows}>
					{["email", "academic", "course", "area"].map((key, index) => (
						<View key={key}>
							{index > 0 ? (
								<View
									style={[
										sectionStyles.rowDivider,
										{ borderTopColor: spec.panelBorder },
									]}
								/>
							) : null}
							<View style={sectionStyles.row}>
								<View style={sectionStyles.rowCopy}>
									<LoadingBlock
										width="32%"
										height={14}
									/>
									<LoadingBlock
										width={index < 2 ? "58%" : "66%"}
										height={18}
									/>
								</View>
								{index < 2 ? (
									<View style={sectionStyles.rowAccessory}>
										<LoadingBlock
											width={index === 0 ? 84 : 104}
											height={28}
											radius={theme.radius.circle}
										/>
									</View>
								) : null}
							</View>
						</View>
					))}
				</View>
				<LoadingBlock
					width="100%"
					height={theme.form.controlHeight}
					radius={theme.radius.xl}
				/>
			</View>

			<View style={sectionStyles.section}>
				<View style={sectionStyles.sectionHeader}>
					<LoadingBlock
						width={108}
						height={14}
					/>
				</View>
				<View style={sectionStyles.rows}>
					<LoadingBlock
						width="38%"
						height={16}
					/>
					<LoadingBlock
						width="66%"
						height={14}
					/>
					<View
						style={[
							sectionStyles.selector,
							{
								backgroundColor: spec.panelBackground,
								borderColor: spec.panelBorder,
							},
						]}
					>
						{["one", "two", "three"].map(key => (
							<View
								key={key}
								style={sectionStyles.selectorOption}
							>
								<LoadingBlock
									width="72%"
									height={14}
									radius={theme.radius.circle}
								/>
							</View>
						))}
					</View>
					<View
						style={[
							sectionStyles.rowDivider,
							{ borderTopColor: spec.panelBorder },
						]}
					/>
					<LoadingBlock
						width="32%"
						height={16}
					/>
					<LoadingBlock
						width="54%"
						height={14}
					/>
					<View
						style={[
							sectionStyles.selector,
							{
								backgroundColor: spec.panelBackground,
								borderColor: spec.panelBorder,
							},
						]}
					>
						{["left", "right"].map(key => (
							<View
								key={key}
								style={[
									sectionStyles.selectorOption,
									sectionStyles.selectorOptionCompact,
								]}
							>
								<LoadingBlock
									width="64%"
									height={14}
									radius={theme.radius.circle}
								/>
							</View>
						))}
					</View>
				</View>
			</View>
		</View>
	);
}
