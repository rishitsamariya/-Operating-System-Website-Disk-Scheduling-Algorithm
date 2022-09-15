function Reseting(){
  document.getElementById("myForm").reset();
}
function autoGenerate()
{
    var x = document.querySelector("#inputNumbers");
    var i = Math.floor((Math.random() * 199) + 1);
    x.value += i + " ";
};







// FCFS
function FCFS(meta_meta_data, headpos){
  var data = [];
  for(var i=0; i<meta_meta_data.length; i++){
    data.push(meta_meta_data[i]);
  }
  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
  }
  return total_seek_time;
}








// SSTF
function SSTF(meta_meta_data, numbers, headpos){

  var seekCountSequence = [];
  var seekAddressed = [];
  var tempArray = [];
  var visited = [];
  var totalNumbers = numbers.length-1;
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
          if (Math.abs(temp - numbers[j]) < minValue && (visited[j] === 0))
          {
              index = j;
              minValue = Math.abs(temp - numbers[j]);
          }
      }
      totalHeadMovements += Math.abs(temp - numbers[index]);
      seekCountSequence.push(totalHeadMovements);
      visited[index] = 1;
      temp = numbers[index];
      seekAddressed.push(numbers[index]);
  }
  for (var i = 1; i < totalNumbers; i++)
  {
      tempArray.push(seekAddressed[i]);
  }

  seekAddressed.unshift(headpos);
  var freq  = [];
  for(var i=0; i<200; i++){
    freq[i] = 0;
  }
  var data = [];
  for(var i=0; i<seekAddressed.length; i++){
    if(freq[seekAddressed[i]]==0){
      data.push(seekAddressed[i]);
      freq[seekAddressed[i]]++;
    }
  }

  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
  }
  return total_seek_time;
}










// SCAN
function SCAN(meta_meta_data, direction, headpos){
  var data = [];
  if(direction === "right"){
    var right = [];
    var left = [];
    // console.log(meta_meta_data[2]);
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    right.push(199);
    right.sort(function(a, b){return a - b});
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    // console.log(left.length);
    left.sort(function(a, b){return a - b});
    left.reverse();

    data.push(headpos);

      for(var i=0; i<right.length; i++){
        data.push(right[i]);
      }

      for(var i=0; i<left.length; i++){
        data.push(left[i]);
      }
  }
  else if(direction === "left"){
    var right = [];
    var left = [];

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    left.push(0);
    left.sort(function(a, b){return a - b});
    left.reverse();

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    right.sort(function(a, b){return a - b});

    data.push(headpos);
    for(var i=0; i<left.length; i++){
      data.push(left[i]);
    }
    for(var i=0; i<right.length; i++){
      data.push(right[i]);
    }
  }
  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
  }
  return total_seek_time;
}







// CSCAN
function CSCAN(meta_meta_data, direction, headpos){
  var data = [];

  if(direction === "right"){
    var right = [];
    var left = [];
    // console.log(meta_meta_data[2]);
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    right.push(199);
    right.sort(function(a, b){return a - b});
    right.push(0);
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    // console.log(left.length);
    left.sort(function(a, b){return a - b});
    // left.reverse();

    data.push(headpos);

      for(var i=0; i<right.length; i++){
        data.push(right[i]);
      }

      for(var i=0; i<left.length; i++){
        data.push(left[i]);
      }
  }
  else if(direction === "left"){
    var right = [];
    var left = [];

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    left.push(0);
    left.sort(function(a, b){return a - b});
    left.reverse();
    left.push(199);

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    right.sort(function(a, b){return a - b});
    right.reverse();

    data.push(headpos);
    for(var i=0; i<left.length; i++){
      data.push(left[i]);
    }
    for(var i=0; i<right.length; i++){
      data.push(right[i]);
    }
  }
  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
  }
  return total_seek_time;
}






// LOOK
function LOOK(meta_meta_data, direction, headpos){
  var data = [];

  if(direction === "right"){
    var right = [];
    var left = [];
    // console.log(meta_meta_data[2]);
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    // right.push(199);
    right.sort(function(a, b){return a - b});
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    // console.log(left.length);
    left.sort(function(a, b){return a - b});
    left.reverse();

    data.push(headpos);

      for(var i=0; i<right.length; i++){
        data.push(right[i]);
      }

      for(var i=0; i<left.length; i++){
        data.push(left[i]);
      }
  }
  else if(direction === "left"){
    var right = [];
    var left = [];

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    // left.push(0);
    left.sort(function(a, b){return a - b});
    left.reverse();

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    right.sort(function(a, b){return a - b});

    data.push(headpos);
    for(var i=0; i<left.length; i++){
      data.push(left[i]);
    }
    for(var i=0; i<right.length; i++){
      data.push(right[i]);
    }
  }
  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
  }
  return total_seek_time;
}







