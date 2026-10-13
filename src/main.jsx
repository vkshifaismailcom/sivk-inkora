import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode> <QueryClientProvider client={queryClient}> <Provider store={store}> <BrowserRouter> <App />

```
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        newestOnTop
        closeOnClick
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
    </BrowserRouter>
  </Provider>
</QueryClientProvider>
```

</React.StrictMode>
);
