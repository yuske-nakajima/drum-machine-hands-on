function dmUiDraw() {
  // パターンボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    for (let xi = 0; xi < DM_PATTERN_NUM; xi++) {
      // ボタン
      const buttonColor =
        dmCurrentPattern === xi + 1
          ? DM_COLORS.buttonActive
          : DM_COLORS.buttonNormal
      fill(buttonColor)
      // TODO: DYNAMIC-1-1. パターンボタン（背景）を描こう！
      // START POSITION: DM_POSITIONS.patternButton
      // SIZE          : DM_PARTS_SIZES.patternButton
      // GAP           : DM_PATTERN_BUTTON_GAP

      // 番号
      dmDrawBlock(() => {
        fill(DM_COLORS.buttonText)
        noStroke()
        textStyle(BOLD)
        textSize(DM_PARTS_SIZES.patternButton.height / 2)
        // TODO: DYNAMIC-1-2. パターンボタンのテキスト（番号）を描こう！
        // POSITION: POS
        // TEXT    : 番号
        // ※ テキストの配置方法に気をつける
      })
    }
  })

  //ノブの描画
  // Volumeノブ
  dmDrawBlock(() => {
    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: DYNAMIC-2-1. Volumeノブ（背景）を描こう！
    // POSITION: DM_POSITIONS.volumeKnob
    // SIZE    : DM_PARTS_SIZES.knob

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle =
      map(dmVolume, DM_MIN_VOLUME, DM_MAX_VOLUME, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3
    const x = DM_POSITIONS.volumeKnob.x + knobRadius * cos(angle)
    const y = DM_POSITIONS.volumeKnob.y + knobRadius * sin(angle)
    // TODO: DYNAMIC-2-2. Volumeノブ（可動部）を描こう！
  })

  // Tempoノブ
  dmDrawBlock(() => {
    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: DYNAMIC-3-1. Tempoノブ（背景）を描こう！
    // POSITION: DM_POSITIONS.tempoKnob
    // SIZE    : DM_PARTS_SIZES.knob

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle = map(dmBpm, DM_MIN_BPM, DM_MAX_BPM, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3
    const x = DM_POSITIONS.tempoKnob.x + knobRadius * cos(angle)
    const y = DM_POSITIONS.tempoKnob.y + knobRadius * sin(angle)
    // TODO: DYNAMIC-3-2. Tempoノブ（可動部）を描こう！
  })

  // ディスプレイの描画
  dmDrawBlock(() => {
    fill(DM_COLORS.displayMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: DYNAMIC-4-1. テンポディスプレイ（背景）を描こう！
    // POSITION: DM_POSITIONS.tempoDisplay
    // SIZE    : DM_PARTS_SIZES.tempoDisplay

    fill(DM_COLORS.displayText)
    noStroke()
    textStyle(BOLD)
    textSize(DM_PARTS_SIZES.tempoDisplay.height / 2)
    // TODO: DYNAMIC-4-2. テンポディスプレイ（テキスト）を描こう！
    // POSITION: DM_POSITIONS.tempoDisplay
    // TEXT    : dmBpm
  })

  // シーケンサー
  dmDrawBlock(() => {
    for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
      for (let xi = 0; xi < DM_BEAT; xi++) {
        stroke(DM_COLORS.machineLight)
        strokeWeight(DM_LINE_WEIGHT)

        const isAccent = xi % 4 === 0
        let fillColor = isAccent ? DM_COLORS.seqAccent : DM_COLORS.seqMain
        fillColor =
          dmIsPlaying && dmOnBeat === xi ? DM_COLORS.buttonNormal : fillColor
        fill(fillColor)
        // TODO: DYNAMIC-5-1. シーケンサーのセルを描こう！
        // POSITION: DM_POSITIONS.seqArea
        // SIZE    : DM_PARTS_SIZES.seqCell

        fillColor = dmBeatData[dmCurrentPattern][yi][xi]
          ? DM_COLORS.displayMain
          : fillColor
        fill(fillColor)
        noStroke()
        // TODO: DYNAMIC-5-2. シーケンサーセルのライトを描こう！
        // POSITION: DM_POSITIONS.seqArea
        // SIZE    : DM_PARTS_SIZES.seqCell
        // 実装したらクリックして挙動を確認する
        // stroke(DM_COLORS.designGuide) // ※ デバッグ用。挙動確認したら削除する。
      }
    }

    // ライト
    noStroke()
    for (let xi = 0; xi < DM_BEAT; xi++) {
      const fillColor =
        dmIsPlaying && dmOnBeat === xi
          ? DM_COLORS.buttonActive
          : DM_COLORS.seqMain
      fill(fillColor)

      // TODO: DYNAMIC-6. シーケンサーのライトを描こう！
      // POSITION: DM_POSITIONS.seqLight
      // SIZE    : DM_PARTS_SIZES.seqCell
      // ※ ellipseMode のデフォルトは CENTER
    }
  })

  // 再生ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    const buttonColor = dmIsPlaying
      ? DM_COLORS.buttonActive
      : DM_COLORS.buttonNormal
    fill(buttonColor)
    // TODO: DYNAMIC-7-1. 再生ボタン（背景）を描こう！
    // POSITION: DM_POSITIONS.startButton
    // SIZE    : DM_PARTS_SIZES.controlButton

    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    const point1 = {
      x: DM_POSITIONS.startButton.x + gap,
      y: DM_POSITIONS.startButton.y + gap,
    }
    const point2 = {
      x: DM_POSITIONS.startButton.x + gap,
      y: DM_POSITIONS.startButton.y + gap * 4,
    }
    // TODO: DYNAMIC-7-2. 再生ボタン（マーク）を描こう！
    // SIZE: 縦横 が gap * 3 の正方形内に三角形を描画する
  })

  // 停止ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    let buttonColor = dmIsPlaying
      ? DM_COLORS.buttonNormal
      : DM_COLORS.buttonActive
    buttonColor = dmIsStopping ? DM_COLORS.buttonStopping : buttonColor
    fill(buttonColor)
    // TODO: DYNAMIC-8-1. 停止ボタン（背景）を描こう！
    // POSITION: DM_POSITIONS.stopButton
    // SIZE    : DM_PARTS_SIZES.controlButton

    // 停止ボタンマーク
    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    // TODO: DYNAMIC-8-2. 停止ボタン（マーク）を描こう！
    // SIZE: 停止ボタンの内側に 縦横 が gap * 3 の正方形
  })
}

