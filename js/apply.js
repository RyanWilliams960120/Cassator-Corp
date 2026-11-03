(function () {
  var MAX = 4 * 1024 * 1024;
  var form = document.getElementById("wf-form-JOIN-CASSATOR");
  if (!form) return;
  var fileInput = document.getElementById("Resume");
  var fileName = document.getElementById("resume-file-name");
  var clearButton = document.getElementById("resume-clear");
  var formError = document.getElementById("application-error");
  var success = form.parentNode.querySelector(".w-form-done");
  var role = document.getElementById("Role");

  function extension(name) {
    var match = String(name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
    return match ? match[1] : "";
  }

  function fileError(file) {
    if (!file) return "Add your CV or resume. PDF, DOC, and DOCX files are accepted.";
    if (["pdf", "doc", "docx"].indexOf(extension(file.name)) === -1) return "That file type is not accepted. Upload a PDF, DOC, or DOCX file.";
    if (file.size > MAX) return "That file is too large. The maximum size is 4 MB.";
    return "";
  }

  function showError(message) {
    if (success) success.style.display = "none";
    form.hidden = false;
    formError.hidden = false;
    formError.textContent = message;
  }

  function showFile(file) {
    var problem = fileError(file);
    if (problem) {
      fileInput.value = "";
      fileName.textContent = "PDF, DOC, or DOCX. Maximum 4 MB.";
      clearButton.hidden = true;
      showError(problem);
      return;
    }
    formError.hidden = true;
    fileName.textContent = file.name;
    clearButton.hidden = false;
  }

  document.addEventListener("click", function (event) {
    var item = event.target.closest ? event.target.closest("[data-position]") : null;
    if (!item || !role) return;
    role.value = item.getAttribute("data-position") || "";
  });

  fileInput.addEventListener("change", function () {
    showFile(fileInput.files && fileInput.files[0]);
  });

  clearButton.addEventListener("click", function () {
    fileInput.value = "";
    fileName.textContent = "PDF, DOC, or DOCX. Maximum 4 MB.";
    clearButton.hidden = true;
    formError.hidden = true;
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var data = new FormData(form);
    var message = String(data.get("Message") || "").trim();
    var problem = fileError(fileInput.files && fileInput.files[0]);
    if (!String(data.get("First-name") || "").trim() || !String(data.get("Last-name") || "").trim()) problem = problem || "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("Email") || "").trim())) problem = problem || "Enter a valid email address.";
    if (!String(data.get("Role") || "").trim()) problem = problem || "Enter the position you are applying for.";
    if (!message) problem = problem || "Write a message explaining why you are a good fit for this role.";
    if (problem) {
      showError(problem);
      return;
    }
    var button = form.querySelector(".clickable_btn");
    if (button) button.disabled = true;
    fetch("/api/apply", { method: "POST", body: data })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok && body && body.ok === true, error: body && body.error };
        }).catch(function () {
          return { ok: false, error: "The application could not be sent. Please try again in a moment." };
        });
      })
      .then(function (result) {
        if (!result.ok) {
          showError(result.error || "The application could not be sent. Please try again in a moment.");
          return;
        }
        formError.hidden = true;
        form.hidden = true;
        form.style.setProperty("display", "none", "important");
        if (success) {
          success.hidden = false;
          success.style.display = "block";
        }
        window.alert("Thank you. Your application, message, and CV were sent.");
      })
      .catch(function () {
        showError("The application could not be sent. Please try again in a moment.");
      })
      .then(function () {
        if (button) button.disabled = false;
      });
  }, true);
})();
