import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import RootRouter from "./router/RootRouter";
import {BrowserRouter} from "react-router";
import "./common/styles/css/_index.scss";

const enableStrictMode = false;

const main = (
    <BrowserRouter>
        <RootRouter/>
    </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(
    enableStrictMode ? <StrictMode>{main}</StrictMode> : main,
);

reportWebVitals();
