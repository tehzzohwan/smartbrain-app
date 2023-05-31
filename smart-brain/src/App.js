import React from 'react';
import { Component } from 'react';
import Navigation from './components/Navigation/Nav';
import Logo from './components/Logo/Logo'
import LinkForm from './components/linkForm/linkForm';
import Rank from './components/Rank/rank';
import Signin from './components/SignIn/SIgnIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/faceRecognition/faceRecognition'
import './App.css';



// URL of image to use. Change this to your image.

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


  


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    const IMAGE_URL = console.log(this.setState({ imageUrl: this.state.input })) ;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key f8b2ccda7ca54a0886fc37bca359b849'
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout' ){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState( {route: route });
  }

  render () {
    const { isSignedIn, imageUrl, route } = this.state;
      return (
        <div className="App">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home'
            ? <div>
                <Logo />
                <Rank />
                <LinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={imageUrl}/>
              </div>
            : (
              this.state.route === 'signin' 
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register  onRouteChange={this.onRouteChange}/>
            )
          }
        </div>
      );
  }
}

export default App;
