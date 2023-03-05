const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04dd219aaef6135ccb65aa3bae0934c3b3779a17402a14547c95701bce523cc9e58dd3b8de295279f9f45dcce9a1c0ddda7099f283f237b2d9f46e763ff71015fb": 100,
  "04a7c6bbb8336c8bbc4eaa603f540173dd968e66b609b32283171bd13b0e814198b975a6793bd02daa23cf9fa3f46575a9a62489990532c1aae62469cdc6cd60a9": 50,
  "04c7d07373f32e39989c28d3b9a097885bbf8bc22fa59fa525d2c6522c5b18a58d26961c4eca45bf5f8d28e74960faf9e7d603b9cd517f08764580b9cc8519381a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {


  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
