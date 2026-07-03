/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectEntityCardProps } from "@/types/client";

import { createStyles } from "./styles";
import { getProjectStaffInitials } from "./utils";

export function ProjectEntityCard({
	entityName,
	addressValue,
	cnpjValue,
	cityValue,
	isLoading = false,
	staffItems,
	staffStateLabel,
}: ProjectEntityCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.entitySection}>
			{isLoading ? (
				<LoadingBlock
					width={136}
					height={18}
				/>
			) : (
				<Label
					role="field"
					style={styles.sectionTitle}
				>
					{t("projectDetail.sections.entity")}
				</Label>
			)}

			<View style={styles.entityHeaderBlock}>
				{isLoading ? (
					<LoadingBlock
						width="54%"
						height={24}
					/>
				) : (
					<Label
						role="title"
						style={styles.entityTitle}
					>
						{entityName}
					</Label>
				)}
				<View style={styles.entityMetaGrid}>
					<View
						style={[
							styles.entityMetaCard,
							styles.entityCityCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<Label role="helper">{t("projectDetail.entity.city")}</Label>
						{isLoading ? (
							<LoadingBlock
								width="78%"
								height={18}
							/>
						) : (
							<Label role="field">{cityValue}</Label>
						)}
					</View>
					<View
						style={[
							styles.entityMetaCard,
							styles.entityCnpjCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<Label role="helper">{t("projectDetail.entity.cnpj")}</Label>
						{isLoading ? (
							<LoadingBlock
								width="78%"
								height={18}
							/>
						) : (
							<Label role="field">{cnpjValue}</Label>
						)}
					</View>
				</View>
				{addressValue || isLoading ? (
					<View
						style={[
							styles.entityAddressCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<Label role="helper">{t("projectDetail.entity.address")}</Label>
						{isLoading ? (
							<LoadingBlock
								width="94%"
								height={18}
							/>
						) : (
							<Label role="field">{addressValue}</Label>
						)}
					</View>
				) : null}
			</View>

			<View style={styles.staffBlock}>
				{isLoading ? (
					<LoadingBlock
						width={124}
						height={18}
					/>
				) : (
					<Label
						role="field"
						style={styles.staffTitle}
					>
						{t("projectDetail.entity.staff")}
					</Label>
				)}
				{isLoading ? (
					<View style={styles.staffList}>
						{["one", "two"].map(key => (
							<View
								key={key}
								style={[
									styles.staffItem,
									{
										backgroundColor: theme.colors.surface2,
										borderColor: spec.panelBorder,
									},
								]}
							>
								<LoadingBlock
									width={44}
									height={44}
									radius={theme.radius.circle}
								/>
								<View style={styles.staffCopy}>
									<LoadingBlock
										width="52%"
										height={18}
									/>
									<LoadingBlock
										width="76%"
										height={14}
									/>
								</View>
							</View>
						))}
					</View>
				) : staffItems.length > 0 ? (
					<View style={styles.staffList}>
						{staffItems.map(staffItem => (
							<View
								key={`${staffItem.name}-${staffItem.email}`}
								style={[
									styles.staffItem,
									{
										backgroundColor: theme.colors.surface2,
										borderColor: spec.panelBorder,
									},
								]}
							>
								<View
									style={[
										styles.staffAvatar,
										{
											backgroundColor: theme.colors.surface3,
											borderColor: spec.panelBorder,
										},
									]}
								>
									<Label
										role="field"
										style={styles.staffAvatarText}
									>
										{getProjectStaffInitials(staffItem.name)}
									</Label>
								</View>
								<View style={styles.staffCopy}>
									<Label role="field">{staffItem.name}</Label>
									<Label
										role="helper"
										style={styles.staffEmail}
									>
										{staffItem.email}
									</Label>
								</View>
							</View>
						))}
					</View>
				) : (
					<Label role="field">{staffStateLabel}</Label>
				)}
			</View>
		</View>
	);
}
