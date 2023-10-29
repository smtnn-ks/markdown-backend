import { ExtractJwt, Strategy } from 'passport-jwt'

export const restoreStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_RESTORE_KEY,
  },
  (payload, done) => done(null, payload),
)
