import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { useHydrated } from "remix-utils/use-hydrated";

import { Button } from "./ui/button";
import clsx from "clsx";
import { useRouteLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "~/root";

export function ModeToggle({ className }: { className?: string }) {
  let isHydrated = useHydrated();
  let [theme, setTheme] = useTheme();
  let data = useRouteLoaderData<typeof rootLoader>("root");

  let toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  if (isHydrated) {
    return (
      <Button
        variant="link"
        size="icon"
        className={clsx(
          "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground",
          className ? className : ""
        )}
        onClick={toggleTheme}
      >
        {theme === Theme.LIGHT && <Moon className="h-5 w-5" />}

        {theme === Theme.DARK && <Sun className="h-5 w-5" />}
      </Button>
    );
  }

  return (
    <Button
      variant="link"
      size="icon"
      className={clsx(
        "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground",
        className ? className : ""
      )}
    >
      {(data.theme === Theme.LIGHT || data.theme === null) && (
        <Moon className="h-5 w-5" />
      )}

      {data.theme === Theme.DARK && <Sun className="h-5 w-5" />}
    </Button>
  );
}
