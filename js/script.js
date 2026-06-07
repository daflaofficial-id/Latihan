// ================== DATA DUMMY ==================
const portfolioData = [
  { name: "Astra Coffee", category: "Website", desc: "Website company profile untuk kedai kopi modern.", date: "2025-12-10", images: ["images/portfolio/astra-coffee.jpg"], tech: "HTML, CSS, JS" },
  { name: "Batik Nusantara", category: "Banner", desc: "Banner promosi event pameran batik.", date: "2025-11-05", images: ["images/portfolio/batik-nusantara.jpg"], tech: "Photoshop, Illustrator" },
  { name: "Creative Studio", category: "Poster", desc: "Poster event workshop kreatif.", date: "2025-10-20", images: ["images/portfolio/creative-studio.jpg"], tech: "Canva, Figma" },
  { name: "Digital Market", category: "Social Media", desc: "Template feeds Instagram untuk marketplace.", date: "2025-09-14", images: ["images/portfolio/digital-market.jpg"], tech: "Adobe XD" },
  { name: "Education Center", category: "Website", desc: "Landing page kursus online.", date: "2025-08-30", images: ["images/portfolio/education-center.jpg"], tech: "React, Node.js" },
  { name: "Fashion Store", category: "Banner", desc: "Banner diskon akhir tahun.", date: "2025-07-22", images: ["images/portfolio/fashion-store.jpg"], tech: "Photoshop" },
  { name: "Green Energy", category: "Poster", desc: "Poster kampanye hemat energi.", date: "2025-06-18", images: ["images/portfolio/green-energy.jpg"], tech: "Illustrator" },
  { name: "Hotel Paradise", category: "Website", desc: "Website reservasi hotel butik.", date: "2025-05-01", images: ["images/portfolio/hotel-paradise.jpg"], tech: "WordPress, PHP" }
];

const testimoniData = [
  {
    id: 1,
    user: "Rizky",
    photo: "images/testimonials/user1.jpg",
    date: "2025-12-20",
    comment: "Dafla membantu bisnis saya tampil lebih profesional dengan website yang modern dan mudah digunakan.",
    likes: 15,
    dislikes: 1,
    replies: [
      { user: "Dafla", comment: "Terima kasih atas kepercayaannya.", date: "2025-12-21" },
      { user: "Andi", comment: "Setuju, hasilnya profesional.", date: "2025-12-22" }
    ]
  },
  {
    id: 2,
    user: "Sari",
    photo: "images/testimonials/user2.jpg",
    date: "2025-12-15",
    comment: "Desain banner promosi sangat menarik dan tepat sasaran.",
    likes: 8,
    dislikes: 0,
    replies: []
  },
  {
    id: 3,
    user: "Budi",
    photo: "images/testimonials/user3.jpg",
    date: "2025-11-01",
    comment: "Proses pengerjaan cepat dan komunikatif.",
    likes: 20,
    dislikes: 2,
    replies: [
      { user: "Dafla", comment: "Terima kasih Budi!", date: "2025-11-02" }
    ]
  }
];

// ================== HELPER: Render Portfolio Cards ==================
function renderPortfolioCards(data, containerId = 'portfolioGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = data.map((item, index) => `
    <div class="portfolio-card" data-index="${index}">
      <img src="${item.images[0]}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
      <div class="card-info">
        <span class="category">${item.category}</span>
        <h3>${item.name}</h3>
        <p class="date">${item.date}</p>
        <button class="btn-detail" onclick="openDetail(${index})">Detail</button>
      </div>
    </div>
  `).join('');
}

// ================== Portfolio Detail Modal ==================
function openDetail(index) {
  const item = portfolioData[index];
  const modal = document.getElementById('detailModal');
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <h2>${item.name}</h2>
    <p><strong>Kategori:</strong> ${item.category}</p>
    <p><strong>Tanggal:</strong> ${item.date}</p>
    <p>${item.desc}</p>
    <p><strong>Teknologi:</strong> ${item.tech}</p>
    <div class="gallery">
      ${item.images.map(img => `<img src="${img}" style="width:100%; margin-bottom:10px; border-radius:8px;">`).join('')}
    </div>
  `;
  modal.style.display = 'flex';
}
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('close-modal') || e.target.id === 'detailModal') {
    document.getElementById('detailModal').style.display = 'none';
  }
});

