import "./Favourite.css";

import open from "./open.svg";
import close from "./close.svg";

import Card from "../Card";

import { useState, useEffect } from "react";

const Favourite = ({blurBlock, favouriteJokes, setFavouriteJokes}) => {
    const [showFavourite, setShowFavourite] = useState(true);

    useEffect(() => {
        if (window.matchMedia("(max-width: 834px)").matches) {
            setShowFavourite(false);
        }
    }, []);

    return (
        (!showFavourite &&  
        <div className="burger-button" onClick={() => {setShowFavourite(true); blurBlock.current.classList.remove("d-none")}}>
            <img src={open} alt="open" className="burger-button__icon"/>
            <div className="burger-button__text">Favourite</div>
        </div>) || 
        (showFavourite && 
        <aside className="favourite">
            <div className="favourite__title">Favourite</div>
            <div className="burger-button" onClick={() => {setShowFavourite(false); blurBlock.current.classList.add("d-none")}}>
                <img src={close} alt="close" className="burger-button__icon"/>
                <div className="burger-button__text">Favourite</div>
            </div>
            <div className="favourite__cards-wrapp">
                {favouriteJokes.map(joke => <Card
                    className={"card-in-favourite"}
                    key={joke.id} 
                    id={joke.id} 
                    url={joke.url} 
                    value={joke.value} 
                    lastUpdated={joke.lastUpdated} 
                    category={joke.category} 
                    favouriteJokes={favouriteJokes} 
                    setFavouriteJokes={setFavouriteJokes} 
                />)}
            </div>
        </aside>)
    );

};

export default Favourite;