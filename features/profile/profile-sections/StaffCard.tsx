
import React, { useMemo } from "react";

import { Image, View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProfileStudentCardProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { createSectionStyles } from "./styles";

const brandLogo = require("../../../public/assets/brand/pug-logo.png");

export function StaffCard({
	badgeLabel,
	name,
	cpfLabel,
	cpfValue,
	isLoading,
}: ProfileStudentCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createSectionStyles(theme, spec), [spec, theme]);
	const avatarBackground = withAlpha(
		theme.colors.brand,
		theme.mode === "dark" ? 0.16 : 0.1,
	);
	const avatarBorder = withAlpha(
		theme.colors.brand,
		theme.mode === "dark" ? 0.28 : 0.16,
	);

	return (
		<View style={styles.identitySection}>
			<View style={styles.identityTop}>
				<View style={styles.identityCopy}>
					{isLoading ? (
						<LoadingBlock
							width={112}
							height={28}
							radius={theme.radius.circle}
						/>
					) : (
						<Badge
							style={styles.identityBadge}
							tone="brand"
							variant="primary"
						>
							{badgeLabel}
						</Badge>
					)}

					{isLoading ? (
						<LoadingBlock
							width="72%"
							height={32}
						/>
					) : (
						<Label
							role="title"
							style={styles.identityName}
						>
							{name}
						</Label>
					)}
				</View>

				<View
					style={[
						styles.avatarBadge,
						{
							backgroundColor: avatarBackground,
							borderColor: avatarBorder,
						},
					]}
				>
					<Image
						source={brandLogo}
						style={styles.avatarLogo}
					/>
				</View>
			</View>

			{isLoading ? (
				<LoadingBlock
					width="54%"
					height={14}
				/>
			) : (
				<Label role="helper">{`${cpfLabel} - ${cpfValue}`}</Label>
			)}
		</View>
	);
}
