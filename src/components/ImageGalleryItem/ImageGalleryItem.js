import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({picture, clickedUrl}) {

    const onClick = event => {
        clickedUrl(event.currentTarget.src)
    }

    return (   
        <li className={s.imageGalleryItem}>
            <img
                src={picture.webformatURL}
                alt={picture.tags}
                className={s.imageGalleryItemImage}
                onClick={onClick}
            />
        </li>
    )  
}

ImageGalleryItem.propTypes = {
    picture: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
    clickedUrl: PropTypes.func.isRequired,
}