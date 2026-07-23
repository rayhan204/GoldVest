import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, onClose, title, children, className = "" }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white shadow-xl ${className}`}
      >
        <div className="flex items-center justify-between border-b border-ink-950/8 p-5">
          <h3 className="font-display text-lg font-semibold text-ink-950">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-ink-600 hover:bg-ink-950/5 hover:text-ink-950"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
