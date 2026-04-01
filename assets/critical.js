(function() {
    console.log('Critical JS loaded');

    function initPrivacyCheck() {
      // Check if the function we need actually exists yet
      if (window.Shopify && typeof window.Shopify.loadFeatures === 'function') {
        window.Shopify.loadFeatures(
          [{ name: 'consent-tracking-api', version: '0.1' }],
          function(error) {
            if (error) return;
            const cp = window.Shopify.customerPrivacy;
            
            console.log("Privacy API Ready!");
            console.log("Should show banner:", cp.shouldShowBanner());
            console.log("Consent Status:", cp.currentVisitorConsent());

            // Create a style element
            var style = document.createElement('style');
            style.type = 'text/css';
            // Write the style rule to apply
            var css = '#shopify-pc__banner { border: 1px solid red !important; }';
            if (style.styleSheet) {
              style.styleSheet.cssText = css; // Support for older IE
            } else {
              style.appendChild(document.createTextNode(css));
            }
            // Inject style into the head immediately (no waiting for DOM ready)
            document.getElementsByTagName('head')[0].appendChild(style);
            
            // Trigger your custom logic here
            if (cp.userCanBeTracked()) {
              // Start tracking...
            }
          }
        );
      } else {
        // If not ready, wait 50ms and try again
        setTimeout(initPrivacyCheck, 50);
      }
    }

    // Start the polling process immediately
    initPrivacyCheck();
})();

addEventListener("DOMContentLoaded", (event) => { 
    console.log('DOMContentLoaded'); 
    document.body.classList.add('js');
});
