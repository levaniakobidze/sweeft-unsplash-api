import classes from "../../styles/ImageModal.module.css";
import { AppContext, ContextTypes } from "../../context/appContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const ACCESS_KEY = "V3hDjjYMyCQNwuWAWgdFvo-OrqFRsGK3jjeqh8RbCqU";

const fetchPopularImages = (id: string) =>
  fetch(`https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  }).then((res) => res.json());

const ImageModal = () => {
  const { setShowModal, photoId } = useContext(AppContext) as ContextTypes;

  const { data, isFetching } = useQuery({
    queryKey: ["imageDetails"],
    queryFn: () => fetchPopularImages(photoId),
    staleTime: 0,
  });
  return (
    <div
      className={classes.image_modal_overlay}
      onClick={() => setShowModal(false)}
    >
      <div
        className={classes.image_modal_cont}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.full_image_cont}>
          {isFetching ? (
            <div className={classes.spinner_cont}>
              <span className="loader"></span>
            </div>
          ) : (
            <img
              className={classes.full_image}
              src={data.urls.full}
              alt="image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
