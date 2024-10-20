function dmUiSetup() {
  dmDrawBlock(() => {
    stroke(DM_COLORS.machineLine)

    // ドラム・マシンの背景
    dmDrawBlock(() => {
      fill(DM_COLORS.machineDark)

      // 画面の高さ・幅で四角形を描画する際に線の太さの半分が画面外に出るため
      // 考慮して線の太さを2倍にしている
      strokeWeight(DM_LINE_WEIGHT * 2)

      rect(0, 0, width, height)
    })

    // ドラム・マシンの操作部分の背景
    dmDrawBlock(() => {
      fill(DM_COLORS.machineLight)
      strokeWeight(DM_LINE_WEIGHT)

      // Volumeノブ・Tempoノブの描画エリア
      rect(
        DM_POSITIONS.knobArea.x,
        DM_POSITIONS.knobArea.y,
        DM_PARTS_SIZES.basicControlArea.width,
        DM_PARTS_SIZES.basicControlArea.height,
      )

      // コントロールボタンの描画エリア（再生・停止）
      rect(
        DM_POSITIONS.controlButtonArea.x,
        DM_POSITIONS.controlButtonArea.y,
        DM_PARTS_SIZES.basicControlArea.width,
        DM_PARTS_SIZES.basicControlArea.height,
      )

      // パターンボタンの描画エリア
      rect(
        DM_POSITIONS.patternButtonArea.x,
        DM_POSITIONS.patternButtonArea.y,
        DM_PARTS_SIZES.basicControlArea.width,
        DM_PARTS_SIZES.basicControlArea.height,
      )

      // メインエリアの描画
      rect(
        DM_POSITIONS.mainArea.x,
        DM_POSITIONS.mainArea.y,
        DM_PARTS_SIZES.mainArea.width,
        DM_PARTS_SIZES.mainArea.height,
      )
    })

    // シーケンスライトの背景
    dmDrawBlock(() => {
      fill(DM_COLORS.seqMain)
      stroke(DM_COLORS.machineLine)
      strokeWeight(DM_LINE_WEIGHT)
      const gap = DM_PARTS_SIZES.seqLightArea.width / DM_BEAT

      ellipseMode(CENTER)
      for (let i = 0; i < DM_BEAT; i++) {
        // 4拍ごとにアクセントをつける
        const isAccent = i % 4 === 0
        strokeWeight(DM_LINE_WEIGHT * (isAccent ? 2 : 1))

        ellipse(
          DM_POSITIONS.seqLightArea.x + i * gap + DM_PARTS_SIZES.seqLight.width,
          DM_POSITIONS.seqLightArea.y + DM_PARTS_SIZES.seqLight.height,
          DM_PARTS_SIZES.seqLight.width,
          DM_PARTS_SIZES.seqLight.height,
        )
      }
    })

    // テキスト
    dmDrawBlock(() => {
      fill(DM_COLORS.machineText)
      textSize(DM_PARTS_SIZES.seqText.height / 4)
      textStyle(BOLD)
      textAlign(CENTER, CENTER)

      // Volume
      text('VOLUME', DM_POSITIONS.volumeText.x, DM_POSITIONS.volumeText.y)

      // Tempo
      text('TEMPO', DM_POSITIONS.tempoText.x, DM_POSITIONS.tempoText.y)

      // Pattern
      text('PATTERN', DM_POSITIONS.patternText.x, DM_POSITIONS.patternText.y)

      // 音色
      for (let i = 0; i < DM_MUSIC_LIST.length; i++) {
        text(DM_MUSIC_LIST[i].name, DM_POSITIONS.seqText.x, DM_POSITIONS.seqText.y + i * DM_PARTS_SIZES.seqText.height)
      }
    })
  })
}
