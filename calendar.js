console.log(Date.Fns);

/* You can access these objects using the bracket notation and 
 the numbers as the key. ie EVENTS[8][21].type ==> returns
"office-hours" 
*/
const EVENTS = {
  // september
  8: {
    21: {
      type: "office-hours",
    },
    22: {
      type: "homework",
      description: "Homework 1 Due",
    },
    24: {
      type: "office-hours",
    },
    28: {
      type: "homework",
      description: "Homework 2 Due",
    },
    30: {
      type: "lab",
      description: "Lab 1 Due",
    },
  },
  // october
  9: {
    3: {
      type: "office-hours",
    },
    4: {
      type: "homework",
      description: "Homework 3 Due",
    },
    5: {
      type: "lab",
      description: "Lab 2 Due",
    },
    10: {
      type: "office-hours",
    },
    13: {
      type: "quiz",
      description: "Quiz 1",
    },
    16: {
      type: "homework",
      description: "Homework 4 due",
    },
    17: {
      type: "office-hours",
    },
    19: {
      type: "lab",
      description: "Lab 3 Due",
    },
    24: {
      type: "office-hours",
    },
    28: {
      type: "homework",
      description: "Homework 5 due",
    },
  },
  // november
  10: {
    6: {
      type: "office-hours",
    },
    7: {
      type: "homework",
      description: "Homework 6 due",
    },
    9: {
      type: "lab",
      description: "Lab 4 Due",
    },
    13: {
      type: "office-hours",
    },
    16: {
      type: "lab",
      description: "Lab 5 Due",
    },
    21: {
      type: "homework",
      description: "Homework 7 due",
    },
    22: {
      type: "quiz",
      description: "Quiz 2",
    },
    30: {
      type: "office-hours",
    },
  },
  // december
  11: {
    1: {
      type: "lab",
      description: "Lab 6 Due",
    },
    2: {
      type: "quiz",
      description: "Quiz 3",
    },
    4: {
      type: "homework",
      description: "Homework 8 due",
    },
  },
};
/* Selects the table body */
const calendarTable = document.querySelector("tbody");
calendarTable.children[0]; // to get the first row

const dateConvert = {
  9: {
    firstDayFormat: "09-01-22",
    dateRange: 30,
  },
  10: {
    firstDayFormat: "10-01-22",
    dateRange: 31,
  },
  11: {
    firstDayFormat: "11-01-22",
    dateRange: 30,
  },
  12: {
    firstDayFormat: "12-01-22",
    dateRange: 31,
  },
};

/* Clears all the calendar table td elements */
function clearCalendar() {
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 7; j++) {
      calendarTable.children[i].children[j].textContent = "";
    }
  }
}

/* The style type holds styling properties in a string format for the corresponding
 category */
const styleType = {
  homework:
    "border: 3px var(--accent-color) solid; border-radius: 30%; display: inline-block; width: 25px; height: 25px; text-align: center; box-sizing: border-box; line-height: 1",

  "office-hours":
    'position: absolute; content: ""; background: var(--accent-color); display: inline-block; height: 2px; width: 18px; left: 5px; bottom: 3px;',

  lab: 'position: absolute; content: ""; background: var(--accent-color); display: inline-block; height: 4px; left: 11px; bottom: 0px; width: 4px; border-radius: 50%; bottom: 3px;',

  quiz: "background-color: var(--accent-color);color: white;border-radius: 50%;display: inline-block;text-align: center;width: 25px; height:25px;",

  default:
    "box-sizing: border-box; display: inline-block; height: 25px; width: 25px; text-align: center; ",
};

function updateCalendar() {
  let selectedMonth;
  /* Selects the radio that is selected */
  for (elem of radioSelect) {
    if (elem.checked) {
      selectedMonth = elem;
      break;
    }
  }
  /* Call to clear */
  clearCalendar();

  /* We first retrieve the month in a string format so we can parse it.
    This is required when using DateFns methods. */
  let dateString = dateConvert[selectedMonth.value].firstDayFormat;
  const date = Date.parse(dateString, "MM-dd-yy", new Date());

  /* Let count be the first day of the month. */
  let count = 1;
  for (i = 0; i < 6; i++) {
    for (
      j = 0;
      j < 7 && count <= dateConvert[selectedMonth.value].dateRange;
      j++
    ) {
      let spanElem = document.createElement("span");
      let startDay = DateFns.startOfMonth(date).getDay();
      if (i === 0 && j < startDay) {
        calendarTable.children[i].children[j].textContent = "";
      } else {
        /* identify the current date */
        spanElem.textContent = count;
        /* Add a new span element for every date that has a type. */
        calendarTable.children[i].children[j].appendChild(spanElem);

        /* If the date has a styling type */
        if (EVENTS[selectedMonth.value - 1][count] !== undefined) {
          let assignmentType = EVENTS[selectedMonth.value - 1][count].type;
          if (assignmentType === "homework" || assignmentType === "quiz") {
            calendarTable.children[i].children[j].firstChild.setAttribute(
              "style",
              styleType[assignmentType]
            );
          } else {
            /* Set the first span style to default */
            calendarTable.children[i].children[j].firstChild.setAttribute(
              "style",
              styleType["default"]
            );

            /* Then set the sibling span to have the styling. */
            calendarTable.children[i].children[j].appendChild(
              document.createElement("span")
            );
            calendarTable.children[i].children[j].lastChild.setAttribute(
              "style",
              styleType[assignmentType]
            );
          }
        } else {
          calendarTable.children[i].children[j].firstChild.setAttribute(
            "style",
            styleType["default"]
          );
        }
        count++;
      }
    }
  }
}
window.onload = (event) => {
  updateCalendar();
};

const radioSelect = document.querySelectorAll("input");
for (elem of radioSelect) {
  elem.addEventListener("click", updateCalendar);
}
