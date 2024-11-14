import { metaFn } from "../Api/metadata";
import { useQuery } from "@tanstack/react-query";

export const metaQuery = (url, isEnabled) => {
  return useQuery({
    queryKey: ["METATAGS", url],
    queryFn: () => metaFn(url),
    enabled: isEnabled, // Only fetch when enabled is true
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
