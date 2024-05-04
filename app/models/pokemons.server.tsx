import mongoClient from "~/db.server";
import {
  createPage,
  createPageMeta,
  createPageOptions,
} from "~/types/page.types";

export type PokemonType = {
  id: number;
  moves: {
    move: {
      name: string;
    };
  }[];
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
        front_shiny: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export type PokemonListItemType = {
  id: number;
  name: string;
  imageUrl: string;
};

export async function getPokemons({
  page = 1,
  take,
  q,
}: {
  page: number;
  take: number;
  q: string;
}) {
  let pageOptions = createPageOptions(page, take);
  let filter = q ? { name: { $regex: new RegExp(q, "i") } } : {};

  let elementsCount = await mongoClient
    .db()
    .collection("pokemons")
    .countDocuments(filter);

  let elementes = await mongoClient
    .db()
    .collection("pokemons")
    .aggregate<PokemonListItemType>([
      {
        $match: filter,
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          imageUrl: "$sprites.other.official-artwork.front_default",
        },
      },
      {
        $skip: pageOptions.skip,
      },
      {
        $limit: pageOptions.take,
      },
    ])
    .toArray();

  let itemCount = elementsCount;
  let entities = elementes;

  let pageMeta = createPageMeta({ itemCount, pageOptions });

  return createPage(entities, pageMeta);
}
