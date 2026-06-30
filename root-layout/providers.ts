import { QueryClient } from "@tanstack/react-query";

import { DEFAULT_LANG, APP_QUERY_CLIENT_OPTIONS } from "@/constants";
import { initI18n } from "@/i18n";

export const APP_I18N = initI18n(DEFAULT_LANG);
export const APP_QUERY_CLIENT = new QueryClient(APP_QUERY_CLIENT_OPTIONS);
