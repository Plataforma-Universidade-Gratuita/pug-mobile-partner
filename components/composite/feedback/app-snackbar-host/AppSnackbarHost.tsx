import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useSegments } from "expo-router";
import {
	Animated,
	Pressable,
	PanResponder,
	type GestureResponderEvent,
	type PanResponderGestureState,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Label } from "@/components/primitives";
import { useFeedbackStore, useThemeStore } from "@/stores";

import { TAB_BAR_ACTION_SIZE } from "../../navigation/authenticated-tab-bar/constants";
import { createStyles } from "./styles";
import {
	FEEDBACK_DISMISS_DISTANCE,
	FEEDBACK_SWIPE_CAPTURE_DISTANCE,
	resolveFeedbackColors,
	resolveFeedbackIcon,
} from "./utils";

const FEEDBACK_SNACKBAR_DURATION = 4000;

export function AppSnackbarHost() {
	const insets = useSafeAreaInsets();
	const segments = useSegments() as string[];
	const theme = useThemeStore(state => state.theme);
	const current = useFeedbackStore(state => state.current);
	const dismissFeedback = useFeedbackStore(state => state.dismissFeedback);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const translateX = useRef(new Animated.Value(0)).current;
	const opacity = useRef(new Animated.Value(0)).current;
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const currentIdRef = useRef<string | null>(null);
	const feedbackColors = current
		? resolveFeedbackColors(current.tone, theme)
		: null;
	const hasTabBar = segments.includes("(tabs)");
	const bottomOffset = hasTabBar
		? Math.max(insets.bottom, theme.space[2]) +
			theme.space[2] +
			TAB_BAR_ACTION_SIZE +
			theme.space[3]
		: insets.bottom + theme.space[4];

	const clearDismissTimer = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const animateDismiss = useCallback(
		(onComplete?: () => void) => {
			clearDismissTimer();
			Animated.parallel([
				Animated.timing(translateX, {
					toValue: FEEDBACK_DISMISS_DISTANCE,
					duration: 180,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: 180,
					useNativeDriver: true,
				}),
			]).start(() => {
				dismissFeedback();
				onComplete?.();
			});
		},
		[clearDismissTimer, dismissFeedback, opacity, translateX],
	);

	const scheduleDismiss = useCallback(() => {
		clearDismissTimer();
		timeoutRef.current = setTimeout(() => {
			animateDismiss();
		}, FEEDBACK_SNACKBAR_DURATION);
	}, [animateDismiss, clearDismissTimer]);

	function shouldDismissFromSwipe(
		_: GestureResponderEvent,
		gestureState: PanResponderGestureState,
	) {
		return (
			gestureState.dx > FEEDBACK_DISMISS_DISTANCE ||
			(gestureState.dx > FEEDBACK_SWIPE_CAPTURE_DISTANCE &&
				gestureState.vx > 0.35)
		);
	}

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: (_, gestureState) =>
					gestureState.dx > FEEDBACK_SWIPE_CAPTURE_DISTANCE &&
					Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
				onPanResponderGrant: () => {
					clearDismissTimer();
				},
				onPanResponderMove: (_, gestureState) => {
					translateX.setValue(Math.max(0, gestureState.dx));
				},
				onPanResponderRelease: (event, gestureState) => {
					if (shouldDismissFromSwipe(event, gestureState)) {
						animateDismiss();
						return;
					}

					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
						bounciness: 6,
					}).start();
					scheduleDismiss();
				},
				onPanResponderTerminate: () => {
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
						bounciness: 6,
					}).start();
					scheduleDismiss();
				},
			}),
		[animateDismiss, clearDismissTimer, scheduleDismiss, translateX],
	);

	useEffect(() => {
		if (!current) {
			clearDismissTimer();
			currentIdRef.current = null;
			translateX.setValue(0);
			opacity.setValue(0);
			return;
		}

		if (currentIdRef.current !== current.id) {
			currentIdRef.current = current.id;
			translateX.setValue(0);
			opacity.setValue(0);
			Animated.parallel([
				Animated.timing(opacity, {
					toValue: 1,
					duration: 160,
					useNativeDriver: true,
				}),
				Animated.spring(translateX, {
					toValue: 0,
					useNativeDriver: true,
					bounciness: 6,
				}),
			]).start();
		}

		scheduleDismiss();

		return () => {
			clearDismissTimer();
		};
	}, [clearDismissTimer, current, opacity, scheduleDismiss, translateX]);

	if (!current || !feedbackColors) {
		return null;
	}

	return (
		<View
			pointerEvents="box-none"
			style={[styles.wrapper, { bottom: bottomOffset }]}
		>
			<Animated.View
				{...panResponder.panHandlers}
				style={[
					styles.snackbar,
					{
						backgroundColor: feedbackColors.backgroundColor,
						borderColor: feedbackColors.borderColor,
						opacity,
						transform: [{ translateX }],
					},
				]}
			>
				<View style={styles.message}>
					<View
						style={[
							styles.iconWrap,
							{ backgroundColor: feedbackColors.iconBackgroundColor },
						]}
					>
						{resolveFeedbackIcon(current.tone, feedbackColors.textColor)}
					</View>
					<View style={styles.content}>
						<Label
							role="field"
							style={[styles.title, { color: feedbackColors.textColor }]}
						>
							{current.title}
						</Label>
						{current.description ? (
							<Label
								role="helper"
								style={[
									styles.description,
									{ color: feedbackColors.descriptionColor },
								]}
							>
								{current.description}
							</Label>
						) : null}
					</View>
					{current.actionLabel && current.onAction ? (
						<Pressable
							onPress={() => {
								current.onAction?.();
								dismissFeedback();
							}}
							style={({ pressed }) => [
								styles.actionButton,
								pressed ? styles.actionButtonPressed : null,
							]}
						>
							<Label
								role="field"
								style={[
									styles.actionLabel,
									{ color: feedbackColors.textColor },
								]}
							>
								{current.actionLabel}
							</Label>
						</Pressable>
					) : null}
				</View>
			</Animated.View>
		</View>
	);
}
