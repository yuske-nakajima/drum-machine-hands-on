function dmUiSetup() {
  // ドラム・マシンの背景
  dmDrawBlock(() => {
    fill(DM_COLORS.machineDark)

    // 画面の高さ・幅で四角形を描画する際に線の太さの半分が画面外に出るため
    // 考慮して線の太さを2倍にしている
    strokeWeight(DM_LINE_WEIGHT * 2)
    stroke(DM_COLORS.machineLine)

    // TODO: 1. ドラムマシンの背景を描こう！
  })

  // ドラム・マシンの操作部分の背景
  dmDrawBlock(() => {
    fill(DM_COLORS.machineLight)
    strokeWeight(DM_LINE_WEIGHT)
    stroke(DM_COLORS.machineLine)

    // volume・tempoエリア controlエリア patternエリアの描画
    for (let i = 0; i < 3; i++) {
      // TODO: 2. 各操作エリアの背景を描こう！
    }

    // メインエリアの描画
    // TODO: 3. メインエリアの背景を描こう！
  })

  // シーケンスライトの背景
  dmDrawBlock(() => {
    fill(DM_COLORS.seqMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)

    ellipseMode(CORNER)
    for (let i = 0; i < DM_BEAT; i++) {
      // 4拍ごとにアクセントをつける
      const isAccent = i % 4 === 0
      strokeWeight(DM_LINE_WEIGHT * (isAccent ? 2 : 1))

      // TODO: 4. シーケンスライトの背景を描こう！
    }
  })

  // テキスト
  dmDrawBlock(() => {
    fill(DM_COLORS.machineText)
    noStroke()
    textSize(DM_PARTS_SIZES.seqCell.height / 4)
    textStyle(BOLD)
    textAlign(CENTER, CENTER)

    // Volume
    // TODO: 5. Volumeのテキストを描こう！

    // Tempo
    // TODO: 6. Tempoのテキストを描こう！

    // Pattern
    // TODO: 7. Patternのテキストを描こう！

    // 音色
    for (let i = 0; i < DM_MUSIC_LIST.length; i++) {
      // TODO: 8. 音色タイトルのテキストを描こう！
    }
  })
}
