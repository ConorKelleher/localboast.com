import usePageTitle from "localboast/hooks/usePageTitle";
import useTwitchAuthRedirect from "localboast/hooks/useTwitchChat/useTwitchAuthRedirect";

const TwitchAuthPage = () => {
  usePageTitle("Authenticating | LocalBoast");

  const { error } = useTwitchAuthRedirect();

  return error ? <div>{error}</div> : <div>Redirecting - todo - add nice loader :)</div>;
};

export default TwitchAuthPage;
