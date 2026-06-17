import { QueryClient } from "@tanstack/react-query";

import { DEFAULT_LANG } from "@/constants/locale";
import { APP_QUERY_CLIENT_OPTIONS } from "@/constants/react-query";
import { initI18n } from "@/utils/locale";

export const APP_I18N = initI18n(DEFAULT_LANG);
export const APP_QUERY_CLIENT = new QueryClient(APP_QUERY_CLIENT_OPTIONS);
