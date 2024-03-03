/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { AppContext } from "../context/appContext";
import { ContextTypes } from "../types";
import axios from "axios";
import { ACCESS_KEY } from "../secrets/secrets";

const headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
};
const useFetchPopularImages = (searchQuery: string | null) => {
  const { setData, setHasMore } = useContext(AppContext) as ContextTypes;
  useEffect(() => {
    const fetchPopularImages = async () => {
      try {
        const resp = await axios.get(
          "https://api.unsplash.com/photos?order_by=popular&per_page=20",
          {
            headers,
          }
        );
        setData(resp.data);
        setHasMore(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!searchQuery) {
      fetchPopularImages();
    }
  }, [searchQuery]);
};

export default useFetchPopularImages;
