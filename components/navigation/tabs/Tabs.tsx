import React, { useMemo, useState } from "react";

import { Pressable, ScrollView, Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { TabsProps } from "@/types/client";

import {
	createStyles,
	getLabelStyle,
	getListStyle,
	getTriggerStyle,
} from "./styles";

export function Tabs({
	defaultValue,
	items,
	onValueChange,
	value,
	variant = "default",
}: TabsProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [internalValue, setInternalValue] = useState(
		value ?? defaultValue ?? items[0]?.value,
	);
	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;
	const activeItem =
		items.find(item => item.value === currentValue) ?? items[0];

	function setValue(nextValue: string) {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	}

	return (
		<View style={styles.root}>
			<ScrollView
				contentContainerStyle={getListStyle(theme, variant)}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{items.map(item => {
					const selected = item.value === activeItem?.value;

					return (
						<Pressable
							accessibilityRole="tab"
							accessibilityState={{ disabled: item.disabled, selected }}
							disabled={item.disabled}
							key={item.value}
							onPress={() => setValue(item.value)}
							style={({ pressed }) => [
								styles.trigger,
								getTriggerStyle(
									theme,
									variant,
									selected,
									pressed,
									item.disabled,
								),
							]}
						>
							{item.icon ? <View style={styles.icon}>{item.icon}</View> : null}
							{typeof item.label === "string" ||
							typeof item.label === "number" ? (
								<Text style={getLabelStyle(theme, selected, item.disabled)}>
									{item.label}
								</Text>
							) : (
								item.label
							)}
						</Pressable>
					);
				})}
			</ScrollView>

			<View style={styles.content}>{activeItem?.content}</View>
		</View>
	);
}
