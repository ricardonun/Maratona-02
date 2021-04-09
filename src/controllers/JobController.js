const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async save(req, res) {
    const job = req.body;

    await Job.create({
      name: job.name,
      "daily-hours": job["daily-hours"],
      "total-hours": job["total-hours"],
      createdAt: Date.now(),
    });

    return res.redirect("/");
  },
  create(req, res) {
    res.render("job");
  },
  async show(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();
    const profile = await Profile.get();
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value_hour"]);
    return res.render("job-edit", { job });
  },
  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId);

    return res.redirect("/job/" + jobId);
  },
  async delete(req, res) {
    const jobId = req.params.id;
    await Job.delete(jobId);

    return res.redirect("/");
  },
};
