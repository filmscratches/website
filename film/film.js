let selectedStatuses = []
let selectedTags = []

function toggleStatus(status) {
  const button = document.getElementById(status)
  if (button.classList.contains("toggle-button-on")) {
    button.classList.remove("toggle-button-on")
    selectedStatuses = selectedStatuses.filter(s => s !== status)
  } else {
    button.classList.add("toggle-button-on")
    selectedStatuses.push(status)
  }
  applyFilters()
}

function toggleTag(tag) {
  const button = document.getElementById(tag)
  if (button.classList.contains("toggle-button-on")) {
    button.classList.remove("toggle-button-on")
    selectedTags = selectedTags.filter(t => t !== tag)
  } else {
    button.classList.add("toggle-button-on")
    selectedTags.push(tag)
  }
  applyFilters()
}

function applyFilters() {
  const books = document.getElementsByClassName('book')
  for (let i = 0; i < books.length; i++) {
    const status = books[i].getElementsByClassName('status')[0].textContent
    let include = true
    if (selectedStatuses.length !== 0 && !selectedStatuses.includes(status)) {
     include = false
    }
    const bookTags = books[i].getElementsByClassName('taglist')[0].textContent.split(", ")
    if (selectedTags.length !== 0 && !includeBook(bookTags, selectedTags)) {
      include = false
    }

    if (include) {
      books[i].style.display = 'block'
    }
    else {
      books[i].style.display = 'none'
    }
  }
}

function includeBook(bookTags, selectedTags) {
  const anyOrAll = document.getElementById("any-all").value

  // any overlap is fine
  if (anyOrAll === "any") {
    for (let i = 0; i < bookTags.length; i++) {
      for (let j = 0; j < selectedTags.length; j++) {
        if (bookTags[i] === selectedTags[j]) {
          return true
        }
      }
    }
    return false
  }


  for (let i = 0; i < selectedTags.length; i++) {
    if (!bookTags.includes(selectedTags[i])) return false
  }
  return true
}