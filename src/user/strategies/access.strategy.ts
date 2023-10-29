import { ExtractJwt, Strategy } from 'passport-jwt'

export const accessStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_KEY,
  },
  (payload, done) => done(null, payload),
)
