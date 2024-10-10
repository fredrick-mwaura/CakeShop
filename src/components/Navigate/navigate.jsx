import React from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import Home from "../../home"; 

const BackOrHome = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  React.useEffect(() => {
    if (navigationType === "POP") {
      navigate(-1);
    }
  }, [navigate, navigationType]);

  if (navigationType !== "POP") {
    return <Home />;
  }

  return null;
};

export default BackOrHome;