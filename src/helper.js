/**
 * 他描画に影響範囲が及ばないようにpushとpopで囲む
 * @param {function} 描画関数
 */

function dmDrawBlock(func) {
  push()
  func()
  pop()
}
