import { Platform } from "react-native";

const SECURE_STORE_MODULE_NAME = "expo-secure-store";

type SecureStoreModule = {
	getItemAsync(key: string): Promise<string | null>;
	setItemAsync(key: string, value: string): Promise<void>;
	deleteItemAsync(key: string): Promise<void>;
};

const memoryStorage = new Map<string, string>();

async function getSecureStore(): Promise<SecureStoreModule | null> {
	if (Platform.OS === "web") {
		return null;
	}

	try {
		const module = await import(SECURE_STORE_MODULE_NAME);
		const secureStore = "default" in module ? module.default : module;

		if (
			secureStore &&
			typeof secureStore.getItemAsync === "function" &&
			typeof secureStore.setItemAsync === "function" &&
			typeof secureStore.deleteItemAsync === "function"
		) {
			return secureStore as SecureStoreModule;
		}

		return null;
	} catch {
		return null;
	}
}

function hasWebStorage() {
	return (
		typeof window !== "undefined" && typeof window.localStorage !== "undefined"
	);
}

export async function getStoredValue(key: string): Promise<string | null> {
	const secureStore = await getSecureStore();
	if (secureStore) {
		return secureStore.getItemAsync(key);
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
	const secureStore = await getSecureStore();
	if (secureStore) {
		await secureStore.setItemAsync(key, value);
		return;
	}

	if (hasWebStorage()) {
		window.localStorage.setItem(key, value);
		return;
	}

	memoryStorage.set(key, value);
}

export async function removeStoredValue(key: string): Promise<void> {
	const secureStore = await getSecureStore();
	if (secureStore) {
		await secureStore.deleteItemAsync(key);
		return;
	}

	if (hasWebStorage()) {
		window.localStorage.removeItem(key);
		return;
	}

	memoryStorage.delete(key);
}
