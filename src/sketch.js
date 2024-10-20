let dmAction = ''

// 一度だけ実行される処理
function setup() {
  initial()
}

// 毎フレーム実行される処理
function draw() {
  background(0, 0, 100)

  dmDrawBlock(() => {
    fill(DM_COLORS.machineDark)
    stroke(DM_COLORS.machineLine)
    strokeWeight(4)
    rect(0, 0, width, height)
  })

  dmDrawBlock(() => {
    textAlign(CENTER, CENTER)
    textSize(40)
    fill(DM_COLORS.machineText)
    text('最初のスケッチ', width / 2, height / 2 - 100)
    text(`frameCount: ${frameCount}`, width / 2, height / 2 - 50)
    text(`mouseX:${mouseX}, mouseY:${mouseY}`, width / 2, height / 2)
    text(dmAction, width / 2, height / 2 + 50)
  })
}

// マウスが押された時に実行される処理
function mousePressed() {
  dmAction = `マウスが押された！フレーム数(${frameCount})`
}

// マウスが離された時に実行される処理
function mouseReleased() {
  dmAction = `マウスを離した！フレーム数(${frameCount})`
}
