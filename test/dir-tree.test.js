
const parseDirTree = require('../src/dir-tree');

describe('parseDirTree', () => {
  it('works for top-level files and folders', async () => {
    const result = await parseDirTree(`${__dirname}/fixtures`);
    expect(result).toHaveProperty('first-level-folder');
    expect(result['first-level-file.json']).toEqual('');
  });
  it('processes files and folders from subfolders', async () => {
    const result = await parseDirTree(`${__dirname}/fixtures`);
    expect(result['first-level-folder']['second-level-file.json']).toEqual('');
    expect(result['first-level-folder']['second-level-folder']['third-level-file-1.json']).toEqual('');
  });
  it('works when there are multiple files in a dir', async () => {
    const result = await parseDirTree(`${__dirname}/fixtures/first-level-folder/second-level-folder`);
    expect(result['third-level-file-1.json']).toEqual('');
    expect(result['third-level-file-2.json']).toEqual('');
  });
});
