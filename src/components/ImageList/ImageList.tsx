import classes from "../../styles/ImageList.module.css";
import { useQuery } from "@tanstack/react-query";
import { AppContext, ContextTypes } from "../../context/appContext";
import { FC, useContext } from "react";

const ACCESS_KEY = "V3hDjjYMyCQNwuWAWgdFvo-OrqFRsGK3jjeqh8RbCqU";

const fetchPopularImages = () =>
  fetch("https://api.unsplash.com/photos?order_by=popular&per_page=20", {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  }).then((res) => res.json());

const fetchSearchResults = (query: string) => {
  return fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=20`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  ).then((res) => res.json());
};
const ImageList: FC = () => {
  const { searchQuery } = useContext(AppContext) as ContextTypes;

  const popularImagesQuery = useQuery({
    queryKey: ["popularImages"],
    queryFn: fetchPopularImages,
  });
  const searchResultsQuery = useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
    // enabled: !!searchQuery,
    staleTime: 0,
  });

  // eslint-disable-next-line no-constant-condition
  const imagesToShow =
    searchQuery !== "" && searchResultsQuery.data
      ? searchResultsQuery.data.results
      : popularImagesQuery.data;

  return (
    <div className={classes.image_list}>
      {imagesToShow &&
        imagesToShow.map((image: { urls: { regular: string } }) => {
          return searchResultsQuery.isFetching ? (
            <div className="app">
              <div className="card">
                <div className="card__image"></div>
              </div>
            </div>
          ) : (
            <img src={image.urls.regular} alt="sd" loading="lazy" />
          );
        })}
    </div>
  );
};

export default ImageList;
