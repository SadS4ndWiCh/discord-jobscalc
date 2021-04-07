// Models
const Job = require('../models/Job');
const Profile = require('../models/Profile');

// Utils
const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render('job')
  },

  async save(req, res) {
    const newJob = req.body;

    await Job.create(newJob);

    return res.redirect('/')
  },

  async show(req, res) {
    const { id } = req.params;
    const jobs = await Job.get();
    const job = jobs.find(job => Number(id) === job.id );

    if(!job) return res.status(404).send('Job not found')
    
    const profile = await Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

    return res.render('job-edit', { job })
  },

  async update(req, res) {
    const { id } = req.params;
    const newJobData = req.body;

    await Job.update(id, newJobData);

    return res.redirect(`/job/${id}`)
  },

  async delete(req, res) {
    const { id } = req.params;

    await Job.delete(id);

    return res.redirect('/')
  }
}