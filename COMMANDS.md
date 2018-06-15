`heroku create pern-template-test`
`heroku addons:create heroku-postgresql:hobby-dev --name=pern-template-test-db`
`heroku addons:attach pern-template-test-db --app=pern-template-test`
`git push heroku master`
`heroku ps:scale web=1`
`heroku open`
`heroku logs --tail`
