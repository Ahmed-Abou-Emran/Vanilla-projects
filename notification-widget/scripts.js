const closeButtons = document.querySelectorAll(".close-button");

function hideNotification(notification) {
  notification.classList.add("hidden");
}

console.log(closeButtons);

closeButtons.forEach((button) => {
  button.addEventListener(
    "click",
    hideNotification.bind(null, button.parentNode)
  );
});

// removing all notifications when the escape key is pressed
window.addEventListener("load", function () {
  function removeNotifications() {
    // Get all notification widgets and store them in an array
    var notifications = document.querySelectorAll(".notification");

    // Loop through the notifications array and remove each widget
    for (var i = 0; i < notifications.length; i++) {
      console.log(notifications[i].parentNode);
      notifications[i].parentNode.removeChild(notifications[i]);
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      removeNotifications();
    }
  });
});
