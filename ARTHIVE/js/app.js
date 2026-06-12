// ARTHIVE - Art Gallery Platform JavaScript

class ARTHIVE {
    constructor() {
        this.currentPage = 'home';
        this.artworks = [];
        this.artists = [];
        this.currentUser = null;
        this.init();
        this.createBackgroundElements();
    }

    init() {
        this.setupEventListeners();
        this.loadArtworks();
       // this.loadArtists();
        this.renderFeaturedArtworks();
        this.renderTrendingArtists();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupParticleEffects();
        this.hideLoadingScreen();
    }

    hideLoadingScreen() {
        // Hide loading screen after everything is loaded
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }

    createBackgroundElements() {
        // Create floating background elements
        const bgContainer = document.createElement('div');
        bgContainer.className = 'background-elements';
        
        for (let i = 1; i <= 3; i++) {
            const element = document.createElement('div');
            element.className = `bg-element bg-element-${i}`;
            bgContainer.appendChild(element);
        }
        
        document.body.appendChild(bgContainer);
    }

    setupScrollEffects() {
        // Add scroll-based animations
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const navbar = document.querySelector('.navbar');
            
            if (scrolled > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'var(--glass-bg)';
            }
            
            // Parallax effect for hero section
            const hero = document.querySelector('.hero-background');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    setupParticleEffects() {
        // Create floating particles for aesthetic appeal
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: var(--primary-gradient);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchArtworks(e.target.value);
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Upload form
        const uploadForm = document.getElementById('uploadForm');
        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.uploadArtwork();
            });
        }

        // File upload preview
        const fileInput = document.getElementById('artworkImage');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.previewImage(e.target.files[0]);
            });
        }

        // Filter buttons
        
