const path = require('path')
const fs = require('fs').promises
const fm = require('front-matter')

const directoryPath = process.argv[2]

async function getFilesInDirectory (dir) {
  try {
    const fileList = await fs.readdir(dir)
    const fileContents = await Promise.all(fileList.filter(f => f !== 'data.json').map(filename => fs.readFile(path.resolve(dir, filename), 'utf8')))
    return fileContents
  } catch (err) {
    console.error(err)
  }
}

async function run (dir) {
  try {
    const files = await getFilesInDirectory(dir)
    const data = files.map(fm)
    await fs.writeFile(path.resolve(dir, 'data.json'), JSON.stringify({ data }, null, 2))
    console.log('WROTE')
  } catch (err) {
    console.error(err)
  }
}

run(directoryPath)
