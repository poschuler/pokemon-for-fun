import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useMemo } from "react";
import stylesheet from "~/tailwind.css?url";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Pokemon for fun" },
    { name: "Pokemon for fun", content: "Pokemon for fun" },
  ];
};

export default function AppWithProviders() {
  // const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      const states = [
        navigation.state,
        ...fetchers.map((fetcher) => {
          if (fetcher.key.startsWith("not-loading")) {
            return "idle";
          }
          return fetcher.state;
        }),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [navigation.state, fetchers]
  );

  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state]);

  return (
    // <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
    <App />
    // </ThemeProvider>
  );
}

// export async function loader({ request }: LoaderFunctionArgs) {
//   const { getTheme } = await themeSessionResolver(request);
//   return {
//     theme: getTheme(),
//   };
// }

export async function loader() {
  // response.status = 302;
  // response.headers.set("Location", "/search");
  // throw response;
  return null;
}

export function App() {
  // const data = useLoaderData<typeof loader>();
  // const [theme] = useTheme();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        {/* <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} /> */}
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
