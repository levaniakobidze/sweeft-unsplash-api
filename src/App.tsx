import "./App.css";
import { FC, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";

const App: FC = () => {
  return (
    <Fragment>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Fragment>
  );
};

export default App;
