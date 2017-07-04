#!/usr/bin/env bash
git submodule init
git submodule update
cd backend
npm run install
cd ../frontend
npm run install
