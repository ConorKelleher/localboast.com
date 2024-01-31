import { useEffect } from "react";
import { SE_TIP as SE_TIP_URL } from "constants/lbLinks";

const GivePage = () => {
  useEffect(() => {
    window.location.href = SE_TIP_URL;
  }, []);

  return null;
};

export default GivePage;
