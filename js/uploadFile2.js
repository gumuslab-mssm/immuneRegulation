// make dataset globally available
var dz;

// load dataset and create table
function load_dataset2(tsv) {
  var data = d3.tsv.parse(tsv)
  console.log("PARSING...");
  
  userTransArr[userTransDataId] = data;
  console.log(userTransArr[userTransDataId]);

  userTransDataId++;

  
  //create_table(data);
}

// create a table with column headers, types, and data
function create_table(data) {
  // table stats
  var keys = d3.keys(data[0]);

  var stats = d3.select("#stats")
    .html("")

  stats.append("div")
    .text("Columns: " + keys.length)

  stats.append("div")
    .text("Rows: " + data.length)

  d3.select("#table")
    .html("")
    .append("tr")
    .attr("class","fixed")
    .selectAll("th")
    .data(keys)
    .enter().append("th")
      .text(function(d) { return d; });

  d3.select("#table")
    .selectAll("tr.row")
      .data(data)
    .enter().append("tr")
      .attr("class", "row")
      .selectAll("td")
      .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
      .enter().append("td")
        .text(function(d) { return d; });
}

// handle upload button
function upload_button2(el, callback) {
  var uploader2 = document.getElementById(el);  
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    callback(contents);
  };

  uploader2.addEventListener("change", handleFiles, false);  

  function handleFiles() {
    console.log("Loading...");
    var file = this.files[0];
    reader.readAsText(file);

    var transfileList = document.getElementById("transfileList");
    var list = document.createElement("ul");
    transfileList.appendChild(list);

    var li = document.createElement("li");
    list.appendChild(li);
    var info = document.createElement("span");
    info.innerHTML = file.name + ": " + file.size + " bytes";
    li.appendChild(info);

    userTransFilename[userTransDataId] = file.name;
    console.log(userTransFilename[userTransDataId]);

  };
};