const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  save(req, res) {
    const job = req.body;
    const lastId = Job.get()[Job.get().length - 1]?.id || 0;

    Job.get().push({
      id: lastId + 1,
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
  show(req, res) {
    const jobId = req.params.id;

    const job = Job.get().find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found");
    }

    job.budget = JobUtils.calculateBudget(job, Profile.get()["value-hours"]);
    return res.render("job-edit", { job });
  },
  update(req, res) {
    const jobId = req.params.id;

    const job = Job.get().find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };
    const jobUpdated = Job.get().map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });

    Job.update(jobUpdated);

    return res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);

    return res.redirect("/");
  },
};
