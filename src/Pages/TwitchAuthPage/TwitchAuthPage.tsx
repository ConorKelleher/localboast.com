import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { LS_KEY_TWITCH_AUTH_TOKEN, LS_KEY_TWITCH_CSRF_TOKEN } from "localboast/constants/twitchConstants";
import usePageTitle from "temp/usePageTitle";

const TwitchAuthPage = () => {
  const location = useLocation();
  usePageTitle("Authenticating | LocalBoast");
  const { access_token, state } = qs.parse(location.hash.slice(1));
  const csrfToken = useMemo(() => localStorage.getItem("twitch_auth_uid"), []);
  const [error, setError] = useState(
    access_token
      ? null
      : "Error: No access_token hash found in url. Authentication failed I guess todo: add actual error handling"
  );

  useEffect(() => {
    if (access_token && typeof access_token === "string") {
      if (state !== csrfToken) {
        setError("Error: mismatching CSRF token");
        return;
      }
      localStorage.removeItem(LS_KEY_TWITCH_CSRF_TOKEN);
      localStorage.setItem(LS_KEY_TWITCH_AUTH_TOKEN, access_token);
    }
  }, [access_token, state, csrfToken]);
  return error ? <div>{error}</div> : <div>Redirecting - todo - add nice loader :)</div>;
};

export default TwitchAuthPage;
