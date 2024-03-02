import classes from "../../styles/ImageList.module.css";
import { AppContext, ContextTypes } from "../../context/appContext";
import { FC, useContext } from "react";
import Image from "../Image/Image";
import ImageModal from "../ImageModal/ImageModal";
import { useEffect } from "react";
import axios from "axios";
import useFetchImages from "../../hooks/useFetchImages";
import { ACCESS_KEY } from "../../secrets/secrets";

const headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
};

const ImageList: FC = () => {
  const { setData, searchQuery, showModal, pageNum, setHasMore } = useContext(
    AppContext
  ) as ContextTypes;
  const { data, loading, hasMore } = useFetchImages(searchQuery, pageNum);

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

  useEffect(() => {
    fetchPopularImages();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      fetchPopularImages();
    }
  }, [searchQuery]);
  return (
    <>
      {showModal && <ImageModal />}
      <div className={classes.image_list}>
        {typeof data === "object" &&
          data.length > 0 &&
          data.map(
            (
              image: { id: string; urls: { regular: string } },
              index: number
            ) => {
              return (
                <div>
                  {loading ? (
                    <div className="app">
                      <div className="card">
                        <div className="card__image"></div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      key={index}
                      url={image.urls.regular}
                      id={image.id}
                      index={index}
                      loading={loading}
                      hasMore={hasMore}
                    />
                  )}
                </div>
              );
            }
          )}
      </div>
    </>
  );
};

export default ImageList;