// CLOOK
function CLOOK(meta_meta_data, direction, headpos){
  var data = [];
  if(direction === "right"){
    var right = [];
    var left = [];
    // console.log(meta_meta_data[2]);
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    // right.push(199);
    right.sort(function(a, b){return a - b});
    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    // console.log(left.length);
    left.sort(function(a, b){return a - b});
    // left.reverse();

    data.push(headpos);

      for(var i=0; i<right.length; i++){
        data.push(right[i]);
      }

      for(var i=0; i<left.length; i++){
        data.push(left[i]);
      }
  }
  else if(direction === "left"){
    var right = [];
    var left = [];

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] < headpos){
        left.push(meta_meta_data[i]);
      }
    }
    // left.push(0);
    left.sort(function(a, b){return a - b});
    left.reverse();

    for(var i=0; i<meta_meta_data.length; i++){
      if(meta_meta_data[i] > headpos){
        right.push(meta_meta_data[i]);
      }
    }
    right.sort(function(a, b){return a - b});
    right.reverse();

    data.push(headpos);
    for(var i=0; i<left.length; i++){
      data.push(left[i]);
    }
    for(var i=0; i<right.length; i++){
      data.push(right[i]);
    }
  }

  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
  }
  return total_seek_time;
}





// Main function
document.querySelector('.download_btn').style.display = 'none';
function Calculate(){
  document.querySelector('.download_btn').style.display = 'block';
  var arr = document.getElementById("inputNumbers").value;
  var head = document.getElementById("inputheadpos").value;
  var multiple_head = document.getElementById("inputheadpos").value;
  var direction = document.getElementById("userInputDirection").value;

  var labels = ['FCFS', 'SSTF', 'SCAN', 'CSCAN', 'LOOK', 'CLOOK'];
  var data = [];
  var meta_data = arr.split(' ').map(Number);

  if(meta_data[meta_data.length - 1] === 0){
    meta_data.pop();
  }

  multiple_head = multiple_head.split(' ').map(Number);
  // Checking Constransts
  if(multiple_head.length > 1){
    alert("Only one Head Position Allowed");
    Reseting();
    return;
  }
  if (direction === "null")
  {
    Reseting();
    alert("Please Choose Direction");
    return;
  }
  var headpos = parseInt(head);
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
  if(headpos >= 200 || headpos < 0){
    alert("Maximum value of Head < 200 and Minimum value of Head >= 0");
    return;
  }
  // Removing Duplicates
  meta_data.unshift(headpos);
  var freq  = [];
  for(var i=0; i<200; i++){
    freq[i] = 0;
  }
  // console.log(meta_data.length);
  var meta_meta_data = [];
  for(var i=0; i<meta_data.length; i++){
    if(freq[meta_data[i]]==0 && meta_data[i]!=199 && meta_data[i]!=0){
      meta_meta_data.push(meta_data[i]);
      freq[meta_data[i]]++;
    }
  }
  // Algorithm
  var fcfs = FCFS(meta_meta_data, headpos);
  data.push(fcfs);
  var numbers = meta_meta_data;
  var sstf = SSTF(meta_meta_data, numbers, headpos);
  data.push(sstf);
  var scan = SCAN(meta_meta_data, direction, headpos);
  data.push(scan);
  var cscan = CSCAN(meta_meta_data, direction, headpos);
  data.push(cscan);
  var look = LOOK(meta_meta_data, direction, headpos);
  data.push(look);
  var clook = CLOOK(meta_meta_data, direction, headpos);
  data.push(clook);
  // data.push(400);
  // var maxy = Math.max(...data);
  // data.push(maxy + 100);

  var maxi = Math.max(...meta_meta_data);
  var mini = Math.min(...meta_meta_data);
  if(maxi > 199 || mini < 0){
    alert("Maximum value < 200 and Minimum value > 0");
    Reseting();
    return;
  }
  else{
      // Chart
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {

          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Comparison Graph of All Six Algorithms - Seek Time',
                  data: data,
                  fill: false,
                  backgroundColor: [
                                    'rgba(30, 144, 255, 1)',
                                    'rgba(255, 127, 80, 1)',
                                    'rgba(128, 128, 0, 1)',
                                    'rgba(173, 255, 47,  1)',
                                    'rgba(127, 255, 212, 1)',
                                    'rgba(255, 20, 147, 1)',
                                  ],
                  borderColor: 'rgba(0, 0, 0, 1)',
                  borderWidth: 2,
                  pointRadius: 2,
                  pointBackgroundColor: 'rgba(225, 255, 255, 0)',
                  pointHoverBackgroundColor: 'rgba(255, 0, 0, 0)',
                  pointHoverRadius: 7,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Total Seek Time',
                      },
                      ticks: {
                        stepSize: 50,
                      }
                  },
                  // yAxes: [{
                  //           ticks: {
                  //
                  //           }
                  //       }],
                  x: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Disk Scheduling Algorithms',
                      }
                  },
              }
          }
      });
  }
}
