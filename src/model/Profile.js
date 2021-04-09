const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();
    const data = await db.get(`SELECT * FROM profile`);

    await db.close();
    return data;
  },

  async update(newData) {
    const db = await Database();
    db.run(`UPDATE profile SET 
    name = "${newData.name}",
    avatar = "${newData.avatar}",
    monthly_budget = ${newData["monthly-budget"]},
    days_per_week = ${newData["days-per-week"]},
    hours_per_day = ${newData["hours-per-day"]},
    vacation_per_year = ${newData["vacation-per-year"]},
    value_hour = ${newData.value_hour}`);

    await db.close();
  },
};
