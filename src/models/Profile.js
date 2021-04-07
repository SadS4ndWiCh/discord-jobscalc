const Database = require('../utils/DatabaseUtils');

module.exports = {
  async get() {
    const profileData = await Database.getOne(`
      SELECT * FROM profile
    `);

    return {
      ...profileData,
      'monthly-budget': profileData.monthly_budget,
      'hours-per-day': profileData.hours_per_day,
      'days-per-week': profileData.days_per_week,
      'vacation-per-year': profileData.vacation_per_year,
      'value-hour': profileData.value_hour
    }
  },
  
  async update(updatedData) {
    await Database.exec(`
      UPDATE profile SET
        name = "${updatedData.name}",
        avatar = "${updatedData.avatar}",
        monthly_budget = ${updatedData['monthly-budget']},
        days_per_week = ${updatedData['days-per-week']},
        hours_per_day = ${updatedData['hours-per-day']},
        vacation_per_year = ${updatedData['vacation-per-year']},
        value_hour = ${updatedData['value-hour']}
    `)
  },
};