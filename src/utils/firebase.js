import admin from 'firebase-admin'

const serviceAccount = require('./firebaseAuth.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default admin
