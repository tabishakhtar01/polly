import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import EditPoll from "components/Polls/EditPoll";
import Signup from "components/Authentication/Signup";
import { either, isEmpty, isNil } from "ramda";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import { initializeLogger } from "common/logger";
import ShowPoll from "components/Polls/ShowPoll";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";
import { getFromLocalStorage } from "helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/polls/:id/edit" component={EditPoll} />
        <Route exact path="/polls/:id/show" component={ShowPoll} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
