import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import Layout from "~/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Loader2, Search as LucideSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { LoaderFunctionArgs } from "@remix-run/node";
import { PokemonListItemType, getPokemons } from "~/models/pokemons.server";
import { z } from "zod";
import { PageMeta } from "~/types/page.types";
import { PokemonPagination } from "~/components/pagination";

type LoaderData = {
  pokemons: Array<PokemonListItemType>;
  pageMeta: PageMeta;
};

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let query = url.searchParams.get("q") ?? "";
  let page = z.coerce.number().parse(url.searchParams.get("page") ?? 1);
  let take = 40;

  let { data: pokemons, meta } = await getPokemons({
    page,
    take,
    q: query,
  });

  return {
    pokemons,
    pageMeta: meta,
  };
}

export default function Search() {
  let { pokemons, pageMeta } = useLoaderData() as LoaderData;

  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = useState(() => {
    return searchParams.get("query") ?? "";
  });
  let [debouncedQuery] = useDebounceValue(query, 1000);
  let navigation = useNavigation();

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setSearchParams({ page: searchParams.get("page") ?? "1" });
      return;
    }
    setSearchParams({ q: debouncedQuery });
  }, [debouncedQuery, setSearchParams, searchParams]);

  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-1">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">Seach for pokemons</CardTitle>
            <CardDescription className="sr-only">
              Seach for pokemons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="relative flex-1">
                <LucideSearch className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="query"
                  defaultValue={query}
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8"
                  onChange={(e) => setQuery(e.target.value)}
                />
                {navigation.state === "loading" && (
                  <Loader2 className="absolute right-2.5 top-2 h-6 w-6 animate-spin text-muted-foreground" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {pageMeta.pageCount > 1 && <PokemonPagination page={pageMeta} />}

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>

      {pageMeta.pageCount > 1 && <PokemonPagination page={pageMeta} />}
    </Layout>
  );
}

export function PokemonCard({ pokemon }: { pokemon: PokemonListItemType }) {
  return (
    <Card className="">
      <CardHeader className="sr-only">
        <CardTitle className="sr-only">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="h-52 object-cover md:h-full md:w-48"
        />
      </CardContent>
      <CardFooter className="grid gap-3">
        <p className="text-center text-2xl font-medium leading-none">
          # {pokemon.id}
        </p>
        <p className="text-center text-2xl font-medium leading-none capitalize">
          {pokemon.name}
        </p>
      </CardFooter>
    </Card>
  );
}
