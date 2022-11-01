/**
 * Exclude a key from an object
 */
export const exclude = (obj: Object, keys) => {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
};
