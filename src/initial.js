function dmInitial() {
  createCanvas(DM_WIDTH, DM_HEIGHT)
  colorMode(HSB)

  // 色の定義
  DM_COLORS.machineDark = color(220, 10, 50, 1)
  DM_COLORS.machineLight = color(220, 10, 70, 1)
  DM_COLORS.machineLine = color(220, 50, 30, 1)
  DM_COLORS.machineText = color(220, 10, 100, 1)

  DM_COLORS.seqMain = color(220, 10, 50, 1)
  DM_COLORS.seqAccent = color(220, 10, 10, 1)

  DM_COLORS.buttonNormal = color(50, 10, 100, 1)
  DM_COLORS.buttonAccent = color(0, 50, 100, 1)
  DM_COLORS.buttonLine = color(0, 50, 25, 1)
  DM_COLORS.buttonText = color(0, 0, 30, 1)

  DM_COLORS.displayMain = color(120, 90, 70, 1)
  DM_COLORS.displayText = color(120, 70, 95, 1)

  DM_COLORS.designGuide = color(305, 100, 100, 1)
}