// ================== Filter & Sort Portfolio ==================
document.addEventListener('DOMContentLoaded', function() {
  // Halaman Portofolio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sortSelect');
  let currentCategory = 'all';
  let currentSort = 'az';

  function filterAndSort() {
    let filtered = currentCategory === 'all' ? portfolioData : portfolioData.filter(item => item.category === currentCategory);
    // sort A-Z by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    renderPortfolioCards(filtered);
  }

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        filterAndSort();
      });
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      currentSort = this.value;
      filterAndSort();
    });
  }
  // initial render portfolio page
  if (document.getElementById('portfolioGrid')) {
    filterAndSort();
  }

  // ================== Home Preview (3-6 karya terbaru) ==================
  const homePortfolioGrid = document.getElementById('homePortfolioGrid');
  if (homePortfolioGrid) {
    // ambil 4 terbaru (berdasarkan tanggal)
    const sortedByDate = [...portfolioData].sort((a,b) => new Date(b.date) - new Date(a.date));
    const previewData = sortedByDate.slice(0, 6);
    renderPortfolioCards(previewData, 'homePortfolioGrid');
  }

  // ================== Home Testimoni Preview (3 terbaru) ==================
  const homeTestimoniGrid = document.getElementById('homeTestimoniGrid');
  if (homeTestimoniGrid) {
    const sortedTesti = [...testimoniData].sort((a,b) => new Date(b.date) - new Date(a.date));
    const previewTesti = sortedTesti.slice(0, 3);
    renderTestimoniList(previewTesti, 'homeTestimoniGrid');
  }

  // ================== Testimoni Page ==================
  const testimoniList = document.getElementById('testimoniList');
  if (testimoniList) {
    renderTestimoniList(testimoniData, 'testimoniList');
    setupSortButtons();
  }
});

// Render testimoni list
function renderTestimoniList(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = data.map((item, idx) => {
    const likeId = `like-${item.id}`;
    const dislikeId = `dislike-${item.id}`;
    return `
      <div class="testimoni-card" data-id="${item.id}">
        <div class="testimoni-header">
          <img src="${item.photo}" alt="${item.user}" onerror="this.src='https://via.placeholder.com/60'">
          <div>
            <strong>${item.user}</strong>
            <div class="date">${item.date}</div>
          </div>
        </div>
        <p class="comment">${item.comment}</p>
        <div class="testimoni-actions">
          <button class="action-btn like-btn" data-id="${item.id}">👍 ${item.likes}</button>
          <button class="action-btn dislike-btn" data-id="${item.id}">👎 ${item.dislikes}</button>
          <button class="action-btn reply-toggle-btn" data-id="${item.id}">💬 ${item.replies.length} Balasan</button>
        </div>
        <div class="reply-section" id="reply-section-${item.id}" style="display:none;">
          <div class="reply-thread">
            ${item.replies.map(r => `<p><strong>${r.user}:</strong> ${r.comment} <small>(${r.date})</small></p>`).join('')}
          </div>
          <form class="reply-form" onsubmit="addReply(event, ${item.id})">
            <input type="text" placeholder="Tulis balasan..." required>
            <button type="submit" class="btn-detail">Kirim</button>
          </form>
        </div>
      </div>
    `;
  }).join('');

  // Add event listeners after render
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.dataset.id);
      const testimoni = testimoniData.find(t => t.id === id);
      if (testimoni) {
        testimoni.likes++;
        this.textContent = `👍 ${testimoni.likes}`;
      }
    });
  });
  document.querySelectorAll('.dislike-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.dataset.id);
      const testimoni = testimoniData.find(t => t.id === id);
      if (testimoni) {
        testimoni.dislikes++;
        this.textContent = `👎 ${testimoni.dislikes}`;
      }
    });
  });
  document.querySelectorAll('.reply-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const section = document.getElementById(`reply-section-${id}`);
      section.style.display = section.style.display === 'none' ? 'block' : 'none';
    });
  });
}

function addReply(event, testimoniId) {
  event.preventDefault();
  const input = event.target.querySelector('input');
  const comment = input.value.trim();
  if (!comment) return;
  const testimoni = testimoniData.find(t => t.id === testimoniId);
  if (testimoni) {
    testimoni.replies.push({
      user: 'Pengunjung',
      comment: comment,
      date: new Date().toISOString().slice(0,10)
    });
    // Refresh tampilan testimoni page
    const testimoniList = document.getElementById('testimoniList');
    if (testimoniList) {
      renderTestimoniList(testimoniData, 'testimoniList');
      setupSortButtons();
    }
    // juga update home preview jika ada
    const homePreview = document.getElementById('homeTestimoniGrid');
    if (homePreview) {
      const sorted = [...testimoniData].sort((a,b) => new Date(b.date) - new Date(a.date));
      renderTestimoniList(sorted.slice(0,3), 'homeTestimoniGrid');
    }
  }
}

function setupSortButtons() {
  const sortBtns = document.querySelectorAll('.sort-btn');
  sortBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      sortBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const sortBy = this.dataset.sort;
      let sorted;
      if (sortBy === 'terbaru') {
        sorted = [...testimoniData].sort((a,b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === 'terlama') {
        sorted = [...testimoniData].sort((a,b) => new Date(a.date) - new Date(b.date));
      } else if (sortBy === 'suka') {
        sorted = [...testimoniData].sort((a,b) => b.likes - a.likes);
      }
      renderTestimoniList(sorted, 'testimoniList');
      // re-attach event listener setelah render ulang
      setupSortButtons();
    });
  });
}

// Smooth scroll untuk link internal
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
