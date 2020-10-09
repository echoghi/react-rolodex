import React from 'react';

export const Icon = () => {
    return (
        <svg className="fb-button--icon" height="26" width="26">
            <path d="M24.565,0H1.435C0.642,0,0,0.642,0,1.435v23.13C0,25.358,0.642,26,1.435,26h12.452V15.932h-3.388v-3.924h3.388 V9.114c0-3.358,2.051-5.187,5.047-5.187c1.435,0,2.668,0.107,3.028,0.155v3.51l-2.078,0.001c-1.629,0-1.945,0.774-1.945,1.91v2.505 h3.886l-0.506,3.924h-3.38V26h6.626C25.357,26,26,25.358,26,24.565V1.435C26,0.642,25.357,0,24.565,0z"></path>
        </svg>
    );
};

function FacebookButton(props) {
    return (
        <button type="button" className="fb-button" {...props}>
            <div>
                <Icon />
                Sign in with Facebook
            </div>
        </button>
    );
}

export default FacebookButton;
