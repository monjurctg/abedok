// import './App.css';
import React from 'react';
import { Provider } from "react-redux";
import "./App.scss";
import { AuthProvider } from "./context/auth";
import store from "./redux/store";
import Router from "./router/Router";

function App() {

 
  return (
    <>
      <Provider store={store}>
      <AuthProvider>
        <Router />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
