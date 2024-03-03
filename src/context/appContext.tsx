import { createContext, useState, ReactNode, useEffect } from "react";
import { IpiCache, ImagData, ContextTypes } from "../types";
interface Props {
  children: ReactNode;
}

export const AppContext = createContext<ContextTypes | null>(null);
const searchHistoryFromStorageRaw = localStorage.getItem("search_history");
const searchHistoryFromStorage = searchHistoryFromStorageRaw
  ? JSON.parse(searchHistoryFromStorageRaw)
  : [];
const apiCacheFromStorageRaw = localStorage.getItem("api_cache");
const apiCacheFromStorage = apiCacheFromStorageRaw
  ? JSON.parse(apiCacheFromStorageRaw)
  : [];
const ContextProvider: React.FC<Props> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>(
    searchHistoryFromStorage ? searchHistoryFromStorage : [""]
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string>("");
  const [data, setData] = useState<ImagData[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [apiCache, setApiCache] = useState<IpiCache[]>(
    apiCacheFromStorage ? apiCacheFromStorage : []
  );

  const cacheData = (query: string, data: ImagData[]) => {
    setApiCache((prevCache) => [...prevCache, { query, data }]);
  };

  useEffect(() => {
    const jsonSearchHistory = JSON.stringify(searchHistory);
    const jsonApiCache = JSON.stringify(apiCache);
    window.localStorage.setItem("search_history", jsonSearchHistory);
    window.localStorage.setItem("api_cache", jsonApiCache);
  }, [searchHistory]);

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
