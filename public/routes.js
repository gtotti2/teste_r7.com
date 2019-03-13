var appRouter = function (app) {

  var fs = require('fs');  

  app.get("/data", function (req, res) {
    var data = JSON.parse(fs.readFileSync('./public/fazenda.json', 'utf8'));
    res.status(200).send(data);
  });

}

module.exports = appRouter;