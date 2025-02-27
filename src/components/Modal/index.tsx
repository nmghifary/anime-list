import { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  handleHideModal: () => void;
  isOpen: boolean;
};

const ModalOverlay = ({ children, handleHideModal, isOpen }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-end justify-center z-30 transition-all duration-500">
      {/* Background overlay */}
      <div
        onClick={handleHideModal}
        className={`fixed top-0 left-0 w-full h-screen bg-black
          ${isOpen ? "bg-opacity-70" : "bg-opacity-0"}`}
      />
      {/* Modal content */}
      <div
        className={`w-[98%] bg-slate-700 rounded-t-xl shadow-lg text-slate-100 z-40 transition-transform transform
          ${isOpen ? "translate-y-0" : "translate-y-36"}`}
      >
        {children}
      </div>
    </div>
  );
};

// const portalElement = document.getElementById("modal");

const ModalComponent = ({ children, handleHideModal, isOpen }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const portalElement =
    typeof document !== "undefined" ? document.getElementById("modal") : null;
  if (!portalElement) return null;

  return ReactDOM.createPortal(
    <ModalOverlay handleHideModal={handleHideModal} isOpen={isOpen}>
      {children}
    </ModalOverlay>,
    portalElement
  );
};

export default ModalComponent;
