import React, { Component } from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component{

    state = {
        searchValue: '',
    }

    handleInputSearch = event => {
        this.setState({searchValue: event.currentTarget.value.toLowerCase()})
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchValue.trim() === '') {
            alert("Введите текст.")
            return
        };
        this.props.onSubmit(this.state.searchValue);
    }

    render() {
        return (
            <header className={s.searchBar}>
                <form className={s.searchForm} onSubmit={this.handleSubmit}>
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
                        onChange={this.handleInputSearch}
                        value={this.state.searchValue}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}