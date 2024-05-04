import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "~/session.server";
import stylesheet from "~/tailwind.css?url";

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
