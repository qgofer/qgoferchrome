// Make the DIV element draggable:
let isDragging = false;
let timer;

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // Function to start dragging
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // Start timer to distinguish between single click and dragging
    timer = setTimeout(function() {
      isDragging = true;
    }, 200); // Adjust timer duration as needed
    
    // Attach event listeners for dragging
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  // Function to handle dragging
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  // Function to stop dragging
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    clearTimeout(timer); // Clear the timer
    document.onmouseup = null;
    document.onmousemove = null;
    
    // If not dragging, treat it as a single click
    if (!isDragging) {
      console.log("Single click");
      chrome.runtime.sendMessage({ action: 'openNewWindow' });
    }
    // Reset isDragging flag
    isDragging = false;
  }

  // Attach mousedown event listener to start dragging
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
}

// Create image element and set properties
const image = document.createElement("img");
image.src = chrome.runtime.getURL('assets/ext-icon.png');
image.alt = "qgofer";
image.style.position = "fixed";
image.style.top = "30%";
image.style.right = "1%";
image.style.transform = "translateY(-50%)";
image.style.cursor = "pointer";
image.style.width = "80px";
image.style.height = "80px";
image.setAttribute("id", "myImage");

// Append the image element to the document body
document.body.append(image);

// Make the DIV element draggable:
dragElement(image);
