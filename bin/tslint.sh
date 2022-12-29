#!/bin/bash -e
__ROOT_DIR__="$(cd "$(dirname "$0" | xargs dirname)"; pwd -P)"
__WORK_DIR__="$(pwd)"
__TMP_DIR__="${__ROOT_DIR__}/node_modules/.tmp"

mkdir -p "${__TMP_DIR__}"

# includes
. "${__ROOT_DIR__}/bin/includes/env.sh"

# create tsc lint config file
TSC_TSCONFIG_FILE="${__WORK_DIR__}/.tsconfig-lint.json"
cat > "${TSC_TSCONFIG_FILE}" <<EOF
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "listFiles": false
  },
  "include": [
EOF
for file in "$@"; do
  echo "    \"$file\"," >> "${TSC_TSCONFIG_FILE}"
done
cat >> "${TSC_TSCONFIG_FILE}" <<EOF
    "**/*.d.ts"
  ]
}
EOF

# run tsc lint
TSC_LOG_FILE="${__TMP_DIR__}/.tslint.log"
${NPM} run tslint:exec > "${TSC_LOG_FILE}"
ERROR_CODE="$?"
TSC_ERROR=$(tail "${TSC_LOG_FILE}")
rm -f "${TSC_LOG_FILE}"

# remove tsc config file
rm -f "${TSC_TSCONFIG_FILE}"

# emit error if exists
if [ "${ERROR_CODE}" != "0" ] && [ "${TSC_ERROR}" != "" ]; then
  echoeol
  echo "${RED}⛔ Typescript complier lint (tsc) checksum failed! (EXIT_CODE:${ERROR_CODE})${NOCOLOR}"
  echoeol
  echo "${TSC_ERROR}"
  echoeol
  exit 1
fi
