// 一度だけ実行される処理
function setup() {
  dmInitial()
  dmUiSetup()
}

// 毎フレーム実行される処理
function draw() {
  // UI
  dmUiDraw()

  // 音楽再生
  dmPlay()

  // デザインガイド
  dmUiDesignGuideDraw()
}

// マウスが押された時に実行される処理
function mousePressed() {
  dmMousePressed()
}

// マウスが動いた時に実行される処理
function mouseDragged() {
  dmMouseDragged()
}

// マウスが離された時に実行される処理
function mouseReleased() {
  dmMouseReleased()
}
