const Database = require('../utils/DatabaseUtils');

module.exports = {
  async get() {
    const jobsData = await Database.getAll(`
      SELECT * from jobs
    `);

    return jobsData.map(job => ({
      ...job,
      'daily-hours': job.daily_hours,
      'total-hours': job.total_hours,
    }))
  },

  async create(newJob) {
    await Database.exec(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "${newJob.name}",
        ${newJob['daily-hours']},
        ${newJob['total-hours']},
        ${Date.now()}
      )
    `);

    /* data.push({
      id: lastId + 1,
      name: newJob.name,
      'daily-hours': newJob['daily-hours'],
      'total-hours': newJob['total-hours'],
      created_at: Date.now(), 
    }); */
  },

  async update(jobId, newJobData) {
    await Database.exec(`
      UPDATE jobs SET
        name = "${newJobData.name}",
        daily_hours = ${newJobData['daily-hours']},
        total_hours = ${newJobData['total-hours']}
      WHERE
        id = ${jobId}
    `);
  },

  async delete(jobId) {
    await Database.exec(`
      DELETE FROM jobs WHERE id = ${jobId}
    `);
  }
};