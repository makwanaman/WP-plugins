import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Main from "../components/layout/Main";
export default function Affiliate_terms() {
  const [policyState, setpolicyState] = useState();
  useEffect(() => {
    let policy = localStorage.getItem("affiliate_terms");
    setpolicyState(policy);
  }, []);

  return (
    <Main>
      <div className="container text-justify"> {parse(`${policyState}`)}</div>;
    </Main>
  );
}
