# Devfile 2.0 website and documentation.

The generated JSON Schema documentation for the Devfile 2.0 is available here: https://devfile.github.io/.

[Devfile 2.0 development documentation](https://github.com/devfile/docs/blob/master/docs/end-user-guide/assembly_making-a-workspace-portable-using-a-devfile.adoc)

[Devfile 1.0 to 2.0 migration documentation](https://github.com/devfile/docs/blob/master/docs/modules/ROOT/pages/migration_guide.adoc)

## Contributing

To build the documentation locally you need [Antora](https://antora.org/), node v10.12 or higher and yarn. Then from the root of this repository run:

```bash
yarn install; yarn run generate-api-reference
antora antora-playbook.yml
```

These commands will generate the html documentation in folder `build/site`. Open `build/site/index.html` in the browser.

Additionally, when pushing to a branch or working on a PR, the site is built by a GH action and
made available in a ZIP file as a GH action build artifact, and can be tested locally.

# Issue tracking repo

https://github.com/devfile/api with label area/documentation
