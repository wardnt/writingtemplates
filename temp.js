const comb = document.getElementById("combineButton");
const copy = document.getElementById("copy");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup2");
const overlaypopup = document.getElementById("overlaypopup");
const closeBtns = document.querySelectorAll(".close-btn");
var myNav = document.getElementById("myNav");
  function setContent(element) {
    if (element.element.textContent.trim() === "") {
      element.element.setAttribute("data-placeholder", element.placeholder);
      localStorage.removeItem(element.storageKey);
    } else {
      element.element.removeAttribute("data-placeholder");
      localStorage.setItem(element.storageKey, element.element.textContent);
    }
  }
  
  function handleInput(element) {
    setContent(element);
  }
  
  function handlePaste(element) {
    element.element.addEventListener("paste", function (e) {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      element.element.normalize();
      const selection = window.getSelection();
      selection.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(element.element);
      range.collapse(false);
      selection.addRange(range);
    });
  }
  
  function handleLoad(element) {
    window.addEventListener("load", function () {
      var savedContent = localStorage.getItem(element.storageKey);
      if (savedContent) {
        element.element.innerHTML = savedContent;
      }
    });
  }
  
  function resetContent(element) {
    element.element.innerHTML = element.originalContent;
    localStorage.removeItem(element.storageKey);
    element.element.setAttribute("data-placeholder", "Start typing...");
  }
  
  for (const key in elements) {
    const element = elements[key];
  
    element.originalContent = element.element.innerHTML;
  
    const savedContent = localStorage.getItem(element.storageKey);
    if (savedContent) {
      element.element.innerHTML = savedContent;
      element.element.removeAttribute("data-placeholder");
    }
  
    element.element.addEventListener("input", function () {
      handleInput(element);
    });
  
    handlePaste(element);
  
    handleLoad(element);
  }
  
  resetButton.addEventListener("click", function () {
    for (const key in elements) {
      const element = elements[key];
      resetContent(element);
    }
  });
  copy.addEventListener("click", function () {
    copyToClipboard();
  });
  copy.addEventListener("click", function() {
    copy.classList.remove("copyBtn");
    copy.classList.add("green");
    copy.innerHTML = "Copied <i class='fa-solid fa-check' style='color: #000000;'></i>";
    setTimeout(function() {
      copy.classList.remove("green");
      copy.classList.add("copyBtn");
      copy.innerHTML = "Copy <i class='fa-regular fa-copy' style='color: #000000;'></i>";
    }, 2000);
  });

  comb.addEventListener("click", function() {
    comb.innerHTML = "Combined <i class='fa-solid fa-check' style='color: #000000;'></i>";
    setTimeout(function() {
      comb.innerHTML = "Combine <i class='fa-solid fa-layer-group' style='color: #000000;'></i>";
    }, 2000);
  });

  function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementsByClassName("topnav").style = topnav.style;
  }

  btn1.addEventListener("click", function() {
    popup1.style.display = "block";
    overlaypopup.style.display = "block";
  });
  
  btn2.addEventListener("click", function() {
    popup2.style.display = "block";
    overlaypopup.style.display = "block";
  });
  
  for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener("click", function() {
      popup1.style.display = "none";
      popup2.style.display = "none";
      overlaypopup.style.display = "none";
    });
  }