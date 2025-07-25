module.exports = {
  // 继承其他 Stylelint 配置
  extends: [
    "stylelint-config-standard", // 继承 Stylelint 官方推荐的标准配置
    "stylelint-config-standard-scss", // 继承针对 SCSS 的标准配置，支持 SCSS 语法和特性
    "stylelint-config-prettier", // 继承 Prettier 相关的配置，用于禁用 Stylelint 中与 Prettier 冲突的规则，避免格式化冲突
  ],
  // 插件列表
  plugins: [
    "stylelint-scss", // Stylelint SCSS 插件，提供 SCSS 特有的规则
    "stylelint-order", // Stylelint 属性排序插件，用于指定 CSS 属性的顺序
  ],
  // 自定义规则
  rules: {
    // 属性按字母顺序排列
    "order/properties-alphabetical-order": true, // 启用 stylelint-order 插件的规则，要求 CSS 属性按字母顺序排列
    "color-function-notation": null, // 这行被注释掉了，如果启用，通常是用于限制颜色函数的表示法
    // 禁止 !important
    "declaration-no-important": true, // 禁止在样式声明中使用 `!important` 关键字，有助于提高 CSS 可维护性
    // 禁止空代码块
    "block-no-empty": true, // 禁止出现空的样式代码块，避免不必要的代码
    // 支持 SCSS 特性
    "scss/at-rule-no-unknown": true, // 允许 SCSS 特有的 `@` 规则（如 `@include`, `@mixin` 等），而不是将其标记为未知规则
    // 变量命名允许小驼峰和下划线
    "scss/dollar-variable-pattern": "^[a-zA-Z0-9-_]+$", // 使用正则表达式限制 SCSS 变量（以 `$` 开头）的命名规范，允许字母、数字、下划线和连字符
    // 占位符命名允许小驼峰和下划线
    "scss/percent-placeholder-pattern": "^[a-z][a-zA-Z0-9_]*$", // 使用正则表达式限制 SCSS 占位符选择器（以 `%` 开头）的命名规范，要求以小写字母开头，后续允许字母、数字和下划线
    // 禁止 @import 结尾带 .scss
    "scss/at-import-partial-extension-blacklist": ["scss"], // 禁止在 `@import` 语句中包含 `.scss` 文件扩展名，这是 SCSS 的最佳实践，因为它会自动处理
  },
  // 忽略的文件或目录
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/build/**"], // 指定 Stylelint 在检查时需要忽略的文件或目录，通常是构建输出和依赖项
};
