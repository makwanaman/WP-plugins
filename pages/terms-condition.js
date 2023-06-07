import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Main from "../components/layout/Main";
export default function Privacy() {
  const [policyState, setpolicyState] = useState();
  useEffect(() => {
    let policy = localStorage.getItem("terms");
    setpolicyState(policy);
  }, []);

  return (
    <Main>
      <div className="container text-justify"> {parse(`${policyState}`)}</div>;
    </Main>
  );
}
