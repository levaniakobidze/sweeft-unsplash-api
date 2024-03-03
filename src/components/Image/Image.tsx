import classes from "../../styles/Image.module.css";
import { AppContext } from "../../context/appContext";
import { ContextTypes } from "../../types";
import { FC, RefCallback, useCallback, useContext } from "react";

interface Iprops {
  url: string;
  id: string;
  index: number;
  loading: boolean;
  hasMore: boolean;
}

const Image: FC<Iprops> = ({ url, id, index, loading, hasMore }) => {
  const { setShowModal, setPhotoId, data, setPageNum } = useContext(
    AppContext
  ) as ContextTypes;

  type LastElementRefProps = RefCallback<Element>;

  const lastElementRef: LastElementRefProps = useCallback(
    (node) => {
      if (loading) return;
      const observer = { current: null as IntersectionObserver | null };
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNum((prev) => prev + 1);
          }
        }
      );
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
          ref={lastElementRef}
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
