import { Platform, StyleSheet } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";

function getNativeShadowStyle(config: {
	color: string;
	opacity: number;
	radius: number;
	offsetY: number;
	elevation: number;
}) {
	if (Platform.OS === "web") {
		return {};
	}

	return {
		shadowColor: config.color,
		shadowOpacity: config.opacity,
		shadowRadius: config.radius,
		shadowOffset: { width: 0, height: config.offsetY },
		elevation: config.elevation,
	};
}

export function createStyles(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		screen: {
			flex: 1,
		},
		content: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
			paddingBottom: theme.space[5],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[4],
		},
		headerActions: {
			flexDirection: "row",
			alignItems: "center",
			gap: theme.space[2],
		},
		floatingCta: {
			position: "absolute",
			right: theme.layout.screenPadding,
			width: 56,
			height: 56,
			borderRadius: theme.radius.circle,
			alignItems: "center",
			justifyContent: "center",
			...getNativeShadowStyle({
				color: theme.colors.overlay,
				opacity: theme.mode === "dark" ? 0.3 : 0.16,
				radius: 12,
				offsetY: 6,
				elevation: 6,
			}),
		},
		segmented: {
			flexDirection: "row",
			gap: theme.space[2],
			padding: theme.space[1],
			borderRadius: theme.radius.circle,
			borderWidth: 1,
		},
		segmentButton: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			borderRadius: theme.radius.circle,
		},
		segmentLabel: {
			fontSize: theme.type.xs,
			fontWeight: theme.weight.bold,
			letterSpacing: 0,
			textTransform: "uppercase",
		},
		summarySection: {
			gap: theme.space[3],
		},
		summaryStrip: {
			flexDirection: "row",
			gap: theme.space[2],
		},
		summaryCard: {
			flex: 1,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			gap: theme.space[1],
		},
		summaryValue: {
			color: theme.colors.text,
		},
		focusCard: {
			gap: theme.space[2],
		},
		focusTitle: {
			color: theme.colors.text,
		},
		chipRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		stateCard: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[3],
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateBody: {
			gap: theme.space[1],
		},
		sectionHeader: {
			gap: theme.space[1],
		},
		sectionTitle: {
			color: theme.colors.text,
		},
		activityList: {
			gap: theme.space[3],
		},
		card: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[2],
		},
		cardBadge: {
			alignSelf: "flex-start",
		},
		cardBodyRow: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		cardCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		cardTitle: {
			color: theme.colors.text,
		},
		cardMetaRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			alignItems: "center",
			gap: theme.space[2],
		},
		cardActionText: {
			fontWeight: theme.weight.semibold,
			color: theme.colors.brand,
		},
	});
}
