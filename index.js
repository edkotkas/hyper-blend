const parse = require('parse-color')
const isImage = require('is-image')
const fs = require('fs')

const defaultConfig = {
  terminal: {
    opacity: 0.8,
    color: "#000000",
    colorOpacity: 0.8
  },
  background: {
    folder: "",
    position: "center",
    size: "cover",
    repeat: "no-repeat"
  }
}

let {terminal, background} = defaultConfig

function getRandomImage(folder) {
  if (!folder) {
    return
  }

  const images = fs.readdirSync(folder).filter(f => isImage(f))

  if (images.length === 0) {
    return
  }

  const index = Math.floor(Math.random() * images.length)

  return folder + images[index]
}

const windows = []

function setOpacity() {
  windows.map(win => win.setOpacity(terminal.opacity))
}

function assignConfig(config) {
  // TODO: dynamic updating
  if (config.hyperBlend) {
    const {terminal: term, background: bg} = config.hyperBlend
    if (term) {
      terminal.color = term.color || terminal.color
      terminal.colorOpacity = term.colorOpacity || terminal.colorOpacity
      terminal.opacity = term.opacity || terminal.opacity
    }

    if (bg) {
      background.folder = bg.folder || background.folder
      background.position = bg.position || background.position
      background.repeat = bg.repeat || background.repeat
      background.size = bg.size || background.size
    }
  }
}

module.exports.decorateConfig = config => {
  assignConfig(config)

  setOpacity()

  const image = getRandomImage(background.folder)

  const {rgb} = parse(terminal.color)
  const color = rgb ? `rgba(${rgb.join(', ')}, ${terminal.colorOpacity})` : terminal.color

  return Object.assign({}, config, {
    backgroundColor: 'transparent',
    css: `
      .hyper_main {
        ${image ? `background-image: url(file://${image});` : ''}
        background-size: ${background.size};
        background-position: ${background.position};
        background-repeat: ${background.repeat};
      }
      
      .terms_terms {
        margin-top: 25px;
        background-color: ${color};
      }
      
      ${config.css || ''}
    `
  })
}

module.exports.onWindow = win => {
  windows.push(win)
  setOpacity()
}