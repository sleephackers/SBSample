const list = document.querySelector("#student-list ul");

const searcher = document.querySelector("#search_by");
searcher.addEventListener("click", e => {
  if (e.target.id == "by_year") {
    console.log("year");
  }
  if (e.target.id == "by_course") {
    console.log("course");
  }
});

function show() {
  var iframe1 = document.getElementById("iframe");
  iframe1.style.display = "block";
}


// hide books
// const hideBox = document.querySelector('#hide');
// hideBox.addEventListener('change', function(e){
//   if(hideBox.checked){
//     list.style.display = "none";
//   } else {
//     list.style.display = "initial";
//   }
// });

// filter books
// const searchBar = forms["search-students"].querySelector("input");
// searchBar.addEventListener("keyup", e => {
//   const term = e.target.value.toLowerCase();
//   const students = list.getElementsByTagName("li");
//   Array.from(students).forEach(student => {
//     const name = student.firstElementChild.textContent;
//     if (name.toLowerCase().indexOf(e.target.value) != -1) {
//       student.style.display = "block";
//       console.log(term);
//     } else {
//       student.style.display = "none";
//       console.log(term);
//     }
//   });
// });
var countcourse = 0;
var result = [],
  uniqueCourse;
var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/students/", true);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    {
      for (var i = 0; data.students[i]; i++)
        result[i] = data.students[i].course;
      uniqueCourse = Array.from(new Set(result));
    }
  } else {
    console.log("error");
  }
};
request.send();

for (var j = 0; j < uniqueCourse.length; j++) {
  request.open(
    "GET",
    "http://localhost:3000/students/" + uniqueCourse[j],
    true
  );
  request.onload = function() {
    var studdet = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      {
        for (var k = 0; studdet[k]; k++) {
          const li = document.createElement("li");
          const studName = document.createElement("span");
          const studyear = document.createElement("span");

          // add text content
          studName.textContent = studdet[j].name;
          studyear.textContent = studdet[j].year;

          // add classes
          studName.classList.add("name");
          studyear.classList.add("year");
          console.log("name:" + studName.textContent);
          // append to DOM
          li.appendChild(studName);
          li.appendChild(studyear);
          list.appendChild(li);
        }
      }
    } else {
      console.log("error");
    }
  };
  request.send();
}
