import passport from './passport-config.js'; // Passport ���� ����

const jwtAuthMiddleware = (excludedPaths = []) => {
  return (req, res, next) => {
    // ��û ��ΰ� ���� ��� �� �ϳ��� �����ϴ��� Ȯ��
    const isExcluded = excludedPaths.some((path) => req.path.startsWith(path));

    if (isExcluded) {
      return next(); // ���ܵ� ��δ� ���� ���� ��ŵ
    }

    // ������ ��δ� JWT ���� ����
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user) {
        req.user = user; // ������ ����� ��ü�� req.user�� ����
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next(); // ���� ���� �� ��û�� ��� ����
    })(req, res, next);
  };
};
export default jwtAuthMiddleware;
