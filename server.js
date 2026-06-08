import express from "express";

const app = express();
const PORT = 3000;

// 提供 public 資料夾
app.use(express.static("public"));


// API測試
app.get("/api/quote", async (req, res) => {

  try {

    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/0050.TW"
    );

    if (!response.ok) {
      throw new Error(
        `Yahoo API Error: ${response.status}`
      );
    }

    const data = await response.json();

    console.log(
      "Yahoo Response:",
      JSON.stringify(data, null, 2)
    );

    const result = data.chart?.result?.[0];

    if (!result) {
      throw new Error(
        "Yahoo API returned no result"
      );
    }

    res.json({
      symbol: "0050.TW",
      price: result.meta.regularMarketPrice,
      previousClose: result.meta.previousClose,
      time: result.meta.regularMarketTime
    });

  } catch (error) {

    console.error("API Error:", error);

    res.status(500).json({
      error: error.message
    });

  }

});

// 啟動 Server
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});