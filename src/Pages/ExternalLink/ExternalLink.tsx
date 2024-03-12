import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ExternalLinkMappings } from "./constants";
import ErrorPage from "Pages/ErrorPage";

const ExternalLink = () => {
  const { pathname } = useLocation();
  const linkKey = pathname.slice(1) as keyof typeof ExternalLinkMappings;
  const link = ExternalLinkMappings[linkKey];

  useEffect(() => {
    if (link) {
      window.location.replace(link);
    }
  }, [link]);

  return link ? null : <ErrorPage />;
};

export default ExternalLink;
