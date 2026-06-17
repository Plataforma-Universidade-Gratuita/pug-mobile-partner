import React, { useMemo, useState } from "react";

import { X } from "lucide-react-native";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/actions/button/Button";
import { useThemeStore } from "@/store";
import type { DrawerProps } from "@/types/client";

import { createStyles } from "./styles";

export function Drawer({
	children,
	closeLabel = "Close sheet",
	defaultOpen = false,
	description,
	footer,
	onOpenChange,
	open,
	title,
}: DrawerProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? (open ?? false) : internalOpen;

	function setOpen(nextValue: boolean) {
		if (!isControlled) {
			setInternalOpen(nextValue);
		}

		onOpenChange?.(nextValue);
	}

	return (
		<Modal
			animationType="slide"
			onRequestClose={() => setOpen(false)}
			transparent
			visible={isOpen}
		>
			<View style={styles.frame}>
				<Pressable
					accessibilityRole="button"
					onPress={() => setOpen(false)}
					style={styles.overlay}
				/>

				<View style={styles.sheet}>
					<View style={styles.handle} />

					<View style={styles.header}>
						<View style={styles.copy}>
							{title ? (
								typeof title === "string" || typeof title === "number" ? (
									<Text style={styles.title}>{title}</Text>
								) : (
									title
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

						<Button
							accessibilityLabel={closeLabel}
							onPress={() => setOpen(false)}
							size="icon"
							title={closeLabel}
							variant="secondary"
						>
							<X
								color={theme.colors.text}
								size={16}
								strokeWidth={2}
							/>
						</Button>
					</View>

					<ScrollView
						contentContainerStyle={styles.body}
						showsVerticalScrollIndicator={false}
					>
						{children}
					</ScrollView>

					{footer ? <View style={styles.footer}>{footer}</View> : null}
				</View>
			</View>
		</Modal>
	);
}
