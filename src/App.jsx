import { useState } from 'react'
import './App.css'

const initialProducts = [
  {
    id: 'PRD-1048',
    name: 'Everyday Carry Backpack',
    category: 'Accessories',
    price: '89.00',
    stock: '124',
    status: 'Active',
    description:
      'A thoughtfully designed everyday backpack made from recycled materials. Features a padded laptop sleeve, weather-resistant finish, and room for everything you need.',
    color: 'sand',
    icon: '🎒',
  },
  {
    id: 'PRD-1047',
    name: 'Studio Wireless Headphones',
    category: 'Electronics',
    price: '149.00',
    stock: '58',
    status: 'Active',
    description:
      'Immersive sound meets all-day comfort. Enjoy rich, balanced audio and intuitive controls wherever your day takes you.',
    color: 'lavender',
    icon: '🎧',
  },
  {
    id: 'PRD-1046',
    name: 'Ceramic Pour-over Set',
    category: 'Home & Living',
    price: '48.00',
    stock: '32',
    status: 'Low stock',
    description:
      'A handcrafted ceramic pour-over set for a slower, more considered morning ritual. Includes a dripper and matching cup.',
    color: 'sage',
    icon: '☕',
  },
  {
    id: 'PRD-1045',
    name: 'Merino Wool Beanie',
    category: 'Apparel',
    price: '36.00',
    stock: '0',
    status: 'Out of stock',
    description:
      'A soft, warm beanie knitted from responsibly sourced merino wool. An easy everyday essential, made to last.',
    color: 'rose',
    icon: '🧢',
  },
  {
    id: 'PRD-1044',
    name: 'Minimal Desk Lamp',
    category: 'Home & Living',
    price: '72.00',
    stock: '86',
    status: 'Active',
    description:
      'A clean-lined desk lamp with a warm, adjustable glow. Designed to bring a little more focus to your workspace.',
    color: 'blue',
    icon: '💡',
  },
]

const categories = [
  'Accessories',
  'Apparel',
  'Electronics',
  'Home & Living',
  'Stationery',
]

