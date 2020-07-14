import React, { Component } from "react";
import TrelloClient from "react-trello-client";
class Login extends Component {
  render() {
    return (
      <TrelloClient
        apiKey={process.env.REACT_APP_KEY} // Get the API key from https://trello.com/app-key/
        clientVersion={1} // number: {1}, {2}, {3}
        apiEndpoint="https://api.trello.com" // string: "https://api.trello.com"
        authEndpoint="https://trello.com" // string: "https://trello.com"
        intentEndpoint="https://trello.com" // string: "https://trello.com"
        authorizeName="React Trello Client" // string: "React Trello Client"
        authorizeType="popup" // string: popup | redirect
        authorizePersist={true}
        authorizeInteractive={true}
        authorizeScopeRead={false} // boolean: {true} | {false}
        authorizeScopeWrite={true} // boolean: {true} | {false}
        authorizeScopeAccount={true} // boolean: {true} | {false}
        authorizeExpiration="never" // string: "1hour", "1day", "30days" | "never"
        authorizeOnSuccess={() => window.location.reload()} // function: {() => console.log('Login successful!')}
        authorizeOnError={e => console.log({ login: "Login error!", e })} // function: {() => console.log('Login error!')}
        autoAuthorize={false} // boolean: {true} | {false}
        authorizeButton={true} // boolean: {true} | {false}
        buttonStyle="metamorph" // string: "metamorph" | "flat"
        buttonColor="grayish-blue" // string: "green" | "grayish-blue" | "light"
        buttonText="Login com Trello" // string: "Login with Trello"
      />
    );
  }
}

export default Login;
