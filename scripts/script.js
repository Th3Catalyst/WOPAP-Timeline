const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    console.log(content.style.display);
    if (content.style.display != "none" || content.style.display == "") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    console.log(content.style.display);
  });
}