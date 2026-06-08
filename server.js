import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/quote", async (req, res) => {

  try {

    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/0050.TW"
    );

    const data = await response.json();

    const result = data.chart.result[0];

    res.json({
      symbol: "0050.TW",
      price: result.meta.regularMarketPrice,
      previousClose: result.meta.previousClose,
      time: result.meta.regularMarketTime
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});