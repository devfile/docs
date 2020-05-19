# Devfile v2 Migration Guide

This guide explains how to migrate an existing v1.0 devfile to v2.0.

## How to migrate projects

There are NO major changes in the `projects` section of the devfile. A project specified in a v1.0 devfile will work as it is in a devfile v2.0. 

### starterProjects and projects description

```yaml
v2.0
-----
starterProjects:
  - name: "kafka-project"
    description: "Use this app to get a nodejs application for working with kafka"
  - name: "simple-project"
    description: "Use this app to get a simple "hello world" nodejs application"
```

Details can be found in the corresponding issue https://github.com/che-incubator/devworkspace-api/issues/42.

## How to migrate components

There ARE major changes in the `components` section of the devfile. A component specified in a v1.0 devfile will NOT work as it is in a devfile v2.0. 

## How to migrate plugins

There ARE major changes about the definition of plugins in a devfile. Plugins are now specified using a devfile. A plugin specified in a v1.0 meta.yaml will NOT work as it is in a devfile v2.0. 

## How to migrate commands

There ARE major changes in the `commands` section of the devfile. A command specified in a v1.0 devfile will NOT work as it is in a devfile v2.0. 

## Consider splitting the devfile

One of the major changes in the 2.0.0 specification is the addition of the concept of parent. That allows refering a devfile (the parent) from a distinct devfile and makes it possible to reuse in multiple devfiles the same parent (the stack).

```yaml
# v2.0
---
schemaVersion: 2.0.0
metadata:
  name: nodejs-app
parent:
    uri: https://(...)/nodejs/devfile.yaml # <--- Parent referenced by `uri`, registry `id`
                                           #      or `kubernetes` devworkspace
  components:                              # <--- Parent configuration can be customized
    - container:
         name: vsx-installer
         env:
            - name: VSX_LIST
               value: java-dbg.vsix,java.vsix
components:                               # <--- components are added to parent's components
  - container:
      name: tooling                       # <--- should not match the name of a parent component
      image: busybox
commands:                                 # <--- commands are added to parent's commands
   (...)
```

Details are in the corresponding issue: https://github.com/che-incubator/devworkspace-api/issues/25

## Adding event bindings

There is a new root element in the devfile 2.0: events: 

```yaml
# v2.0
---
components:
  - container:
      name: "copier"
      image: ''
  - container:
      name: "maven"
      image: ''
  - plugin:
      id: theia
Commands:
containerBuild:
reference: 
composite:
 
  - exec:
      name: "copyNeededFiles"
      component: "copier"
      commandLine: "cp somefile"
  - exec:
      name: "buildAll"
      component: "maven"
      commandLine: "mvn ..."
  - vsCodeTask:
      name: "openFile"
      component: "theia"
events:
  preStart:
    - "copyNeededFiles"
  postStart:
    - "buildAll"
    - "openFile"
```

Details are in the corresponding issue: https://github.com/che-incubator/devworkspace-api/issues/32

## Adding metadata



