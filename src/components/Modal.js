import React from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../hooks/usePortal';

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Modal = ({ id, children }) => {
    const target = usePortal(id);
    return createPortal(children, target);
};

export default Modal;
