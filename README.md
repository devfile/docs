# Devfile 2.0 website and documentation.

The generated JSON Schema documentation for the Devfile 2.0 is available here: https://devfile.github.io/.

[Devfile 2.0 development documentation](https://github.com/devfile/devfile.github.io/blob/master/docs/end-user-guide/assembly_making-a-workspace-portable-using-a-devfile.adoc)

[Devfile 1.0 to 2.0 migration documentation](https://github.com/devfile.github.io/blob/master/migration_howto.md)

## Contributing

To build the documentation locally you need [Antora](https://antora.org/). Then from the root of this repository run

```bash
antora antora-playbook.yml
```

This command will generate the html documentation in folder `build/sidte`. Open `build/site/index.html` in the browser.
