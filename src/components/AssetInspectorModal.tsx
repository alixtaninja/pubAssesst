import { useEffect, useState } from 'react';
import { Check, Copy, Download, History, Layers, X } from 'lucide-react';
import { ART_THEMES, type AssetMetrics, type AssetSpec } from '../data/assetCatalog';
import { formatBytes, getBackdropClasses, type BackdropMode } from '../utils/assetValidation';

interface AssetInspectorModalProps {
  spec: AssetSpec | null;
  metrics?: AssetMetrics;
  initialBackdrop: BackdropMode;
  onClose: () => void;
}

export function AssetInspectorModal({
  spec,
  metrics,
  initialBackdrop,
  onClose,
}: AssetInspectorModalProps) {
  const [backdrop, setBackdrop] = useState<BackdropMode>(initialBackdrop);
  const [showSafeMargin, setShowSafeMargin] = useState(true);
  const [previewLayeredEnemy, setPreviewLayeredEnemy] = useState(false);
  const [viewArchiveStyle, setViewArchiveStyle] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  useEffect(() => {
    setBackdrop(initialBackdrop);
    setPreviewLayeredEnemy(spec?.id === 'MocTinhHp2Overlay');
    setViewArchiveStyle(false);
    setCopiedPath(false);
  }, [spec, initialBackdrop]);

  useEffect(() => {
    if (!spec) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [spec, onClose]);

  if (!spec) return null;

  const themeMeta = ART_THEMES[spec.theme];
  const supportsOverlayTest =
    spec.id === 'MocTinhHp2Overlay' || spec.id === 'Enemy_MocTinhRoot';

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(spec.unityPath);
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 1800);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/65 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative grid w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border border-[#E2DCD0] bg-[#FBF9F5] shadow-2xl md:grid-cols-12">
        <div className="flex flex-col border-b border-[#E2DCD0] md:col-span-6 md:border-b-0 md:border-r">
          <div
            className={`relative flex aspect-square w-full items-center justify-center p-8 ${getBackdropClasses(
              backdrop,
            )}`}
          >
            {supportsOverlayTest && previewLayeredEnemy ? (
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  src="/art/Portraits/Enemy_MocTinhRoot.png"
                  alt="Enemy_MocTinhRoot base"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
                <img
                  src="/art/Board/MocTinhHp2Overlay.png"
                  alt="MocTinhHp2Overlay ring"
                  referrerPolicy="no-referrer"
                  className="pointer-events-none absolute inset-0 m-auto max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <img
                src={viewArchiveStyle && spec.archiveUrl ? spec.archiveUrl : spec.publicUrl}
                alt={spec.titleVi}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            )}

            {showSafeMargin && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[6.5%] border border-dashed border-[#9A3412]/80"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F3EFE6] px-4 py-3 border-t border-[#E2DCD0]">
            <div className="flex items-center gap-1" role="group" aria-label="Chọn nền kiểm tra">
              {(
                [
                  { id: 'checker', label: 'Carô α' },
                  { id: 'sonmai', label: 'Sơn Mài' },
                  { id: 'jadebronze', label: 'Đồng Ngọc' },
                  { id: 'paper', label: 'Giấy Dó' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBackdrop(opt.id)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    backdrop === opt.id
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:bg-[#E7E0D3]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {spec.archiveUrl && (
                <button
                  type="button"
                  onClick={() => setViewArchiveStyle((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    viewArchiveStyle
                      ? 'bg-[#9A3412] text-white'
                      : 'bg-white border border-[#D6CEBE] text-[#1C1917] hover:bg-[#EFECE6]'
                  }`}
                >
                  <History className="h-3.5 w-3.5" />
                  <span>{viewArchiveStyle ? 'Đang xem bản cũ' : spec.archiveLabel ?? 'Xem bản cũ'}</span>
                </button>
              )}
              {supportsOverlayTest && (
                <button
                  type="button"
                  onClick={() => setPreviewLayeredEnemy((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    previewLayeredEnemy
                      ? 'bg-[#9A3412] text-white'
                      : 'bg-white border border-[#D6CEBE] text-[#1C1917] hover:bg-[#EFECE6]'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Ghép HP2</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowSafeMargin((v) => !v)}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  showSafeMargin
                    ? 'bg-[#9A3412]/15 text-[#9A3412]'
                    : 'bg-white border border-[#D6CEBE] text-[#57534E]'
                }`}
              >
                Lưới 87%
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 md:col-span-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#9A3412]">
                  {spec.chapterTag} · {spec.enumName}
                </p>
                <h2
                  id="inspector-title"
                  className="mt-1 font-serif text-3xl font-semibold text-[#1C1917]"
                >
                  {spec.titleVi}
                </h2>
                <p className="text-sm text-[#57534E]">{spec.titleEn}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng hộp thoại chi tiết"
                className="rounded-md p-2 text-[#57534E] hover:bg-[#EFECE6] hover:text-[#1C1917] transition-colors focus-visible:outline-2 focus-visible:outline-[#9A3412]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#292524]">
              {spec.descriptionVi}
            </p>

            <dl className="mt-5 divide-y divide-[#E2DCD0] border-y border-[#E2DCD0] text-xs">
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-[#57534E]">Đường dẫn Unity</dt>
                <dd className="flex items-center gap-2 font-mono text-[#1C1917]">
                  <span className="truncate max-w-[230px]" title={spec.unityPath}>
                    {spec.unityPath}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPath}
                    aria-label="Sao chép đường dẫn Unity"
                    className="rounded p-1 text-[#57534E] hover:bg-[#EFECE6] hover:text-[#1C1917]"
                  >
                    {copiedPath ? (
                      <Check className="h-3.5 w-3.5 text-[#14532D]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-[#57534E]">Độ phân giải & Định dạng</dt>
                <dd className="font-mono tabular-nums text-[#1C1917]">
                  {metrics ? `${metrics.width}×${metrics.height}` : `${spec.targetWidth}×${spec.targetHeight}`} px · PNG RGBA 32-bit
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-[#57534E]">Kiểm định kênh Alpha</dt>
                <dd className="font-mono tabular-nums text-[#14532D]">
                  {metrics
                    ? `4 góc α=0 (${metrics.cornersTransparent ? 'Đạt' : 'Cảnh báo'}) · Chiếm ${metrics.occupancyPct}%`
                    : 'Đã tách nền trong suốt'}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-[#57534E]">Dung lượng & Tỷ lệ</dt>
                <dd className="font-mono tabular-nums text-[#1C1917]">
                  {metrics ? formatBytes(metrics.bytes) : '—'} · PPU = 256
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-[#57534E]">Chất liệu mỹ thuật</dt>
                <dd className="text-right text-[#1C1917]">{themeMeta.label}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs font-medium text-[#1C1917] hover:bg-[#EFECE6] transition-colors"
            >
              Đóng
            </button>

            <a
              href={viewArchiveStyle && spec.archiveUrl ? spec.archiveUrl : spec.publicUrl}
              download={spec.fileName}
              className="inline-flex items-center gap-2 rounded-md bg-[#9A3412] px-5 py-2.5 text-xs font-semibold text-[#FBF9F5] hover:bg-[#7C2D12] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>
                {viewArchiveStyle && spec.archiveUrl ? `Tải bản cũ (${spec.fileName})` : `Tải ${spec.fileName}`}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
