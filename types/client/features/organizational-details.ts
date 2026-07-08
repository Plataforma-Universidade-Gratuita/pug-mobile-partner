
import type { BadgeTone } from "../components/primitives/display/badge";

export interface OrganizationalDetailsStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<BadgeTone>;
}
