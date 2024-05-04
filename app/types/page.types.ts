type PageOptions = {
  page: number;
  take: number;
  skip: number;
};

export const createPageOptions = (page: number, take: number): PageOptions => {
  let skip = (page - 1) * take;
  return { page, take, skip };
};

type PageMetaParameters = {
  pageOptions: PageOptions;
  itemCount: number;
};

export type PageMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export const createPageMeta = ({
  pageOptions,
  itemCount,
}: PageMetaParameters): PageMeta => {
  let { page, take } = pageOptions;
  let pageCount = Math.ceil(itemCount / take);
  let hasPreviousPage = page > 1;
  let hasNextPage = page < pageCount;
  return { page, take, itemCount, pageCount, hasPreviousPage, hasNextPage };
};

type Page<T> = {
  data: T[];
  meta: PageMeta;
};

export const createPage = <T>(data: T[], meta: PageMeta): Page<T> => {
  return { data, meta };
};
