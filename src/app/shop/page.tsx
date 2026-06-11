"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from "lucide-react";
import { allProducts } from "@/data/products";
import { categories, brands, healthConcerns } from "@/data/index";
import ProductCard from "@/components/shared/ProductCard";
import { cn, formatPrice } from "@/lib/utils";
import { FilterState } from "@/types";

const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
];

const initialFilters: FilterState = {
  type: [],
  category: [],
  brand: [],
  priceRange: [0, 5000],
  rating: null,
  healthConcern: [],
  inStock: false,
};

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    type: true, category: true, price: true, brand: false, rating: false, concern: false
  });
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    setFilters(prev => ({
      ...prev,
      [key]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const activeFilterCount = [
    ...filters.type, ...filters.category, ...filters.brand,
    ...filters.healthConcern, ...(filters.inStock ? ["inStock"] : []),
    ...(filters.rating ? ["rating"] : []),
  ].length;

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.type.length) result = result.filter(p => filters.type.includes(p.type));
    if (filters.category.length) result = result.filter(p => filters.category.includes(p.categorySlug));
    if (filters.brand.length) result = result.filter(p => filters.brand.includes(p.brand));
    if (filters.inStock) result = result.filter(p => p.inStock);
    if (filters.rating) result = result.filter(p => p.rating >= filters.rating!);
    if (filters.healthConcern.length) result = result.filter(p =>
      p.healthConcern.some(hc => filters.healthConcern.includes(hc))
    );
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    switch (sort) {
      case "price-asc": return result.sort((a, b) => a.price - b.price);
      case "price-desc": return result.sort((a, b) => b.price - a.price);
      case "rating": return result.sort((a, b) => b.rating - a.rating);
      case "reviews": return result.sort((a, b) => b.reviewCount - a.reviewCount);
      case "newest": return result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
      default: return result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
  }, [filters, sort]);

  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedProducts.length < filteredProducts.length;

  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
            <X size={12} />
            Clear ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Product Type */}
      <FilterGroup
        title="Product Type"
        open={openSections.type}
        onToggle={() => toggleSection("type")}
      >
        {["ayurveda", "unani", "herbal"].map(type => (
          <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.type.includes(type)}
              onChange={() => toggleFilter("type", type)}
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 capitalize group-hover:text-primary-500 transition-colors">
              {type === "ayurveda" ? "Ayurveda" : type === "unani" ? "Unani" : "Herbal Supplements"}
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Category */}
      <FilterGroup title="Category" open={openSections.category} onToggle={() => toggleSection("category")}>
        {categories.map(cat => (
          <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.category.includes(cat.slug)}
              onChange={() => toggleFilter("category", cat.slug)}
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-primary-500 transition-colors flex items-center gap-1.5">
              {cat.icon} {cat.name}
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price Range" open={openSections.price} onToggle={() => toggleSection("price")}>
        <div className="space-y-2">
          {[[0, 500], [500, 1000], [1000, 2000], [2000, 5000]].map(([min, max]) => (
            <label key={`${min}-${max}`} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                checked={filters.priceRange[0] === min && filters.priceRange[1] === max}
                onChange={() => setFilters(f => ({ ...f, priceRange: [min, max] }))}
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-primary-500 transition-colors">
                {formatPrice(min)} – {formatPrice(max)}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Brand */}
      <FilterGroup title="Brand" open={openSections.brand} onToggle={() => toggleSection("brand")}>
        {brands.map(b => (
          <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.brand.includes(b)}
              onChange={() => toggleFilter("brand", b)}
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-primary-500 transition-colors">{b}</span>
          </label>
        ))}
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Minimum Rating" open={openSections.rating} onToggle={() => toggleSection("rating")}>
        {[4.5, 4.0, 3.5].map(r => (
          <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              checked={filters.rating === r}
              onChange={() => setFilters(f => ({ ...f, rating: r }))}
              className="w-4 h-4 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-primary-500 transition-colors">
              {"★".repeat(Math.floor(r))} {r}+ Stars
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* In Stock */}
      <div className="bg-accent rounded-xl p-3">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={e => setFilters(f => ({ ...f, inStock: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-800">In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-accent">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <a href="/" className="hover:text-primary-500">Home</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">Shop</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">All Products</h1>
              <p className="text-gray-500 mt-1">
                {filteredProducts.length} products
                {activeFilterCount > 0 && ` (filtered)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-card sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6 bg-white rounded-xl p-3 shadow-card">
              {/* Mobile Filter */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium"
              >
                <Filter size={15} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <span className="text-xs text-gray-400 flex-1">
                Showing {Math.min(paginatedProducts.length, filteredProducts.length)} of {filteredProducts.length}
              </span>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden sm:block">Sort:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={cn("p-2 transition-colors", view === "grid" ? "bg-primary-500 text-white" : "text-gray-400 hover:text-gray-600")}
                >
                  <Grid3X3 size={15} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn("p-2 transition-colors", view === "list" ? "bg-primary-500 text-white" : "text-gray-400 hover:text-gray-600")}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {filters.type.map(t => (
                  <button key={t} onClick={() => toggleFilter("type", t)} className="flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium hover:bg-primary-200 transition-colors">
                    {t} <X size={11} />
                  </button>
                ))}
                {filters.category.map(c => (
                  <button key={c} onClick={() => toggleFilter("category", c)} className="flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium hover:bg-primary-200 transition-colors">
                    {categories.find(cat => cat.slug === c)?.name} <X size={11} />
                  </button>
                ))}
                {filters.brand.map(b => (
                  <button key={b} onClick={() => toggleFilter("brand", b)} className="flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium hover:bg-primary-200 transition-colors">
                    {b} <X size={11} />
                  </button>
                ))}
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1">
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-5">Try adjusting your filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
              </div>
            ) : (
              <>
                <div className={cn(
                  "grid gap-5",
                  view === "grid" ? "grid-cols-2 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      Load More Products
                      <ChevronDown size={16} />
                    </button>
                    <p className="text-xs text-gray-400 mt-2">
                      Showing {paginatedProducts.length} of {filteredProducts.length}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="font-semibold">Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full btn-primary"
                >
                  Apply Filters ({filteredProducts.length} products)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-1 text-left"
      >
        <span className="font-medium text-gray-900 text-sm">{title}</span>
        <ChevronDown
          size={15}
          className={cn("text-gray-400 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-2.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
