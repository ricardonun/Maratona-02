const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
 async index(req, res) {

    const profile = await Profile.get()
    const jobs = await Job.get();
    let statusCounts = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };
    let jobTotalHours = 0

    let freeHours = profile["hours_per_day"] - jobTotalHours
    
    const updatedJobs =  jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      //Somando a quantidade de status
      statusCounts[status] += 1;
    
      jobTotalHours = status === "progress" ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value_hour"]),
      };
    });
    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCounts: statusCounts,
      freeHours: freeHours
    });
  },
};
