import React, { useMemo, useState } from "react";

import { Check, ChevronDown } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Button } from "@/components/actions/button/Button";
import { Input } from "@/components/forms/input/Input";
import { Drawer } from "@/components/overlays/drawer/Drawer";
import { useThemeStore } from "@/store";
import type { SelectProps } from "@/types/client";

import { createStyles, getTriggerStyle, getValueTextStyle } from "./styles";
import { getFilteredOptions } from "./utils";

export function Select({
	clearLabel = "Clear selection",
	defaultValue,
	disabled = false,
	emptyMessage = "No options found.",
	onValueChange,
	options,
	placeholder = "Select an option",
	searchable = false,
	searchPlaceholder = "Search",
	title,
	value,
}: SelectProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [internalValue, setInternalValue] = useState(
		value ?? defaultValue ?? "",
	);
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const isControlled = value !== undefined;
	const selectedValue = isControlled ? (value ?? "") : internalValue;
	const selectedOption =
		options.find(option => option.value === selectedValue) ?? null;
	const filteredOptions = getFilteredOptions(options, searchable, searchTerm);

	function setValue(nextValue: string) {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	}

	function closeDrawer() {
		setSearchTerm("");
		setIsOpen(false);
	}

	function clearValue() {
		setValue("");
		closeDrawer();
	}

	return (
		<>
			<Pressable
				accessibilityRole="button"
				disabled={disabled}
				onPress={() => setIsOpen(true)}
				style={({ pressed }) => [
					styles.trigger,
					getTriggerStyle(theme, pressed, disabled),
				]}
			>
				<View style={styles.triggerCopy}>
					{selectedOption ? (
						typeof selectedOption.label === "string" ||
						typeof selectedOption.label === "number" ? (
							<Text style={getValueTextStyle(theme, true)}>
								{selectedOption.label}
							</Text>
						) : (
							selectedOption.label
						)
					) : (
						<Text style={getValueTextStyle(theme, false)}>{placeholder}</Text>
					)}
				</View>

				<ChevronDown
					color={theme.colors.muted}
					size={18}
					strokeWidth={2}
				/>
			</Pressable>

			<Drawer
				closeLabel="Close select"
				description={selectedOption?.description}
				footer={
					selectedOption ? (
						<Button
							onPress={clearValue}
							variant="secondary"
						>
							{clearLabel}
						</Button>
					) : undefined
				}
				onOpenChange={open => {
					setIsOpen(open);

					if (!open) {
						setSearchTerm("");
					}
				}}
				open={isOpen}
				title={title ?? placeholder}
			>
				{searchable ? (
					<Input
						enterKeyHint="search"
						inputMode="search"
						onChangeText={setSearchTerm}
						placeholder={searchPlaceholder}
						value={searchTerm}
					/>
				) : null}

				<View style={styles.options}>
					{filteredOptions.length > 0 ? (
						filteredOptions.map(option => {
							const selected = option.value === selectedValue;

							return (
								<Pressable
									accessibilityRole="button"
									disabled={option.disabled}
									key={option.value}
									onPress={() => {
										if (option.disabled) {
											return;
										}

										setValue(option.value);
										closeDrawer();
									}}
									style={({ pressed }) => [
										styles.option,
										selected ? styles.optionSelected : null,
										pressed ? styles.optionPressed : null,
										option.disabled ? styles.optionDisabled : null,
									]}
								>
									<View style={styles.optionCopy}>
										{typeof option.label === "string" ||
										typeof option.label === "number" ? (
											<Text style={styles.optionLabel}>{option.label}</Text>
										) : (
											option.label
										)}

										{option.description ? (
											typeof option.description === "string" ||
											typeof option.description === "number" ? (
												<Text style={styles.optionDescription}>
													{option.description}
												</Text>
											) : (
												option.description
											)
										) : null}
									</View>

									{selected ? (
										<Check
											color={theme.colors.brand}
											size={16}
											strokeWidth={2.5}
										/>
									) : null}
								</Pressable>
							);
						})
					) : (
						<View style={styles.emptyState}>
							{typeof emptyMessage === "string" ||
							typeof emptyMessage === "number" ? (
								<Text style={styles.emptyStateText}>{emptyMessage}</Text>
							) : (
								emptyMessage
							)}
						</View>
					)}
				</View>
			</Drawer>
		</>
	);
}
