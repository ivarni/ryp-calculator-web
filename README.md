# ryp-calculator-web

Web calculator using Redux store, actions and reducers from [ryp-calculator](https://github.com/ivarni/ryp-calculator).

## SSL
* [Heroku SSL](https://devcenter.heroku.com/articles/ssl-beta#enable-the-labs-flag-and-install-the-heroku-certs-plugin)
* Use CloudFlare DNS and letsencrypt

```bash
git clone https://github.com/dmathieu/sabayon.git
cd sabyayon
heroku create letsencrypt-app-for-ryp
git push heroku
heroku config:set ACME_APP_NAME=ryp -a letsencrypt-app-for-ryp
heroku config:set ACME_DOMAIN="ryp.nilsen.solutions" -a letsencryp-app-for-ryp
heroku config:set ACME_DOMAIN="ryp.nilsen.solutions" -a letsencrypt-app-for-ryp
heroku config:set ACME_EMAIL="..." -a letsencrypt-app-for-ryp
heroku authorizations:create -d "ryp-heroku"
heroku config:set HEROKU_TOKEN="...." -a letsencrypt-app-for-ryp
heroku addons:create scheduler:standard
heroku run bin/sabayon -a letsencrypt-app-for-ryp
```

https://github.com/dmathieu/sabayon#configuring-your-primary-application
