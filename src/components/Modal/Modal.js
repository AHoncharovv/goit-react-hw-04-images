import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClick();
        }
    }

    onclickModalClose = event => {
        if (event.currentTarget === event.target) {
            this.props.onClick();
        }
    }

    render() {
        return createPortal(
            <div className={s.overlay} onClick={this.onclickModalClose}>
                <div className={s.modal}>
                    <img src={this.props.url} alt="" />
                </div>
            </div>,
            modalRoot,
        )
    }
}

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}