import { Form, useSearchParams } from "@remix-run/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { PageMeta } from "~/types/page.types";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

type ProductPaginationProps = {
  page: PageMeta;
};

export function PokemonPagination({ page }: ProductPaginationProps) {
  let [, setSearchParams] = useSearchParams();

  return (
    <>
      <ExistingSearchParams exclude={["page"]} />
      <Pagination>
        <PaginationContent>
          {page.hasPreviousPage && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setSearchParams({ page: `${page.page - 1}` })}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}

          {page.page > 10 && (
            <PaginationItem className="hidden lg:inline">
              <PaginationLink
                onClick={() => setSearchParams({ page: `${page.page - 10}` })}
                className="cursor-pointer"
              >
                {page.page - 10}
              </PaginationLink>
            </PaginationItem>
          )}

          {page.page > 5 && (
            <PaginationItem className="hidden lg:inline">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page.page > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => setSearchParams({ page: `${page.page - 1}` })}
                className="cursor-pointer"
              >
                {page.page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{page.page}</PaginationLink>
          </PaginationItem>

          {page.page < page.pageCount && (
            <PaginationItem>
              <PaginationLink
                onClick={() => setSearchParams({ page: `${page.page + 1}` })}
                className="cursor-pointer"
              >
                {page.page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {page.pageCount - page.page > 5 && (
            <PaginationItem className="hidden lg:inline">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page.page + 10 <= page.pageCount && (
            <PaginationItem className="hidden lg:inline">
              <PaginationLink
                onClick={() => setSearchParams({ page: `${page.page + 10}` })}
                className="cursor-pointer"
              >
                {page.page + 10}
              </PaginationLink>
            </PaginationItem>
          )}

          {page.hasNextPage && (
            <PaginationItem>
              <PaginationNext
                onClick={() => setSearchParams({ page: `${page.page + 1}` })}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
