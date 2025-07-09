
function processCSV() {
  const files = document.getElementById('csvFile').files;
  if (!files.length) return alert('Please upload at least one CSV file');

  let totalBuy = 0, totalSell = 0, totalTDS = 0, totalFee = 0;
  let readerCount = 0;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const lines = e.target.result.split('\n').slice(1);
      for (let line of lines) {
        const cols = line.split(',');
        const type = cols[2]?.trim().toUpperCase();
        const amount = parseFloat(cols[5]) || 0;
        const fee = parseFloat(cols[6]) || 0;
        const tds = parseFloat(cols[7]) || 0;

        if (type === 'BUY') totalBuy += amount;
        if (type === 'SELL') totalSell += amount;
        totalFee += fee;
        totalTDS += tds;
      }
      readerCount++;
      if (readerCount === files.length) {
        const profit = totalSell - totalBuy;
        const tax = profit > 0 ? profit * 0.30 : 0;
        document.getElementById('output').innerHTML = `
          <p><strong>Total Buy:</strong> ₹${totalBuy.toFixed(2)}</p>
          <p><strong>Total Sell:</strong> ₹${totalSell.toFixed(2)}</p>
          <p><strongProfit:</strong> ₹${profit.toFixed(2)}</p>
          <p><strongTax (30%):</strong> ₹${tax.toFixed(2)}</p>
          <p><strongTDS:</strong> ₹${totalTDS.toFixed(2)}</p>
          <p><strongFees:</strong> ₹${totalFee.toFixed(2)}</p>`;
      }
    };
    reader.readAsText(file);
  }
}
