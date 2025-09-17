let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display != "none" && content.style.display != "") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

const events = document.querySelectorAll('[data-tags]');

function addTag(tag) {
  let input = document.getElementById("searchTag");
  if (input.value) {
    temp = input.value.split(',').map(tag => tag.trim().toLowerCase());
    temp.pop();
    if (!temp.includes(tag.toLowerCase()) && temp.length > 0) {
      input.value = temp.join(', ') + ', ' + tag + ', ';
    } else if (!temp.includes(tag.toLowerCase())) {
      input.value = tag + ', ';
    }
  } else {
    input.value = tag + ', ';
  }
}

function tagSearch() {
  input = document.getElementById("searchTag");
  filter = input.value;
  
  for (i = 0; i < events.length; i++) {
    events[i].parentNode.style.display = "none";
    events[i].parentNode.previousElementSibling.classList.remove("active");
  }
  let enabledTags = filter.split(',').map(tag => tag.trim().toLowerCase());
  console.log(enabledTags);
  for (i = 0; i < events.length; i++) {
    let tags = events[i].getAttribute("data-tags");
    if (tags) {
      let tagList = tags.split(',').map(tag => tag.trim().toLowerCase());
      if (tagList.some(element => enabledTags.includes(element))) {
        events[i].style.display = "list-item";
        events[i].parentNode.style.display = "block";
        events[i].parentNode.previousElementSibling.classList.add("active");
      } else {
        events[i].style.display = "none";
      }
    } else {
      events[i].style.display = "none";
    }
  }
}


function wordSearch(elements = events, menu = false) {
  
  if (!menu) {
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    for (i = 0; i < elements.length; i++) {
      elements[i].parentNode.style.display = "none";
      elements[i].parentNode.previousElementSibling.classList.remove("active");
    }
  } else {
    
    input = document.getElementById("searchTag");
    filter = input.value.toUpperCase().split(',');
    filter = filter[filter.length - 1].trim();
    console.log(filter);
  }
  for (i = 0; i < elements.length; i++) {
    if (!menu) {
      txtValue = elements[i].querySelector('div').querySelector('p').textContent || elements[i].querySelector('div').querySelector('p').innerText;
    } else {
      txtValue = elements[i].querySelector('button').textContent || elements[i].querySelector('button').innerText;
    }
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      elements[i].style.display = "list-item";
      if (!menu) {
        elements[i].parentNode.style.display = "block";
        elements[i].parentNode.previousElementSibling.classList.add("active");
      }
    } else {
      elements[i].style.display = "none";
    }
  }
}

document.getElementById("searchMenuB").addEventListener("click", (e) => {
  document.getElementById("searchContainer").classList.toggle("show");
  console.log("clicked");
});

document.getElementById("searchTag").addEventListener("focus", (e) => {
  input = document.getElementById("searchTag")
  val = input.value;
  input.value = '';
  input.value = val;
  console.log(val);
document.getElementById("tagList").style.opacity = "1";
});

document.getElementById("searchTag").addEventListener("blur", (e) => {
  document.getElementById("tagList").style.opacity = "0";
});