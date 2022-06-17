import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ url, onClick }) {
   
    useEffect(() => {

        function handleKeyDown(e) {
            if (e.code === 'Escape') { return onClick() }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => { window.removeEventListener('keydown', handleKeyDown) }
    }, [onClick])

    function onclickModalClose(event) {
        if (event.currentTarget === event.target) {
            onClick();
        }
    }

    return createPortal(
        <div className={s.overlay} onClick={onclickModalClose}>
            <div className={s.modal}>
                <img src={url} alt="" />
            </div>
        </div>,
        modalRoot,
    )
}

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}