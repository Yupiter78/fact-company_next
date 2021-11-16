import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualityProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                    </QualityProvider>
                </ProfessionProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </div>
    );
}

export default App;
