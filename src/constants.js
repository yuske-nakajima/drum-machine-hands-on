// 定数
const DM_WIDTH = 800
const DM_HEIGHT = 530
const DM_LINE_WEIGHT = 2
const DM_BEAT = 16

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
  seqLightArea: {
    x: 120,
    y: 450,
  },
  seqTextArea: {
    x: 40,
    y: 130,
  },
  volumeText: {
    x: 80,
    y: 75,
  },
  tempoText: {
    x: 200,
    y: 75,
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
  seqTextArea: {
    width: 80,
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
