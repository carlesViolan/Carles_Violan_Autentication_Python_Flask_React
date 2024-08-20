import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Login } from "./pages/login";
import { Protected } from "./pages/protected";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Single2 } from "./pages/single2";
// import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Register } from "./pages/register";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route path="/" element={<Home />} />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Protected />} path="/protected" />
                        <Route path="/protected" element={<Protected />} />
                        <Route element={<Demo />} path="/demo" />
                        <Route path="/register" element={<Register />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="/single2/:theid" element={<Single2 />} />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
