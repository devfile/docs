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

# Detect available runner
if command -v podman > /dev/null
  then RUNNER=podman
elif command -v docker > /dev/null
  then RUNNER=docker
else echo "No installation of podman or docker found in the PATH" ; exit 1
fi

# Fail on errors
set -e

if [ -z "$IMAGE" ]
then
  IMAGE="quay.io/antoraformodulardocs/antora-for-modular-docs:main"
  echo "Pulling $IMAGE. To use a different container image, set the IMAGE environment variable"
  ${RUNNER} pull -q ${IMAGE}
fi

# Display commands
set -x

${RUNNER} run --rm -ti \
  --name "${PWD##*/}" \
  -v "$PWD:/projects:z" -w /projects \
  --entrypoint="./tools/preview.sh" \
  -p 4000:4000 -p 35729:35729 \
  "${IMAGE}"
