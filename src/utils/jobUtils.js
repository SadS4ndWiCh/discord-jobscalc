module.exports = {
  reaminingDays(job) {
    const reamining = (job['total-hours'] / job['daily-hours']).toFixed();
    
    const createdAtDate = new Date(job['created_at']);
    const dueDay = createdAtDate.getDate() + Number(reamining);
    const dueDateInMs = createdAtDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();

    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);

    return dayDiff
  },

  calculateBudget: (job, valueHour) => valueHour * job['total-hours']
}