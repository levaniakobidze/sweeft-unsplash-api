import { useContext, useState } from "react";
import classes from "../../styles/History.module.css";
import Layout from "../../components/Layout/Layout";
import ImageList from "../../components/ImageList/ImageList";
import { AppContext, ContextTypes } from "../../context/appContext";

const History = () => {
  const { searchHistory, setSearchHistory, setSearchQuery, setPageNum } =
    useContext(AppContext) as ContextTypes;

  const [activeIdx, setActiveIdx] = useState(1);

  const handleHistoryItemClick = (word: string, idx: number) => {
    setSearchQuery(word);
    setActiveIdx(idx);
    setPageNum(1);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className={classes.history}>
      <Layout>
        <ul className={classes.history_list}>
          {searchHistory.map(
            (word: string, idx: number) =>
              word && (
                <li key={idx}>
                  <div
                    className={`${classes.history_word} ${
                      activeIdx === idx && classes.history_word_active
                    }`}
                    onClick={() => handleHistoryItemClick(word, idx)}
                  >
                    {word}
                  </div>
                </li>
              )
          )}
          {searchHistory.length > 1 && (
            <li>
              <span className={classes.delete} onClick={handleClearHistory}>
                x
              </span>
            </li>
          )}
        </ul>
        <ImageList />
      </Layout>
    </div>
  );
};

export default History;
