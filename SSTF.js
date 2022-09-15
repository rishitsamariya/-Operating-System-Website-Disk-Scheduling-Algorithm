function Reseting(){
  document.getElementById("myForm").reset();
}
function autoGenerate()
{
    var x = document.querySelector("#inputNumbers");
    var i = Math.floor((Math.random() * 199) + 1);
    x.value += i + " ";
};
document.querySelector('.download_btn').style.display = 'none';
function Calculate(){
  document.querySelector('.download_btn').style.display = 'block';
  var arr = document.getElementById("inputNumbers").value;
  var head = document.getElementById("inputheadpos").value;
  var multiple_head = document.getElementById("inputheadpos").value;

  var labels = [];
  var data = [];
  var Numbers = arr.split(' ').map(Number);
  multiple_head = multiple_head.split(' ').map(Number);
  var headpos = parseInt(head);
  // Checking Constraints
  if(multiple_head.length > 1){
    alert("Only one Head Position Allowed");
    Reseting();
    return;
  }

  if(arr.length==0 && head!=0){
    Reseting();
    alert("Please Enter numbers in Request Sequence Queue");
    return;
  }
  if(arr.length!=0 && head==0){
    // Reseting();
    alert("Please Enter Initial Position of Read/Write Head");
    return;
  }
  if(arr.length==0 && head==0){
    alert("Please Fill all fields");
    return;
  }

  var seekCountSequence = [];
  var seekAddressed = [];
  var tempArray = [];
  var visited = [];
  var totalNumbers = Numbers.length-1;
  var totalHeadMovements = 0;
  var distance = 0;
  var temp;


  for (var i = 0; i < totalNumbers; i++)
  {
      visited.push(0);
  }
  temp = headpos;

  for (var i = 0; i < totalNumbers; i++)
  {
      var minValue = 1000000;
      var index;
      for (var j = 0; j < totalNumbers; j++)
      {
          if (Math.abs(temp - Numbers[j]) < minValue && (visited[j] === 0))
          {
              index = j;
              minValue = Math.abs(temp - Numbers[j]);
          }
      }
      totalHeadMovements += Math.abs(temp - Numbers[index]);
      seekCountSequence.push(totalHeadMovements);
      visited[index] = 1;
      temp = Numbers[index];
      seekAddressed.push(Numbers[index]);
  }
  for (var i = 1; i < totalNumbers; i++)
  {
      tempArray.push(seekAddressed[i]);
  }
  // showResult(totalHeadMovements, tempArray);
  // Removing Duplicates
  seekAddressed.unshift(headpos);
  var freq  = [];
  for(var i=0; i<200; i++){
    freq[i] = 0;
  }
  for(var i=0; i<seekAddressed.length; i++){
    if(freq[seekAddressed[i]]==0){
      data.push(seekAddressed[i]);
      freq[seekAddressed[i]]++;
    }
  }
  // showResult(totalHeadMovements, data);
  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
      labels.push(i);
  }
  // console.log(totalHeadMovements);
  var maxi = Math.max(...data);
  var mini = Math.min(...data);
  if(maxi > 199 || mini < 0){
    alert("Maximum value < 200 and Minimum value > 0");
    Reseting();
    return;
  }
  else{
    // Chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Shortest Seek Time First (SSTF) Graph',
                data: data,
                fill: false,
                backgroundColor: 'rgba(255, 23, 54, 1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(225, 255, 255, 1)',
                pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
                pointHoverRadius: 7,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Track Request Sequence',
                    },
                    ticks: {
                      stepSize: 10
                    },
                },
                x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Seek Request Count',
                    }
                },
            }
        }
    });
  }
  document.querySelector(".canvas button").classList.add("printChart");
  document.querySelector(".printChart").style.visibility = "initial";
  document.querySelector(".printChart").addEventListener("click", function () {
      printImage();
  });
}
function showResult(count, seekSequence)
{
    var div = document.getElementById('count-output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = "<br/>Seek Sequence: <b>[" + seekSequence + "]</b><br /><br/>Total Seek Count: <b>" + count + "<b>";
}
function printImage()
{
    var canvas = document.querySelector("#myChart");
    var canvas_img = canvas.toDataURL("image/png",1.0);
    var pdf = new jsPDF('landscape','in', 'letter');
    pdf.addImage(canvas_img, 'png', .5, 1.75, 10, 5);
    pdf.save('SSTF Chart.pdf');
};
