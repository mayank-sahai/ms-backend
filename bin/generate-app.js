#!/usr/bin/env node

import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import readline from 'readline'

const YOUR_GIT_URL = 'https://github.com/mayank-sahai/ms-backend.git'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

async function main() {
    try {
        console.log('Creating a new project...')

        const projectName = process.argv[2]
        if (!projectName) {
            console.log('You have to provide a name to your app.')
            console.log('For example :')
            console.log('    npx create-ms-backend my-app')
            process.exit(1)
        }

        const description = await prompt('Enter project description: ')
        const author = await prompt('Enter author name: ')

        const currentPath = process.cwd()
        const projectPath = path.join(currentPath, projectName)

        try {
            fs.mkdirSync(projectPath)
        } catch (err) {
            if (err.code === 'EEXIST') {
                console.log(
                    `The file ${projectName} already exists in the current directory, please give it another name.`
                )
            } else {
                console.log(err)
            }
            process.exit(1)
        }

        console.log('Downloading files...')
        execSync(`git clone --depth 1 ${YOUR_GIT_URL} ${projectPath}`)

        // Update package.json name
        const packageJsonPath = new URL(
            `file://${path.join(projectPath, 'package.json')}`
        ).pathname
        const packageJson = await import(packageJsonPath, {
            assert: { type: 'json' },
        })
        packageJson.default.name = projectName
        packageJson.default.description = description
        packageJson.default.author = author
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson.default, null, 2)
        )

        process.chdir(projectPath)

        console.log('Installing dependencies...')
        execSync('npm install')

        console.log('The installation is done, this is ready to use !')

        rl.close()
    } catch (error) {
        console.log(error)
    }
}

main()
