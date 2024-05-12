import {
  Form,
  useFetchers,
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
  useSubmit,
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
import { useDebounceCallback } from "usehooks-ts";
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

  let [searchParams] = useSearchParams();
  let submit = useSubmit();
  let query = searchParams.get("q") ?? "";

  let debouncedSubmit = useDebounceCallback(submit, 500);
  let navigation = useNavigation();

  //let isPending = navigation.state === "loading";
  console.log(navigation.location?.search);

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
              <Form
                className="relative flex-1"
                onChange={(event) => {
                  debouncedSubmit(event.currentTarget);
                }}
              >
                <LucideSearch className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="q"
                  defaultValue={query}
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8"
                />
              </Form>
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
