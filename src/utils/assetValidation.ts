import type { ArtTheme, AssetCategory, AssetMetrics, AssetSpec } from '../data/assetCatalog';

export type CategoryFilter = 'All' | AssetCategory;
export type ThemeFilter = 'All' | ArtTheme;
export type BackdropMode = 'checker' | 'sonmai' | 'jadebronze' | 'paper';

export interface ManifestSummary {
  totalSpecs: number;
  verifiedCount: number;
  allCornersTransparent: boolean;
  allDimensionsMatch: boolean;
  hollowOverlayVerified: boolean;
  totalBytes: number;
}

export function filterAssets(
  assets: AssetSpec[],
  category: CategoryFilter,
  theme: ThemeFilter,
  query: string,
): AssetSpec[] {
  const normalized = query.trim().toLowerCase();
  return assets.filter((item) => {
    if (category !== 'All' && item.category !== category) {
      return false;
    }
    if (theme !== 'All' && item.theme !== theme) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    const haystack = [
      item.id,
      item.fileName,
      item.titleVi,
      item.titleEn,
      item.enumName,
      item.chapterTag,
      item.unityPath,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function summarizeManifest(
  specs: AssetSpec[],
  metricsList: AssetMetrics[],
): ManifestSummary {
  const byId = new Map<string, AssetMetrics>();
  for (const m of metricsList) {
    byId.set(m.id, m);
  }

  let verifiedCount = 0;
  let allCornersTransparent = specs.length > 0;
  let allDimensionsMatch = specs.length > 0;
  let hollowOverlayVerified = false;
  let totalBytes = 0;

  for (const spec of specs) {
    const m = byId.get(spec.id);
    if (!m) {
      allCornersTransparent = false;
      allDimensionsMatch = false;
      continue;
    }
    verifiedCount += 1;
    totalBytes += m.bytes;
    if (!m.cornersTransparent) {
      allCornersTransparent = false;
    }
    if (m.width !== spec.targetWidth || m.height !== spec.targetHeight) {
      allDimensionsMatch = false;
    }
    if (spec.id === 'MocTinhHp2Overlay') {
      hollowOverlayVerified = m.centerTransparent && m.cornersTransparent;
    }
  }

  return {
    totalSpecs: specs.length,
    verifiedCount,
    allCornersTransparent,
    allDimensionsMatch,
    hollowOverlayVerified,
    totalBytes,
  };
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getBackdropClasses(mode: BackdropMode): string {
  switch (mode) {
    case 'checker':
      return 'checkerboard-bg';
    case 'sonmai':
      return 'bg-[#1E110C]';
    case 'jadebronze':
      return 'bg-[#14221F]';
    case 'paper':
      return 'bg-[#FBF9F5]';
  }
}
