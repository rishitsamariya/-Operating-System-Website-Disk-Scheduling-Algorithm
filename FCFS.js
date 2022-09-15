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
  var meta_data = arr.split(' ').map(Number);
  multiple_head = multiple_head.split(' ').map(Number);
  // Checking Constransts
  if(multiple_head.length > 1){
    alert("Only one Head Position Allowed");
    Reseting();
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
  //Algorithm
  meta_data.unshift(headpos);
  var freq  = [];
  for(var i=0; i<200; i++){
    freq[i] = 0;
  }
  for(var i=0; i<meta_data.length; i++){
    if(freq[meta_data[i]]==0){
      data.push(meta_data[i]);
      freq[meta_data[i]]++;
    }
  }
  var total_seek_time = 0;
  for(var i = 0; i<data.length; i++){
      total_seek_time += Math.abs(headpos - data[i]);
      headpos = data[i];
      labels.push(i);
  }
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
                label: 'First Come First Serve (FCFS) Graph',
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
}
