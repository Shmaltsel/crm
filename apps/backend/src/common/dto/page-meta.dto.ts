export class PageMetaDto {
  totalItems: number;
  page: number;
  take: number;
  pageCount: number;
  hasNextPage: boolean;

  constructor(totalItems: number, page: number, take: number) {
    this.totalItems = totalItems;
    this.page = page;
    this.take = take;
    this.pageCount = Math.ceil(totalItems / take);
    this.hasNextPage = page < this.pageCount;
  }
}
