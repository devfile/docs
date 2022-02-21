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

umask 002

# Get fresh Vale styles

wget -q --timestamping -O".vale.ini" https://raw.githubusercontent.com/redhat-documentation/vale-at-red-hat/main/.vale-for-github-action.ini
mkdir -p .github/styles
cd .github/styles || exit
rm -rf RedHat CheDocs 
wget -q --timestamping https://github.com/redhat-documentation/vale-at-red-hat/releases/latest/download/RedHat.zip
unzip -q RedHat.zip