function Icon({ name, size = 18 }) {
  const paths = {
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5" /><path d="M3 8v9l9 5 9-5V8" /><path d="M12 13v9" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    down: <path d="m7 10 5 5 5-5" />,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    refresh: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function ProductArtwork({ product, small = false }) {
  return (
    <div className={`product-art product-art--${product.color}${small ? ' product-art--small' : ''}`}>
      <span aria-hidden="true">{product.icon}</span>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedId, setSelectedId] = useState(initialProducts[0].id)
  const [draft, setDraft] = useState({ ...initialProducts[0] })
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState(false)

  const selectedProduct = products.find((product) => product.id === selectedId)
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.id} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )
  const isDirty = selectedProduct
    ? ['name', 'category', 'price', 'stock', 'status', 'description'].some(
        (field) => draft[field] !== selectedProduct[field],
      )
    : false

  function selectProduct(product) {
    setSelectedId(product.id)
    setDraft({ ...product })
    setSaved(false)
  }

  function updateDraft(event) {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  function saveProduct(event) {
    event.preventDefault()
    setProducts((current) =>
      current.map((product) =>
        product.id === selectedId ? { ...product, ...draft } : product,
      ),
    )
    setSaved(true)
  }

  function resetDraft() {
    if (selectedProduct) {
      setDraft({ ...selectedProduct })
      setSaved(false)
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#products" aria-label="Forma home">
          <span className="brand-mark"><Icon name="box" size={21} /></span>
          <span>forma<span className="brand-period">.</span></span>
        </a>

        <div className="workspace-switcher">
          <span className="workspace-avatar">S</span>
          <span className="workspace-copy">
            <span className="workspace-label">WORKSPACE</span>
            <span className="workspace-name">Studio North</span>
          </span>
          <Icon name="down" size={15} />
        </div>

        <span className="nav-section-label">WORKSPACE</span>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link nav-link--active" href="#products" aria-current="page">
            <Icon name="box" size={18} />
            <span>Products</span>
            <span className="nav-count">{products.length}</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <span className="help-mark">?</span>
            <span><strong>Need a hand?</strong><span>Visit our help center</span></span>
            <Icon name="arrow" size={15} />
          </div>
          <div className="profile">
            <div className="profile-avatar">JD</div>
            <span className="profile-copy"><strong>Jamie Dawson</strong><span>Store owner</span></span>
            <Icon name="down" size={15} />
          </div>
        </div>
      </aside>

      <main className="main-content" id="products">
        <header className="topbar">
          <div className="breadcrumbs"><span>Catalog</span><Icon name="chevron" size={14} /><strong>Products</strong></div>
          <div className="topbar-right"><span className="store-status"><span /> Store is live</span><span className="topbar-divider" /><button className="icon-button" type="button" aria-label="Activity"><Icon name="clock" size={19} /></button><div className="topbar-avatar">JD</div></div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> CATALOG MANAGEMENT</div>
              <h1>Products</h1>
              <p>Keep your catalog up to date and looking its best.</p>
            </div>
            <div className="heading-meta"><span className="meta-icon"><Icon name="clock" size={16} /></span><span>Last updated<br /><strong>Just now</strong></span></div>
          </section>

          <section className="workspace">
            <aside className="catalog-panel" aria-label="Product catalog">
              <div className="catalog-heading">
                <div><h2>All products</h2><span className="product-total">{products.length} products</span></div>
              </div>
              <label className="search-field">
                <Icon name="search" size={17} />
                <input
                  aria-label="Search products"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                />
                <kbd>/</kbd>
              </label>
              <div className="catalog-list">
                {filteredProducts.map((product) => (
                  <button
                    className={`product-row${selectedId === product.id ? ' product-row--selected' : ''}`}
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    aria-pressed={selectedId === product.id}
                  >
                    <ProductArtwork product={product} small />
                    <span className="product-row-copy">
                      <strong>{product.name}</strong>
                      <span>{product.id}</span>
                    </span>
                    <span className={`status-dot status-dot--${product.status.toLowerCase().replaceAll(' ', '-')}`} title={product.status} />
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="empty-search">No products match “{search}”.</div>
                )}
              </div>
              <div className="catalog-footer"><span className="catalog-footer-dot" /> Showing {filteredProducts.length} of {products.length} products</div>
            </aside>

            <section className="editor-panel" aria-label="Edit product details">
              <div className="editor-header">
                <div className="editor-title">
                  <ProductArtwork product={draft} />
                  <div><div className="editor-kicker">PRODUCT DETAILS <span>·</span> {draft.id}</div><h2>{draft.name}</h2><span className={`status-pill status-pill--${draft.status.toLowerCase().replaceAll(' ', '-')}`}><span />{draft.status}</span></div>
                </div>
              </div>

              <form className="product-form" onSubmit={saveProduct}>
                <div className="form-section-heading"><span className="section-number">01</span><div><h3>Basic information</h3><p>The essentials your customers will see.</p></div></div>
                <div className="form-grid">
                  <label className="field field--full"><span>Product name <b>*</b></span><input autoComplete="off" name="name" value={draft.name} onChange={updateDraft} required maxLength={100} placeholder="e.g. Everyday Carry Backpack" /></label>
                  <label className="field"><span>Category <b>*</b></span><span className="select-wrap"><select name="category" value={draft.category} onChange={updateDraft} required>{categories.map((category) => <option key={category}>{category}</option>)}</select><Icon name="down" size={15} /></span></label>
                  <label className="field"><span>Product ID</span><input value={draft.id} readOnly className="input-readonly" /><span className="field-hint">Product IDs can’t be changed.</span></label>
                  <label className="field field--full"><span>Description</span><textarea name="description" value={draft.description} onChange={updateDraft} rows="4" maxLength={500} placeholder="Tell customers what makes this product special..." /><span className="textarea-count">{draft.description.length}/500</span></label>
                </div>

                <div className="form-divider" />

                <div className="form-section-heading"><span className="section-number">02</span><div><h3>Pricing & inventory</h3><p>Manage your price and available stock.</p></div></div>
                <div className="form-grid">
                  <label className="field"><span>Price <b>*</b></span><span className="input-affix"><span>$</span><input name="price" type="number" min="0" step="0.01" value={draft.price} onChange={updateDraft} required /></span></label>
                  <label className="field"><span>Stock quantity <b>*</b></span><span className="input-affix input-affix--suffix"><input name="stock" type="number" min="0" step="1" value={draft.stock} onChange={updateDraft} required /><span>units</span></span></label>
                  <label className="field field--full"><span>Availability</span><span className="select-wrap"><select name="status" value={draft.status} onChange={updateDraft}><option>Active</option><option>Low stock</option><option>Out of stock</option><option>Draft</option></select><Icon name="down" size={15} /></span><span className="field-hint">Choose how this product appears in your store.</span></label>
                </div>

                <div className="form-footer">
                  <div className="save-feedback" aria-live="polite">{saved ? <><span className="saved-check"><Icon name="check" size={13} /></span> Changes saved successfully</> : isDirty ? <><span className="unsaved-dot" /> Unsaved changes</> : <><Icon name="check" size={14} /> All changes saved</>}</div>
                  <div className="form-actions"><button className="discard-button" type="button" onClick={resetDraft} disabled={!isDirty}>Discard changes</button><button className="save-button" type="submit" disabled={!isDirty}><Icon name="check" size={16} /> Save changes</button></div>
                </div>
              </form>
            </section>
          </section>

          <footer className="page-footer"><span>© 2026 Forma Commerce</span><span><span className="footer-live-dot" /> Everything is up to date</span><a href="mailto:support@forma.example">Help & support <Icon name="arrow" size={13} /></a></footer>
        </div>
      </main>
    </div>
  )
}

export default App
