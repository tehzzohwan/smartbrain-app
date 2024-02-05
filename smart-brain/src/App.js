import React from "react";
import { Component } from "react";
import Navigation from "./components/Navigation/Nav";
import Logo from "./components/Logo/Logo";
import LinkForm from "./components/linkForm/linkForm";
import Rank from "./components/Rank/rank";
import SignIn from "./components/SignIn/SIgnIn";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: currentUser ? "home" : "signin",
      isSignedIn: !!currentUser,
      user: currentUser
        ? currentUser
        : {
            id: "",
            name: "",
            email: "",
            entries: 0,
            joined: "",
          },
      count: 0,
      errMessage: ""
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  getcurrrentUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    this.setState({ currentUser: userData });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("box", clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onPictureSubmit = async () => {
    console.log("input", this.state.input);
    const inputUrl = this.state.input;
    this.setState({ imageUrl: inputUrl });
    console.log("imgUrl", this.state.imageUrl);

     try {
      const b64Image = await this.convertToBase64(inputUrl);
      console.log("b64", b64Image );

      const response = await fetch(
        `https://api.clarifa.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
        this.requestOptions(b64Image)
      );

      const facebox = await response.json();
      console.log("done", facebox);

      const boundingBox = this.calculateFaceLocation(facebox);

      this.displayFaceBox(boundingBox);

      this.setState({
        count: this.state.count + 1,
      });
    } catch (error) {
      this.setState({ errMessage: error.message });
    }
  };

  convertToBase64 = (urlImg) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        const b64 = canvas
          .toDataURL("image/png")
          .replace(/^data:image\/png;base64,/, "");
        resolve(b64);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = urlImg;
    });
  };

  raw = (image) => {
    return JSON.stringify({
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      inputs: [
        {
          data: {
            image: {
              base64: image,
            },
          },
        },
      ],
    });
  };

  requestOptions = (IMAGE_URL) => {
    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key f8b2ccda7ca54a0886fc37bca359b849",
        "Content-Type": "application/json",
      },
      body: this.raw(IMAGE_URL),
    };
    return request;
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({
        isSignedIn: false,
        user: null,
      });
      localStorage.removeItem("user");
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank user={this.state.user} count={this.state.count} />
            <LinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
              errMessage={this.state.errMessage}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
