import { useState } from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
    
    const [searchValue, setSearchValue] = useState('');

    const handleInputSearch = event => {
        setSearchValue(event.currentTarget.value.toLowerCase())
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (searchValue.trim() === '') {
            alert("Введите текст.")
            return
        };
        onSubmit(searchValue);
    }

    return (
        <header className={s.searchBar}>
            <form className={s.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.searchFormButton}>
                    <span className={s.searchFormButtonLabel}>
                        Search
                    </span>
                </button>

                <input
                    className={s.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleInputSearch}
                    value={searchValue}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}