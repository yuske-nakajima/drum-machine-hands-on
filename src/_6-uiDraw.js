function dmUiDraw() {
  //ノブの描画
  // Volumeノブ
  dmDrawBlock(() => {
    ellipseMode(CENTER)

    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: 9-1. Volumeノブ（背景）を描こう！

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle = map(dmVolume, DM_MIN_VOLUME, DM_MAX_VOLUME, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3.5
    // TODO: 9-2. Volumeノブ（可動部）を描こう！
  })

  // Tempoノブ
  dmDrawBlock(() => {
    ellipseMode(CENTER)

    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: 10-1. Tempoノブ（背景）を描こう！

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle = map(dmBpm, DM_MIN_BPM, DM_MAX_BPM, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3.5
    // TODO: 10-2. Tempoノブ（可動部）を描こう！
  })

  // ディスプレイの描画
  dmDrawBlock(() => {
    fill(DM_COLORS.displayMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)
    rectMode(CENTER)
    // TODO: 11-1. ディスプレイ（背景）を描こう！

    fill(DM_COLORS.displayText)
    noStroke()
    textAlign(CENTER, CENTER)
    textStyle(BOLD)
    textSize(DM_PARTS_SIZES.tempoDisplay.height / 2)
    // TODO: 11-2. ディスプレイ（テキスト）を描こう！
  })

  // 再生ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    const buttonColor = dmIsPlaying ? DM_COLORS.buttonActive : DM_COLORS.buttonNormal
    fill(buttonColor)
    // TODO: 12-1. 再生ボタン（背景）を描こう！

    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    // TODO: 12-2. 再生ボタン（マーク）を描こう！
  })

  // 停止ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    let buttonColor = dmIsPlaying ? DM_COLORS.buttonNormal : DM_COLORS.buttonActive
    buttonColor = dmIsStopping ? DM_COLORS.buttonStopping : buttonColor
    fill(buttonColor)
    // TODO: 13-1. 停止ボタン（背景）を描こう！

    // 停止ボタンマーク
    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    // TODO: 13-2. 停止ボタン（マーク）を描こう！
  })

  // パターンボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    const patternButtonTextStartX = DM_POSITIONS.patternButton.x + DM_PARTS_SIZES.patternButton.width / 2
    for (let i = 0; i < DM_PATTERN_NUM; i++) {
      // ボタン
      const buttonColor = dmCurrentPattern === i + 1 ? DM_COLORS.buttonActive : DM_COLORS.buttonNormal
      fill(buttonColor)
      // TODO: 14-1. パターンボタン（背景）を描こう！

      // 番号
      dmDrawBlock(() => {
        fill(DM_COLORS.buttonText)
        noStroke()
        textAlign(CENTER, CENTER)
        textStyle(BOLD)
        textSize(DM_PARTS_SIZES.patternButton.height / 2)
        // TODO: 14-2. パターンボタンのテキスト（番号）を描こう！
      })
    }
  })

  // シーケンサー
  dmDrawBlock(() => {
    for (let y = 0; y < DM_MUSIC_LIST.length; y++) {
      for (let x = 0; x < DM_BEAT; x++) {
        stroke(DM_COLORS.machineLight)
        strokeWeight(DM_LINE_WEIGHT)

        const isAccent = x % 4 === 0
        let fillColor = isAccent ? DM_COLORS.seqAccent : DM_COLORS.seqMain
        fillColor = dmIsPlaying && dmOnBeat === x ? DM_COLORS.buttonNormal : fillColor
        fill(fillColor)
        // TODO: 15-1. シーケンサーのセルを描こう！

        fillColor = dmBeatData[dmCurrentPattern][y][x] ? DM_COLORS.displayMain : fillColor
        fill(fillColor)
        noStroke()
        // TODO: 15-2. シーケンサーのライトを描こう！
      }
    }

    // ライト
    noStroke()
    ellipseMode(CENTER)
    for (let i = 0; i < DM_BEAT; i++) {
      const fillColor = dmIsPlaying && dmOnBeat === i ? DM_COLORS.buttonActive : DM_COLORS.seqMain
      fill(fillColor)

      // TODO: 16. シーケンサーのライトを描こう！
    }
  })
}
