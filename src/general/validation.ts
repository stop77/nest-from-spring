export const validateClass = (instance: any, schema: { new (): any }) => {
  let target = new schema();

  for (let key in target) {
    // Instance가 Target Property를 가지고 있는지 체크
    if (instance[key] === null || instance[key] === undefined) return false;
    else {
      // Target Property를 가지고 있다면 타입이 동일한지 체크
      // Exception은 내부에서만 사용하므로 프로퍼티는 원시타입이 확실하기 때문에 typeof 사용
      if (typeof instance[key] !== typeof target[key]) return false;
    }
  }

  return true;
};
