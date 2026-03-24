const products = [
  {
    id: 'pr-jump-01',
    title: 'Compact Jump Starter 1200A',
    category: 'Emergency Tools',
    description: 'High-output lithium jump starter for gasoline and light diesel engines.',
    image: 'assets/product-jumpstarter.svg',
    detailPage: 'products/pr-jump-01.html',
    featured: true,
  },
  {
    id: 'pr-light-01',
    title: 'Magnetic LED Work Light',
    category: 'Lighting',
    description: 'Rechargeable 900-lumen task light with swivel stand and magnetic base.',
    image: 'assets/product-worklight.svg',
    detailPage: 'products/pr-light-01.html',
    featured: true,
  },
  {
    id: 'pr-wiper-01',
    title: 'All-Season Wiper Blade Set',
    category: 'Maintenance',
    description: 'Low-noise composite blades for reliable visibility in all weather.',
    image: 'assets/product-wiper.svg',
    detailPage: 'products/pr-wiper-01.html',
    featured: true,
  },
  {
    id: 'pr-inflator-01',
    title: 'Digital Tire Inflator',
    category: 'Emergency Tools',
    description: 'Preset PSI compressor with auto-stop for quick roadside inflation.',
    image: 'assets/product-inflator.svg',
    detailPage: 'products/pr-inflator-01.html',
    featured: false,
  },
  {
    id: 'pr-charger-01',
    title: 'Dual USB-C Car Charger',
    category: 'Accessories',
    description: 'Fast-charging 45W compact adapter with heat-resistant housing.',
    image: 'assets/product-charger.svg',
    detailPage: 'products/pr-charger-01.html',
    featured: false,
  },
  {
    id: 'pr-cable-01',
    title: 'Heavy-Duty Booster Cables',
    category: 'Emergency Tools',
    description: '4-gauge copper-clad cables with insulated clamps and carry case.',
    image: 'assets/product-cables.svg',
    detailPage: 'products/pr-cable-01.html',
    featured: false,
  },
  {
    id: 'pr-cam-01',
    title: '1080p Dash Camera',
    category: 'Accessories',
    description: 'Wide-angle recording with loop capture and night enhancement mode.',
    image: 'assets/product-dashcam.svg',
    detailPage: 'products/pr-cam-01.html',
    featured: false,
  },
  {
    id: 'pr-clean-01',
    title: 'Microfiber Detailing Kit',
    category: 'Maintenance',
    description: 'Premium cloth and applicator set for interior and exterior detailing.',
    image: 'assets/product-detailing.svg',
    detailPage: 'products/pr-clean-01.html',
    featured: false,
  },
];

const categories = ['All', ...new Set(products.map((item) => item.category))];

function productCardTemplate(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div class="product-content">
        <span class="badge">${product.category}</span>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <a class="btn btn-secondary" href="${product.detailPage}" aria-label="View details for ${product.title}">View Product</a>
      </div>
    </article>
  `;
}

function renderProducts(targetId, list) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = list.map(productCardTemplate).join('');
}

function renderFeaturedProducts() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  renderProducts('featured-products', featured);
}

function renderCategoryFilters() {
  const filterWrap = document.getElementById('category-filters');
  const listWrap = document.getElementById('product-list');
  if (!filterWrap || !listWrap) return;

  filterWrap.innerHTML = categories
    .map(
      (category, index) =>
        `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${category}">${category}</button>`
    )
    .join('');

  renderProducts('product-list', products);

  filterWrap.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-category]');
    if (!button) return;

    filterWrap.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');
    const filtered = category === 'All' ? products : products.filter((item) => item.category === category);
    renderProducts('product-list', filtered);
  });
}

function updateNavClock() {
  const clockElement = document.getElementById('current-time');
  if (!clockElement) return;

  const formatter = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const paint = () => {
    clockElement.textContent = formatter.format(new Date());
  };

  paint();
  setInterval(paint, 1000);
}

renderFeaturedProducts();
renderCategoryFilters();
updateNavClock();
