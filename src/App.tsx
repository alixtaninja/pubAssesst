import { useEffect, useMemo, useState } from 'react';
import { Download, Grid2x2, History, Search } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { AssetCard } from './components/AssetCard';
import { AssetInspectorModal } from './components/AssetInspectorModal';
import {
  ART_THEMES,
  ASSET_CATALOG,
  type ArtTheme,
  type AssetMetrics,
  type AssetSpec,
} from './data/assetCatalog';
import {
  filterAssets,
  formatBytes,
  summarizeManifest,
  type BackdropMode,
  type CategoryFilter,
  type ThemeFilter,
} from './utils/assetValidation';

const CATEGORY_TABS: { id: CategoryFilter; label: string; count: number }[] = [
  { id: 'All', label: 'Tất cả', count: 34 },
  { id: 'Tiles', label: 'Gem Cơ Bản', count: 6 },
  { id: 'Gems', label: 'Gem Đặc Biệt', count: 7 },
  { id: 'Heroes', label: 'Anh Hùng', count: 6 },
  { id: 'Enemies', label: 'Quân Địch & HP2', count: 8 },
  { id: 'Environment', label: 'Môi Trường & Bàn Cờ', count: 7 },
];

export default function App() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [theme, setTheme] = useState<ThemeFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [backdropMode, setBackdropMode] = useState<BackdropMode>('checker');
  const [showSafeMargin, setShowSafeMargin] = useState(false);
  const [showArchiveStyle, setShowArchiveStyle] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<AssetSpec | null>(null);
  const [metricsList, setMetricsList] = useState<AssetMetrics[]>([]);

  useEffect(() => {
    let active = true;
    fetch('/art/manifest.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: AssetMetrics[]) => {
        if (active && Array.isArray(data)) {
          setMetricsList(data);
        }
      })
      .catch(() => {
        // Manifest optional during offline fallback
      });
    return () => {
      active = false;
    };
  }, []);

  const metricsMap = useMemo(() => {
    const map = new Map<string, AssetMetrics>();
    for (const m of metricsList) {
      map.set(m.id, m);
    }
    return map;
  }, [metricsList]);

  const summary = useMemo(
    () => summarizeManifest(ASSET_CATALOG, metricsList),
    [metricsList],
  );

  const filteredAssets = useMemo(
    () => filterAssets(ASSET_CATALOG, category, theme, searchQuery),
    [category, theme, searchQuery],
  );

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] font-sans">
      <TopBar activeCategory={category} onSelectCategory={setCategory} />

      <main className="mx-auto max-w-[1320px] px-6 py-10">
        {/* Curatorial Editorial Hero */}
        <section className="border-b border-[#E2DCD0] pb-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-wider text-[#9A3412]">
                Hồ Sơ Mỹ Thuật Unity · Match-3 Saga 9:16
              </p>
              <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#1C1917] sm:text-5xl text-balance">
                Kho Tài Nguyên Đồ Họa Văn Lang – Âu Lạc
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#57534E]">
                Trọn bộ 34 tệp PNG RGBA 32-bit nền trong suốt được thiết kế theo tinh thần Trống Đồng Đông Sơn,
                Tranh Dân Gian Đông Hồ và Sơn Mài Thếp Vàng, sẵn sàng đưa trực tiếp vào thư mục{' '}
                <code className="font-mono text-sm text-[#1C1917]">Assets/Resources/Art/</code> trong Unity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
              <a
                href="/art/LacHong_Unity_ArtAssets.zip"
                download="LacHong_Unity_ArtAssets.zip"
                className="inline-flex items-center gap-2 rounded-md bg-[#9A3412] px-5 py-3 text-sm font-semibold text-[#FBF9F5] hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" />
                <span>Tải trọn bộ 34 PNG (.zip)</span>
              </a>
            </div>
          </div>

          {/* 4-column Verification Metrics Strip */}
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 border-t border-[#E2DCD0] pt-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs text-[#57534E]">Số lượng tài nguyên</dt>
              <dd className="mt-1 font-mono text-base sm:text-2xl font-medium tabular-nums text-[#1C1917]">
                {summary.verifiedCount > 0 ? `${summary.verifiedCount}/${summary.totalSpecs}` : '34/34'} PNG
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#57534E]">Chuẩn kênh Alpha 4 góc</dt>
              <dd className="mt-1 font-mono text-base sm:text-2xl font-medium tabular-nums text-[#14532D]">
                {summary.verifiedCount > 0 && summary.allCornersTransparent ? '100% α = 0' : 'RGBA 32-bit'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#57534E]">Độ phân giải chuẩn (px)</dt>
              <dd className="mt-1 font-mono text-base sm:text-2xl font-medium tabular-nums text-[#1C1917]">
                256 · 512 · 128
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#57534E]">Tổng dung lượng gói</dt>
              <dd className="mt-1 font-mono text-base sm:text-2xl font-medium tabular-nums text-[#1C1917]">
                {summary.totalBytes > 0 ? formatBytes(summary.totalBytes) : 'Assets/Resources'}
              </dd>
            </div>
          </dl>
        </section>

        {/* Workspace Filter & Inspection Toolbar */}
        <section id="asset-catalog" className="pt-8">
          <div className="flex flex-col gap-4 border-b border-[#E2DCD0] pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Lọc theo nhóm tài nguyên"
                className="flex flex-wrap items-center gap-1 rounded-lg bg-[#EFECE6] p-1"
              >
                {CATEGORY_TABS.map((tab) => {
                  const active = category === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setCategory(tab.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#9A3412] ${
                        active
                          ? 'bg-white text-[#1C1917] shadow-sm'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <label htmlFor="asset-search" className="sr-only">
                    Tìm kiếm tài nguyên
                  </label>
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#78716C]"
                  />
                  <input
                    id="asset-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên tệp hoặc nhân vật..."
                    className="w-56 rounded-md border border-[#D6CEBE] bg-white py-1.5 pl-8 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C] focus:border-[#9A3412] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="theme-filter" className="sr-only">
                    Lọc theo chủ đề chất liệu
                  </label>
                  <select
                    id="theme-filter"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as ThemeFilter)}
                    className="rounded-md border border-[#D6CEBE] bg-white px-3 py-1.5 text-xs text-[#1C1917] focus:border-[#9A3412] focus:outline-none"
                  >
                    <option value="All">Tất cả 3 chất liệu</option>
                    {(Object.keys(ART_THEMES) as ArtTheme[]).map((tKey) => (
                      <option key={tKey} value={tKey}>
                        {ART_THEMES[tKey].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Alpha & Backdrop Verification Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                <span>Nền kiểm tra Alpha:</span>
                <div className="flex items-center gap-1 rounded-md border border-[#E2DCD0] bg-white p-0.5">
                  {(
                    [
                      { id: 'checker', label: 'Carô trong suốt' },
                      { id: 'sonmai', label: 'Sơn Mài (#1E110C)' },
                      { id: 'jadebronze', label: 'Đồng Ngọc (#14221F)' },
                      { id: 'paper', label: 'Giấy Dó (#FBF9F5)' },
                    ] as const
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setBackdropMode(mode.id)}
                      className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        backdropMode === mode.id
                          ? 'bg-[#1C1917] text-white'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono tabular-nums text-[#57534E]">
                  Hiển thị {filteredAssets.length} / {ASSET_CATALOG.length} tệp
                </span>
                <button
                  type="button"
                  onClick={() => setShowArchiveStyle((v) => !v)}
                  aria-pressed={showArchiveStyle}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    showArchiveStyle
                      ? 'border-[#9A3412] bg-[#9A3412]/10 text-[#9A3412]'
                      : 'border-[#D6CEBE] bg-white text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <History className="h-3.5 w-3.5" />
                  <span>{showArchiveStyle ? 'Đang xem: Phong Cách Cũ' : 'Tham Khảo Bản Cũ'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSafeMargin((v) => !v)}
                  aria-pressed={showSafeMargin}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    showSafeMargin
                      ? 'border-[#9A3412] bg-[#9A3412]/10 text-[#9A3412]'
                      : 'border-[#D6CEBE] bg-white text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Grid2x2 className="h-3.5 w-3.5" />
                  <span>Lưới An Toàn 87%</span>
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredAssets.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAssets.map((spec) => (
                <AssetCard
                  key={spec.id}
                  spec={spec}
                  metrics={metricsMap.get(spec.id)}
                  backdropMode={backdropMode}
                  showSafeMargin={showSafeMargin}
                  showArchiveStyle={showArchiveStyle}
                  onInspect={setSelectedSpec}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-[#E2DCD0] bg-white p-12 text-center">
              <p className="font-serif text-2xl font-medium text-[#1C1917]">
                Không tìm thấy tài nguyên phù hợp
              </p>
              <p className="mt-2 text-sm text-[#57534E]">
                Thử xóa bộ lọc tìm kiếm hoặc chuyển về chế độ xem tất cả 34 tệp.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('All');
                  setTheme('All');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-md bg-[#1C1917] px-4 py-2 text-xs font-medium text-white hover:bg-[#292524]"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </section>

        {/* Unity Import Specification Summary */}
        <section className="mt-16 border-t border-[#E2DCD0] pt-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917]">
                Quy Chuẩn Nhập Vào Unity
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                Toàn bộ tệp đã được lưu sẵn trong dự án tại thư mục{' '}
                <code className="font-mono text-xs text-[#1C1917]">Assets/Resources/Art/</code> đúng tên file
                và độ phân giải để script <code className="font-mono text-xs text-[#1C1917]">SpriteImporter.cs</code>{' '}
                nhận diện tự động.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              <div className="rounded-lg border border-[#E2DCD0] bg-white p-4">
                <p className="text-xs font-medium text-[#9A3412]">Tiles & Gems</p>
                <p className="mt-1 font-mono text-sm font-medium text-[#1C1917]">256×256 px · PPU 256</p>
                <p className="mt-1.5 text-xs text-[#57534E]">
                  6 gem cơ bản & 7 gem đặc biệt, lề trong suốt ~16px tránh cắt mép khi xoay cụm.
                </p>
              </div>
              <div className="rounded-lg border border-[#E2DCD0] bg-white p-4">
                <p className="text-xs font-medium text-[#9A3412]">Portraits & HP2</p>
                <p className="mt-1 font-mono text-sm font-medium text-[#1C1917]">256×256 px · RGBA</p>
                <p className="mt-1.5 text-xs text-[#57534E]">
                  6 Anh hùng & 7 Quân địch trong khung đồng, kèm vòng gai rỗng tâm MocTinhHp2Overlay.
                </p>
              </div>
              <div className="rounded-lg border border-[#E2DCD0] bg-white p-4">
                <p className="text-xs font-medium text-[#9A3412]">Environment & Board</p>
                <p className="mt-1 font-mono text-sm font-medium text-[#1C1917]">512 · 256×384 · 128</p>
                <p className="mt-1.5 text-xs text-[#57534E]">
                  Trống đồng xoay 512×512, núi Tản Viên 256×384, nút xoay 128×128 và ô bàn cờ.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-[#E2DCD0] bg-[#F3EFE6]/60">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-[#57534E]">
          <span>Hào Khí Lạc Hồng — Lĩnh Nam Chích Quái · Bộ Tài Nguyên Mỹ Thuật Unity</span>
          <a
            href="/art/LacHong_Unity_ArtAssets.zip"
            download="LacHong_Unity_ArtAssets.zip"
            className="font-medium text-[#9A3412] hover:underline"
          >
            Tải gói Assets/Resources/Art (.zip)
          </a>
        </div>
      </footer>

      <AssetInspectorModal
        spec={selectedSpec}
        metrics={selectedSpec ? metricsMap.get(selectedSpec.id) : undefined}
        initialBackdrop={backdropMode}
        onClose={() => setSelectedSpec(null)}
      />
    </div>
  );
}
