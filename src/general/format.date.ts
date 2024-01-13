const offset = 1000 * 60 * 60 * 9;

export const getNow = () => {
  return new Date(new Date().getTime() + offset);
};

export const format = (time: Date) => {
  return time.toISOString().replace('T', ' ').split('.')[0];
};
