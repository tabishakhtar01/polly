import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import EditPoll from "components/Polls/EditPoll";
import Signup from "components/Authentication/Signup";

import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import { initializeLogger } from "common/logger";
import ShowPoll from "components/Polls/ShowPoll";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const App = () => {
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    // setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/polls/:id/edit" component={EditPoll} />
        <Route exact path="/polls/:id/show" component={ShowPoll} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
