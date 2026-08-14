import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures every page navigation starts scrolled to the top,
 * instead of keeping the previous page's scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}