init();

function init() {
  var detect_button = function () {
    if (!document.getElementsByClassName("copy-branch-name-button").length) {
      add_button();
    }
  };
  this.Check = setInterval(function () {
    detect_button();
  }, 500);
}

function add_button() {
  const elm = document.createElement("div");
  const textnode = document.createTextNode("Copy branch name"); // Create a text node

  elm.className =
    "btn btn-grouped btn-info btn-inverted copy-branch-name-button";
  elm.appendChild(textnode);
  elm.addEventListener("click", function () {
    getBranchName();
  });

  if (document.getElementsByClassName("detail-page-header-actions")) {
    document
      .getElementsByClassName("detail-page-header-actions")[0]
      .appendChild(elm);
  }

  if (document.getElementById("ghx-statistic-group")) {
    document.getElementById("ghx-statistic-group")[0].appendChild(elm);
  }
}

function getBranchName() {
  const ticketID = document.getElementsByClassName("breadcrumbs-sub-title")[0];
  const title = document.getElementsByClassName("qa-title")[0];
  const branchName = `${ticketID.textContent.replace("#", "")}-${convertToSlug(
    title.textContent
  )}`;

  copyTextToClipboard(ticketID);
  copyTextToClipboard(branchName);
}

function convertToSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}
