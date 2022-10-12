export interface Book {
  title: string;
  isbn?: string;
  pageCount?: number;
  published?: {
    $date: string;
    price: number;
    currency: string;
  };
  thumbnailUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  status?: string;
  authors?: Array<string>;
  categories?: Array<string>;
}
