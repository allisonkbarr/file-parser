
const fsPromises = require('fs').promises;

const parseDirTree = async (parentDirPath) => {
  const children = await fsPromises.readdir(parentDirPath);
  const tree = {};
  while (children.length > 0) {
    const child = children[0];
    if ((await fsPromises.stat(`${parentDirPath}/${child}`)).isDirectory()) {
      tree[child] = await parseDirTree(`${parentDirPath}/${child}`);
      children.shift();
    } else {
      tree[child] = '';
      children.shift();
    }
  }
  return tree;
};

module.exports = parseDirTree;
