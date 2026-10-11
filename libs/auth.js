import jwt from 'jsonwebtoken'

export const generateToken = () => {
  return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' })
}