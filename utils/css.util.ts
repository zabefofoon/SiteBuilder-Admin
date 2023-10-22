import {Direction, ResponsiveMode, Node} from "~/models/Node"
const getScreenSize = (responsiveMode: ResponsiveMode) => responsiveMode === 'small' ? '0px' : '768px'

export const generateCss = (nodes: Node[],
                            isShowHidden = false) => {
  return generatePreflightCss()
      + `\n`
      + generateCoreCss(isShowHidden)
      + `\n`
      + generateLayoutCss(nodes)
      + `\n`
}

const generatePreflightCss = () => {
  return `
*,
::before,
::after {
    box-sizing: border-box; /* 1 */
    border-width: 0; /* 2 */
    border-style: solid; /* 2 */
    border-color: #e2e8f0; /* 2 */
}

::before,
::after {
    --tw-content: '';
}

html {
    line-height: 1.5; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -moz-tab-size: 4; /* 3 */
    tab-size: 4; /* 3 */
}

body {
    margin: 0; /* 1 */
    line-height: inherit; /* 2 */
}

hr {
    height: 0; /* 1 */
    color: inherit; /* 2 */
    border-top-width: 1px; /* 3 */
}

abbr:where([title]) {
    text-decoration: underline dotted;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    font-weight: inherit;
}

a {
    color: inherit;
    text-decoration: inherit;
}

b,
strong {
    font-weight: bolder;
}

code,
kbd,
samp,
pre {
    font-size: 1em; /* 2 */
}

small {
    font-size: 80%;
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sub {
    bottom: -0.25em;
}

sup {
    top: -0.5em;
}

table {
    text-indent: 0; /* 1 */
    border-color: inherit; /* 2 */
    border-collapse: collapse; /* 3 */
}

button,
input,
optgroup,
select,
textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    font-weight: inherit; /* 1 */
    line-height: inherit; /* 1 */
    color: inherit; /* 1 */
    margin: 0; /* 2 */
    padding: 0; /* 3 */
}

button,
select {
    text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
    -webkit-appearance: button; /* 1 */
    background-color: transparent; /* 2 */
    background-image: none; /* 2 */
}

:-moz-focusring {
    outline: auto;
}

:-moz-ui-invalid {
    box-shadow: none;
}

progress {
    vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    height: auto;
}

[type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
}

::-webkit-search-decoration {
    -webkit-appearance: none;
}

::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
}

summary {
    display: list-item;
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
    margin: 0;
}

fieldset {
    margin: 0;
    padding: 0;
}

legend {
    padding: 0;
}

ol,
ul,
menu {
    list-style: none;
    margin: 0;
    padding: 0;
}

textarea {
    resize: vertical;
}

input::placeholder,
textarea::placeholder {
    opacity: 1; /* 1 */
}

button,
[role="button"] {
    cursor: pointer;
}

:disabled {
    cursor: default;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
    display: block; /* 1 */
    vertical-align: middle; /* 2 */
}

img,
video {
    max-width: 100%;
    height: auto;
}

[hidden] {
    display: none;
}
  `
}

