import "./Form.css";

import { useState, useEffect, useRef } from "react";

const Form = ({setData}) => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    const query = useRef();

    const getCategories = async () => {
        const getCategoriesURL = "https://api.chucknorris.io/jokes/categories";
        const response = await fetch(getCategoriesURL);
        const data = await response.json();
        setCategories(data);
        setActiveCategory(data[0]);
    };

    // sub-blocks
    const categoriesBlock = <div className="form__categories">
        {categories.map((category) => {
            const className = (category === activeCategory) ? "form__category form__category_active" : "form__category";
            return <div className={className} key={category} onClick={(e) => setActiveCategory(e.target.innerText.toLowerCase())}>{category}</div>;
        })}
    </div>;
    const searchBlock = <div className="form__search-wrapp"><input type="text" placeholder="Free text search..." className="form__search" onInput={(e) => query.current = e.target.value} /></div>;


    const getJoke = async () => {
        if (showCategories) {
            const getJokeByCategoryURL = `https://api.chucknorris.io/jokes/random?category=${activeCategory}`;
            const response = await fetch(getJokeByCategoryURL);
            const data = await response.json();

            setData(data);
        } else if (showSearch) {
            const getJokeBySearchURL = `https://api.chucknorris.io/jokes/search?query=${query.current.toLowerCase()}`;
            const response = await fetch(getJokeBySearchURL);
            const data = await response.json();

            setData(data);
        } else {
            const getRandomJokeURL = "https://api.chucknorris.io/jokes/random";
            const response = await fetch(getRandomJokeURL);
            const data = await response.json();

            setData(data);
        }
    };

    return (
        <div className="form">
            <div><label onChange={() => {setShowCategories(false); setShowSearch(false); setActiveCategory(categories[0])}}><input type="radio" name="option" defaultChecked /> Random</label></div>
            <div><label onChange={() => {setShowCategories(true); setShowSearch(false)}}><input type="radio" name="option" /> From categories</label></div>
            {showCategories && categoriesBlock}
            <div><label onChange={() => {setShowCategories(false); setShowSearch(true); setActiveCategory(categories[0])}}><input type="radio" name="option" /> Search</label></div>
            {showSearch && searchBlock}
            <button className="form__button" onClick={getJoke}>Get a joke</button>
        </div>
    );
};

export default Form;