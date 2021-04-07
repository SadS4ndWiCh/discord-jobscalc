// Models
const Job = require('../models/Job');
const Profile = require('../models/Profile');

// Utils
const JobUtils = require('../utils/JobUtils');

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get();

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    }

    // Total de horas por dia de cada Job em progresso
    let jobsTotalHours = 0;

    const updatedJobs = jobs.map(job => {
      const reamining = JobUtils.reaminingDays(job);
      const status = reamining <= 0 ? 'done' : 'progress';

      // Somando a quantidade de status.
      statusCount[status]++;

      // Total de horas por dia de cada Job em progresso
      jobsTotalHours += status === 'progress' ? Number(job['daily-hours']) : 0;

      return {
        ...job,
        reamining,
        status,
        budget: JobUtils.calculateBudget(job, profile['value-hour'])
      }
    });

    /* const freeHours = updatedJobs.reduce((total, current) => {
      if(current.status === 'done') return total
      return total - current['daily-hours']
    }, profile['hours-per-day']); */

    const freeHours = profile['hours-per-day'] - jobsTotalHours;

    return res.render('index', { jobs: updatedJobs, profile, statusCount, freeHours });
  },
};