#!/bin/bash -e
__DIR__=$(dirname "$0")
PACKAGE_NAME=${1}

# includes
. ${__DIR__}/includes/env.sh

# create tsc lint config file
TMP=.tsconfig-lint.json
cat >${TMP} <<EOF
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "listFiles": false
  },
  "include": [
EOF
for file in "$@"; do
  echo "    \"$file\"," >> ${TMP}
done
cat >>${TMP} <<EOF
    "**/*.d.ts"
  ]
}
EOF

# run tsc lint
${NPM} run tslint:exec > ./node_modules/.tslint.log
TSC_ERROR=`tail -n +5 ./node_modules/.tslint.log`
rm -f ./node_modules/.tslint.log

# remove tsc config file
rm -f ${TMP}

# emit error if exists
if [ "${TSC_ERROR}" != "" ]; then
  echoeol
  echo "${RED}⛔ Typescript complier lint (tsc) checksum failed!${NOCOLOR}"
  echoeol
  echo "${TSC_ERROR}"
  echoeol
  exit 1
fi
