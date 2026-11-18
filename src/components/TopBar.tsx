import type { CategoryFilter } from '../utils/assetValidation';

interface TopBarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
}

const NAV_ITEMS: { label: string; category: CategoryFilter }[] = [
  { label: 'Gem Cơ Bản', category: 'Tiles' },
  { label: 'Gem Đặc Biệt', category: 'Gems' },
  { label: 'Anh Hùng', category: 'Heroes' },
  { label: 'Quân Địch', category: 'Enemies' },
  { label: 'Môi Trường', category: 'Environment' },
];

export function TopBar({ activeCategory, onSelectCategory }: TopBarProps) {
  const handleNavClick = (cat: CategoryFilter) => {
    onSelectCategory(cat);
    const el = document.getElementById('asset-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2DCD0] bg-[#FBF9F5]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-6 py-4">
        <button
          type="button"
          onClick={() => handleNavClick('All')}
          className="font-serif text-2xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 hover:text-[#9A3412] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A3412]"
        >
          Hào Khí Lạc Hồng
        </button>

        <nav aria-label="Danh mục tài nguyên" className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.category}
                type="button"
                onClick={() => handleNavClick(item.category)}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A3412] ${
                  isActive
                    ? 'border-[#9A3412] text-[#9A3412]'
                    : 'border-transparent text-[#57534E] hover:text-[#1C1917] hover:border-[#D6CEBE]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <a
          href="/art/LacHong_Unity_ArtAssets.zip"
          download="LacHong_Unity_ArtAssets.zip"
          className="inline-flex items-center justify-center rounded-md bg-[#9A3412] px-4 py-2 text-xs font-semibold text-[#FBF9F5] whitespace-nowrap shrink-0 transition-colors hover:bg-[#7C2D12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A3412]"
        >
          Tải Bộ Unity ZIP
        </a>
      </div>
    </header>
  );
}
