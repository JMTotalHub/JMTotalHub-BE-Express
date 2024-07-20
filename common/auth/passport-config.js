import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import prisma from '../../prisma';

// �ɼ� ����
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer ��ū �������� JWT�� ����
  secretOrKey: 'your_jwt_secret', // ��� Ű ���
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUniqueOrThrow(jwt_payload.id);
      if (user) {
        // done �Լ��� Passport �������� ����ϴ� �ݹ� �Լ� (����, ������ü)
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
