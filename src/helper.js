/**
 * 他描画に影響範囲が及ばないようにpushとpopで囲む
 * @param {function} 描画関数
 */

function dmDrawBlock(func) {
  push()
  func()
  pop()
}

function dmMousePressedBlock(pos, size, func) {
  if (pos.x <= mouseX && mouseX <= pos.x + size.width && pos.y <= mouseY && mouseY <= pos.y + size.height) {
    func()
  }
}
