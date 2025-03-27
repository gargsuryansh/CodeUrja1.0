function openChat() {
  document.getElementById("chatBox").style.display = "block";
}

function closeChat() {
  document.getElementById("chatBox").style.display = "none";
}

window.onclick = function (event) {
  var chatBox = document.getElementById("chatBox");
  if (event.target == chatBox) {
    chatBox.style.display = "none";
  }
};
