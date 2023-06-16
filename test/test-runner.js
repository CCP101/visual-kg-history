const Mocha = require('mocha');

// 创建 Mocha 实例
const mocha = new Mocha();

// 添加测试文件
mocha.addFile('./test/test.js');

// 运行测试
mocha.run(async function(failures) {
  try {
    process.exitCode = failures ? 1 : 0;
  } catch (err) {
    console.error(err);
    // TODO 继续完善Github CI工具与Mocha测试框架的配合
    process.exit(0);
  }
});
