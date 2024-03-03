import { useContext, useEffect, useState } from "react";
import { AppContext, ContextTypes } from "../context/appContext";
import { ACCESS_KEY } from "../secrets/secrets";
import axios from "axios";

const headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
};

const useFetchImages = (query: string, pageNum: number) => {
  const endpoint = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${pageNum}`;
  const [loading, setLoading] = useState(false);
  const { data, setData, setHasMore, hasMore, apiCache, cacheData } =
    useContext(AppContext) as ContextTypes;

  const scrollIntoImageListView = () => {
    document
      .querySelector(`#image_list`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const cachedResult = apiCache.find((item) => item.query === query);
    if (cachedResult && pageNum === 1) {
      setData(cachedResult.data);
      setLoading(false);
      setHasMore(true);
      // scrollIntoImageListView();
    } else {
      axios
        .get(endpoint, { headers })
        .then((res) => {
          setLoading(false);
          setHasMore(true);
          setData((prev) => [...prev, ...res.data.results]);
          cacheData(query, res.data.results);
          scrollIntoImageListView();
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
        });
    }
  }, [query, pageNum]);
  return { loading, data, hasMore };
};

export default useFetchImages;
