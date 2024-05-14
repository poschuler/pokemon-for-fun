import { useLocation } from "@remix-run/react";

export function useBuildSearchParams() {
  const location = useLocation();
  return (name: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(name, value);

    return `?${searchParams.toString()}`;
  };
}
