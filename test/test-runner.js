const Mocha = require('mocha');

// 创建 Mocha 实例
const mocha = new Mocha();

// 添加测试文件
mocha.addFile('./test/test.js');

// 运行测试
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;
});
