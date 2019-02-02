# hyper-blend
Set the opacity and background of your terminal!

![hyper-blend-demo](https://raw.githubusercontent.com/edkotkas/hyper-blend/master/demo/general.gif)

This plugin is inspired by:
 - [hyper-background-image](https://www.npmjs.com/package/hyper-background-image)
 - [hyper-opacity](https://www.npmjs.com/package/hyper-opacity)
 - [hyper-transparent-dynamic
](https://www.npmjs.com/package/hyper-transparent-dynamic) (planning on adding a blur option)

Compatibility:
- Works with **Windows**, maybe **macOS**, by chance on **Linux?**
- Should be compatible with different themes.

## Prerequisites

- Hyper 2.x

## Install

### CLI
```bash
hyper i hyper-blend
```

### Or edit config
Preferably add it to the end of the list, to try avoid conflicts from themes.
```js
plugins: [
  ...,
  "hyper-blend"
]
```

## Usage

None of the options are required and have defaults.

If there's no folder set though, you won't get any background images showing up.

The classes in use for the css adjustments are `.hyper_main` and `.terms_terms`, you should be able to add custom css in your config and have it reflect over the plugin css.

Any file type supported in a `background-image` property will work (like gifs), support for urls is planned.

Add any of the following properties under `hyperBlend` to customize the plugin!

```js
module.exports = {
  config: {
    ...,
    hyperBlend: {
      terminal: {
        opacity: 0.8,
        color: "#000000",
        colorOpacity: 0.8
      },
      background: {
        folder: "full/path/to/images",
        position: "center",
        size: "cover",
        repeat: "no-repeat"
      }
    },
    ...
}

```

## License

ISC © [Eduard Kotkas](https://edkotkas.me)