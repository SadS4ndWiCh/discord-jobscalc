// Para executar coisas no sqlite acaba repetindo
// muito a parte de abrir a conexão e fecha-la,
// então, dessa forma, já irei criar funções separadas
// para executar cada tipo de operação (exec, get, all)
// junto com a parte de abrir e fechar a conexão, que dessa
// forma fica até mais limpo o código

const Database = require('../database/config');

async function exec(sql) {
  const db = await Database();

  await db.exec(sql);

  await db.close();
}

async function getOne(sql) {
  const db = await Database();

  const result = await db.get(sql);

  await db.close();

  return result
}

async function getAll(sql) {
  const db = await Database();

  const results = await db.all(sql);

  await db.close();

  return results
}

module.exports = {
  exec,
  getOne,
  getAll,
}