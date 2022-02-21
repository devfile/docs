#!/bin/sh
#
# Copyright (c) 2021 Red Hat, Inc.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
#
# SPDX-License-Identifier: Apache-2.0
#

# Fail on errors
set -e
# Enable user to delete created files afterwards
umask 002
# Build API reference
yarn install
yarn run generate-api-reference
# Get Vale styles
./tools/get-vale-styles.sh
# Build Antora website
LIVERELOAD=true gulp
