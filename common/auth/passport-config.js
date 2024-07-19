import passport from 'passport';
import  { Strategy, ExtractJwt } from 'passport-jwt';

import prisma from '../../prisma';

// 옵션 설정
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 토큰 형식으로 JWT를 추출
  secretOrKey: 'your_jwt_secret', // 비밀 키 등록
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findUniqueOrThrow(jwt_payload.id);
    if (user) {
        // done 함수는 Passport 전략에서 사용하는 콜백 함수 (에러, 유저객체)
        return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
