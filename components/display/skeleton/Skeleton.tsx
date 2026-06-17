import React, { useEffect, useMemo, useRef } from "react";

import { Animated } from "react-native";

import { useThemeStore } from "@/store";
import type { SkeletonProps } from "@/types/client";

import { createStyles, getSkeletonStyle } from "./styles";

export function Skeleton({
	borderRadius,
	height,
	style,
	width = "100%",
	...props
}: SkeletonProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const opacity = useRef(new Animated.Value(0.55)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					duration: theme.motion.slow,
					toValue: 1,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					duration: theme.motion.slow,
					toValue: 0.55,
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
		<Animated.View
			style={[
				styles.root,
				getSkeletonStyle(theme, width, height, borderRadius),
				{ opacity },
				style,
			]}
			{...props}
		/>
	);
}
