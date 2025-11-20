// Entry point for content script
// This script runs on Confluence pages

const waitForElement = (selector: string, timeout = 10000): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
};

const main = async (): Promise<void> => {
  console.log('Oreore Confluence Sidemenu extension loaded');

  try {
    const elm = await waitForElement('.side-navigation-scrollable-list a');
    console.log('Found element .side-navigation-expander:', elm);
    elm.textContent = 'AAAAA';
    console.log('Element content updated to "AAAAA"');
  } catch (error) {
    console.error('Failed to find element .side-navigation-expander:', error);
  }
};

// Execute main function when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
