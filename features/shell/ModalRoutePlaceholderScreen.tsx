/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { View } from "react-native";

import { Badge, Button, Label, ModalScreenScaffold } from "@/components";
import { HeaderActionButton } from "@/components/composite";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ModalRoutePlaceholderScreenProps } from "@/types/client";

import { MODAL_ROUTE_PLACEHOLDER_DEFAULT_DESCRIPTION } from "./constants";
import { createStyles } from "./styles";

export function ModalRoutePlaceholderScreen({
	title,
	subtitle,
	description = MODAL_ROUTE_PLACEHOLDER_DEFAULT_DESCRIPTION,
}: ModalRoutePlaceholderScreenProps) {
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const scaffoldProps = subtitle ? { subtitle } : {};

	return (
		<ModalScreenScaffold
			footer={
				<Button
					variant="secondary"
					onPress={() => {
						router.back();
					}}
				>
					Close
				</Button>
			}
			leftAccessory={
				<HeaderActionButton
					accessibilityLabel="Close modal"
					icon={X}
					onPress={() => {
						router.back();
					}}
				/>
			}
			title={title}
			{...scaffoldProps}
		>
			<View style={styles.panel}>
				<Badge
					style={styles.badge}
					variant="secondary"
				>
					Modal scaffold
				</Badge>

				<View style={styles.body}>
					<Label role="field">{title}</Label>
					<Label role="helper">{description}</Label>
				</View>
			</View>
		</ModalScreenScaffold>
	);
}
