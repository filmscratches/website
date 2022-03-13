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
  const film = document.getElementsByClassName('film')
  for (let i = 0; i < film.length; i++) {
    const status = film[i].getElementsByClassName('status')[0].textContent
    let include = true
    if (selectedStatuses.length !== 0 && !selectedStatuses.includes(status)) {
     include = false
    }
    const filmTags = film[i].getElementsByClassName('taglist')[0].textContent.split(", ")
    if (selectedTags.length !== 0 && !includeBook(filmTags, selectedTags)) {
      include = false
    }

    if (include) {
      film[i].style.display = 'block'
    }
    else {
      film[i].style.display = 'none'
    }
  }
}

function includefilm(filmTags, selectedTags) {
  const anyOrAll = document.getElementById("any-all").value

  // any overlap is fine
  if (anyOrAll === "any") {
    for (let i = 0; i < filmTags.length; i++) {
      for (let j = 0; j < selectedTags.length; j++) {
        if (filmTags[i] === selectedTags[j]) {
          return true
        }
      }
    }
    return false
  }


  for (let i = 0; i < selectedTags.length; i++) {
    if (!filmTags.includes(selectedTags[i])) return false
  }
  return true
}
