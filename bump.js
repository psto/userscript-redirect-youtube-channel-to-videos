import fs from 'node:fs/promises'

const { version } = JSON.parse(await fs.readFile('package.json', 'utf8'))
const content = await fs.readFile('index.js', 'utf8')
console.log(content)
const newContent = content.replace(/\/\/ @version\s+(?:\S.*)?$/m, `// @version     ${version}`)
console.log(newContent)
await fs.writeFile('index.js', newContent, 'utf8')
