chrome.action.onClicked.addListener((tab) => {
    // Create a draggable UI element (e.g., a div)
    const draggableElement = document.createElement("div");
    draggableElement.style.position = "absolute";
    draggableElement.style.top = "50px";
    draggableElement.style.left = "50px";
    draggableElement.style.width = "200px";
    draggableElement.style.height = "100px";
    draggableElement.style.background = "rgba(255, 0, 0, 0.5)";
    draggableElement.style.cursor = "grab";

    // Enable dragging
    let isDragging = false;
    let offsetX, offsetY;

    draggableElement.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
        offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            draggableElement.style.left = e.clientX - offsetX + "px";
            draggableElement.style.top = e.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Append the draggable element to the page
    document.body.appendChild(draggableElement);
});