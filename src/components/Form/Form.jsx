import "./Form.css";

import { useState, useEffect, useRef } from "react";

const Form = ({setData}) => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        category.current = categories[0];
    }, [categories]);

    const category = useRef();
    const searchValue = useRef();

    const getCategories = async () => {
        const getCategoriesURL = "https://api.chucknorris.io/jokes/categories";
        const response = await fetch(getCategoriesURL);
        const data = await response.json();
        setCategories(data);
    };

    const categoriesHandler = (e) => {
        if (e.target.classList.contains("form__category")) {
            const categories = Array.from(e.currentTarget.children);
            categories.forEach(category => category.classList.remove("form__category_active"));
            e.target.classList.add("form__category_active");
            category.current = e.target.innerText.toLowerCase();
        }
    };

    const categoriesBlock = <div className="form__categories" onClick={categoriesHandler}>
        {categories.map((category, index) => {
            if (index === 0) {
                return <div className="form__category form__category_active" key={category}>{category}</div>
            } 
            return <div className="form__category" key={category}>{category}</div>
        })}
    </div>;
    const searchBlock = <div className="form__search-wrapp"><input type="text" ref={searchValue} placeholder="Free text search..." className="form__search"/></div>;


    const getJoke = async (e) => {
        if (e.target.classList.contains("form__button")) {
            if (showCategories) {
                const getJokeByCategoryURL = `https://api.chucknorris.io/jokes/random?category=${category.current}`;
                const response = await fetch(getJokeByCategoryURL);
                const data = await response.json();

                setData(data);
            } else if (showSearch) {
                const getJokeBySearchURL = `https://api.chucknorris.io/jokes/search?query=${searchValue.current.value.toLowerCase()}`;
                const response = await fetch(getJokeBySearchURL);
                const data = await response.json();

                setData(data);
            } else {
                const getRandomJokeURL = "https://api.chucknorris.io/jokes/random";
                const response = await fetch(getRandomJokeURL);
                const data = await response.json();

                setData(data);
            }
        }
    };

    return (
        <div className="form" onClick={getJoke}>
            <div><label onChange={() => {setShowCategories(false); setShowSearch(false); category.current = categories[0]}}><input type="radio" name="option" defaultChecked /> Random</label></div>
            <div><label onChange={() => {setShowCategories(true); setShowSearch(false)}}><input type="radio" name="option" /> From categories</label></div>
            {showCategories && categoriesBlock}
            <div><label onChange={() => {setShowCategories(false); setShowSearch(true); category.current = categories[0]}}><input type="radio" name="option" /> Search</label></div>
            {showSearch && searchBlock}
            <button className="form__button">Get a joke</button>
        </div>
    );
};

export default Form;