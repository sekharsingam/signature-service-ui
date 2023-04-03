import { Provider } from "react-redux";
import "./App.css";
import store from "./app/store";
import Router from "./router";

export default function App() {
  return (
    <>
      <div className="container">
        <Provider store={store}>
          <Router />
        </Provider>
      </div>
    </>
  );
}
