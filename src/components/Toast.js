import React from 'react';
import { DefaultToast } from 'react-toast-notifications';

const Toast = ({ children, ...props }) => (
    <DefaultToast {...props}>
        <div className="rolodex-toast">{children}</div>
    </DefaultToast>
);

export default Toast;
