rm -rf pages/
mkdir -p pages/
cd app-reloader
npm i
npm run build
mv dist ../pages/app-reloader
cd ../embed-sense-visualizations
npm i
npm run build
mv dist ../pages/embed
