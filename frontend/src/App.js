import React from "react";
import "./App.css";
import { store } from "./app/store";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tablez from "./components/Table";
import { getCoin, getData } from "./cryptoSlice";

store.dispatch(getData());
store.dispatch(getCoin());
function App() {
  return (
    <div className="App">
      <Header />
      <Tablez />
      <Footer />
    </div>
  );
}

export default App;
