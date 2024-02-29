import classes from "../../styles/History.module.css";
import Layout from "../../components/Layout/Layout";
import ImageList from "../../components/ImageList/ImageList";
import { AppContext, ContextTypes } from "../../context/appContext";
import { useContext, useState } from "react";

const History = () => {
  const { searchHistory, setSearchHistory, setSearchQuery } = useContext(
    AppContext
  ) as ContextTypes;
  const [activeIdx, setActiveIdx] = useState(1);

  return (
    <div className={classes.history}>
      <Layout>
        <ul className={classes.history_list}>
          {searchHistory.map((word: string, idx: number) => {
            return (
              word && (
                <div
                  className={`${classes.history_word} ${
                    activeIdx === idx && classes.history_word_active
                  }`}
                  onClick={() => {
                    setSearchQuery(word);
                    setActiveIdx(idx);
                  }}
                >
                  {word}
                </div>
              )
            );
          })}
          {searchHistory.length > 1 && (
            <span
              className={classes.delete}
              onClick={() => setSearchHistory([])}
            >
              x
            </span>
          )}
        </ul>
        <ImageList />
      </Layout>
    </div>
  );
};

export default History;
