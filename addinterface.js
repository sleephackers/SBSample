document.getElementById("addsave").addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/students/";
  var params =
    "name=" +
    document.getElementById("addname").value +
    "&year=" +
    document.getElementById("addyear").value +
    "&course=" +
    document.getElementById("addcourse").value +
    "&experience=" +
    document.getElementById("addexperience").value;
  "&work=" + document.getElementById("addwork").value;
  xhr.open("POST", url, true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  };
  xhr.send(params);
  alert("Student added");
  history.back();
});
