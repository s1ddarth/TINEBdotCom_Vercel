function fetchLinks() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "block";

  fetch("/api/getLinks")
    .then((response) => response.json())
    .then((data) => {
      if (loader) loader.style.display = "none";

      if (data.values) {
        displayLinks(data.values);
      } else {
        console.error("No data returned from backend.");
      }
    })
    .catch((error) => {
      if (loader) loader.style.display = "none";
      console.error("Error fetching data:", error);

      const linkContainer = document.getElementById("links");
      if (linkContainer) {
        linkContainer.textContent = "Error fetching links.";
      }
    });
}

function displayLinks(rows) {
  const linkContainer = document.getElementById("links");
  if (!linkContainer) return;

  linkContainer.innerHTML = "";

  rows.slice(1).forEach((row) => {
    const text = row[0];
    const href = row[1];
    const target = row[2] || "_blank";

    const anchor = document.createElement("a");
    anchor.className = "link";
    anchor.href = href;
    anchor.target = target;
    anchor.textContent = text;
    anchor.style.display = "block";

    linkContainer.appendChild(anchor);
  });
}

// Call on page load
fetchLinks();
