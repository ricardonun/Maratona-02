let data = {
  name: "Ricardo Nunes",
  avatar: "https://github.com/ricardonun.png",
  "monthly-budget": 2400,
  "hours-per-day": 7,
  "days-per-week": 5,
  "vacation-per-year": 4,
  "value-hours": 75,
};

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  },
};
