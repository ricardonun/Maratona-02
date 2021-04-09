const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    res.render("profile", { profile: await Profile.get() });
  },
  async update(req, res) {
    const data = req.body;

    const weeksPerYear = 52;

    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    const monthTotalHours = weekTotalHours * weeksPerMonth;

    valueHour = data["monthly-budget"] / monthTotalHours;
    await Profile.update({
        ...await Profile.get(),
        ...req.body,
        "value_hour": valueHour
    }) 

    return res.redirect("/profile");
  },
};
