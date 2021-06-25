const storage = {
  get(key, defaultValue = null) {
    return sessionStorage.getItem(key) || defaultValue;
  },

  set(key, value) {
    sessionStorage.setItem(key, value);

    return this;
  }
};

export default storage;
