'use strict'

const { Bootprint } = require('bootprint/index')
const bootprintJsonSchema = require('bootprint-json-schema')
const bootprintConfig = require('./reference-generator/config.js')
const glob = require('glob-fs')();
const fs = require('fs');

fs.readdir('./docs/modules/ROOT/attachments/jsonschemas/', (err, files) => {
    if (err) throw err;
    files.forEach((version) => {
        var schemas = glob.readdirSync('./docs/modules/ROOT/attachments/jsonschemas/' + version + '/index*.json');
        if (! schemas.empty) {
            var schemaPath = schemas[0]
            var apiReferencePath = './docs/modules/ROOT/attachments/registry-index-schema/' + version + '/'
            console.log("Generating registry index schema:\n  - from schema: " + schemaPath + '\n  - to folder: ' + apiReferencePath)
            new Bootprint(bootprintJsonSchema, bootprintConfig)
            .run(schemaPath, apiReferencePath)
            .then((result) => {
                try {
                    fs.mkdirSync(`./docs/modules/ROOT/examples/registry-index-schema/${version}/`, { recursive: true })    
                } catch(e) { console.error(e)}
                fs.writeFileSync(
                    `./docs/modules/ROOT/examples/registry-index-schema/${version}/body.html`,
                    `
                    <a href="_attachments/jsonschemas/${version}/index.json">Download current the JSON Schema</a>
                    <iframe src="_attachments/registry-index-schema/${version}/index.html" style="border:none;width: 100%;min-height:50em;height:-webkit-fill-available;"></iframe>
                    `)
            }
            , (err) => {
                throw err
            })
        }
    });
});