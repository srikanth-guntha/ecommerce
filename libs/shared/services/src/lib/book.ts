export interface Book {
  etag: string;
  embeddable: boolean;
  id: string;
  selfLink: string;
  volumeInfo: volumeInfo;
}

export interface volumeInfo {
  authors: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  pageCount: number;
  publisher: string;
  subtitle: string;
  title: string;
  description: string;
}
