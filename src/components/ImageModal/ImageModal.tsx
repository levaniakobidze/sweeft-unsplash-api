import classes from "../../styles/ImageModal.module.css";
import { AppContext } from "../../context/appContext";
import { ContextTypes } from "../../types";
import { useContext, useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { ACCESS_KEY } from "../../secrets/secrets";
import { FaTimes } from "react-icons/fa";

interface ImageTypes {
  urls: { full: string };
  likes: number;
  downloads: number;
  views: number;
  tags: { title: string }[];
}

const ImageModal = () => {
  const { setShowModal, photoId, setSearchQuery, setSearchHistory } =
    useContext(AppContext) as ContextTypes;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [data, setData] = useState<ImageTypes | null>(null);

  const fetchImage = async (id: string) => {
    try {
      const resp = await axios.get(
        `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`
      );
      setData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsImageLoaded(false);
    fetchImage(photoId);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [photoId]);

  return (
    <div
      className={classes.image_modal_overlay}
      onClick={() => setShowModal(false)}
    >
      <div
        className={classes.image_modal_cont}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={classes.close_modal}
          onClick={() => setShowModal(false)}
        >
          <FaTimes />
        </div>
        <div className={classes.full_image_cont}>
          {!isImageLoaded && (
            <div className={classes.spinner_cont}>
              <span className="loader"></span>
            </div>
          )}
          {data && data.urls && (
            <img
              className={classes.full_image}
              src={data.urls.full}
              alt="image"
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
          )}
        </div>
        {data && (
          <div>
            <div className={classes.cont}>
              <FaThumbsUp className={classes.icon} />
              {data.likes}
            </div>
            <div className={classes.cont}>
              <FaDownload className={classes.icon} />
              {data.downloads}
            </div>
            <div className={classes.cont}>
              <FaEye className={classes.icon} />
              {data.views}
            </div>
          </div>
        )}
        <div>
          <ul className={classes.tags_list}>
            {data &&
              data.tags &&
              data.tags.map((tag: { title: string }, index: number) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setShowModal(false);
                      setSearchQuery(tag.title);
                      setSearchHistory((prev) => [...prev, tag.title]);
                    }}
                  >
                    {tag.title}d
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
