import passport from './passport-config.js'; // Passport 설정 파일

const jwtAuthMiddleware = (excludedPaths = []) => {
  return (req, res, next) => {
    // 요청 경로가 제외 경로 중 하나로 시작하는지 확인
    const isExcluded = excludedPaths.some(path => req.path.startsWith(path));
    
    if (isExcluded) {
      return next(); // 제외된 경로는 인증 과정 스킵
    }

    // 나머지 경로는 JWT 인증 적용
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user) {
        req.user = user; // 인증된 사용자 객체를 req.user에 저장
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next(); // 인증 성공 시 요청을 계속 진행
    })(req, res, next);
  };
};
export default jwtAuthMiddleware;
