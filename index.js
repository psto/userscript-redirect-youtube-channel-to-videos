// ==UserScript==
// @name        Redirect YouTube channel to /videos
// @namespace   https://stojanow.com/
// @match       https://*.youtube.com/@*
// @match       http://*.youtube.com/@*
// @match       https://youtube.com/@*
// @match       http://youtube.com/@*
// @run-at      document-start
// @grant       none
// @version      0.2.0
// @author      Piotr Stojanow (https://github.com/psto/)
// @license     MIT
// @description Redirect a YouTube channel home page straight to the videos tab.
// @icon        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiMtJG_PC4lsb3-GZAiTZkUXAm3VlkJC1Ag&s
// ==/UserScript==

(function() {
  const excludedPaths = ['/community', '/live', '/playlists', '/search', '/podcasts', '/shorts', '/streams'];
  let isRedirecting = false;

  function redirectIfNeeded() {
    if (isRedirecting) return; // Prevent multiple redirections

    const currentPath = window.location.pathname;
    const channelMatch = currentPath.match(/^\/@([^/]+)/);

    if (channelMatch) {
      const channelName = channelMatch[1];
      const shouldRedirect = !excludedPaths.some(path => currentPath.startsWith(`/@${channelName}${path}`));

      if (shouldRedirect && (!currentPath.endsWith('/videos') || currentPath.endsWith('/featured'))) {
        isRedirecting = true;
        const newUrl = `https://www.youtube.com/@${channelName}/videos`;
        window.location.href = newUrl;
      }
    }
  }

  // Observe changes in the DOM to trigger redirection if needed
  const observer = new MutationObserver(redirectIfNeeded);
  observer.observe(document, { subtree: true, childList: true });

  // Initial check for redirection
  redirectIfNeeded();
})();
