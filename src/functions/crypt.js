import bcrypt from 'bcrypt'

export const passwordHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const hashOut = (user, password) => bcrypt.compareSync(password, user.password)