// Models
const Job = require('../models/Job');
const Profile = require('../models/Profile');

// Utils
const jobUtils = require('../utils/jobUtils');

module.exports = {
  index(req, res) {
    const profile = Profile.get();

    const updatedJobs = Job.get().map(job => {
      const reamining = jobUtils.reaminingDays(job);
      const status = reamining <= 0 ? 'done' : 'progress';

      return {
        ...job,
        reamining,
        status,
        budget: jobUtils.calculateBudget(job, profile['value-hour'])
      }
    });

    return res.render('index', { jobs: updatedJobs, profile });
  },

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

    job.budget = jobUtils.calculateBudget(job, profile['value-hour']);

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