export interface Book {
  id: string;
  volumeInfo?: volumeInfo;
}

export interface volumeInfo {
  authors: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  pageCount: number;
  printedPageCount?: number;
  publisher?: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface Books {
  items: Book[];
  kind: string;
}
