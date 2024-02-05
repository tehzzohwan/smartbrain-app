import React, { Component } from 'react';
import './Register.css'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      showPass: true,
      successMsg: "",
      submitBtn: true
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
    this.validateForm();
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
    this.validateForm();
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.validateForm();
  };

  validateForm = () => {
    if (
      this.state.name.length >= 2 &&
      this.state.email.length >= 11 &&
      this.state.password.length >= 2
    ) {
      this.setState({ submitBtn: false });
    }
  };

  onHandleVisibility = () => {
    this.setState({ showPass: !this.state.showPass });
  };
  onRegisterSubmit = async () => {
    const response = await fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const user = await response.json();
    this.checkRegistration(user);
  };

  checkRegistration = (user) => {
    if (user.status === "success") {
      this.setState({ successMsg: user.status });
      setTimeout(() => {
        this.props.loadUser(user.data);
        this.props.onRouteChange("signin");
      }, 1000);
    } else {
      this.setState({ errMsg: user.error });
    }
  };

  render() {
    return (
      <>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba br3 bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                    placeholder="eg. John"
                  />
                </div>
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
                    type={this.state.showPass ? "password" : "text"}
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                    required
                  />
                  <label className="showHyde" onClick={this.onHandleVisibility}>
                    {this.state.showPass ? "show" : "hide"}
                  </label>
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onRegisterSubmit}
                  className="b ph3 pv2 input-reset ba br3 b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                  disabled= {this.state.submitBtn}
                />
              </div>
            </div>
          </main>
        </article>

        {this.state.successMsg && (
          <div className="ba br3 h2 mt1 center w-20 bg-green">
            <div className="dib v-mid">{this.state.successMsg}</div>
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