import classes from "../../styles/Image.module.css";
import { AppContext, ContextTypes } from "../../context/appContext";
import { useCallback, useContext, useRef } from "react";

const Image = ({
  url,
  id,
  index,
  loading,
  hasMore,
}: {
  url: string;
  id: string;
  index: number;
  loading: boolean;
  hasMore: boolean;
}) => {
  const { setShowModal, setPhotoId, data, setPageNum } = useContext(
    AppContext
  ) as ContextTypes;
  const observer = useRef();

  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible");
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div
      className={classes.image_cont}
      onClick={() => {
        setShowModal(true);
        setPhotoId(id);
      }}
    >
      {data.length == index + 1 ? (
        <img
          ref={lastImageElementRef}
          src={url}
          className={classes.image}
          alt="image"
          loading="lazy"
        />
      ) : (
        <img src={url} className={classes.image} alt="image" loading="lazy" />
      )}
    </div>
  );
};

export default Image;
