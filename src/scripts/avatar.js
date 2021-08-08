import mongoose from 'mongoose'
import models from '../models'

import fetch from 'node-fetch'

import minioClient from '../utils/minioClient'

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const main = async () => {
  const users = (await models.User.find({}, 'id fullName').lean())

  // get avatar from ui-avatars.com/api using fullName and upload to minio avatar bucket
  for (const user of users) {
    const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    const buffer = Buffer.from(data)

    // upload hash to minio avatar bucket
    await minioClient.putObject('avatar', `${user._id.toString()}.jpg`, buffer)
  }
}

main()
