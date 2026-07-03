/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { BadgeTone } from "../components/primitives/display/badge";

export interface OrganizationalDetailsStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<BadgeTone>;
}