document.querySelectorAll('.filter-btn').forEach(btn => {

    btn.addEventListener('click', (e) => {

        const filter = e.target.dataset.filter;

        this.filterArtworks(filter);

    });

});

        // Hero CTA button
        const heroBtn = document.querySelector('.hero .btn-primary');
        if (heroBtn) {
            heroBtn.addEventListener('click', () => {
                this.navigateToPage('gallery');
            });
        }
    }

    setupNavigation() {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    navigateToPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const targetPage = document.getElementById(`${page}-page`);

    if (targetPage) {
        targetPage.classList.add('active');
        this.currentPage = page;

        // ❌ REMOVE THIS (very important)
        // this.setupNavigation();

        switch(page) {
            case 'gallery':
                if (!this.galleryLoaded) {
                    this.renderGallery();
                    this.galleryLoaded = true;
                }
                break;

            case 'artists':
                if (!this.artistsLoaded) {
                    this.renderArtists();
                    this.artistsLoaded = true;
                }
                break;

            case 'upload':
                this.setupUploadPage();
                break;
        }
    }
}
    loadSampleData() {
        // Sample artworks
        this.artworks = [
            {
                id: 1,
                title: "Sunset Dreams",
                artist: "Sarah Johnson",
                artistId: 1,
                image: "https://picsum.photos/400/300?random=1",
                category: "painting",
                tags: ["landscape", "sunset", "oil painting"],
                likes: 234,
                saves: 89,
                description: "A beautiful sunset over rolling hills, painted with vibrant oil colors.",
                createdAt: new Date('2024-01-15')
            },
            {
                id: 2,
                title: "Digital Dreams",
                artist: "Mike Chen",
                artistId: 2,
                image: "https://picsum.photos/400/300?random=2",
                category: "digital",
                tags: ["digital art", "abstract", "colorful"],
                likes: 456,
                saves: 123,
                description: "An abstract digital artwork exploring the intersection of technology and nature.",
                createdAt: new Date('2024-01-20')
            },
            {
                id: 3,
                title: "Urban Photography",
                artist: "Emma Wilson",
                artistId: 3,
                image: "https://picsum.photos/400/300?random=3",
                category: "photography",
                tags: ["urban", "street photography", "black and white"],
                likes: 189,
                saves: 67,
                description: "Capturing the essence of city life through street photography.",
                createdAt: new Date('2024-01-25')
            },
            {
                id: 4,
                title: "Abstract Sculpture",
                artist: "David Brown",
                artistId: 4,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                category: "sculpture",
                tags: ["sculpture", "abstract", "modern"],
                likes: 312,
                saves: 98,
                description: "A modern abstract sculpture exploring form and space.",
                createdAt: new Date('2024-02-01')
            },
            {
                id: 5,
                title: "Nature's Palette",
                artist: "Lisa Garcia",
                artistId: 5,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                category: "painting",
                tags: ["nature", "watercolor", "botanical"],
                likes: 278,
                saves: 145,
                description: "Botanical watercolor paintings celebrating nature's beauty.",
                createdAt: new Date('2024-02-05')
            },
            {
                id: 6,
                title: "Digital Portrait",
                artist: "Alex Kim",
                artistId: 6,
                image: "https://images.unsplash.com/photo-1571115764595-644a1f054a74?w=400&h=300&fit=crop",
                category: "digital",
                tags: ["portrait", "digital art", "realistic"],
                likes: 523,
                saves: 234,
                description: "Hyperrealistic digital portraits capturing human emotion.",
                createdAt: new Date('2024-02-10')
            }
        ];

        // Sample artists
        this.artists = [
            {
                id: 1,
                name: "Sarah Johnson",
                avatar: "SJ",
                bio: "Contemporary painter specializing in landscapes and abstract art.",
                followers: 1234,
                artworks: 45,
                joinedDate: new Date('2023-06-15')
            },
            {
                id: 2,
                name: "Mike Chen",
                avatar: "MC",
                bio: "Digital artist exploring the boundaries between technology and art.",
                followers: 2156,
                artworks: 67,
                joinedDate: new Date('2023-08-20')
            },
            {
                id: 3,
                name: "Emma Wilson",
                avatar: "EW",
                bio: "Street photographer capturing urban life and architecture.",
                followers: 987,
                artworks: 123,
                joinedDate: new Date('2023-09-10')
            },
            {
                id: 4,
                name: "David Brown",
                avatar: "DB",
                bio: "Sculptor working with modern materials and abstract forms.",
                followers: 1567,
                artworks: 34,
                joinedDate: new Date('2023-07-05')
            },
            {
                id: 5,
                name: "Lisa Garcia",
                avatar: "LG",
                bio: "Watercolor artist inspired by nature and botanical subjects.",
                followers: 1890,
                artworks: 78,
                joinedDate: new Date('2023-10-15')
            },
            {
                id: 6,
                name: "Alex Kim",
                avatar: "AK",
                bio: "Digital portrait artist specializing in hyperrealistic style.",
                followers: 3421,
                artworks: 89,
                joinedDate: new Date('2023-11-01')
            }
        ];
    }

    renderFeaturedArtworks() {
        const container = document.getElementById('featuredArtworks');
        if (!container) return;

        const featured = this.artworks.slice(0, 4);
        container.innerHTML = featured.map(artwork => this.createArtworkCard(artwork)).join('');
        
        // Add click listeners
        container.querySelectorAll('.artwork-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openArtworkModal(featured[index]);
            });
        });
    }

    renderTrendingArtists() {
        const container = document.getElementById('trendingArtists');
        if (!container) return;

        const trending = this.artists.slice(0, 4);
        container.innerHTML = trending.map(artist => this.createArtistCard(artist)).join('');
        
        // Add click listeners
        container.querySelectorAll('.artist-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openArtistModal(trending[index]);
            });
        });
    }

    renderGallery() {
        const container = document.getElementById('galleryGrid');
        if (!container) return;

        container.innerHTML = this.artworks.map(artwork => this.createArtworkCard(artwork)).join('');
        
        // Add click listeners
        container.querySelectorAll('.artwork-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openArtworkModal(this.artworks[index]);
            });
        });
    }

    renderArtists() {
    const container = document.getElementById("artistsList");

    if (!this.artworks || this.artworks.length === 0) {
        container.innerHTML = "<p>No artists found</p>";
        return;
    }

    // Get unique artists
    const artistsMap = {};

    this.artworks.forEach(art => {
        if (art.artist && art.artist.name) {
            artistsMap[art.artist.name] = true;
        }
    });

    const artists = Object.keys(artistsMap);

    container.innerHTML = artists.map(name => `
        <div class="artist-card">
            <h3>${name}</h3>
            <p>${this.artworks.filter(a => a.artist.name === name).length} artworks</p>
        </div>
    `).join('');
}

    createArtworkCard(artwork) {
        return `
            <div class="artwork-card" data-id="${artwork.id}">
                <div class="card-glow"></div>
                <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image" 
                     onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'">
                <div class="artwork-info">
                    <div class="artwork-header">
                        <h4 class="artwork-title">${artwork.title}</h4>
                        <p class="artwork-artist">by ${artwork.artist.name}</p>
                    </div>
                    <div class="artwork-category">
                        <span class="category-tag">${artwork.category}</span>
                    </div>
                    <div class="artwork-tags">
  ${artwork.tags.map(tag => `<span>#${tag}</span>`).join(' ')}
</div>
                    <div class="artwork-stats">
                        <span class="artwork-likes">
                            <i class="fas fa-heart"></i>
                            <span>${artwork.likes}</span>
                        </span>
                        <span class="artwork-saves">
                            <i class="fas fa-bookmark"></i>
                            <span>${artwork.saves}</span>
                        </span>
                        <span class="artwork-views">
                            <i class="fas fa-eye"></i>
                            <span>${artwork.views}</span>
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    createArtistCard(artist) {
        return `
            <div class="artist-card" data-id="${artist.id}">
                <div class="artist-avatar">${artist.avatar}</div>
                <h4 class="artist-name">${artist.name}</h4>
                <p class="artist-bio">${artist.bio}</p>
                <div class="artist-stats">
                    <span><i class="fas fa-users"></i> ${artist.followers}</span>
                    <span><i class="fas fa-palette"></i> ${artist.artworks}</span>
                </div>
            </div>
        `;
    }

    openArtworkModal(artwork) {
        const modal = document.getElementById('artworkModal');
        const detail = document.getElementById('artworkDetail');
        
        detail.innerHTML = `
            <div class="artwork-detail-image">
                <img src="${artwork.image}" alt="${artwork.title}" style="width: 100%; border-radius: 15px;"
                     onerror="this.src='https://via.placeholder.com/600x400/e3f2fd/667eea?text=${encodeURIComponent(artwork.title)}'">
            </div>
            <div class="artwork-detail-info">
                <h3>${artwork.title}</h3>
                <div class="artwork-detail-meta">
                    <p><strong>Artist:</strong> ${artwork.artist.name}</p>
                    <p><strong>Category:</strong> ${artwork.category}</p>
                    <p><strong>Created:</strong> ${artwork.createdAt.toLocaleDateString()}</p>
                </div>
                <p class="artwork-detail-description">${artwork.description}</p>
                <div class="artwork-detail-tags">
                    ${artwork.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="artwork-detail-actions">
                    <button class="action-btn" onclick="arthive.toggleLike(${artwork.id})">
                        <i class="fas fa-heart"></i>
                        <span>${artwork.likes}</span>
                    </button>
                    <button class="action-btn" onclick="arthive.toggleSave(${artwork.id})">
                        <i class="fas fa-bookmark"></i>
                        <span>Save</span>
                    </button>
                    <button class="action-btn" onclick="arthive.openArtistModal(${artwork.artistId})">
                        <i class="fas fa-user"></i>
                        <span>Artist</span>
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }

    openArtistModal(artist) {
        const modal = document.getElementById('artistModal');
        const profile = document.getElementById('artistProfile');
        
        // If artist is an ID, find the artist object
        if (typeof artist === 'number') {
            artist = this.artists.find(a => a.id === artist);
        }
        
        if (!artist) return;
        
        const artistArtworks = this.artworks.filter(a => a.artistId === artist.id);
        
        profile.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="artist-avatar" style="width: 120px; height: 120px; font-size: 3rem; margin: 0 auto 1rem;">${artist.avatar}</div>
                <h2>${artist.name}</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">${artist.bio}</p>
                <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem;">
                    <div style="text-align: center;">
                        <h4>${artist.followers}</h4>
                        <p style="color: var(--text-light);">Followers</p>
                    </div>
                    <div style="text-align: center;">
                        <h4>${artist.artworks}</h4>
                        <p style="color: var(--text-light);">Artworks</p>
                    </div>
                    <div style="text-align: center;">
                        <h4>${artist.joinedDate.toLocaleDateString()}</h4>
                        <p style="color: var(--text-light);">Joined</p>
                    </div>
                </div>
                <button class="btn-primary" onclick="arthive.followArtist(${artist.id})">
                    <i class="fas fa-plus"></i> Follow
                </button>
                
                <div style="margin-top: 3rem;">
                    <h3>Artworks</h3>
                    <div class="artwork-grid" style="margin-top: 1rem;">
                        ${artistArtworks.map(artwork => this.createArtworkCard(artwork)).join('')}
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Add click listeners to artwork cards in modal
        profile.querySelectorAll('.artwork-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openArtworkModal(artistArtworks[index]);
            });
        });
    }

    toggleLike(artworkId) {
        const artwork = this.artworks.find(a => a.id === artworkId);
        if (artwork) {
            artwork.likes += 1;
            
            // Update UI
            const likeBtn = document.querySelector(`[onclick="arthive.toggleLike(${artworkId})"] span`);
            if (likeBtn) {
                likeBtn.textContent = artwork.likes;
            }
            
            // Update artwork card if visible
            const card = document.querySelector(`[data-id="${artworkId}"]`);
            if (card) {
                const likesSpan = card.querySelector('.artwork-likes span');
                if (likesSpan) {
                    likesSpan.textContent = artwork.likes;
                }
            }
            
            // Add visual feedback
            likeBtn.parentElement.classList.add('liked');
            setTimeout(() => {
                likeBtn.parentElement.classList.remove('liked');
            }, 1000);
        }
    }

    toggleSave(artworkId) {
        const artwork = this.artworks.find(a => a.id === artworkId);
        if (artwork) {
            artwork.saves += 1;
            
            // Update UI
            const saveBtn = document.querySelector(`[onclick="arthive.toggleSave(${artworkId})"] span`);
            if (saveBtn) {
                saveBtn.textContent = 'Saved!';
                setTimeout(() => {
                    saveBtn.textContent = 'Save';
                }, 2000);
            }
            
            // Update artwork card if visible
            const card = document.querySelector(`[data-id="${artworkId}"]`);
            if (card) {
                const savesSpan = card.querySelector('.artwork-saves span');
                if (savesSpan) {
                    savesSpan.textContent = artwork.saves;
                }
            }
        }
    }

    followArtist(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (artist) {
            artist.followers += 1;
            
            // Update UI
            const followBtn = document.querySelector(`[onclick="arthive.followArtist(${artistId})"]`);
            if (followBtn) {
                followBtn.innerHTML = '<i class="fas fa-check"></i> Following';
                followBtn.style.background = 'var(--success-color, #27ae60)';
                
                setTimeout(() => {
                    followBtn.innerHTML = '<i class="fas fa-user"></i> Follow';
                    followBtn.style.background = '';
                }, 3000);
            }
        }
    }

    searchArtworks(query) {
        if (!query.trim()) {
            this.renderGallery();
            return;
        }
        
        const filtered = this.artworks.filter(artwork => 
            artwork.title.toLowerCase().includes(query.toLowerCase()) ||
            artwork.artist.toLowerCase().includes(query.toLowerCase()) ||
            artwork.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        const container = document.getElementById('galleryGrid');
        if (container) {
            container.innerHTML = filtered.map(artwork => this.createArtworkCard(artwork)).join('');
            
            // Add click listeners
            container.querySelectorAll('.artwork-card').forEach((card, index) => {
                card.addEventListener('click', () => {
                    this.openArtworkModal(filtered[index]);
                });
            });
        }
    }

    filterArtworks(category) {

    // Update active button
    document.querySelectorAll('.filter-btn')
        .forEach(btn => {

        btn.classList.remove('active');

        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    // Filter artworks locally
    const filteredArtworks =
        category === 'all'
        ? this.artworks
        : this.artworks.filter(
            artwork => artwork.category === category
        );

    // Render filtered artworks
    const galleryGrid =
        document.getElementById('galleryGrid');

    galleryGrid.innerHTML =
        filteredArtworks.map(artwork =>
            this.createArtworkCard(artwork)
        ).join('');

    // Re-add click listeners
    galleryGrid.querySelectorAll('.artwork-card')
        .forEach((card, index) => {

        card.addEventListener('click', () => {
            this.openArtworkModal(filteredArtworks[index]);
        });

    });
}
    async searchByArtist() {

    const artist =
        document.getElementById("artistSearch").value;

    const res = await fetch(
        `http://localhost:5000/api/artworks/artist/${artist}`
    );

    const data = await res.json();

    // Go to gallery page first
    this.navigateToPage('gallery');

    const galleryGrid =
        document.getElementById('galleryGrid');

    galleryGrid.innerHTML =
        data.map(artwork =>
            this.createArtworkCard(artwork)
        ).join('');
}

    setupUploadPage() {
        // This would handle file upload functionality
        console.log('Upload page loaded');
    }

    previewImage(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.querySelector('.file-upload-preview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 100%; border-radius: 10px;">`;
            }
        };
        reader.readAsDataURL(file);
    }
   async loadArtworks() {
    if (this.artworks && this.artworks.length > 0) {
        return; // ✅ already loaded, skip fetch
    }

    const res = await fetch("http://localhost:5000/api/artworks");
    this.artworks = await res.json();

    this.renderFeaturedArtworks();
    this.renderGallery();
}

    async uploadArtwork() {
    try {
        const title = document.getElementById('title').value;

        const artistName =
            document.getElementById('artistName').value;

        const image =
            document.getElementById('imageUrl').value;

        const category =
            document.getElementById('category').value;

        const newArtwork = {
            title: title,
            artist: {
                name: artistName,
                id: "user_" + Date.now()
            },
            image: image,
            category: category,
            tags: [],
            likes: 0,
            saves: 0,
            views: 0,
            comments: []
        };

        const res = await fetch("http://localhost:5000/api/artworks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArtwork)
        });

        if (!res.ok) {
            throw new Error("Failed to save");
        }

        alert("Saved permanently!");
        this.loadArtworks();

    } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed");
    }
}

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
}

// Initialize the application
let arthive;

document.addEventListener('DOMContentLoaded', () => {
    arthive = new ARTHIVE();
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});