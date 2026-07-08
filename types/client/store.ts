import type {
	AccountResponse,
	CredentialsRequest,
	EntityResponse,
	LoginRequest,
	StaffResponse,
	TokenResponse,
	UserResponse,
} from "@/types/api";

import type { PugJwtPayload, StoredSessionTokens } from "./auth";
import type { AppLang } from "./context";
import type { AppResolvedTheme, AppTheme, ResolvedThemeMode } from "./theme";

export interface SecureStoreModule {
	getItemAsync: (key: string) => Promise<string | null>;
	setItemAsync: (key: string, value: string) => Promise<void>;
	deleteItemAsync: (key: string) => Promise<void>;
}

export interface AuthStoreState {
	isAuthenticated: boolean;
	isBootstrapping: boolean;
	isMutatingSession: boolean;
	requiresCredentialSetup: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	sessionPayload: PugJwtPayload | null;
	bootstrapSession: () => Promise<boolean>;
	refreshSession: () => Promise<TokenResponse>;
	signIn: (credentials: LoginRequest) => Promise<TokenResponse>;
	completeCredentialSetup: (body: CredentialsRequest) => Promise<void>;
	signOut: () => Promise<void>;
	signOutAll: () => Promise<void>;
	setSession: (tokens: StoredSessionTokens, payload: PugJwtPayload) => void;
	setRequiresCredentialSetup: (value: boolean) => void;
	clearSessionState: () => void;
}

export interface CurrentStaffStoreState {
	currentAccount: AccountResponse | null;
	currentUser: UserResponse | null;
	currentStaff: StaffResponse | null;
	currentEntity: EntityResponse | null;
	isLoading: boolean;
	isLoaded: boolean;
	error: string | null;
	loadCurrentStaffContext: () => Promise<void>;
	refreshCurrentStaffContext: () => Promise<void>;
	clearCurrentStaffContext: () => void;
}

export interface ThemeStoreState {
	mode: AppTheme;
	systemMode: ResolvedThemeMode;
	resolvedMode: ResolvedThemeMode;
	theme: AppResolvedTheme;
	isHydrated: boolean;
	hydrateTheme: () => Promise<void>;
	setMode: (mode: AppTheme) => Promise<void>;
	setSystemMode: (mode: ResolvedThemeMode) => void;
}

export interface LocaleStoreState {
	language: AppLang;
	isHydrated: boolean;
	hydrateLanguage: () => Promise<void>;
	setLanguage: (language: AppLang) => Promise<void>;
}
