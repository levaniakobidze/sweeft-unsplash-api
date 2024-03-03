import { FC, useContext } from "react";
import classes from "../../styles/ImageList.module.css";
import { AppContext, ContextTypes } from "../../context/appContext";
import Image from "../Image/Image";
import ImageModal from "../ImageModal/ImageModal";
import useFetchImages from "../../hooks/useFetchImages";
import useFetchPopularImages from "../../hooks/useFetchPopularImages";

const ImageList: FC = () => {
  const { searchQuery, showModal, pageNum } = useContext(
    AppContext
  ) as ContextTypes;

  const { data, loading, hasMore } = useFetchImages(searchQuery, pageNum);
  useFetchPopularImages(searchQuery);

  const renderImage = (
    image: { id: string; urls: { regular: string } },
    index: number
  ) => (
    <div key={index}>
      {loading ? (
        <div className="app">
          <div className="card">
            <div className="card__image"></div>
          </div>
        </div>
      ) : (
        <Image
          key={image.id}
          url={image.urls.regular}
          id={image.id}
          index={index}
          loading={loading}
          hasMore={hasMore}
        />
      )}
    </div>
  );

  return (
    <>
      {showModal && <ImageModal />}
      <div id="image_list" className={classes.image_list}>
        {Array.isArray(data) && data.length > 0 && data.map(renderImage)}
      </div>
    </>
  );
};

export default ImageList;