function dmUiDesignGuideDraw() {
  const size = 6
  dmDrawBlock(() => {
    noStroke()
    fill(DM_COLORS.designGuide)

    ellipse(DM_POSITIONS.controlArea.x, DM_POSITIONS.controlArea.y, size)
    ellipse(DM_POSITIONS.mainArea.x, DM_POSITIONS.mainArea.y, size)
    ellipse(DM_POSITIONS.seqArea.x, DM_POSITIONS.seqArea.y, size)
    ellipse(DM_POSITIONS.seqLight.x, DM_POSITIONS.seqLight.y, size)
    ellipse(DM_POSITIONS.seqText.x, DM_POSITIONS.seqText.y, size)
    ellipse(DM_POSITIONS.volumeText.x, DM_POSITIONS.volumeText.y, size)
    ellipse(DM_POSITIONS.tempoText.x, DM_POSITIONS.tempoText.y, size)
    ellipse(DM_POSITIONS.patternText.x, DM_POSITIONS.patternText.y, size)
    ellipse(DM_POSITIONS.volumeKnob.x, DM_POSITIONS.volumeKnob.y, size)
    ellipse(DM_POSITIONS.tempoKnob.x, DM_POSITIONS.tempoKnob.y, size)
    ellipse(DM_POSITIONS.tempoDisplay.x, DM_POSITIONS.tempoDisplay.y, size)
    ellipse(DM_POSITIONS.startButton.x, DM_POSITIONS.startButton.y, size)
    ellipse(DM_POSITIONS.stopButton.x, DM_POSITIONS.stopButton.y, size)
    ellipse(DM_POSITIONS.patternButton.x, DM_POSITIONS.patternButton.y, size)
  })

  dmDrawBlock(() => {
    noFill()
    stroke(DM_COLORS.designGuide)
    strokeWeight(0.5)

    for (let xi = 0; xi < 3; xi++) {
      rect(
        DM_POSITIONS.controlArea.x +
          xi * (DM_PARTS_SIZES.controlArea.width + DM_AREA_GAP),
        DM_POSITIONS.controlArea.y,
        DM_PARTS_SIZES.controlArea.width,
        DM_PARTS_SIZES.controlArea.height,
      )
    }

    rect(
      DM_POSITIONS.mainArea.x,
      DM_POSITIONS.mainArea.y,
      DM_PARTS_SIZES.mainArea.width,
      DM_PARTS_SIZES.mainArea.height,
    )

    for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
      rect(
        DM_POSITIONS.seqText.x,
        DM_POSITIONS.seqText.y + yi * DM_PARTS_SIZES.seqCell.height,
        DM_PARTS_SIZES.seqCell.width * 2,
        DM_PARTS_SIZES.seqCell.height,
      )
    }

    for (let xi = 0; xi < DM_BEAT; xi++) {
      for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
        rect(
          DM_POSITIONS.seqArea.x + xi * DM_PARTS_SIZES.seqCell.width,
          DM_POSITIONS.seqArea.y + yi * DM_PARTS_SIZES.seqCell.height,
          DM_PARTS_SIZES.seqCell.width,
          DM_PARTS_SIZES.seqCell.height,
        )
      }
    }

    for (let xi = 0; xi < DM_BEAT; xi++) {
      rect(
        DM_POSITIONS.seqLight.x + xi * DM_PARTS_SIZES.seqCell.width,
        DM_POSITIONS.seqLight.y,
        DM_PARTS_SIZES.seqCell.width,
        DM_PARTS_SIZES.seqCell.height,
      )
    }

    rect(
      DM_POSITIONS.stopButton.x,
      DM_POSITIONS.stopButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    rect(
      DM_POSITIONS.startButton.x,
      DM_POSITIONS.startButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    for (let xi = 0; xi < DM_PATTERN_NUM; xi++) {
      rect(
        DM_POSITIONS.patternButton.x +
          xi * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
        DM_POSITIONS.patternButton.y,
        DM_PARTS_SIZES.patternButton.width,
        DM_PARTS_SIZES.patternButton.height,
      )
    }

    rect(
      DM_POSITIONS.volumeKnob.x - DM_PARTS_SIZES.knob.width / 2,
      DM_POSITIONS.volumeKnob.y - DM_PARTS_SIZES.knob.height / 2,
      DM_PARTS_SIZES.knob.width,
      DM_PARTS_SIZES.knob.height,
    )

    rect(
      DM_POSITIONS.tempoKnob.x - DM_PARTS_SIZES.knob.width / 2,
      DM_POSITIONS.tempoKnob.y - DM_PARTS_SIZES.knob.height / 2,
      DM_PARTS_SIZES.knob.width,
      DM_PARTS_SIZES.knob.height,
    )

    rect(
      DM_POSITIONS.tempoDisplay.x - DM_PARTS_SIZES.tempoDisplay.width / 2,
      DM_POSITIONS.tempoDisplay.y - DM_PARTS_SIZES.tempoDisplay.height / 2,
      DM_PARTS_SIZES.tempoDisplay.width,
      DM_PARTS_SIZES.tempoDisplay.height,
    )
  })
}
