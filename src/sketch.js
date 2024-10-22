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
  // dmUiDesignGuideDraw()
}

// マウスが押された時に実行される処理
function mousePressed() {}

// マウスが離された時に実行される処理
function mouseReleased() {}
