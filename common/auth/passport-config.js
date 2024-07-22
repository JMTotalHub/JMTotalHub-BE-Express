import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import prisma from '../../prisma';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    console.log('JWT 페이로드:', jwt_payload);
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: jwt_payload.id,
        },
      });      
      if (user) {
        console.log('사용자 찾음:', user);
        return done(null, user);
      }
      console.log('사용자 찾지 못함');
      return done(null, false);
    } catch (error) {
      console.error('에러 발생:', error);
      return done(error, false);
    }
  })
);

export default passport;
