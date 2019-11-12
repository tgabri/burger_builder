import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../Input/Input';
import Button from '../Reusable/Button';
import classes from './Auth.css';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import Spinner from '../Reusable/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkIfValid(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (e, controlName) => {
    const { value } = e.target;
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid: this.checkIfValid(value, controls[controlName].validation),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const { controls } = this.state;
    const { isLoading, error, isAuthenticated, authRedirectPath } = this.props;

    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={e => this.inputChangeHandler(e, formElement.id)}
      />
    ));
    if (isLoading) return <Spinner />;

    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        {isAuthenticated ? (
          <Redirect to={authRedirectPath} />
        ) : (
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType='Success'>SUBMIT</Button>
          </form>
        )}
        <Button clicked={this.switchAuthModeHandler} btnType='Danger'>
          SWITCH TO {this.state.isSignup ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.authReducer.isLoading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !== null,
    buildingBurger: state.burgerBuilderReducer.building,
    authRedirectPath: state.authReducer.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
