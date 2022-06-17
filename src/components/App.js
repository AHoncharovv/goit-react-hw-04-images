import { useState, useEffect } from "react";
import { Grid } from 'react-loader-spinner';
import { fetchPicture } from '../services/fetchPicture';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from './Modal';

export function App() {

  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(null);
  const [modalUrl, setModalUrl] = useState(null);
  const [searchPicture, setSearchPicture] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (searchValue === "") { return };

    setIsLoading(true);
    fetchPicture(searchValue, page)
      .then(response => {
        setTotalPages(response.total);
        setSearchPicture(prevState =>[...prevState, ...response.hits]);
      })
      .catch(err => {
        setError(err)
        alert(error)
      })
      .finally(() => setIsLoading(false))
  }, [searchValue, page, error]) 
  
  const handleSubmitForm = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setModalUrl(null);
    setSearchPicture([]);
  }
  
  const handleButtonLoadMore = () => {
    setPage(page + 1);
  }

  const modalClose = () => {
    setModalUrl(null);
  }

  const handleClick = ClickedPicture => {
    const clickedUrl = searchPicture.find(picture => picture.webformatURL === ClickedPicture);
    setModalUrl(clickedUrl.largeImageURL)
  }

  return (
    <div className={s.app}>

      <Searchbar onSubmit={handleSubmitForm} />

      {modalUrl && <Modal url={modalUrl} onClick={modalClose} />}

      {isLoading &&
        <div className={s.loader}>
          <Grid
            height="50"
            width="50"
            color='tomato'
            ariaLabel='loading'
          />
        </div>}

      <ImageGallery searchPicture={searchPicture} clickedUrl={handleClick} />
          
      {(page >= 1 && searchPicture.length < totalPages) && <Button onClick={handleButtonLoadMore} />}
          
    </div>
  );
}