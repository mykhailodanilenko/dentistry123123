let coll1 = document.getElementsByClassName("collapse");
let i;

for (i = 0; i < coll1.length; i++) {
    coll1[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let toplist = this.nextElementSibling;
        if (toplist.style.display === "block") {
            toplist.style.display = "none";
            console.log(this);
        }
        else {
            toplist.style.display = "block";
        }
    });
}

let coll2 = document.getElementsByClassName("collapse2");
let j;

for (j = 0; j < coll2.length; j++) {
    coll2[j].addEventListener("click", function() {
        this.classList.toggle("active");
        let bottomlist = this.nextElementSibling;
        if (bottomlist.style.display === "block") {
            bottomlist.style.display = "none";
            console.log(this);
        }
        else {
            bottomlist.style.display = "block";
        }
    });
}