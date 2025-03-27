function convertMarkdown() {
  const markdownText = document.getElementById("markdownEditor").value;
  const htmlContent = marked.parse(markdownText);
  document.getElementById("preview").innerHTML = htmlContent;
}

function previewWebpage() {
  const previewWindow = window.open("", "_blank");
  previewWindow.document.write(
    "<html><head><title>Preview</title></head><body>"
  );
  previewWindow.document.write(document.getElementById("preview").innerHTML);
  previewWindow.document.close();
}

function uploadMedia(type) {
  const mediaInput = document.getElementById("mediaInput");
  mediaInput.accept = type === "image" ? "image/*" : "video/*";
  mediaInput.setAttribute("data-type", type);
  mediaInput.click();
}

function handleMediaUpload() {
  const fileInput = document.getElementById("mediaInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const markdownEditor = document.getElementById("markdownEditor");
      const mediaType = fileInput.getAttribute("data-type");
      let markdownTag;

      if (mediaType === "image") {
        markdownTag = `![${file.name}](${event.target.result})`;
      } else if (mediaType === "video") {
        markdownTag = `<video controls><source src="${event.target.result}" type="${file.type}"></video>`;
      }

      markdownEditor.value += `\n${markdownTag}\n`;
      convertMarkdown();
    };
    reader.readAsDataURL(file);
  }
}

function exportContent() {
  const title = document.getElementById("pageTitle").value || "Untitled Page";
  const description =
    document.getElementById("metaDescription").value ||
    "Generated with Web Echos";
  const keywords =
    document.getElementById("keywords").value || "static, site, generator";
  const content = document.getElementById("preview").innerHTML;

  const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="${keywords}">
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; padding: 20px; }
            h1 { color: #333; }
        </style>
    </head>
    <body>
        <h1>${title}</h1>
        <div>${content}</div>
    </body>
    </html>`;

  const blob = new Blob([htmlTemplate], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.replace(/\s+/g, "_")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
