deploy:
	jekyll b && rsync -avz _site/* hayres@henryayres.co.uk:/var/www/henryayres/
deps:
	npm install
