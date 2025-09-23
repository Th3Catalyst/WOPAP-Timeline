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

let tags = [];
function addTag(tag) {
  let input = document.getElementById("searchTag");
  input.value = "";
  if (tags.includes(tag)) {
    tags = tags.filter(e => e !== tag);
  } else {
    tags.push(tag);
  }
  let newtag = document.createElement("div");
  document.getElementById("searchTagCon").appendChild(newtag);
  newtag.innerText = tag;
  newtag.classList.add("tag");
  document.getElementById("searchTagCon").appendChild(input);

  let tagElements = document.getElementsByClassName("tag");
  for (let j = 0; j < tagElements.length; j++) {
    tagElements[j].addEventListener("click", function(e) {
      e.target.remove();
      tags = tags.filter(t => t !== e.target.innerText);
      tagSearch();
      if (tags.length == 0) {
        for (i = 0; i < events.length; i++) {
          events[i].style.display = "list-item";
        }
      }
    });
  }
}

function tagSearch() {
  for (i = 0; i < events.length; i++) {
    events[i].parentNode.style.display = "none";
    events[i].parentNode.previousElementSibling.classList.remove("active");
  }
  let enabledTags = tags;
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
  if (document.getElementById("search").value == "" && !menu) {
    for (i = 0; i < events.length; i++) {
      events[i].parentNode.style.display = "none";
      events[i].parentNode.previousElementSibling.classList.remove("active");
      events[i].style.display = "list-item";
    }
  }
}

document.getElementById("searchMenuB").addEventListener("click", (e) => {
  document.getElementById("searchContainer").classList.toggle("show");
  console.log("clicked");
});

document.getElementById("searchTag").addEventListener("focus", (e) => {
wordSearch(document.getElementById('tagList').querySelectorAll('li'), true);
  input = document.getElementById("searchTag")
  setTimeout(function(){ input.selectionStart = input.selectionEnd = 10000; }, 0);
document.getElementById("tagList").style.display = "block";
});

document.getElementById("searchTag").addEventListener("blur", (e) => {
  document.addEventListener("mouseup", (e) => {
    setTimeout(function(){document.getElementById("tagList").style.display = "none";
    if (tags.length == 0) {
      for (i = 0; i < events.length; i++) {
        events[i].style.display = "list-item";
      }
    }}, 20);
  }, { once: true });
  
});
document.getElementById("searchTagCon").addEventListener("click", (e) => {
  document.getElementById("searchTag").focus();
});
