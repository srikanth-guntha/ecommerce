import { Book } from './book';

export const localStorageMock = (function () {
  let store: any = {
    cart: [],
    searchVal: '',
    collection: [],
    badgeNumber: 0,
  };

  return {
    getItem(key: any): any {
      return store[key];
    },

    setItem(key: string, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      console.log(store);
    },
  };
})();

export const bookInfo: Book = {
  id: 'angular',
  volumeInfo: {
    authors: ['abcd'],
    imageLinks: {
      smallThumbnail: '',
      thumbnail: '',
    },
    language: 'en',
    pageCount: 2,
    printedPageCount: 2,
    publisher: '',
    title: 'Angualr book',
    subtitle: '',
    description: 'about angular',
  },
};
