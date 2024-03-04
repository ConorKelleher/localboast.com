import { useEffect } from "react";
import { SE_TIP as SE_TIP_URL } from "constants/lbLinks";
import usePageTitle from "temp/usePageTitle";

const GivePage = () => {
  usePageTitle("How to Support | LocalBoast");

  useEffect(() => {
    window.location.replace(SE_TIP_URL);
  }, []);

  return null;
};

export default GivePage;
