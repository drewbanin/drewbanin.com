#!/bin/bash

SUBDIR='losing-my-data'

PUBLIC_URL="/${SUBDIR}" npm run build
scp -r build/* drewbani@drewbanin.com:/home/drewbani/public_html/${SUBDIR}/
