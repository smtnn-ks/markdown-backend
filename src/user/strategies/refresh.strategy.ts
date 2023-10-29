import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { Request } from 'express'

const verify = (req: Request, payload: any, done: VerifiedCallback) => {
  const refreshToken = req.headers.authorization?.split(' ')[1]
  done(null, { ...payload, refreshToken })
}

export const refreshStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_REFRESH_KEY,
    passReqToCallback: true,
  },
  verify,
)
