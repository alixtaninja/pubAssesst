import { useState } from 'react';
import { Download, Expand } from 'lucide-react';
import type { AssetMetrics, AssetSpec } from '../data/assetCatalog';
import { formatBytes, getBackdropClasses, type BackdropMode } from '../utils/assetValidation';

interface AssetCardProps {
  spec: AssetSpec;
  metrics?: AssetMetrics;
  backdropMode: BackdropMode;
  showSafeMargin: boolean;
  showArchiveStyle?: boolean;
  onInspect: (spec: AssetSpec) => void;
}

export function AssetCard({
  spec,
  metrics,
  backdropMode,
  showSafeMargin,
  showArchiveStyle = false,
  onInspect,
}: AssetCardProps) {
  const [imgError, setImgError] = useState(false);

  const showingArchive = Boolean(showArchiveStyle && spec.archiveUrl);
  const activeUrl = showingArchive && spec.archiveUrl ? spec.archiveUrl : spec.publicUrl;

  const dimsLabel = metrics
    ? `${metrics.width}×${metrics.height} px`
    : `${spec.targetWidth}×${spec.targetHeight} px`;

  return (
    <article className="group flex flex-col border border-[#E2DCD0] bg-white rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden border-b border-[#E2DCD0]">
        <button
          type="button"
          onClick={() => onInspect(spec)}
          aria-label={`Xem chi tiết ${spec.titleVi} (${spec.fileName})`}
          className={`relative flex h-full w-full items-center justify-center p-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9A3412] ${getBackdropClasses(
            backdropMode,
          )}`}
        >
          {!imgError ? (
            <img
              src={activeUrl}
              alt={`${spec.titleVi} — ${spec.fileName}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-center p-4">
              <span
                className="h-10 w-10 rounded-full border border-[#D6CEBE]"
                style={{ backgroundColor: spec.colorHex }}
              />
              <span className="text-xs font-medium text-[#57534E]">{spec.fileName}</span>
            </div>
          )}

          {showSafeMargin && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[6.5%] border border-dashed border-[#9A3412]/70"
            />
          )}

          {showingArchive && (
            <span className="pointer-events-none absolute left-2.5 top-2.5 rounded bg-[#1C1917]/80 px-2 py-0.5 text-[10px] font-medium text-[#FBF9F5]">
              {spec.archiveLabel ?? 'Bản tham khảo cũ'}
            </span>
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded bg-[#1C1917]/75 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          >
            <Expand className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tabular-nums text-[#57534E]">
            <span>{dimsLabel}</span>
            <span aria-hidden="true">·</span>
            <span>PNG RGBA</span>
            {metrics && !showingArchive && (
              <>
                <span aria-hidden="true">·</span>
                <span>{formatBytes(metrics.bytes)}</span>
              </>
            )}
          </div>

          <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-[#1C1917]">
            <button
              type="button"
              onClick={() => onInspect(spec)}
              className="text-left hover:text-[#9A3412] transition-colors focus-visible:outline-2 focus-visible:outline-[#9A3412]"
            >
              {spec.titleVi}
            </button>
          </h3>

          <p className="mt-1 text-xs text-[#57534E] line-clamp-2 leading-relaxed">
            {spec.descriptionVi}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#F0ECE3]">
          <code className="truncate font-mono text-[11px] text-[#78716C]" title={spec.unityPath}>
            {spec.fileName}
          </code>

          <a
            href={activeUrl}
            download={spec.fileName}
            aria-label={`Tải tệp ${spec.fileName}`}
            className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium text-[#9A3412] hover:bg-[#9A3412]/10 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#9A3412]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Tải PNG</span>
          </a>
        </div>
      </div>
    </article>
  );
}
