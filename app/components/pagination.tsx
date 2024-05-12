import { Form } from "@remix-run/react";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationEllipsisForButton,
  PaginationItem,
  PaginationNextButton,
  PaginationPreviousButton,
} from "~/components/ui/pagination";
import { PageMeta } from "~/types/page.types";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

type ProductPaginationProps = {
  page: PageMeta;
};

export function PokemonPagination({ page }: ProductPaginationProps) {
  return (
    <Form>
      <ExistingSearchParams exclude={["page"]} />
      <Pagination>
        <PaginationContent>
          {page.hasPreviousPage && (
            <PaginationPreviousButton
              value={`${page.page - 1}`}
              name="page"
              type="submit"
            />
          )}

          {page.page > 10 && (
            <PaginationButton
              value={`${page.page - 10}`}
              name="page"
              className="hidden lg:inline"
              type="submit"
            >
              {page.page - 10}
            </PaginationButton>
          )}

          {page.page > 5 && (
            <PaginationEllipsisForButton className="hidden lg:inline" />
          )}

          {page.page > 1 && (
            <PaginationButton
              value={`${page.page - 1}`}
              name="page"
              type="submit"
            >
              {page.page - 1}
            </PaginationButton>
          )}

          <PaginationButton
            isActive
            value={`${page.page}`}
            name="page"
            type="submit"
          >
            {page.page}
          </PaginationButton>

          {page.page < page.pageCount && (
            <PaginationButton
              value={`${page.page + 1}`}
              name="page"
              type="submit"
            >
              {page.page + 1}
            </PaginationButton>
          )}

          {page.pageCount - page.page > 5 && (
            <PaginationEllipsisForButton className="hidden lg:inline" />
          )}

          {page.page + 10 <= page.pageCount && (
            <PaginationButton
              value={`${page.page + 10}`}
              name="page"
              className="hidden lg:inline"
              type="submit"
            >
              {page.page + 10}
            </PaginationButton>
          )}

          {page.hasNextPage && (
            <PaginationNextButton
              value={`${page.page + 1}`}
              name="page"
              type="submit"
            />
          )}
        </PaginationContent>
      </Pagination>
    </Form>
  );
}
