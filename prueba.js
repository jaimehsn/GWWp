module.exports = async () => {
  const Tweet = require("./app/models/Tweet");

  const errHandler = (err) => {
    console.error("Error: ", err);
  };

  const tweet = await Tweet.create({
    content: "Esto es un tweet de prueba",
  }).catch(errHandler);

  const tweets = await Tweet.findAll().catch(errHandler);

  console.log("resultado", tweets);
};
