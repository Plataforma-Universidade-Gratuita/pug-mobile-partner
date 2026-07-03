/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export type FeedbackTone = "success" | "danger" | "warning" | "info";

export interface FeedbackOptions {
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
}

export interface FeedbackMessage extends FeedbackOptions {
	id: string;
	tone: FeedbackTone;
	title: string;
}

export interface FeedbackStoreState {
	current: FeedbackMessage | null;
	showFeedback: (message: Omit<FeedbackMessage, "id">) => void;
	showSuccess: (title: string, options?: FeedbackOptions) => void;
	showDanger: (title: string, options?: FeedbackOptions) => void;
	showWarning: (title: string, options?: FeedbackOptions) => void;
	showInfo: (title: string, options?: FeedbackOptions) => void;
	dismissFeedback: () => void;
}

export interface ApiFeedbackContent {
	title: string;
	description: string;
}

export interface ApiFeedbackContentOptions {
	fallbackTitle: string;
	fallbackDescription: string;
}

export interface QueryErrorFeedbackDescriptor {
	key: string;
	isError: boolean;
	error: unknown;
	errorUpdatedAt: number;
	getContent: (error: unknown) => ApiFeedbackContent;
}
