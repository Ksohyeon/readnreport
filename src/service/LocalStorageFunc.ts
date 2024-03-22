function setItemWithExpireTime(key: string, value: string, term: number) {
  const obj = {
    value: value,
    expire: Date.now() + term,
  };
  const objString = JSON.stringify(obj);

  localStorage.setItem(key, objString);
}

function getItemWithExpireTime(key: string) {
  const objString = localStorage.getItem(key);

  if (!objString) return null;

  const obj = JSON.parse(objString);
  if (obj.expire < Date.now()) {
    localStorage.removeItem(key);
    return null;
  }
  return obj.value;
}

export { setItemWithExpireTime, getItemWithExpireTime };
