import React, { Component } from 'react';
import './SignIn.css';

export default class server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      showPassword: true,
      successMsg: "",
      errMsg: "",
      submitBtn: true
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
    this.validateForm();
  };

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
    this.validateForm();
  };

  validateForm = () => {
    if ((this.state.signInEmail.length >= 11) && (this.state.signInPassword.length >= 2)) {
      this.setState({submitBtn: false});
    }
  };

  onHandleShow = () => {
    this.setState({showPassword : !this.state.showPassword});
  };

  onSubmitSignIn = async () => {
    const response = await fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }) 
      const data = await response.json();
      this.checkSignIn(data);
  };

  checkSignIn = (data) => {
    if (data.status === "success") {
      this.setState({ successMsg: data.status });
      localStorage.setItem("user", JSON.stringify(data.data));
      setTimeout(() => {
        this.props.loadUser(data.data);
        this.props.onRouteChange("home");
      }, 1000);
    } else {
      const err = data.error;
      this.setState({ errMsg: err });
      setTimeout(() => {
        this.setState({ errMsg: "" });
      }, 3000);
    } 
  } 

  render() {
    const { onRouteChange } = this.props;
    return (
      <>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba br3 bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba br3 bg-transparent hover-bg-black hover-white w-100"
                    type={this.state.showPassword ? "password" : "text"}
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                  <label className="showHide" onClick={this.onHandleShow}>
                    {this.state.showPassword ? "show" : "hide"}
                  </label>
                </div>
              </fieldset>
              <div className="">
                <div className="icon"></div>
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba br3 b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  disabled={this.state.submitBtn}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange("register")}
                  href="#0"
                  className="f6 link dim black db pointer white"
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>

        {this.state.successMsg && (
          <div className="ba br3 h2 mt1 center w-20 bg-green">
            <div className="dib v-mid">&#10003; {this.state.successMsg}</div>
          </div>
        )}

        {this.state.errMsg && (
          <div className="ba br3 h2 mt1 center w-20 bg-red">
            <div className="dib v-mid">&#9888; {this.state.errMsg}</div>
          </div>
        )}
      </>
    );
  }
}
