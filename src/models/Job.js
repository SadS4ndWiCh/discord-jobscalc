let data = [
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
];

module.exports = {
  get() { return data },

  create(newJob) {    
    const lastId = data[data.length - 1]?.id || 0;

    data.push({
      id: lastId + 1,
      name: newJob.name,
      'daily-hours': newJob['daily-hours'],
      'total-hours': newJob['total-hours'],
      created_at: Date.now(), 
    });
  },

  update(jobId, newJobData) {
    const job = data.find(job => Number(jobId) === Number(job.id));

    // Caso um valor necessário não tenha sido definido
    // na requisição, será apenas atribuído o valor antigo.
    // `newJobData.name || job.name` -> Pegue `name` dentro
    // de `newJobData` ou se não haver, pegue `name` do `job` 
    const updatedJob = {
      ...job,
      name: newJobData.name || job.name,
      'total-hours': newJobData['total-hours'] || job['total-hours'],
      'daily-hours': newJobData['daily-hours'] || job['daily-hours'],
    }

    data = data.map(job => {
      if(job.id === Number(jobId)) job = updatedJob;

      return job
    });
  },

  delete(jobId) {
    // Um meio de excluir que usa o `.filter()` para filtrar
    // apenas os que não são o que quer tirar... Ou seja,
    // vai retornar apenas os elementos que não seja o que quer
    // excluir, tendo assim, um Array novo sem o que deseja excluir
    data = data.filter(job => Number(jobId) !== Number(job.id));
  }
};