import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface ConfirmationPopupProps {
  onConfirm: () => void;
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closePopup() {
    setIsOpen(false);
  }

  function handleConfirm() {
    onConfirm();
    closePopup();
  }

  function handleCancel() {
    closePopup();
  }

  return (
    <Popup
      trigger={
        <button className="btn btn-danger">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      }
      position="right center"
      open={isOpen}
      onOpen={() => setIsOpen(true)} // Ajout de cette ligne
      closeOnDocumentClick={true}
      closeOnEscape={true}
    >
      <div>Êtes-vous sûr de vouloir supprimer ?</div>
      <button className="btn btn-success mx-1" onClick={handleConfirm}>
        oui
      </button>
      <button className="btn btn-danger mx-1" onClick={handleCancel}>
        non
      </button>
    </Popup>
  );
};

export default ConfirmationPopup;
