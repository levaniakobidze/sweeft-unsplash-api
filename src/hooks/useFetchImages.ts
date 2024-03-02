import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext, ContextTypes } from "../context/appContext";

const ACCESS_KEY = "V3hDjjYMyCQNwuWAWgdFvo-OrqFRsGK3jjeqh8RbCqU";
const headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
};

const useFetchImages = (query: string, pageNum: number) => {
  const [loading, setLoading] = useState(false);
  const { data, setData, setHasMore, hasMore } = useContext(
    AppContext
  ) as ContextTypes;

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${pageNum}`,
        { headers }
      )
      .then((res) => {
        setLoading(false);
        setHasMore(true);
        setData((prev) => [...prev, ...res.data.results]);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
      });
  }, [query, pageNum]);
  return { loading, data, hasMore };
};

export default useFetchImages;
