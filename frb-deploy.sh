yarn build
echo "copiando assets"
cp -rf ./assets/* ./dist/assets
echo "Creando archivo .htaccess"
cp ./.htaccess ./dist
sudo chmod 775 -R ./dist
echo "Subiendo"
rsync -a ./dist/* latinoseguidor@deploy.us1.frbit.com:/srv/app/latinoseguidor/htdocs