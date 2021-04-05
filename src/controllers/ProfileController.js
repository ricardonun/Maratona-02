const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    res.render("profile", { profile: Profile.get() });
  },
  update(req, res) {
    const data = req.body;

    const weeksPerYear = 52;

    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    const monthTotalHours = weekTotalHours * weeksPerMonth;

    valueHour = data["monthly-budget"] / monthTotalHours;

    Profile.update({
        ...Profile.get(),
        ...req.body,
        "value-hours": valueHour
    }) 

    return res.redirect("/profile");
  },
};
