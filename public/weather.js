(function(w, d, link, script, p) {
  window.onload = function() {
    // Load css
    var css = "https://incandescent-lollipop-c5880f.netlify.app/css/app.css";
    // Load js
    var js = "https://incandescent-lollipop-c5880f.netlify.app/js/app.js";

    link = d.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    d.getElementsByTagName("head")[0].appendChild(link);

    script = d.createElement("script");
    script.async = 1;
    script.src = js;
    p = d.getElementsByTagName("script")[0];
    p.parentNode.insertBefore(script, p);
  };
})(window, document);
