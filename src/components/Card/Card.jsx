import "./Card.css";

import heart from "./heart.svg";
import filledHeart from "./filled-heart.svg";
import openInNew from "./open-in-new.svg";
import message from "./message.svg";

import { useState, useEffect } from "react";

const Card = ({className, id, url, value, lastUpdated, category, favouriteJokes, setFavouriteJokes}) => {
    const [img, setImg] = useState(heart);

    const categoryBlock = <div className="card__category">{category}</div>; // if category exist

    useEffect(() => {
        setImg(heart);
        favouriteJokes.forEach((joke) => {
            if (joke.id === id) setImg(filledHeart);
        });
    }, [id, favouriteJokes]);

    const favouriteJokesHandler = () => {
        if (img === filledHeart) {
            setImg(heart);
            setFavouriteJokes(favouriteJokes => favouriteJokes.filter(joke => joke.id !== id));
        } else {
            setImg(filledHeart);
            setFavouriteJokes([...favouriteJokes, {id: id, url: url, value: value, lastUpdated: lastUpdated, category: category}]);
        }
    };

    const getLastTimeUpdated = () => {
        const nowTime = Date.now();
        lastUpdated = lastUpdated.split(" ");
        let lastUpdatedDate = lastUpdated[0];
        lastUpdated = Date.parse(lastUpdated[0] + "T" + lastUpdated[1] + "+00:00");
        lastUpdated = nowTime - lastUpdated;
        lastUpdated = Math.trunc(lastUpdated / 1000); // seconds

        if (lastUpdated < 60) {
            lastUpdated += " seconds ago";
        } else if (lastUpdated < 60 * 60) {
            lastUpdated = (lastUpdated) / 60 + " minutes ago";
        } else if (lastUpdated < 60 * 60 * 24) {
            lastUpdated = (lastUpdated / 60 * 60) + " hours ago";
        } else if (lastUpdated < 60 * 60 * 24 * 7) {
            lastUpdated = (lastUpdated / 60 * 60 * 24) + " days ago";
        } else {
            lastUpdated = lastUpdatedDate;
        }
    };

    getLastTimeUpdated();

    // &nbsp; - неразрывный пробел
    return (
        <div className={`card ${className}`}>
            <div className="card__header">
                <div className="card__heart-wrapp" onClick={favouriteJokesHandler}>
                    <img src={img} alt="heart" className="card__heart" />
                </div>
            </div>
            <div className="card__body">
                <div className="card__message-icon-wrapp">
                    <img src={message} alt="message" className="card__message-icon" />
                </div>
                <div>
                    <div className="card__id">
                        ID: 
                        &nbsp;
                        <a href={url} target="_blank" className="card__link">
                            {id} 
                            &nbsp;
                            <img src={openInNew} alt="open-in-new" className="card__open-in-new-icon" />
                        </a>
                    </div>
                    <div className="card__joke">{value}</div>
                    <div className="card__last-updated-and-category-wrapp">
                        <div className="card__last-updated-wrapp">
                            Last update: <span className="card__last-updated">{lastUpdated}</span>
                        </div>
                        {category && categoryBlock}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;   