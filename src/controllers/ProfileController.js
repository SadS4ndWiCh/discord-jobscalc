const Profile = require('../models/Profile');

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();

    return  res.render('profile', { profile })
  },

  async update(req, res) {
    // Novos dados do perfil
    const data = req.body;

    // Total de semanas em um ano
    const weeksPerYear = 52;
    // Remover as semanas de férias do ano para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12; // Em média
    // Total de horas trabalhadas na semana
    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];      

    // Horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    // Qual será o valor da minha hora
    data['value-hour'] = data['monthly-budget'] / monthlyTotalHours;

    // Atualizar o data do perfil
    await Profile.update(data);

    return res.redirect('/profile')
  },
}