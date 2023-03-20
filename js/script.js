class WeekSummary{
  constructor(dataSource, target) {
    this.target = target;
    this.maxHeight = 130;
    this.maxAmount = 0;
    this.today = 0;
    fetch(dataSource)
    .then(response => response.json())
    .then(data => {
      this.weekArray = data;
      this.findToday();
      this.buildChart();
    })
    .catch(error => console.log(error));
  }
  findDayAmount() {
    this.weekArray.forEach(day => {
      if (day.amount > this.maxAmount) {
        this.maxAmount = day.amount;
      }
    });
  }
  findToday() {
    const date = new Date();
    // Correct day number to match data.json index
    let dayIndex = date.getDay() - 1;
    if (dayIndex < 0) {
      dayIndex = 6;
    }
    this.today = dayIndex;
  }
  buildChart() {
    this.findDayAmount();
    for (let i=0; i<this.weekArray.length; i++) {
      let dayOfWeek = document.createElement("div");
      dayOfWeek.classList.add('chart__day');
      console.log(this.today);
      if (i==this.today) {
        dayOfWeek.classList.add('today');
      }
      let barHeight = (this.weekArray[i].amount/this.maxAmount*this.maxHeight);
      dayOfWeek.innerHTML = `
        <div class="chart__value">
          <p>$${this.weekArray[i].amount}</p>
        </div>
        <div class="chart__bar" style="height: ${barHeight}px"></div>
        <p class="label">${this.weekArray[i].day}</p>
      `;
      this.target.appendChild(dayOfWeek);
    }
  }
}

const week = new WeekSummary("../data.json", document.getElementById('chart'));