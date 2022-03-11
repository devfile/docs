# Devfile 2.0 website and documentation

The generated JSON Schema documentation for the Devfile 2.x is available here: https://devfile.github.io/.

[Devfile 2.0 documentation](https://github.com/devfile/docs/blob/v2.0.x/docs/modules/user-guide/nav.adoc)

[Devfile 2.1 development documentation](https://github.com/devfile/docs/blob/master/docs/modules/user-guide/nav.adoc)

## Contributing

The repository has many versions of the documentation. Therefore, be sure to change and test the version of the documentation for your contribution.

- For the newest version, use the `master` branch.
- For a earlier version, use the `v<n>.<m>.x` branch where `n` is the major version of the release, and `m` is the minor version. For example, `v2.0.x`.
- Be sure when merging any changes for a earlier release to merge into the correct branch and not `master`.

Build is the same for each branch. 

### Building and testing the documentation on a local environment

On a local environment, use the same container and tools that all GitHub workflows use to:

1. Generate the API reference HTML single-sourced from the API repository.
2. Generate the static Antora website in the `build` directory (including all in `v2.*` branches).
3. Start a preview server listening on http://0.0.0.0:4000.
3. Validate the language on changed files.
4. Validate the internal and external links.
5. Validate the shell scripts.

#### Prerequisites

* The Podman or Docker tool is available.

#### Procedure

1. From the root of this repository, run:

```bash
$ git fetch --all
$ ./tools/runnerpreview.sh
```

2. Watch the output for alert messages about language usage, broken links or errors in shell scripts. 

3. Browse the results in the preview server on http://0.0.0.0:4000.

### Testing the content of a pull request

* Navigate the preview links visible in the pull requests comment.

# Issue tracking repository

https://github.com/devfile/api with label `area/documentation`.

# Release process

Each release, create a Git release, tag, and branch. The tag marks the initial release documentation.
The publication uses the branch. Add post release updates to the branch. Further release work continues on the `master` branch.
To enable this, follow the following release process:

## Creating a release branch

Create a branch specific to the release version. For example, if the release version is 2.0.0:

1. Prior to this process, update the API repository to copy a final version of the schema to a directory for that version. For example:
   `docs/modules/user-guide/attachments/jsonschemas/2.0.0/devfile.json`
1. Create the branch for the tag:
   ```bash
   git fetch --all
   git checkout -b v2.0.x v2.0.0`
   ```
1. Edit the `docs/antora.yaml` file to set `prod-ver`, `version`, and `prerelease`: 
   1. For example if release is 2.0.0
      ```yaml
      asciidoc:
        attributes:
          prod-ver: 2.0
      # [...]
      version: '2.0.0'
      prerelease: false
      ```
1. Edit the `.gitignore` file to ignore the API reference files generated from the schema that are not for the release:
   ```
   docs/modules/user-guide/attachments/api-reference/next
   docs/modules/user-guide/attachments/api-reference/stable
   docs/modules/user-guide/examples/api-reference/next
   docs/modules/user-guide/examples/api-reference/stable
   ```
1. Edit the `docs/modules/user-guide/partials/ref_api-reference.adoc` file to pull the iframe and link from the newly generated directories.

   ````
   // [...]
    ++++
    <iframe src="./_attachments/api-reference/2.0.0/index.html" style="border:none;width: 100%;min-height:50em;height:-webkit-fill-available;"></iframe>
    ++++

    .Additional resources

    * link:{attachmentsdir}/jsonschemas/2.0.0/devfile.json[Download the current JSON Schema]```
   ````

1. Build the docs and verify all looks good.
1. Add the changes, commit the branch and push directly to the docs repo. (There is no merge required for this branch).

## Changes to the master branch

Now the master branch can be updated for the next release and to link the previous release docs
from the newly created `v.2.0.x` branch.

1. Modify 'docs/antora.yaml' to set the correct `version` and `prod-ver`. For example:
   ```yaml
   asciidoc:
     attributes:
       prod-ver: 2.2
   #[...]
   version: '2.2.0'
   ```

1. Build, test, commit and merge the changes


## Publication

The `.github/workflows/publication-builder.yml` worklow:

1. Builds the Antora website.
2. Commits the artifact to the `publication` branch.
3. Requests a build in the `devfile/landing-page` repository that publishes the content of the `publication` branch to the live website.

The `.github/workflows/call-publication-builder.yml` workflow calls the `publication-builder.yml` workflow on push on any release branch (`master` or `v*`).
