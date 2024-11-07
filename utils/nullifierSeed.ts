export const getNullifierSeed = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = hash * 31 + username.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
};
