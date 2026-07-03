/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { StyleProp, ViewStyle } from "react-native";

export interface PrimitiveLoadingBlockProps {
	width?: ViewStyle["width"];
	height?: ViewStyle["height"];
	radius?: number;
	style?: StyleProp<ViewStyle>;
}
