import passport from './passport-config.js'; 

const jwtAuthMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('인증 중 에러 발생:', err);
      next(err);
    }
    if (user) {
      console.log('사용자 인증 성공:', user);
      req.user = user;
      next(); 
    } else {
      console.log('인증 실패: Unauthorized');
      return res.status(401).json({ message: 'Unauthorized - 사용자 인증 실패' });
    }
  })(req, res, next);
};
export default jwtAuthMiddleware;