const generateCoreCss = (isShowHidden: boolean) => {
  return `
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
}  
  
.node {
  width: 100%;
  border-collapse: collapse;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.node > * {
  width: 100%;
}

@media (min-width: 0px) {
  .small\\:type-stack {
      display: flex;
  }

  .small\\:direction-horizontal {
      flex-direction: row;
  }

  .small\\:direction-vertical {
      flex-direction: column;
  }

  .small\\:type-grid {
      display: grid;
  }

  .small\\:mainAxis-start {
      justify-content: start;
  }
  
  .small\\:mainAxis-center {
      justify-content: center;
  }
  
  .small\\:mainAxis-end {
      justify-content: end;
  }
  
  .small\\:mainAxis-between {
      justify-content: space-between;
  }
  
  .small\\:crossAxis-start {
      align-items: start;
  }
  
  .small\\:crossAxis-center {
      align-items: center;
  }
  
  .small\\:crossAxis-end {
      align-items: end;
  }
  
  .node.small\\:position-relative {
      position: relative;
  }
  
  .node.small\\:position-absolute {
      position: absolute;
  }
  
  .node.small\\:position-sticky {
      position: sticky;
  }
  
  .node.small\\:position-fixed {
      position: fixed;
  }
  
  .node.small\\:transparent {
      background: #ffffff;
  }
}

@media (min-width:0) and (max-width:767px) {
  .small\\:hidden-true {
      ${isShowHidden ? 'opacity: .3;' : 'display: none;'}
  }
}


@media (min-width: 768px) {
  .large\\:type-stack {
      display: flex
  }

  .large\\:direction-horizontal {
      flex-direction: row;
  }

  .large\\:direction-vertical {
      flex-direction: column;
  }

  .large\\:type-grid {
      display: grid;
  }
  
  .large\\:mainAxis-start {
      justify-content: start;
  }
  
  .large\\:mainAxis-center {
      justify-content: center;
  }
  
  .large\\:mainAxis-end {
      justify-content: end;
  }
  
  .large\\:mainAxis-between {
      justify-content: space-between;
  }
  
  .large\\:crossAxis-start {
      align-items: start;
  }
  
  .large\\:crossAxis-center {
      align-items: center;
  }
  
  .large\\:crossAxis-end {
      align-items: end;
  }
  
  .large\\:hidden-true {
      ${isShowHidden ? 'opacity: .3;' : 'display: none;'}
  }
  
  .node.large\\:position-relative {
      position: relative;
  }
  
  .node.large\\:position-absolute {
      position: absolute;
  }
  
  .node.large\\:position-sticky {
      position: sticky;
  }
  
  .node.large\\:position-fixed {
      position: fixed;
  }
  
  .large\\:transparent {
      background: #ffffff;
  }
}
`
}

const generateLayoutCss = (nodes: Node[]) => {
  return generateGap(nodes, 'small')
      + generateGap(nodes, 'large')
      + generateColumns(nodes, 'small')
      + generateColumns(nodes, 'large')
      + generateWidth(nodes, 'small')
      + generateWidth(nodes, 'large')
      + generateHeight(nodes, 'small')
      + generateHeight(nodes, 'large')
      + generateMaxWidth(nodes, 'small')
      + generateMaxWidth(nodes, 'large')
      + generatePadding(nodes, 'small', 'left')
      + generatePadding(nodes, 'small', 'top')
      + generatePadding(nodes, 'small', 'right')
      + generatePadding(nodes, 'small', 'bottom')
      + generatePadding(nodes, 'large', 'left')
      + generatePadding(nodes, 'large', 'top')
      + generatePadding(nodes, 'large', 'right')
      + generatePadding(nodes, 'large', 'bottom')
      + generateInset(nodes, 'small', 'left')
      + generateInset(nodes, 'small', 'top')
      + generateInset(nodes, 'small', 'right')
      + generateInset(nodes, 'small', 'bottom')
      + generateInset(nodes, 'large', 'left')
      + generateInset(nodes, 'large', 'top')
      + generateInset(nodes, 'large', 'right')
      + generateInset(nodes, 'large', 'bottom')
}

const generateGap = (nodes: Node[],
                     responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].gap
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:gap-${current} {
    gap: ${current};
  }
}
`, '')
}

const generateColumns = (nodes: Node[],
                         responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].columns
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:columns-${current} {
    grid-template-columns: repeat(${current}, 1fr);
  }
}
`, '')
}

const generateWidth = (nodes: Node[],
                       responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].width
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')
    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:width-${convertedCurrent} {
    width: ${current};
  }
}
`
  }, '')
}

const generateHeight = (nodes: Node[],
                        responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].height
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:height-${convertedCurrent} {
    height: ${current};
  }
}
`
  }, '')
}

const generateMaxWidth = (nodes: Node[],
                          responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].maxWidth
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:maxWidth-${convertedCurrent} {
    max-width: ${current};
  }
}
`
  }, '')
}

const generatePadding = (nodes: Node[],
                         responsiveMode: ResponsiveMode,
                         direction: Direction) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode][directionToPaddingField(direction)]
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:${flatCapital(directionToPaddingField(direction))}-${convertedCurrent} {
    ${flatCapital(directionToPaddingField(direction))}: ${current};
  }
}
`
  }, '')
}

const generateInset = (nodes: Node[],
                       responsiveMode: ResponsiveMode,
                       direction: Direction) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode][direction]
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:${direction}-${convertedCurrent} {
    ${direction}: ${current};
  }
}
`
  }, '')
}


const directionToPaddingField = (direction: Direction) => direction === 'left'
    ? 'paddingLeft'
    : direction === 'right'
        ? 'paddingRight'
        : direction === 'top'
            ? 'paddingTop'
            : 'paddingBottom'

const flatCapital = (str: string) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)