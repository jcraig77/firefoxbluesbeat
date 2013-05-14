/**
 * XULSchoolChrome namespace.
 */
if ("undefined" == typeof(XULSchoolChrome)) {
  var Bluesbeat = {};
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
Bluesbeat.BrowserOverlay = {
  /**
   * Says 'Hello' to the user.
   */
  init: function() {
    var sidebarWindow = document.getElementById("sidebar").contentWindow;
  
    // Verify that our sidebar is open at this moment:
    if (sidebarWindow.location.href ==
          "chrome://bluesbeat/content/sidebar.xul") {
      sidebarWindow.BluesbeatSidebar.init();
    }
  }
};

if(gBrowser) gBrowser.addEventListener("DOMContentLoaded", Bluesbeat.BrowserOverlay.init, false);
