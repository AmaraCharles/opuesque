async function getETHPrice() {
    try {
        const response = await fetch('https://data-api.binance.vision/api/v3/ticker/price?symbol=ETHUSDT');
        const data = await response.json();
        return parseFloat(data.price);
    } catch (error) {
        console.error("Error fetching ETH price:", error);
        return null;
    }
}

function formatNumber(number) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function convertETHToUSDT() {
    const ethPrice = await getETHPrice();
    if (ethPrice) {
        document.querySelectorAll('.toUsdt').forEach(span => {
            const ethAmount = parseFloat(span.getAttribute('data-eth')) || 0;
            const usdtValue = ethAmount * ethPrice;
            span.textContent = `$${formatNumber(usdtValue)}`;
        });
    }
}

convertETHToUSDT();