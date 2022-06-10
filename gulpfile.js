/*   Copyright 2021-2022 Red Hat, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
'use strict'

const connect = require('gulp-connect')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const generator = require('@antora/site-generator')
const { reload: livereload } = process.env.LIVERELOAD === 'true' ? require('gulp-connect') : {}
const { parallel, series, src, watch } = require('gulp')
const yaml = require('js-yaml')

const playbookFilename = 'antora-playbook.yml'
const playbook = yaml.load(fs.readFileSync(playbookFilename, 'utf8'))
const outputDir = (playbook.output || {}).dir || './build'
const serverConfig = { name: 'Preview Site', livereload, host: '0.0.0.0', port: 4000, root: outputDir }
const antoraArgs = ['--playbook', playbookFilename]
const watchPatterns = playbook.content.sources.filter((source) => !source.url.includes(':')).reduce((accum, source) => {
  accum.push(`./antora-playbook.yml`)
  accum.push(`./antora.yml`)
  accum.push(`./gulpfile.js`)
  accum.push(`./docs/**/*`)
  accum.push(`./supplemental-ui/**/*`)
  return accum
}, [])

function generate(done) {
    require('./generate-api-reference.js')
    generator(antoraArgs, process.env)
        .then(() => done())
        .catch((err) => {
            console.log(err)
            done()
        })
}

async function serve(done) {
    connect.server(serverConfig, function () {
        this.server.on('close', done)
        watch(watchPatterns, series(generate, validate_shell_scripts, validate_language_changes, validate_links))
        if (livereload) watch(this.root).on('change', (filepath) => src(filepath, { read: false }).pipe(livereload()))
    })
}

async function validate_language_changes() {
    // Report links errors but don't make gulp fail.
    try {
        const { stdout, stderr } = await exec('./tools/validate-language-changes.sh 2>&1')
        console.log(stdout, stderr);
    }
    catch (error) {
        console.log(error.stdout, error.stderr);
        return;
    }
}

async function validate_links() {
    // Report links errors but don't make gulp fail.
    try {
        const { stdout, stderr } = await exec('htmltest 2>&1')
        console.log(stdout, stderr);
    }
    catch (error) {
        console.log(error.stdout, error.stderr);
        return;
    }
}

async function validate_shell_scripts() {
    // Report shellcheck errors but don't make gulp fail.
    try {
        const { stdout, stderr } = await exec('./tools/validate-shell-scripts.sh 2>&1')
        console.log(stdout, stderr);
    }
    catch (error) {
        console.log(error.stdout, error.stderr);
        return;
    }
}

exports.default = series(
    generate,
    serve,
    parallel(validate_language_changes, validate_links, validate_shell_scripts)
);

