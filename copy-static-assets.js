const fs = require('fs-extra');
const path = require('path');

// 将 public 目录复制到构建输出目录
fs.copySync(path.resolve(__dirname, 'public'), path.resolve(__dirname, 'dist/src', 'public'));
fs.copySync(path.resolve(__dirname, 'vue_dist'), path.resolve(__dirname, 'dist/src', 'vue_dist'));