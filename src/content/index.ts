// Entry point for content script
// This script runs on Confluence pages

const main = (): void => {
  console.log('Oreore Confluence Sidemenu extension loaded');

  // TODO: Implement sidemenu customization logic
};

// Execute main function when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
