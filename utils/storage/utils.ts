/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import type { SecureStoreModule } from "@/types/client";

const memoryStorage = new Map<string, string>();

function getSecureStore(): SecureStoreModule | null {
	if (Platform.OS === "web") {
		return null;
	}

	try {
		const secureStore = SecureStore;

		if (
			secureStore &&
			typeof secureStore.getItemAsync === "function" &&
			typeof secureStore.setItemAsync === "function" &&
			typeof secureStore.deleteItemAsync === "function"
		) {
			return secureStore as SecureStoreModule;
		}
	} catch {
		// Ignore secure store availability failures and fall back.
	}

	return null;
}

function hasWebStorage() {
	return (
		typeof window !== "undefined" && typeof window.localStorage !== "undefined"
	);
}

export async function getStoredValue(key: string): Promise<string | null> {
	const secureStore = getSecureStore();
	if (secureStore) {
		try {
			return await secureStore.getItemAsync(key);
		} catch {
			// Ignore secure store read failures and fall back.
		}
	}

	if (hasWebStorage()) {
		return window.localStorage.getItem(key);
	}

	return memoryStorage.get(key) ?? null;
}

export async function setStoredValue(
	key: string,
	value: string,
): Promise<void> {
	const secureStore = getSecureStore();
	if (secureStore) {
		try {
			await secureStore.setItemAsync(key, value);
			return;
		} catch {
			// Ignore secure store write failures and fall back.
		}
	}

	if (hasWebStorage()) {
		window.localStorage.setItem(key, value);
		return;
	}

	memoryStorage.set(key, value);
}

export async function removeStoredValue(key: string): Promise<void> {
	const secureStore = getSecureStore();
	if (secureStore) {
		try {
			await secureStore.deleteItemAsync(key);
			return;
		} catch {
			// Ignore secure store delete failures and fall back.
		}
	}

	if (hasWebStorage()) {
		window.localStorage.removeItem(key);
		return;
	}

	memoryStorage.delete(key);
}
