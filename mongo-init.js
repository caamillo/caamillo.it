
db = db.getSiblingDB('testdb')

db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
      { role: 'readWrite', db: 'testdb' }
  ]
})