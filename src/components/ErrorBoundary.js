import React from 'react';

class ErrorBoundary extends React.Component {
    state = {
        error: null,
        info: null
    };

    componentDidCatch(error, info) {
        this.setState({ error, info });
    }

    render() {
        if (this.state.error) {
            return (
                <div className="error__boundary">
                    <h1>Oops! </h1>
                    <p>💀 Something went wrong 💀</p>
                    <a href=".">Refresh page</a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
