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

  // state = {
  //   searchValue: '',
  //   page: null,
  //   modalUrl: null,
  //   searchPicture: [],
  //   error: null,
  //   isLoading: false,
  //   totalPages: null,
  // }
  useEffect(() => {
    if (searchValue === "") { return };

    setIsLoading(true);
    fetchPicture(searchValue, page)
      .then(response => {
        setTotalPages(response.total);
        setSearchPicture([...searchPicture, ...response.hits]);
        console.log(searchPicture)
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

// import React, { Component } from "react";
// import { Grid } from 'react-loader-spinner';
// import { fetchPicture } from '../services/fetchPicture';
// import s from './App.module.css';
// import Searchbar from './Searchbar';
// import ImageGallery from "./ImageGallery";
// import Button from "./Button";
// import Modal from './Modal';

// export class App extends Component {

//   state = {
//     searchValue: '',
//     page: null,
//     modalUrl: null,
//     searchPicture: [],
//     error: null,
//     isLoading: false,
//     totalPages: null,
//   }

//   componentDidUpdate(PrevProps, PrevState) {

//     const prevSearch = PrevState.searchValue;
//     const newSearch = this.state.searchValue;
//     const prevPage = PrevState.page;
//     const newPage = this.state.page;

//     if (prevSearch !== newSearch || prevPage !== newPage) {

//       this.setState({ isLoading: true });
//       fetchPicture(newSearch, newPage)
//         .then(response => {
//           this.setState({ totalPages: response.total })
//           this.setState(prev => ({ searchPicture: [...prev.searchPicture, ...response.hits] }))})
//             .catch(error => this.setState({ error }))
//             .finally(() => this.setState({ isLoading: false }))
//     }
//   }
  
            
//   handleSubmitForm = searchValue => {
//     this.setState({ searchValue, page: 1, modalUrl: null, searchPicture: [] });
//   }
  
//   handleButtonLoadMore = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   }

//   modalClose = () => {
//     this.setState({ modalUrl: null });
//   }

//   handleClick = ClickedPicture => {
//     const clickedUrl = this.state.searchPicture.find(picture => picture.webformatURL === ClickedPicture);
//     this.setState({modalUrl: clickedUrl.largeImageURL})
//   }

//   render(){
//     const { page, searchPicture, modalUrl, totalPages, isLoading } = this.state;

//     return (
        
//         <div className={s.app}>

//           <Searchbar onSubmit={this.handleSubmitForm} />

//           {modalUrl && <Modal url={modalUrl} onClick={this.modalClose} />}

//           {isLoading &&
//             <div className={s.loader}>
//               <Grid
//                 height="50"
//                 width="50"
//                 color='tomato'
//                 ariaLabel='loading'
//               />
//             </div>}

//           <ImageGallery searchPicture={searchPicture} clickedUrl={this.handleClick} />
          
//           {(page >= 1 && searchPicture.length < totalPages) && <Button onClick={this.handleButtonLoadMore} />}
          
//         </div>
//     );
//   }
// }