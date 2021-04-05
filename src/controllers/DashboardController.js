const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    let statusCounts = {
      progress: 0,
      done: 0,
      total: Job.get().length,
    };
    let jobTotalHours = 0

    let freeHours = Profile.get()["hours-per-day"] - jobTotalHours
    
    const updatedJobs = Job.get().map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      //Somando a quantidade de status
      statusCounts[status] += 1;
    
      jobTotalHours = status === "progress" ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get()["value-hours"]),
      };
    });
    return res.render("index", {
      jobs: updatedJobs,
      profile: Profile.get(),
      statusCounts: statusCounts,
      freeHours: freeHours
    });
  },
};
