import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient=new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
<Provider store={store}>
<BrowserRouter>
<App/>
<ToastContainer position="top-right" autoClose={2500}/>
</BrowserRouter>
</Provider>
</QueryClientProvider>
</React.StrictMode>
);