function dmUiDraw() {
  //ノブの描画
  dmDrawBlock(() => {
    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    ellipseMode(CENTER)

    // Volumeノブ
    ellipse(DM_POSITIONS.volumeKnob.x, DM_POSITIONS.volumeKnob.y, DM_PARTS_SIZES.knob.width, DM_PARTS_SIZES.knob.height)

    // Tempoノブ
    ellipse(DM_POSITIONS.tempoKnob.x, DM_POSITIONS.tempoKnob.y, DM_PARTS_SIZES.knob.width, DM_PARTS_SIZES.knob.height)
  })

  // ディスプレイの描画
  dmDrawBlock(() => {
    fill(DM_COLORS.displayMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)

    rectMode(CENTER)
    rect(
      DM_POSITIONS.tempoDisplay.x,
      DM_POSITIONS.tempoDisplay.y,
      DM_PARTS_SIZES.tempoDisplay.width,
      DM_PARTS_SIZES.tempoDisplay.height,
    )
  })

  // ボタン
  dmDrawBlock(() => {
    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    // 再生ボタン
    rect(
      DM_POSITIONS.startButton.x,
      DM_POSITIONS.startButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )
    dmDrawBlock(() => {
      const gap = 10
      fill(DM_COLORS.buttonLine)
      noStroke()
      triangle(
        DM_POSITIONS.startButton.x + gap,
        DM_POSITIONS.startButton.y + gap,
        DM_POSITIONS.startButton.x + gap,
        DM_POSITIONS.startButton.y + DM_PARTS_SIZES.controlButton.height - gap,
        DM_POSITIONS.startButton.x + DM_PARTS_SIZES.controlButton.width - gap,
        DM_POSITIONS.startButton.y + DM_PARTS_SIZES.controlButton.height / 2,
      )
    })

    // 停止ボタン
    rect(
      DM_POSITIONS.stopButton.x,
      DM_POSITIONS.stopButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )
    dmDrawBlock(() => {
      const gap = 10
      fill(DM_COLORS.buttonLine)
      noStroke()
      rect(
        DM_POSITIONS.stopButton.x + gap,
        DM_POSITIONS.stopButton.y + gap,
        DM_PARTS_SIZES.controlButton.width - gap * 2,
        DM_PARTS_SIZES.controlButton.height - gap * 2,
      )
    })

    // パターンボタン
    const patternButtonStartX = DM_POSITIONS.patternButton.x + DM_PARTS_SIZES.patternButton.width / 2
    for (let i = 0; i < DM_PATTERN_NUM; i++) {
      // ボタン
      rect(
        DM_POSITIONS.patternButton.x + i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
        DM_POSITIONS.patternButton.y,
        DM_PARTS_SIZES.patternButton.width,
        DM_PARTS_SIZES.patternButton.height,
      )
      // 番号
      dmDrawBlock(() => {
        fill(DM_COLORS.buttonText)
        noStroke()
        textAlign(CENTER, CENTER)
        textStyle(BOLD)
        textSize(DM_PARTS_SIZES.patternButton.height / 2)
        text(
          i + 1,
          // DM_POSITIONS.patternButton.x +
          //   i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP) +
          //   DM_PARTS_SIZES.patternButton.width / 2,
          patternButtonStartX + (i * DM_PARTS_SIZES.patternButton.width + i * DM_PATTERN_BUTTON_GAP),
          DM_POSITIONS.patternButton.y + DM_PARTS_SIZES.patternButton.height / 2,
        )
      })
    }
  })

  // シーケンサー
  dmDrawBlock(() => {
    for (let y = 0; y < DM_MUSIC_LIST.length; y++) {
      for (let x = 0; x < DM_BEAT; x++) {
        const isAccent = x % 4 === 0
        fill(isAccent ? DM_COLORS.seqAccent : DM_COLORS.seqMain)
        stroke(DM_COLORS.machineLight)
        strokeWeight(DM_LINE_WEIGHT)

        rect(
          DM_POSITIONS.seqArea.x + x * DM_PARTS_SIZES.seqCell.width,
          DM_POSITIONS.seqArea.y + y * DM_PARTS_SIZES.seqCell.height,
          DM_PARTS_SIZES.seqCell.width,
          DM_PARTS_SIZES.seqCell.height,
        )
      }
    }
  })
}

function dmUiDesignGuideDraw() {
  const size = 6
  dmDrawBlock(() => {
    noStroke()
    fill(DM_COLORS.designGuide)

    ellipseMode(CENTER)

    ellipse(DM_POSITIONS.knobArea.x, DM_POSITIONS.knobArea.y, size)
    ellipse(DM_POSITIONS.controlButtonArea.x, DM_POSITIONS.controlButtonArea.y, size)
    ellipse(DM_POSITIONS.patternButtonArea.x, DM_POSITIONS.patternButtonArea.y, size)
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
}
