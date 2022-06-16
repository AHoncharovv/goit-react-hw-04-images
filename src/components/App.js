import React, { Component } from "react";
import { Grid } from 'react-loader-spinner';
import { fetchPicture } from '../services/fetchPicture';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from './Modal';

export class App extends Component {

  state = {
    searchValue: '',
    page: null,
    modalUrl: null,
    searchPicture: [],
    error: null,
    isLoading: false,
    totalPages: null,
  }

  componentDidUpdate(PrevProps, PrevState) {

    const prevSearch = PrevState.searchValue;
    const newSearch = this.state.searchValue;
    const prevPage = PrevState.page;
    const newPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== newPage) {

      this.setState({ isLoading: true });
      fetchPicture(newSearch, newPage)
        .then(response => {
          this.setState({ totalPages: response.total })
          this.setState(prev => ({ searchPicture: [...prev.searchPicture, ...response.hits] }))})
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ isLoading: false }))
    }
  }
  
            
  handleSubmitForm = searchValue => {
    this.setState({ searchValue, page: 1, modalUrl: null, searchPicture: [] });
  }
  
  handleButtonLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  }

  modalClose = () => {
    this.setState({ modalUrl: null });
  }

  handleClick = ClickedPicture => {
    const clickedUrl = this.state.searchPicture.find(picture => picture.webformatURL === ClickedPicture);
    this.setState({modalUrl: clickedUrl.largeImageURL})
  }

  render(){
    const { page, searchPicture, modalUrl, totalPages, isLoading } = this.state;

    return (
        
        <div className={s.app}>

          <Searchbar onSubmit={this.handleSubmitForm} />

          {modalUrl && <Modal url={modalUrl} onClick={this.modalClose} />}

          {isLoading &&
            <div className={s.loader}>
              <Grid
                height="50"
                width="50"
                color='tomato'
                ariaLabel='loading'
              />
            </div>}

          <ImageGallery searchPicture={searchPicture} clickedUrl={this.handleClick} />
          
          {(page >= 1 && searchPicture.length < totalPages) && <Button onClick={this.handleButtonLoadMore} />}
          
        </div>
    );
  }
}