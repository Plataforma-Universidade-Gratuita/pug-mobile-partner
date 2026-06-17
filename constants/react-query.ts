import type { QueryClientConfig } from "@tanstack/react-query";

export const QUERY_DEFAULT_RETRY_COUNT = 1;
export const QUERY_DEFAULT_STALE_TIME_MS = 1000 * 60 * 5;

export const APP_QUERY_CLIENT_OPTIONS = {
	defaultOptions: {
		queries: {
			retry: QUERY_DEFAULT_RETRY_COUNT,
			staleTime: QUERY_DEFAULT_STALE_TIME_MS,
			refetchOnWindowFocus: false,
		},
	},
} satisfies QueryClientConfig;
