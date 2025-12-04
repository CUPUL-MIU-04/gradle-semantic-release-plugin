module.exports = {
  execa: jest.fn(() => Promise.resolve({
    stdout: 'mocked output',
    stderr: '',
  }))
};
