

/* The setInterval() will execute the function for every given
milliseconds.  */
let interval = setInterval(function main() {
    // If the chart does not exist...
    if (!Chart){
        // Output the content of the Chart (an error?)
        console.log(Chart);
    } else{
        /* If the chart exists, then we can clear the interval
           so that it can stop checking. */
        clearInterval(interval);
    }
    /* 3d. */
    createGradeByWeekChart();
    createPointsInClassChart(); 
    createPointsByCategoryChart();
}, 100)

/* 3c. */
function createGradeByWeekChart(){
    const canvas = document.querySelector("#pointsInClass-chart");
    let options = {
      // the type of chart we want to use
      type: "pie",
      data: {
        datasets: [{
            data: [40, 60],
            backgroundColor:[
                'rgba(155, 89, 182, 1.0)',
                'rgba(155, 89, 182, 0.5)',
            ]
        }]
    },
    options: {
        parsing: {
            key: 'nested.value'
        },
        plugins:{
            title:{
                display: true,
                text: "Points in class",
            }
        }
    },
   
    };
    const chart = new Chart(canvas.getContext("2d"), options);
}

function createPointsInClassChart() {
  /* Planning:
        The options object has 
        type: like a bar, pie, graph, etc...
        data: is an object itself and has information on:
        {
            labels: an array of labels per category 
            datasets: an array of objects which defines each category.
            Each object contains:
            {
               label: the category name itself
               data: the numerical values (in array)
               backgroundColor: the color of the bar
            }
        }
        options: an object that contains the three objs:
        {
            scales:
            x:
            y:
            aspectRatio:
            Plugins:
        }
    */
  const canvas = document.querySelector("#trend-chart");
  let options = {
    // the type of chart we want to use
    type: "line",
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      datasets: [
        {
          data: ["65", "57", "81", "84", "55", "52", "39", "63", "72", "78"],
          backgroundColor: "rgba(155, 89, 182, 1)",
          borderColor: "rgba(155, 89, 182, 1)",
          tension: "0.25", /* //! Adds curvature to the line */
        },
        {
          //   label: "Missed",
          data: ["60", "70", "80", "75", "80", "85", "82", "79", "83", "81"],
          backgroundColor: "rgba(153, 167, 191,1)",
          borderColor: "rgba(153, 167, 191,1)",
          tension: "0.25", /* // Adds curvature to the line */
          borderDash: [4,4], /* // Adds dashed line */
        },
      ],
    },
    options: {
    //   elements:{
    //     line: 
    //   },
      scales: {
        yAxis: {  
            /* //! (new) to add axes labels */
          title: {
            display: true,
            text: 'Grade',
          },
          /* //! (new) We add the min and max to show the whole range
                vertically  */  
          min: 0,
          max: 100,
          stacked: false /* No stacking!! direct overlap */,
          grid: {
            display: false,
          },
        },
        xAxis: {
          title:{
            display: true,
            text: 'Week',
          },
          stacked: false,
          grid: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Your Grade By Week",
        },
        legend: {
          display: false, /* // This is to toggle off the legend 
                                that appears on the top of the graph */

        },
      },
    },
  };
  const chart = new Chart(canvas.getContext("2d"), options);

}

/* Building the Charts */

function createPointsByCategoryChart(){
    /* 1a. */
    const canvas = document.querySelector('#pointsByCategory-chart');
    /* 2b. */
    let options = {
      // the type of chart we want to use
      type: "bar",
      data: {
        // which axis shows these labels? 
        // A: In the x-axis
        labels: ["Quizzes", "Labs", "Theory", "Practice"],
        datasets: [
          // is this the top or bottom data set?
          // A: It appears to be the bottom
          // what happens if there's only 1 dataset?
          // A: If there's only one then the bar chart would contain only 1
          //    datasets per category.
          {
            label: "Earned",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgba(155, 89, 182, 1.0)",
          },
          {
            label: "Missed",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgba(155, 89, 182, 0.5)",
          },
          {
            label: "Ungraded",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "#eee",
          },
        ],
      },
      options: {
        scales: {
          y: {
            stacked: true,
            grid: {
              display: false,
            },
          },
        },
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: "Points by Category",
          },
          legend: {
            display: false,
          },
        },
      },
    }; 
    const chart = new Chart(canvas.getContext("2d"), options);


}