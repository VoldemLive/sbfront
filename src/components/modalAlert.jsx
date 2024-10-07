import React from "react"
import { Modal, Button } from "flowbite-react"

const ModalAlert = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
  color = "success",
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500">{message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color={color} onClick={onConfirm}>
          I accept
        </Button>
        <Button color="gray" onClick={onClose}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAlert
