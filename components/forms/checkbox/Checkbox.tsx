import React, { useMemo, useState } from "react";

import { Check } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { CheckboxProps } from "@/types/client";

import { createStyles, getIndicatorStyle } from "./styles";

export function Checkbox({
	checked,
	defaultChecked = false,
	description,
	disabled,
	label,
	onCheckedChange,
	style,
	...props
}: CheckboxProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isControlled = checked !== undefined;
	const isChecked = isControlled ? (checked ?? false) : internalChecked;
	const isDisabled = disabled ?? false;

	function toggleValue() {
		if (isDisabled) {
			return;
		}

		const nextValue = !isChecked;

		if (!isControlled) {
			setInternalChecked(nextValue);
		}

		onCheckedChange?.(nextValue);
	}

	return (
		<Pressable
			accessibilityRole="checkbox"
			accessibilityState={{ checked: isChecked, disabled: isDisabled }}
			disabled={isDisabled}
			onPress={toggleValue}
			style={state => [
				styles.root,
				isDisabled ? styles.disabled : null,
				typeof style === "function" ? style(state) : style,
			]}
			{...props}
		>
			<View style={[styles.indicator, getIndicatorStyle(theme, isChecked)]}>
				{isChecked ? (
					<Check
						color={theme.colors.chromeFg}
						size={14}
						strokeWidth={2.5}
					/>
				) : null}
			</View>

			{label || description ? (
				<View style={styles.copy}>
					{label ? (
						typeof label === "string" || typeof label === "number" ? (
							<Text style={styles.label}>{label}</Text>
						) : (
							label
						)
					) : null}

					{description ? (
						typeof description === "string" ||
						typeof description === "number" ? (
							<Text style={styles.description}>{description}</Text>
						) : (
							description
						)
					) : null}
				</View>
			) : null}
		</Pressable>
	);
}
