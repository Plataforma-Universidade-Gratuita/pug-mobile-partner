
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { QrCode } from "lucide-react-native";
import { Animated, PanResponder, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeStore } from "@/stores";

import {
	TAB_BAR_DOCK_PADDING,
	TAB_BAR_DRAG_ACTIVATION_OFFSET,
	TAB_BAR_ICON_SIZE,
} from "./constants";
import { createStyles } from "./styles";
import { clampTabIndex } from "./utils";

export function AuthenticatedTabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const router = useRouter();
	const theme = useThemeStore(store => store.theme);
	const insets = useSafeAreaInsets();
	const routeCount = state.routes.length;
	const styles = useMemo(
		() => createStyles(theme, insets.bottom),
		[insets.bottom, theme],
	);
	const railRef = useRef<View>(null);
	const indicatorTranslateX = useRef(new Animated.Value(0)).current;
	const previewIndexRef = useRef<number | null>(null);
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const [railWidth, setRailWidth] = useState(0);
	const [railPageX, setRailPageX] = useState(0);

	const highlightedIndex = previewIndex ?? state.index;
	const itemWidth = routeCount > 0 ? railWidth / routeCount : 0;

	const syncRailMetrics = useCallback(() => {
		railRef.current?.measureInWindow((pageX, _pageY, measuredWidth) => {
			setRailPageX(pageX);
			if (measuredWidth > 0) {
				setRailWidth(measuredWidth);
			}
		});
	}, []);

	const setPreview = useCallback((nextIndex: number | null) => {
		previewIndexRef.current = nextIndex;
		setPreviewIndex(nextIndex);
	}, []);

	const animateIndicatorToIndex = useCallback(
		(nextIndex: number, immediate?: boolean) => {
			if (itemWidth <= 0) {
				return;
			}

			const nextTranslateX = nextIndex * itemWidth;

			if (immediate) {
				indicatorTranslateX.stopAnimation();
				indicatorTranslateX.setValue(nextTranslateX);
				return;
			}

			Animated.spring(indicatorTranslateX, {
				toValue: nextTranslateX,
				stiffness: 280,
				damping: 28,
				mass: 0.9,
				useNativeDriver: true,
			}).start();
		},
		[indicatorTranslateX, itemWidth],
	);

	const previewRouteFromPageX = useCallback(
		(pageX: number, immediate?: boolean) => {
			if (itemWidth <= 0 || routeCount === 0) {
				return;
			}

			const localX = Math.min(Math.max(pageX - railPageX, 0), railWidth - 1);
			const nextIndex = clampTabIndex(
				Math.floor(localX / itemWidth),
				routeCount,
			);

			if (previewIndexRef.current !== nextIndex) {
				setPreview(nextIndex);
			}

			animateIndicatorToIndex(nextIndex, immediate);
		},
		[
			animateIndicatorToIndex,
			itemWidth,
			railPageX,
			railWidth,
			routeCount,
			setPreview,
		],
	);

	const navigateToIndex = useCallback(
		(nextIndex: number) => {
			const nextRoute = state.routes[nextIndex];

			if (!nextRoute) {
				setPreview(null);
				return;
			}

			const event = navigation.emit({
				type: "tabPress",
				target: nextRoute.key,
				canPreventDefault: true,
			});

			if (event.defaultPrevented || nextIndex === state.index) {
				setPreview(null);
				return;
			}

			navigation.navigate(nextRoute.name, nextRoute.params);
		},
		[navigation, setPreview, state.index, state.routes],
	);

	useEffect(() => {
		if (routeCount === 0) {
			return;
		}

		animateIndicatorToIndex(highlightedIndex);
	}, [animateIndicatorToIndex, highlightedIndex, routeCount]);

	useEffect(() => {
		if (previewIndexRef.current === state.index) {
			setPreview(null);
		}
	}, [setPreview, state.index]);

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => false,
				onMoveShouldSetPanResponder: (_event, gestureState) =>
					Math.abs(gestureState.dx) > TAB_BAR_DRAG_ACTIVATION_OFFSET,
				onPanResponderGrant: event => {
					syncRailMetrics();
					previewRouteFromPageX(event.nativeEvent.pageX, true);
				},
				onPanResponderMove: event => {
					previewRouteFromPageX(event.nativeEvent.pageX, true);
				},
				onPanResponderRelease: () => {
					const nextIndex = previewIndexRef.current;

					if (nextIndex == null) {
						return;
					}

					navigateToIndex(nextIndex);
				},
				onPanResponderTerminate: () => {
					setPreview(null);
				},
			}),
		[navigateToIndex, previewRouteFromPageX, setPreview, syncRailMetrics],
	);

	return (
		<View style={styles.container}>
			<View style={styles.shellRow}>
				<View
					style={styles.dock}
					{...panResponder.panHandlers}
				>
					{itemWidth > 0 ? (
						<Animated.View
							style={[
								styles.activePill,
								styles.pointerEventsNone,
								{
									left: TAB_BAR_DOCK_PADDING,
									width: itemWidth,
									transform: [{ translateX: indicatorTranslateX }],
								},
							]}
						/>
					) : null}

					<View
						ref={railRef}
						onLayout={() => {
							syncRailMetrics();
						}}
						style={styles.rail}
					>
						{state.routes.map((route, index) => {
							const descriptor = descriptors[route.key];
							const options = descriptor?.options;

							if (!descriptor || !options) {
								return null;
							}

							const isHighlighted = highlightedIndex === index;
							const color = isHighlighted
								? theme.colors.tabFgActive
								: theme.colors.tabFgInactive;
							const icon = options.tabBarIcon?.({
								focused: isHighlighted,
								color,
								size: TAB_BAR_ICON_SIZE,
							});
							const accessibilityLabel =
								typeof options.title === "string" ? options.title : route.name;

							return (
								<Pressable
									key={route.key}
									accessibilityLabel={accessibilityLabel}
									accessibilityRole="tab"
									accessibilityState={
										state.index === index ? { selected: true } : {}
									}
									onLongPress={() => {
										navigation.emit({
											type: "tabLongPress",
											target: route.key,
										});
									}}
									onPress={() => {
										setPreview(index);
										animateIndicatorToIndex(index, true);
										navigateToIndex(index);
									}}
									onPressIn={() => {
										setPreview(index);
										animateIndicatorToIndex(index);
									}}
									onPressOut={() => {
										if (index === state.index) {
											setPreview(null);
										}
									}}
									style={({ pressed }) => [
										styles.item,
										pressed ? styles.itemPressed : null,
									]}
								>
									<View style={styles.iconSlot}>{icon}</View>
								</Pressable>
							);
						})}
					</View>
				</View>
				<Pressable
					accessibilityLabel="Scan attendance QR"
					accessibilityRole="button"
					onPress={() => {
						router.push("../attendance/scan");
					}}
					style={({ pressed }) => [
						styles.actionButton,
						pressed ? styles.actionButtonPressed : null,
					]}
				>
					<QrCode
						color={
							theme.mode === "dark"
								? theme.colors.brandSoftText
								: theme.colors.chromeFg
						}
						size={24}
					/>
				</Pressable>
			</View>
		</View>
	);
}
