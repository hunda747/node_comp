// const liq = document.querySelector('lignite');
// console.log('chart: '+ liq.value);

jQuery(document).ready(function() {
 var chartDiv = $("#barChart");
 var type = $("#lignite");
 console.log("char: " + type);
 var myChart = new Chart(chartDiv, {
  type: 'pie',
  data: {
   labels: ["Lignite", "Opal", "Oil", "Aluminium ores", "others"],
   datasets: [
   {
    data: [2,3, 1, 4, 6],
    backgroundColor: [
    "#FF6384",
    "#4BC0C0",
    "#FFCE56",
    "#E7E9ED",
    "#36A2EB"
    ]
   }]
  },
     options: {
         title: {
             display: true,
             text: 'Pie Chart'
         },
      responsive: false,
      maintainAspectRatio: false,
     }
 });
});