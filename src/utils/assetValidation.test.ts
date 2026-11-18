import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ASSET_CATALOG, type AssetMetrics } from '../data/assetCatalog';
import { filterAssets, formatBytes, summarizeManifest } from './assetValidation';

test('ASSET_CATALOG defines all 34 assets matching Art Bible sections', () => {
  assert.equal(ASSET_CATALOG.length, 34);
  const categories = ASSET_CATALOG.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});
  assert.equal(categories.Tiles, 6);
  assert.equal(categories.Gems, 7);
  assert.equal(categories.Heroes, 6);
  assert.equal(categories.Enemies, 8);
  assert.equal(categories.Environment, 7);
});

test('filterAssets filters by category, theme, and Vietnamese/English query', () => {
  const gems = filterAssets(ASSET_CATALOG, 'Gems', 'All', '');
  assert.equal(gems.length, 7);

  const bronzeHeroes = filterAssets(ASSET_CATALOG, 'Heroes', 'JadeBronzeRelief', '');
  assert.equal(bronzeHeroes.length, 6);

  const sonMaiGems = filterAssets(ASSET_CATALOG, 'Gems', 'SonMaiGoldGlow', '');
  assert.deepEqual(
    sonMaiGems.map((a) => a.id),
    ['DragonSeal', 'IncenseOffering', 'DivineCrossbow'],
  );

  const search = filterAssets(ASSET_CATALOG, 'All', 'All', 'Nỏ Thần');
  assert.equal(search.length, 1);
  assert.equal(search[0]?.id, 'DivineCrossbow');
});

test('summarizeManifest validates real generated manifest.json on disk', () => {
  const manifestPath = path.resolve(process.cwd(), 'public/art/manifest.json');
  assert.equal(fs.existsSync(manifestPath), true, 'manifest.json must exist on disk');

  const raw = fs.readFileSync(manifestPath, 'utf-8');
  const metrics: AssetMetrics[] = JSON.parse(raw);
  const summary = summarizeManifest(ASSET_CATALOG, metrics);

  assert.equal(summary.totalSpecs, 34);
  assert.equal(summary.verifiedCount, 34);
  assert.equal(summary.allCornersTransparent, true);
  assert.equal(summary.allDimensionsMatch, true);
  assert.equal(summary.hollowOverlayVerified, true);
  assert.ok(summary.totalBytes > 0);
});

test('formatBytes formats sizes predictably', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(2048), '2.0 KB');
  assert.equal(formatBytes(1048576), '1.00 MB');
});
