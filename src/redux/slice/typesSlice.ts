
export interface BooksSliceTypes {
    books:BooksTypes[];
    status:string;
    categori:string;
    title:string;
}
export interface BooksTypes {
    categories:Array<string> | string;
    title:string;
    authors: string | string[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    img?:string
}