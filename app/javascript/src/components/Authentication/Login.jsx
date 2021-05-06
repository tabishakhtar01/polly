import React, { useState } from "react";
import PageLoader from "components/PageLoader";
import LoginForm from "components/Authentication/Form/LoginForm";
import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      //   console.log(response.data)
      setToLocalStorage({
        authToken: response.data.auth_token,
        email,
        userId: response.data.userId,
        userName: response.data.user_name,
      });
      setAuthHeaders();
      setLoading(false);
      setPageLoading(true);
      setTimeout(() => {
        // setPageLoading(true);
        window.location.href = "/";
      }, 3000);
      // window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
