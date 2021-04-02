// Models
const Job = require('../models/Job');
const Profile = require('../models/Profile');

// Utils
const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render('job')
  },

  save(req, res) {
    const newJob = req.body;

    Job.create(newJob);

    return res.redirect('/')
  },

  show(req, res) {
    const { id } = req.params;
    const job = Job.get().find(job => Number(id) === job.id );

    if(!job) return res.status(404).send('Job not found')
    
    const profile = Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

    return res.render('job-edit', { job })
  },

  update(req, res) {
    const { id } = req.params;
    const newJobData = req.body;

    Job.update(id, newJobData);

    return res.redirect(`/job/${id}`)
  },

  delete(req, res) {
    const { id } = req.params;

    Job.delete(id);

    return res.redirect('/')
  }
}