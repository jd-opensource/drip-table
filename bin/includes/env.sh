#!/bin/bash

# ----------------------------------
# Colors
# ----------------------------------
if test -t 1; then
  if test -n "$(tput colors)" && test $(tput colors) -ge 8; then
    NOCOLOR="\033[0m"
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    ORANGE="\033[0;33m"
    BLUE="\033[0;34m"
    PURPLE="\033[0;35m"
    CYAN="\033[0;36m"
    LIGHTGRAY="\033[0;37m"
    DARKGRAY="\033[1;30m"
    LIGHTRED="\033[1;31m"
    LIGHTGREEN="\033[1;32m"
    YELLOW="\033[1;33m"
    LIGHTBLUE="\033[1;34m"
    LIGHTPURPLE="\033[1;35m"
    LIGHTCYAN="\033[1;36m"
    WHITE="\033[1;37m"
  fi
fi

# ----------------------------------
# npm or yarn
# ----------------------------------
if [ "${NPM}" = "" ]; then
  NPM='yarn'
  echo "> using ${LIGHTPURPLE}${NPM}${NOCOLOR} as building command tool."
  echo ''
fi

# ----------------------------------
# url encode / decode
# ----------------------------------
urlencode() {
  # urlencode <string>

  old_lc_collate=$LC_COLLATE
  LC_COLLATE=C

  local length="${#1}"
  i=0
  while [ "$i" -lt "${length}" ]; do
    local c="${1:$i:1}"
    case $c in
      [a-zA-Z0-9.~_-]) printf '%s' "$c" ;;
      *) printf '%%%02X' "'$c" ;;
    esac
    i=$(( i + 1 ))
  done

  LC_COLLATE=$old_lc_collate
}

urldecode() {
  # urldecode <string>

  local url_encoded="${1//+/ }"
  printf '%b' "${url_encoded//%/\\x}"
}

# ----------------------------------
# echo
# ----------------------------------
echoeol() {
  echo " "
}

echoline() {
  # echostep <string>
  s="${*}"
  echo "> ${s}"
}

echocmd() {
  # echocmd <string>
  cmd="${*}"
  echo "${LIGHTRED}\$${NOCOLOR} ${cmd}"
  ${cmd} || exit 1
}
