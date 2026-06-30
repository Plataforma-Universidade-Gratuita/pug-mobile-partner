import React, { useEffect, useMemo, useRef, useState } from "react";

import { Animated, Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { OverflowActionSheetProps } from "@/types/client";

import { createStyles } from "./styles";

const SHEET_ENTER_TRANSLATE_Y = 28;
const SHEET_ANIMATION_DURATION_MS = 180;

export function OverflowActionSheet({
	visible,
	onDismiss,
	children,
}: OverflowActionSheetProps) {
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const backdropOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
	const translateY = useRef(
		new Animated.Value(visible ? 0 : SHEET_ENTER_TRANSLATE_Y),
	).current;
	const [isMounted, setIsMounted] = useState(visible);

	useEffect(() => {
		if (visible) {
			setIsMounted(true);
			Animated.parallel([
				Animated.timing(backdropOpacity, {
					toValue: 1,
					duration: SHEET_ANIMATION_DURATION_MS,
					useNativeDriver: true,
				}),
				Animated.timing(translateY, {
					toValue: 0,
					duration: SHEET_ANIMATION_DURATION_MS,
					useNativeDriver: true,
				}),
			]).start();
			return;
		}

		if (!isMounted) {
			return;
		}

		Animated.parallel([
			Animated.timing(backdropOpacity, {
				toValue: 0,
				duration: SHEET_ANIMATION_DURATION_MS,
				useNativeDriver: true,
			}),
			Animated.timing(translateY, {
				toValue: SHEET_ENTER_TRANSLATE_Y,
				duration: SHEET_ANIMATION_DURATION_MS,
				useNativeDriver: true,
			}),
		]).start(({ finished }) => {
			if (finished) {
				setIsMounted(false);
			}
		});
	}, [backdropOpacity, isMounted, translateY, visible]);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			animationType="none"
			onRequestClose={onDismiss}
			statusBarTranslucent
			transparent
			visible={isMounted}
		>
			<View style={styles.sheetModal}>
				<Pressable
					onPress={onDismiss}
					style={styles.sheetBackdropPressable}
				>
					<Animated.View
						style={[styles.sheetBackdrop, { opacity: backdropOpacity }]}
					/>
				</Pressable>

				<Animated.View
					style={[
						styles.sheetSurface,
						{
							backgroundColor: theme.colors.surface2,
							borderColor: spec.panelBorder,
							paddingBottom:
								spec.panelPadding + Math.max(insets.bottom, theme.space[2]),
							transform: [{ translateY }],
						},
					]}
				>
					<View style={styles.sheetHandle} />
					{children}
				</Animated.View>
			</View>
		</Modal>
	);
}
