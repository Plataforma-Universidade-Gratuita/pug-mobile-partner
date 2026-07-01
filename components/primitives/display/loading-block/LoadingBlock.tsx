import React, { useEffect, useMemo, useRef } from "react";

import { Animated, Easing, View } from "react-native";

import { useThemeStore } from "@/stores";
import type { PrimitiveLoadingBlockProps } from "@/types/client";
import { withAlpha } from "@/utils";

const AnimatedView = Animated.createAnimatedComponent(View);

export function LoadingBlock({
	width = "100%",
	height = 16,
	radius,
	style,
}: PrimitiveLoadingBlockProps) {
	const theme = useThemeStore(state => state.theme);
	const opacity = useRef(new Animated.Value(0.72)).current;
	const backgroundColor = useMemo(
		() => withAlpha(theme.colors.text, theme.mode === "dark" ? 0.14 : 0.08),
		[theme.colors.text, theme.mode],
	);

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 1,
					duration: theme.motion.slow * 4,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0.48,
					duration: theme.motion.slow * 4,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, [opacity, theme.motion.slow]);

	return (
		<AnimatedView
			importantForAccessibility="no-hide-descendants"
			style={[
				{
					width,
					height,
					borderRadius: radius ?? theme.radius.md,
					backgroundColor,
					opacity,
				},
				style,
			]}
		/>
	);
}
