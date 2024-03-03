import { Dispatch, SetStateAction } from "react";
export interface ImagData {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
}
export interface IpiCache {
  query: string;
  data: ImagData[];
}

export interface ContextTypes {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchHistory: string[];
  setSearchHistory: Dispatch<SetStateAction<string[]>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  photoId: string;
  setPhotoId: Dispatch<SetStateAction<string>>;
  data: ImagData[];
  setData: Dispatch<SetStateAction<ImagData[]>>;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  apiCache: IpiCache[];
  setApiCache: Dispatch<SetStateAction<IpiCache[]>>;
  cacheData: (query: string, data: ImagData[]) => void;
}
