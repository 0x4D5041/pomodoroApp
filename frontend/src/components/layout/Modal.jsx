const Modal = ({ children, title, handleCloseButtonClick }) => {
    return (
        <div className="modal-container">
            <div className="modal">{children}</div>
        </div>
    );
};

export default Modal;
