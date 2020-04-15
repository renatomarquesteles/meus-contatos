import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function DefaultModal({
  children,
  modalWidth,
  modalHeight,
  ...rest
}) {
  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        content: {
          width: modalWidth + 'px',
          height: modalHeight + 'px',
          left: `calc(50% - ${modalWidth / 2}px)`,
          top: `calc(50% - ${(2 * modalHeight) / 3}px)`,
        },
      }}
      contentLabel="Default Modal"
      {...rest}
    >
      {children}
    </Modal>
  );
}
