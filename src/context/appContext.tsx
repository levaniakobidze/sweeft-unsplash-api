import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
interface Props {
  children: ReactNode;
}

interface ImagData {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
}
interface IpiCache {
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

export const AppContext = createContext<ContextTypes | null>(null);

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([""]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string>("");
  const [data, setData] = useState<ImagData[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [apiCache, setApiCache] = useState<IpiCache[]>([]);

  const cacheData = (query: string, data: ImagData[]) => {
    setApiCache((prevCache) => [...prevCache, { query, data }]);
  };

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchHistory,
        setSearchHistory,
        showModal,
        setShowModal,
        photoId,
        setPhotoId,
        data,
        setData,
        setPageNum,
        pageNum,
        hasMore,
        setHasMore,
        apiCache,
        setApiCache,
        cacheData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
