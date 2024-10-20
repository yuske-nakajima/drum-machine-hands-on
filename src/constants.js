// 定数
const DM_WIDTH = 800
const DM_HEIGHT = 530
const DM_LINE_WEIGHT = 2
const DM_BEAT = 16
const DM_PATTERN_NUM = 4
const DM_PATTERN_BUTTON_GAP = 10

const DM_COLORS = {
  machineDark: null,
  machineLight: null,
  machineLine: null,
  machineText: null,
  designGuide: null,
  seqMain: null,
  seqAccent: null,
  buttonNormal: null,
  buttonAccent: null,
  buttonLine: null,
  buttonText: null,
  displayMain: null,
  displayText: null,
}
const DM_POSITIONS = {
  // エリア
  knobArea: {
    x: 20,
    y: 20,
  },
  controlButtonArea: {
    x: 280,
    y: 20,
  },
  patternButtonArea: {
    x: 540,
    y: 20,
  },
  mainArea: {
    x: 20,
    y: 110,
  },
  seqArea: {
    x: 120,
    y: 130,
  },
  seqLightArea: {
    x: 120,
    y: 450,
  },
  // テキスト
  seqText: {
    x: 80,
    y: 150,
  },
  volumeText: {
    x: 80,
    y: 75,
  },
  tempoText: {
    x: 200,
    y: 75,
  },
  patternText: {
    x: 660,
    y: 75,
  },
  // パーツ
  volumeKnob: {
    x: 80,
    y: 45,
  },
  tempoKnob: {
    x: 230,
    y: 45,
  },
  tempoDisplay: {
    x: 170,
    y: 45,
  },
  startButton: {
    x: 405,
    y: 30,
  },
  stopButton: {
    x: 345,
    y: 30,
  },
  patternButton: {
    x: 565,
    y: 30,
  },
}
const DM_PARTS_SIZES = {
  // エリア
  basicControlArea: {
    width: 240,
    height: 70,
  },
  mainArea: {
    width: 760,
    height: 400,
  },
  seqLightArea: {
    width: 640,
    height: 40,
  },
  seqLight: {
    width: 20,
    height: 20,
  },
  seqText: {
    width: 80,
    height: 40,
  },
  // パーツ
  knob: {
    width: 40,
    height: 40,
  },
  tempoDisplay: {
    width: 60,
    height: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
  },
  patternButton: {
    width: 40,
    height: 35,
  },
  seqCell: {
    width: 40,
    height: 40,
  },
}
const DM_MUSIC_LIST = [
  {
    name: 'KICK',
    func: null,
  },
  {
    name: 'SNARE',
    func: null,
  },
  {
    name: 'CLOSED HH',
    func: null,
  },
  {
    name: 'OPEN HH',
    func: null,
  },
  {
    name: 'TOM',
    func: null,
  },
  {
    name: 'CRASH',
    func: null,
  },
  {
    name: 'COWBELL',
    func: null,
  },
  {
    name: 'CLAP',
    func: null,
  },
]
