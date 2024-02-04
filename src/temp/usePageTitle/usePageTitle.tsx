import { useEffect } from "react";

/**
 * Hook to set the page title to whatever string is passed
 * @param title: string - Will update the title to match this arg whenever it changes
 */
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default usePageTitle;
