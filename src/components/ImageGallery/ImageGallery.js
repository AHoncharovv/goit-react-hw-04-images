import PropTypes from 'prop-types';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageGalleryItem from "components/ImageGalleryItem";
import s from './ImageGallery.module.css';

export default function ImageGallery({searchPicture, clickedUrl}) {

    const handleClick = url => {
        clickedUrl(url)
    }

    return (    
        <ul className={s.imageGallery}>
            {searchPicture &&
                searchPicture.map((picture) => (  
                    <ImageGalleryItem
                        picture={picture}
                        key={picture.id}
                        clickedUrl={handleClick}
                    />
            ))}
        </ul> 
    )
}

ImageGallery.propTypes = {
    searchPicture: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        })),
    clickedUrl: PropTypes.func.isRequired,
}
