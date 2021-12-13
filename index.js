function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  return employees.map(emp => createEmployeeRecord(emp));
}

function createTimeInEvent(employee, dateStamp) {
  // dateStamp is in the format: YYYY-MM-DD HHMM
  employee.timeInEvents.push(
    {
      type: "TimeIn", 
      hour: parseInt(dateStamp.slice(11, 15), 10), 
      date: dateStamp.slice(0,10)
    }
  )
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  // dateStamp is in the format: YYYY-MM-DD HHMM
  employee.timeOutEvents.push(
    {
      type: "TimeOut",
      hour: parseInt(dateStamp.slice(11, 15), 10),
      date: dateStamp.slice(0, 10)
    }
  )
  return employee;
}

function hoursWorkedOnDate(employee, dateWorked) {
  return (employee.timeOutEvents.find(event => event.date === dateWorked).hour
   - employee.timeInEvents.find(event => event.date === dateWorked).hour) / 100;
}

function wagesEarnedOnDate(employee, dateWorked) {
  return hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour;
}

function allWagesFor(employee) {
  return (
    employee.timeInEvents.reduce((total, event) => {
      total += wagesEarnedOnDate(employee, event.date)
      return total;
    }, 0)
  );
}

function calculatePayroll(employees) {
  return (
    employees.reduce((total, employee) => {
      total += allWagesFor(employee);
      return total;
    }, 0)
  )
}


