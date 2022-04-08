rm -rf docs/
mkdir -p docs/
cd app-reloader
npm i
npm run build
mv dist ../docs/app-reloader
cd ../embed-sense-visualizations
npm i
npm run build
mv dist ../docs/embed
