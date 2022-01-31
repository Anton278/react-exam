import "./App.css";

import Form from "./components/Form";
import Card from "./components/Card";
import Favourite from "./components/Favourite"; 

import { useEffect, useRef, useState } from "react";

const App = () => {
  if (!localStorage.favouriteJokes) {
    localStorage.setItem("favouriteJokes", JSON.stringify([]));
  }
  
  const [data, setData] = useState(null);
  // for life-time reload
  const [favouriteJokes, setFavouriteJokes] = useState(JSON.parse(localStorage.getItem("favouriteJokes")));
  // for blur on tablet version;
  const blurBlock = useRef();

  useEffect(() => {
    localStorage.setItem("favouriteJokes", JSON.stringify(favouriteJokes));
  }, [favouriteJokes]);

  return (
    <>
    <main>
      <div className="topline">React-exam</div>
      <div className="title">Hey!</div>
      <div className="subtitle">Let's try to find a joke for you:</div>
      <Form setData={setData} />
      <div className="cards-wrapp">
        {(data?.error && <></>)
        ||
        (data?.result && data.result.map(joke => 
            <Card 
            className={"card-in-main"}
            key={joke.id} 
            id={joke.id} 
            url={joke.url} 
            value={joke.value} 
            lastUpdated={joke.updated_at} 
            category={joke.categories[0]}
            favouriteJokes={favouriteJokes} 
            setFavouriteJokes={setFavouriteJokes} 
          />
        )) 
        ||
        (data && <Card 
          className={"card-in-main"}
          id={data.id} 
          url={data.url} 
          value={data.value} 
          lastUpdated={data.updated_at} 
          category={data.categories[0]}
          favouriteJokes={favouriteJokes} 
          setFavouriteJokes={setFavouriteJokes} 
        />)}
      </div>
    </main>
    <div ref={blurBlock} className="blur d-none"></div>
    <Favourite blurBlock={blurBlock} favouriteJokes={favouriteJokes} setFavouriteJokes={setFavouriteJokes}/>
    </>
  );
};

export default App;
