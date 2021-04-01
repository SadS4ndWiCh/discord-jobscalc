let data =  {
  name: 'SadS4ndWiCh',
  avatar: 'https://github.com/SadS4ndWiCh.png',
  'monthly-budget': 4500,
  'hours-per-day': 6,
  'days-per-week': 4,
  'vacation-per-year': 6,
  'value-hour': 75
};

module.exports = {
  get() { return data },
  
  update(newData) { data = newData; },
};