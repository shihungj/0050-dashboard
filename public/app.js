const HIGH_PRICE = 107.8;

async function loadQuote() {

  try {

    const res = await fetch("/api/quote");
    const data = await res.json();

    const price = Number(data.price);

    document.getElementById(
      "price"
    ).innerHTML =
      `<div class="price">${price.toFixed(2)} 元</div>`;

    const drawdown =
      ((price - HIGH_PRICE) / HIGH_PRICE * 100);

    document.getElementById(
      "drawdown"
    ).innerHTML =
      `距高點 ${drawdown.toFixed(2)}%`;

    const updateTime =
      new Date(data.time * 1000);

    document.getElementById(
      "updateTime"
    ).innerHTML =
      `更新時間：${updateTime.toLocaleString("zh-TW")}`;

    let zone = "";
    let action = "";

    if(price >= 102.4){
      zone="觀察區";
      action="定期定額";
    }
    else if(price >= 97){
      zone="第一加碼區";
      action="加碼5000元";
    }
    else if(price >= 91.6){
      zone="第二加碼區";
      action="加碼5000元";
    }
    else if(price >= 86.2){
      zone="第三加碼區";
      action="加碼5000元";
    }
    else if(price >= 80.9){
      zone="第四加碼區";
      action="加碼5000元";
    }
    else if(price >= 75.5){
      zone="第五加碼區";
      action="加碼5000元";
    }
    else{
      zone="歷史級機會區";
      action="加碼5000元";
    }

    document.getElementById(
      "decision"
    ).innerHTML =
      `<div class="decision">
        ${zone}<br>
        ${action}
      </div>`;

    document
      .querySelectorAll(
        "#decisionTable tbody tr"
      )
      .forEach(row => {

        row.classList.remove(
          "highlight"
        );

        const min =
          parseFloat(row.dataset.min);

        const max =
          parseFloat(row.dataset.max);

        if(
          price >= min &&
          price < max
        ){
          row.classList.add(
            "highlight"
          );
        }

      });

  }
  catch(error){

    console.error(error);

    document.getElementById(
      "price"
    ).innerHTML =
      "取得資料失敗";

  }

}

loadQuote();

setInterval(
  loadQuote,
  60000
);