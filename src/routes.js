const express = require('express');
const routes = express.Router();

const basePath = __dirname + '/views/';

const Profile = {
  data: {
    name: 'SadS4ndWiCh',
    avatar: 'https://github.com/SadS4ndWiCh.png',
    'monthly-budget': 4500,
    'hours-per-day': 6,
    'days-per-week': 4,
    'vacation-per-year': 6,
    'value-hour': 75
  },

  controllers: {
    index(req, res) {
      return  res.render(basePath + 'profile', { profile: Profile.data })
    },

    update(req, res) {
      // Dado atualizado do perfil
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
      Profile.data = data;

      return res.redirect('/profile')
    },
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: 'OneTwo Project',
      'daily-hours': 3,
      'total-hours': 45,
      created_at: Date.now(),
    },
  ],
  
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        const reamining = Job.services.reaminingDays(job);
        const status = reamining <= 0 ? 'done' : 'progress';

        return {
          ...job,
          reamining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      });

      return res.render(basePath + 'index', { jobs: updatedJobs, profile: Profile.data });
    },

    create(req, res) {
      return res.render(basePath + 'job')
    },

    save(req, res) {
      const newJob = req.body;

      Job.data.push({
        id: Job.data.length + 1,
        ...newJob,
        created_at: Date.now(), 
      });

      return res.redirect('/')
    },

    show(req, res) {
      const { id } = req.params;
      const job = Job.data.find(job => Number(id) === job.id );

      if(!job) return res.status(404).send('Job not found')

      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour']);

      return res.render(basePath + 'job-edit', { job })
    },

    update(req, res) {
      const { id } = req.params;
      const job = Job.data.find(job => Number(id) === job.id );

      if(!job) return res.status(404).send('Job not found')

      const updatedJob = {
        ...job,
        name: req.body.name || job.name,
        'total-hours': req.body['total-hours'] || job['total-hours'],
        'daily-hours': req.body['daily-hours'] || job['daily-hours'],
      }

      Job.data = Job.data.map(job => {
        if(job.id === Number(id)) job = updatedJob;

        return job
      });

      return res.redirect(`/job/${id}`)
    },

    delete(req, res) {
      const { id } = req.params;

      // Um meio de excluir que usa o `.filter()` para filtrar
      // apenas os que não são o que quer tirar... Ou seja,
      // vai retornar apenas os elementos que não seja o que quer
      // excluir, tendo assim, um Array novo sem o que deseja excluir
      Job.data = Job.data.filter(job => Number(id) !== job.id);

      return res.redirect('/')
    }
  },

  services: {
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
}

routes.get('/', Job.controllers.index);

routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);

routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;