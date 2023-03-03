# 项目贡献指南

## 提交 Pull Request

1. Fork [此仓库](https://github.com/CCP101/visual-kg-history)，从 `main` 创建分支
2. 按照`README.md`所述配置本项目
3. 使用 `npm install pnpm ` 安装 `pnpm` 工具
4. 确保您的编译器使用了`ESLint`，并使用本项目的`.eslintrc.yml`作为代码规范文件
5. 对代码库进行更改。如果适用的话，请确保进行了相应的测试
6. 提交 git commit, 请同时遵守 [Commit 规范](#commit-指南)
7. 提交 `pull request`

## Commit 指南

Commit messages 请遵循[conventional-changelog 标准](https://www.conventionalcommits.org/en/v1.0.0/)：

```bash
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]

```

## Commit 类型

以下是 commit 类型列表:

- feat: 新特性或功能

- fix: 缺陷修复

- docs: 文档更新

- style: 代码风格或者组件样式更新

- refactor: 代码重构，不引入新功能和缺陷修复

- perf: 性能优化

- test: 单元测试

- chore: 其他不修改 src 或测试文件的提交


## License

本项目采用[Apache](./license)许可证
