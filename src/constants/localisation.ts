export const DEFAULT_LOCALE = {
  support: "Support This Project",
  tipOnSE: "Tip Me Live on Stream!",
  becomeAPatron: "Become a Patron",
  buyKoFi: "Buy Me a Coffee",
  email: "Email",
  discord: "Discord",
  tsAndCs: "Ts & Cs",
  githubLib: "GitHub - Library",
  githubSite: "GitHub - Website",
  seeLive: "Watch me live",
  youtube: "YouTube",
  twitch: "Twitch",
  seeGive: "Ways to support",
  seeGithub: "GitHub Codebases",
  seeLibCode: "LocalBoast Library Source Code",
  seeSiteCode: "This Website's Source Code",
  seeDocs: "Explore the LocalBoast Library",
  seeWip: "See what I'm working on",
  seeApps: "Apps using the Library",
};

type Key = keyof typeof DEFAULT_LOCALE;

export const getCopy = (key: Key) => {
  // Placeholder for some eventual localization
  const locale = DEFAULT_LOCALE;
  return locale[key];
};

export default getCopy;
