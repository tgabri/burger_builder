import React, { Component } from 'react';
import Modal from '../Modal/Modal';

export default function ErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;
      return (
        <React.Fragment>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error && error.message}
          </Modal>
          <WrappedComponent {...this.props} />;
        </React.Fragment>
      );
    }
  };
}
