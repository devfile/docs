# Devfile 2.0 website and documentation.

The generated JSON Schema documentation for the Devfile 2.x is available here: https://devfile.github.io/.

[Devfile 2.0 documentation](https://github.com/devfile/docs/blob/v2.0.x/docs/modules/user-guide/nav.adoc)

[Devfile 2.1 development documentation](https://github.com/devfile/docs/blob/master/docs/modules/user-guide/nav.adoc)

## Contributing

The repository contains multiple versions of the documentation, so be sure to modify and test the version of the documentation for your contribution.
* For the latest version, use the master branch.
* For a previous version, use the ```v<n>.<m>.x``` branch where `n` is the major version of the release, and `m` is the minor version. For example, ```v2.0.x```.
   * Be sure when merging any changes for a previous release to merge into the correct branch and not master.

Build is the same for each branch. To build the documentation locally, you need [Antora](https://antora.org/), node v10.12 or higher, and yarn. Then from the root of this repository, run:

```bash
yarn install; yarn run generate-api-reference
antora antora-playbook.yml
```

These commands generate the html documentation in folder `build/site`. Open `build/site/index.html` in the browser. However, note that the build 
may build multiple versions of the documentation, so be sure to select and view the version you are editing when viewing in the browser.

Additionally, when pushing to a branch or working on a PR, the site is built by a GH action and
made available in a ZIP file as a GH action build artifact and can be tested locally.


# Issue tracking repo

https://github.com/devfile/api with label area/documentation

# Release process

Each release a new git release, tag and branch will be created. The tag marks the initial release documentation 
and the branch is used for any post release updates. Next release work then continues on the master branch. 
To enable this the following release process must be followed:

## Changes for the new release branch

Set the new branch to be specific to the release version. For example, if the release version is 2.0.0:

1. Prior to this process the api repo is updated to copy a final version of the schema to a directory for that version. For example:
   `docs/modules/user-guide/attachments/jsonschemas/2.0.0/devfile.json
1. Create the new branch for the tag: 
   ```git fetch --all```
   ```git checkout -b v2.0.x v2.0.0``` 
1. Modify `docs/antora.yaml`:
   1. Set the correct title and version.
   1. Remove the pre-release attribute.
   1. Set `.asciidoc .attributes .prod-ver` for the release
   1. For example if release is 2.0.0
      ```
      name: devfile
      nav: 
        - modules/user-guide/nav.adoc
      start_page: user-guide:index.adoc
      title: Devfile User Guide v2.0.0
      version: '2.0.0'
      asciidoc:
        attributes:
          prod-ver: 2.0
      ```
1. Modify .gitignore to ignore the doc generated from the schema which are not for the release:
      ```
      docs/modules/user-guide/attachments/api-reference/next
      docs/modules/user-guide/attachments/api-reference/stable
      docs/modules/user-guide/examples/api-reference/next
      docs/modules/user-guide/examples/api-reference/stable
      ```
1. Modify ```docs/modules/user-guide/partials/ref_api-reference.adoc``` to pull the iframe and link from the newly generated directories.
   ```
   [id="ref_api-reference_{context}"]
    = API Reference

    This section describes the devfile API.

    ++++
    <iframe src="./_attachments/api-reference/2.0.0/index.html" style="border:none;width: 100%;min-height:50em;height:-webkit-fill-available;"></iframe>
    ++++

    .Additional resources

    * link:{attachmentsdir}/jsonschemas/2.0.0/devfile.json[Download the current JSON Schema]```
    ```
1. Build the docs and verify all looks good.
1. Add the changes, commit the branch and push directly to the docs repo. (There is no merge required for this branch). 
    
## Changes to the master branch

Now the master branch can be updated for the next release and to link the previous release docs 
from the newly created ```v.2.0.x``` branch.

1. Modify 'docs/antora.yaml' to set the correct title,version,pre-release and prod-ver. For example:
   ```
   asciidoc:
      attributes:
        prod-ver: 2.1
   name: devfile
   nav:
     - modules/user-guide/nav.adoc
   start_page: user-guide:index.adoc
   title: Devfile User Guide 2.1.0
   version: '2.1.0'
   prerelease: -alpha
   ```
1. Modify `antora-playbook.yaml` to add content for the new release created (if not already covered by branch pattern ```v2.*```:
   ```
   content:
     sources:
       - branches: HEAD
         start_path: docs
         url: ./
       - branches: [v2.*]
         start_path: docs
         url: https://github.com/devfile/docs
   ```
   Note: pulling the release branches from github rather than locally is required for the docs build workflow. 
1. Build, test, commit and merge the changes     
   
   

    
