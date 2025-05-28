async function fetchNFTs() {
        try {
            console.log('Starting NFT fetch...');
            const response = await $.ajax({
                type: 'GET',
                url: 'https://new-slime.onrender.com/users',
                dataType: 'json',
                timeout: 30000
            });
            console.log('API response received:', response);

            const allArtworks = [];
            response.data.forEach(user => {
                if (user.artWorks && user.artWorks.length > 0) {
                    user.artWorks.forEach(artwork => {
                        allArtworks.push({
                            _id: artwork._id,
                            title: artwork.title,
                            image: artwork.image,
                            creator: `@${user.username}`,
                            creatorAvatar: user.creatorAvatar,
                            currentBid: `${artwork.price} ETH`,
                            category: artwork.category?.toLowerCase() || "uncategorized"
                        });
                    });
                }
            });

            return allArtworks;
        } catch (error) {
            console.error('Error fetching NFTs:', error);
            return [];
        }
    }

   async function loadNFTs() {
    const artworks = await fetchNFTs();

    // Map category names to grid container IDs
    const categoryGrids = {
        art: document.getElementById('art-api-nft-grid'),
        music: document.getElementById('music-api-nft-grid'),
        estate: document.getElementById('estate-api-nft-grid'),
        gaming: document.getElementById('gaming-api-nft-grid'),
        fashion: document.getElementById('fashion-api-nft-grid'),
        photography: document.getElementById('photography-api-nft-grid'),
        sports: document.getElementById('sports-api-nft-grid')
    };

    // Set min height for all category grids
    Object.values(categoryGrids).forEach(grid => {
        if (grid) grid.style.minHeight = '800px';
    });

    // Render each NFT card into its respective category grid
    artworks.forEach(nft => {
        const grid = categoryGrids[nft.category];
        if (!grid) return; // Skip unknown categories

        const nftHTML = `
            <a 
                style="margin-right:0px;padding:0px;max-width: 350px;" 
                class="card-nft ${nft.category}" 
                data-nft-title="${nft.title}"
            >
                <div class="box-img">
                    <div class="image-container">
                        <div class="shimmer-placeholder"></div>
                        <img 
                            style="height: 180px; object-fit: cover;" 
                            src="${nft.image}" 
                            alt="..." 
                            onload="this.previousElementSibling.style.display='none'; this.style.display='block';" 
                            onerror="this.src='../../static/web/images/fallback-image.jpg'; this.previousElementSibling.style.display='none'; this.style.display='block';"
                        />
                    </div>
                </div>

                <div class="content">
                    <div class="button-1 name ellipsis">${nft.title}</div>
                    <p class="mt-4">${nft.creator}</p>
                    <p class="mt-4">
                        <img style="width: 12px;" class="lazyload" data-src="../../static/web/images/category/weth.webp" alt="">
                        ${nft.currentBid}
                        (<span class="toUsdt" data-eth="4.00"></span>)
                    </p>
                </div>
            </a>
        `;

        grid.innerHTML += nftHTML;
    });

    // Attach click listeners to each NFT card
    document.querySelectorAll('.card-nft').forEach(card => {
        card.addEventListener('click', () => {
            const nftTitle = card.dataset.nftTitle;
            const nft = artworks.find(n => n.title === nftTitle);
            if (nft) {
                const nftCard = {
                    title: nft.title,
                    creator: nft.creator,
                    creatorAvatar: nft.creatorAvatar,
                    currentBid: nft.currentBid,
                    image: nft.image,
                    _id: nft._id
                };
                localStorage.setItem('nftCard', JSON.stringify(nftCard));
                window.location.href = '../../item/box/index.html';
            }
        });
    });
}

// Call this after document is ready
$(document).ready(() => {
    loadNFTs();
});

   