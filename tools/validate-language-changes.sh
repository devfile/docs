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
set -e

if [ -z "${GITHUB_BASE_REF}" ]
    then 
        MAINBRANCH="origin/master"
    else
        MAINBRANCH="origin/$GITHUB_BASE_REF"
fi
FILES=$(git diff --name-only --diff-filter=AM "$MAINBRANCH")
if [ -n "${FILES}" ]
    then
        echo "Validating languages on file added or modified in comparison to $MAINBRANCH with $(vale -v)"
        set -x
        # shellcheck disable=SC2086 # We want to split on spaces
        vale ${FILES}
    else
        echo "No files added or modified in comparison to $MAINBRANCH"
fi
