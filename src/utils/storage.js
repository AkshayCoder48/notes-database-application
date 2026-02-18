import fs from 'fs';

export const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(null);
        } else {
          reject(err);
        }
      } else {
        resolve(data);
      }
    });
  });
};

export const writeFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const kvStorage = {
  set: async (key, value) => {
    try {
      const data = JSON.stringify(value);
      await writeFile(`${key}.json`, data);
    } catch (err) {
      throw err;
    }
  },
  get: async (key) => {
    try {
      const data = await readFile(`${key}.json`);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      throw err;
    }
  },
  delete: async (key) => {
    return new Promise((resolve, reject) => {
      fs.unlink(`${key}.json`, (err) => {
        if (err && err.code !== 'ENOENT') {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};