import React, { useEffect, useMemo, useRef } from "react";

import { Animated, Easing, View } from "react-native";

import { useThemeStore } from "@/stores";

import { createStyles } from "./styles";

const brandLogo = require("../public/assets/brand/pug-logo.png");

export function BootstrapScreen() {
	const theme = useThemeStore(state => state.theme);
	const progress = useRef(new Animated.Value(0)).current;
	const styles = useMemo(() => createStyles(theme), [theme]);
	const iconScale = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.97, 1.03, 0.97],
	});
	const haloOuterScale = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.94, 1.14, 0.94],
	});
	const haloMidScale = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.96, 1.1, 0.96],
	});
	const haloInnerScale = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.98, 1.06, 0.98],
	});
	const haloOuterOpacity = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.015, 0.06, 0.015],
	});
	const haloMidOpacity = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.03, 0.1, 0.03],
	});
	const haloInnerOpacity = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.06, 0.16, 0.06],
	});

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(progress, {
					toValue: 1,
					duration: 900,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(progress, {
					toValue: 0,
					duration: 900,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, [progress]);

	return (
		<View style={styles.centered}>
			<View style={styles.bootIconStack}>
				<Animated.View
					style={[
						styles.bootHaloOuter,
						{
							opacity: haloOuterOpacity,
							transform: [{ scale: haloOuterScale }],
						},
					]}
				/>
				<Animated.View
					style={[
						styles.bootHaloMid,
						{
							opacity: haloMidOpacity,
							transform: [{ scale: haloMidScale }],
						},
					]}
				/>
				<Animated.View
					style={[
						styles.bootHaloInner,
						{
							opacity: haloInnerOpacity,
							transform: [{ scale: haloInnerScale }],
						},
					]}
				/>
				<Animated.View
					style={[
						styles.bootIconFrame,
						{
							transform: [{ scale: iconScale }],
						},
					]}
				>
					<Animated.Image
						source={brandLogo}
						style={styles.bootIcon}
					/>
				</Animated.View>
			</View>
		</View>
	);
}
