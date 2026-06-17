import React, { useMemo, useState } from "react";

import { Pressable, Switch as NativeSwitch, Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { SwitchProps } from "@/types/client";

import { createStyles, getThumbColor, getTrackColor } from "./styles";

export function Switch({
	checked,
	defaultChecked = false,
	description,
	disabled,
	label,
	onCheckedChange,
	style,
	...props
}: SwitchProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isControlled = checked !== undefined;
	const isChecked = isControlled ? (checked ?? false) : internalChecked;
	const isDisabled = disabled ?? false;

	function setValue(nextValue: boolean) {
		if (isDisabled) {
			return;
		}

		if (!isControlled) {
			setInternalChecked(nextValue);
		}

		onCheckedChange?.(nextValue);
	}

	return (
		<Pressable
			accessibilityRole="switch"
			accessibilityState={{ checked: isChecked, disabled: isDisabled }}
			disabled={isDisabled}
			onPress={() => setValue(!isChecked)}
			style={state => [
				styles.root,
				isDisabled ? styles.disabled : null,
				typeof style === "function" ? style(state) : style,
			]}
			{...props}
		>
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

			<NativeSwitch
				disabled={isDisabled}
				onValueChange={setValue}
				thumbColor={getThumbColor(theme, isChecked)}
				trackColor={{
					false: getTrackColor(theme, false),
					true: getTrackColor(theme, true),
				}}
				value={isChecked}
			/>
		</Pressable>
	);
}
