class WeekSummary{
  constructor(dataSource, target) {
    this.target = target;
    this.maxHeight = 130;
    this.maxAmount = 0;
    this.maxDay = 0;
    fetch(dataSource)
    .then(response => response.json())
    .then(data => {
      this.weekArray = data;
      this.buildChart();
    })
    .catch(error => console.log(error));
  }
  findDayAmount() {
    for (let i = 0; i < this.weekArray.length; i++) {
      if (this.weekArray[i].amount > this.maxAmount) {
        this.maxAmount = this.weekArray[i].amount;
        this.maxDay = i;
      }
    }
  }
  buildChart() {
    this.findDayAmount();
    for (let i=0; i<this.weekArray.length; i++) {
      let dayOfWeek = document.createElement("div");
      dayOfWeek.classList.add('chart__day');
      console.log(this.maxDay);
      if (i==this.maxDay) {
        dayOfWeek.classList.add('max');
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