import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = () => {
  return jwt.sign({}, JWT_SECRET, { expiresIn: '1h' })
}