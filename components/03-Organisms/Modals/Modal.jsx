"use client";
import { Button, Modal as BootstrapModal } from "react-bootstrap";

export default function Modal({ children, props }) {
  const title = props.title;
  const show = props.show;
  const size = props.size ? props.size : "";
  const closeLabel = props.closeLabel ? props.closeLabel : "Kembali";
  const submitLabel = props.submitLabel ? props.submitLabel : "Simpan";
  const handleClose = props.handleClose;
  const handleSubmit = props.handleSubmit;
  const showFooter = props?.showFooter ?? true;

  return (
    <>
      <BootstrapModal show={show} onHide={handleClose} centered size={size}>
        <BootstrapModal.Header className="px-4" closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{children}</BootstrapModal.Body>
        {showFooter && (
          <BootstrapModal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {closeLabel}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {submitLabel}
            </Button>
          </BootstrapModal.Footer>
        )}
      </BootstrapModal>
    </>
  );
}
