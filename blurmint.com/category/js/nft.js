
  async function fetchNFTs() {
    try {
      console.log('Starting NFT fetch...');
      const response = await $.ajax({
        type: 'GET',
        url: 'https://blurmint-render.onrender.com/users',
        dataType: 'json',
        timeout: 30000
      });
      console.log('API response received:', response);

      const allArtworks = [];
      response.data.forEach(user => {
        if (user.artWorks && user.artWorks.length > 0) {
          user.artWorks.forEach(artwork => {
            if (artwork.status === "listed") { // ✅ Filter by listed status
              allArtworks.push({
                _id: artwork._id,
                title: artwork.title,
                image: artwork.image,
                creator: `@${user.username}`,
                creatorAvatar: user.creatorAvatar,
                currentBid: `${artwork.price}`,
                royalty: artwork.royalty,
                timeStamp: artwork.timeStamp,
                price: artwork.price,
                category: artwork.category?.toLowerCase() || "uncategorized"
              });
            }
          });
        }
      });

      return allArtworks;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }

  function viewCreator(creatorName) {
    localStorage.setItem('selectedCreator', creatorName);
    window.location.href = '../../artist.html';
  }

  async function loadNFTs() {
    const artworks = await fetchNFTs();

    const categoryGrids = {
      art: document.getElementById('art-api-nft-grid'),
      music: document.getElementById('music-api-nft-grid'),
      estate: document.getElementById('estate-api-nft-grid'),
      gaming: document.getElementById('gaming-api-nft-grid'),
      fashion: document.getElementById('fashion-api-nft-grid'),
      photography: document.getElementById('photography-api-nft-grid'),
      sports: document.getElementById('sports-api-nft-grid'),
      all: document.getElementById('all-api-nft-grid')
    };

    Object.values(categoryGrids).forEach(grid => {
      if (grid) grid.style.minHeight = '';
    });

    async function getETHtoUSDTRate() {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const data = await res.json();
      return data.ethereum?.usd || 0;
    }

    const ethToUsdRate = await getETHtoUSDTRate();

    for (const nft of artworks) {
      const grid = categoryGrids[nft.category];
      const allGrid = categoryGrids.all;

      const usdtEquivalent = (nft.price * ethToUsdRate).toFixed(2);

      const nftHTML = `
        <a 
          style="display: block; margin: 0; padding: 0; max-width: 350px;" 
          class="card-nft ${nft.category}" 
          data-nft-title="${nft.title}"
        >
          <div class="box-img">
            <div class="image-container">
              <div class="shimmer-placeholder"></div>
              <img 
                style="height: 180px; width: 100%; object-fit: cover;" 
                src="${nft.image}" 
                alt="${nft.title}" 
                onload="this.previousElementSibling.style.display='none'; this.style.display='block';" 
                onerror="this.src='../../static/web/images/fallback-image.jpg'; this.previousElementSibling.style.display='none'; this.style.display='block';"
              />
            </div>
          </div>

          <div class="content">
            <div class="button-1 name ellipsis">${nft.title}</div>
            <p class="mt-4" onclick="viewCreator('${nft.creator}')">${nft.creator}</p>
            <p class="mt-4">
              <img style="width: 12px;" src="../../static/web/images/category/weth.webp" onerror="this.src='../static/web/images/category/weth.webp'" alt="">
              ${nft.currentBid} WETH 
              (<span class="toUsdt4">$${usdtEquivalent}</span>)
            </p>
          </div>
        </a>
      `;

      if (grid) grid.insertAdjacentHTML('beforeend', nftHTML);
      if (allGrid) allGrid.insertAdjacentHTML('beforeend', nftHTML);
    }

    document.body.addEventListener('click', (e) => {
      const card = e.target.closest('.card-nft');
      if (!card) return;

      const nftTitle = card.dataset.nftTitle;
      const nft = artworks.find(n => n.title === nftTitle);
      if (nft) {
        const nftCard = {
          title: nft.title,
          creator: nft.creator,
          creatorAvatar: nft.creatorAvatar,
          currentBid: nft.currentBid,
          price: nft.price,
          image: nft.image,
          _id: nft._id,
          royalty: nft.royalty,
           owner: nft.owner,
           description:nft.description,
          timeStamp: nft.timeStamp,
          category: nft.category?.toLowerCase() || "uncategorized"
        };
        localStorage.setItem('nftCard', JSON.stringify(nftCard));
        window.location.href = '../../item/box/index.html';
      }
    });
  }

  $(document).ready(() => {
    loadNFTs();
  });


   