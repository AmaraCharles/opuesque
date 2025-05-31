const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nftDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error', err));

// User Schema
const artworkSchema = new mongoose.Schema({
    transactionId: String,
    title: String,
    description: String,
    price: String,
    from: String,
    category: String,
    status: String,
    views: Number,
    collection: String,
    imgUrl: String
});

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    artWorks: [artworkSchema]
});

const User = mongoose.model('User', userSchema);

// Fetch Artwork by User ID and Transaction ID
router.get('/users/art/:_id/:transactionId', async (req, res) => {
    const { _id, transactionId } = req.params;
    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const artwork = user.artWorks.find(item => item.transactionId === transactionId);
        if (!artwork) return res.status(404).json({ success: false, message: 'Artwork not found' });

        res.status(200).json({ success: true, data: artwork });
    } catch (error) {
        console.error('Error fetching artwork:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update Artwork Details
app.put('/users/art/:_id/:transactionId', async (req, res) => {
    const { _id, transactionId } = req.params;
    const { from, title, price, imgUrl, category, collection, views, description, status } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const artwork = user.artWorks.find(item => item.transactionId === transactionId);
        if (!artwork) return res.status(404).json({ success: false, message: 'Artwork not found' });

        // Update artwork details
        artwork.from = from;
        artwork.title = title;
        artwork.price = price;
        artwork.imgUrl = imgUrl;
        artwork.category = category;
        artwork.collection = collection;
        artwork.views = views;
        artwork.description = description;
        artwork.status = status;

        await user.save();
        res.status(200).json({ success: true, message: 'Artwork updated successfully' });
    } catch (error) {
        console.error('Error updating artwork:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
 async function fetchUsers() {
            $.ajax({
                url: 'https://new-slime.onrender.com/users',
                method: 'GET',
                success: function(data) {
                    const users = Array.isArray(data) ? data : data.data;
                    usersData = users;
                    renderTable();
                    renderPagination();
                },
                error: function() {
                    console.error('Error fetching users');
                }
            });
        }

		const nftInfo=await fetchUsers()

const trendingNFTs=nftInfo[0].artWorks

		//   const trendingNFTs = [
		// 	{
		// 	  title: "Digital Blossom",
		// 	  image: "./images/nftt.jpg",
		// 	  creator: "@art_by_flora",
		// 	  currentBid: "2.04 ETH",
		// 	  description:"plenty",
		// 	  creatorAvatar:"./images/nftt.jpg"
		// 	},
					
		// 	{
		// 	  title: "Cyber City",
		// 	  image: "./images/nftt.jpg",
		// 	  creator: "@tech_vision",
		// 	  currentBid: "4.07 ETH",
		// 		 description:"plenty",
		// 	  creatorAvatar:"./images/nftt.jpg"
		// 	},
		// 	{
		// 	  title: "Dream Portal",
		// 	  image: "./images/nftt.jpg",
		// 	  creator: "@dreamscape",
		// 	  currentBid: "1.00 ETH",
		// 		 description:"plenty",
		// 	  creatorAvatar:"./images/nftt.jpg"
		// 	},
		// 	{
		// 	  title: "AI Galaxy",
		// 	  image: "./images/nftt.jpg",
		// 	  creator: "@neuronova",
		// 	  currentBid: "3.33 ETH",
		// 		 description:"plenty",
		// 	  creatorAvatar:"./images/nftt.jpg"
		// 	},
		// 	{
		// 	  title: "Neon Twilight",
		// 	  image: "./images/nftt.jpg",
		// 	  creator: "@neonqueen",
		// 	  currentBid: "2.75 ETH",
		// 		 description:"plenty",
		// 	  creatorAvatar:"./images/nftt.jpg"
		// 	}
		//   ];
	  
		  function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
			  const j = Math.floor(Math.random() * (i + 1));
			  [array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		  }
	  
		  function renderSwiperNFTs() {
			const wrapper = document.getElementById("nftSwiperWrapper");
			if (!wrapper) return;
	  
			const shuffledNFTs = shuffleArray([...trendingNFTs]);
	  
			wrapper.innerHTML = shuffledNFTs
			  .map((nft, index) => `
				<div class="swiper-slide d-flex justify-content-center">
				  <div class="artwork-card" onclick="handleCardClick(${index})">
					<img src="${nft.image}" alt="${nft.title}">
					<div class="artwork-info">
					  <h4>${nft.title}</h4>
					  <p class="artist">by ${nft.creator} <img src="./images/verify.png" style="width:15px;height:15px" /></p>
					  <div class="price">${nft.currentBid}</div>
					</div>
				  </div>
				</div>
			  `).join("");
	  
			new Swiper(".swiper-container", {
			  slidesPerView: 3,
			  spaceBetween: 30,
			  loop: true,
			  autoplay: {
				delay: 3000,
				disableOnInteraction: false
			  },
			  navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			  },
			  breakpoints: {
				0: { slidesPerView: 1.1, spaceBetween: 20 },
				576: { slidesPerView: 1.5, spaceBetween: 20 },
				768: { slidesPerView: 2, spaceBetween: 25 },
				992: { slidesPerView: 3, spaceBetween: 30 }
			  }
			});
		  }
	  
		  function handleCardClick(index) {
			const selectedNFT = trendingNFTs[index];
			console.log("Selected NFT:", selectedNFT);
			localStorage.setItem("nftCard", JSON.stringify(selectedNFT));
			window.location.href = "product-card.html";
		  }
	  
		  document.addEventListener("DOMContentLoaded", renderSwiperNFTs);