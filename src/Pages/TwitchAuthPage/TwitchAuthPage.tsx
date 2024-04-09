import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { LS_KEY_TWITCH_AUTH_TOKEN, LS_KEY_TWITCH_CSRF_TOKEN } from "localboast/constants/twitchConstants";
import usePageTitle from "localboast/hooks/usePageTitle";
import useLocalStorage from "localboast/hooks/useLocalStorage";

const TwitchAuthPage = () => {
  const location = useLocation();
  usePageTitle("Authenticating | LocalBoast");
  const { access_token, state } = qs.parse(location.hash.slice(1));
  const [csrfToken, , clearCsrfToken] = useLocalStorage<string | null>(LS_KEY_TWITCH_CSRF_TOKEN, null);
  const [, setAuthToken] = useLocalStorage<string | null>(LS_KEY_TWITCH_AUTH_TOKEN, null);
  const [error, setError] = useState(
    access_token
      ? null
      : "Error: No access_token hash found in url. Authentication failed I guess todo: add actual error handling"
  );

  useEffect(() => {
    if (access_token && typeof access_token === "string") {
      if (state !== csrfToken) {
        setError("Error: mismatching CSRF token: " + state + ", expecting : " + csrfToken);
        return;
      }
      clearCsrfToken();
      setAuthToken(access_token);
    }
  }, [access_token, state, csrfToken, clearCsrfToken, setAuthToken]);
  return error ? <div>{error}</div> : <div>Redirecting - todo - add nice loader :)</div>;
};

export default TwitchAuthPage;
