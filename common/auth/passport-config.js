import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import prisma from '../../prisma';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: jwt_payload.id,
        },
      });      
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
