import classes from "../../styles/ImageList.module.css";
import { useQuery } from "@tanstack/react-query";

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
const ImageList = () => {
  const popularImagesQuery = useQuery({
    queryKey: ["popularImages"],
    queryFn: fetchPopularImages,
  });
  const searchResultsQuery = useQuery({
    queryKey: ["searchResults"],
    queryFn: () => fetchSearchResults("beach"),
    enabled: !!"zebra",
  });

  // eslint-disable-next-line no-constant-condition
  const imagesToShow = "zebra"
    ? searchResultsQuery.data
    : popularImagesQuery.data;

  return (
    <div className={classes.image_list}>
      {imagesToShow &&
        imagesToShow.results.map((image: { urls: { regular: string } }) => {
          return <img src={image.urls.regular} alt="sd" />;
        })}
    </div>
  );
};

export default ImageList;
