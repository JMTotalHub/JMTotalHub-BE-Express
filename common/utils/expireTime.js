function getExpirationInSeconds(expiration) {
    console.log('Expiration value:', expiration);
    const unit = expiration.slice(-1);                   // 단위 추출 (d, h)
    const value = parseInt(expiration.slice(0, -1), 10); // 값 추출 
  
    if (unit === 'h') {
      return value * 60 * 60;
    } else if (unit === 'd') {
      return value * 24 * 60 * 60; 
    } else {
      throw new Error('지원하지 않는 시간단위입니다.');
    }
  }


export default getExpirationInSeconds;