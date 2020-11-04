import jwt from 'jsonwebtoken'

export default {
  issue(payload, expiresIn) {
      // console.log(process.env.SECRET,'sdfsdffdg')
    return jwt.sign(payload, process.env.SECRET , {
      expiresIn: '720h' // expires in 30 days
    });
  },
};
