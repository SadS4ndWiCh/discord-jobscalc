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
  },

  controllers: {
    index(req, res) {
      return  res.render(basePath + 'profile', { profile: Profile.data })
    },

    update(req, res) {

    }
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
          status
        }
      });

      return res.render(basePath + 'index', { jobs: updatedJobs });
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
    }
  }
}

routes.get('/', Job.controllers.index);

routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);


routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'));
routes.get('/profile', Profile.controllers.index);

module.exports = routes;