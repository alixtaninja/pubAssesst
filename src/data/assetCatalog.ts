export type AssetCategory =
  | 'Tiles'
  | 'Gems'
  | 'Heroes'
  | 'Enemies'
  | 'Environment';

export type ArtTheme = 'DongHoFolkSilk' | 'JadeBronzeRelief' | 'SonMaiGoldGlow';

export interface AssetSpec {
  id: string;
  fileName: string;
  unityPath: string;
  publicUrl: string;
  category: AssetCategory;
  enumName: string;
  titleVi: string;
  titleEn: string;
  chapterTag: string;
  theme: ArtTheme;
  targetWidth: number;
  targetHeight: number;
  colorHex: string;
  descriptionVi: string;
  promptSummary: string;
  archiveUrl?: string;
  archiveLabel?: string;
}

export interface AssetMetrics {
  id: string;
  relPath: string;
  unityPath: string;
  publicUrl: string;
  rawUrl: string;
  width: number;
  height: number;
  cornersTransparent: boolean;
  centerTransparent: boolean;
  bboxWidth: number;
  bboxHeight: number;
  occupancyPct: number;
  bytes: number;
}

export const ART_THEMES: Record<
  ArtTheme,
  {
    label: string;
    chapters: string;
    bgHex: string;
    frameHex: string;
    accentHex: string;
    materialNote: string;
  }
> = {
  DongHoFolkSilk: {
    label: 'Đông Hồ & Lụa Tơ Tằm',
    chapters: 'Chương 1 — Khai Thiên Lập Quốc',
    bgHex: '#241914',
    frameHex: '#5E3423',
    accentHex: '#F5C238',
    materialNote: 'Giấy dó, vỏ điệp, son đỏ, vàng đất, xanh chàm',
  },
  JadeBronzeRelief: {
    label: 'Phù Điêu Đồng Ngọc Đông Sơn',
    chapters: 'Chương 2, 3, 4 — Thánh Gióng · Chử Đồng Tử · Sơn Tinh',
    bgHex: '#14221F',
    frameHex: '#2C544B',
    accentHex: '#3BA8B8',
    materialNote: 'Đồng xanh Đông Sơn, ngọc bích trầm mặc, đá núi Tản Viên',
  },
  SonMaiGoldGlow: {
    label: 'Sơn Mài Thếp Vàng',
    chapters: 'Chương 5 — Loa Thành Chiến Ký',
    bgHex: '#1E110C',
    frameHex: '#54281B',
    accentHex: '#D8A24A',
    materialNote: 'Sơn then đen huyền, đỏ son, thếp vàng rực & linh quang ngọc lục',
  },
};

export const ASSET_CATALOG: AssetSpec[] = [
  // Part A — 6 Basic Tiles
  {
    id: 'LuaVang',
    fileName: 'LuaVang.png',
    unityPath: 'Assets/Resources/Art/Tiles/LuaVang.png',
    publicUrl: '/art/Tiles/LuaVang.png',
    category: 'Tiles',
    enumName: 'TileType.LuaVang = 1',
    titleVi: 'Bông Lúa Vàng Lạc Việt',
    titleEn: 'Golden Rice Stalk',
    chapterTag: 'Saga v2.0 · Tất cả chương',
    theme: 'DongHoFolkSilk',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#F5C238',
    descriptionVi:
      'Khối tròn ngọc hổ phách ấm, chính giữa là nhánh lúa nước chín vàng trĩu hạt uốn cong cùng lá lúa xanh ngọc, viền đồng Đông Sơn mảnh.',
    promptSummary:
      'Circular amber-gold bevelled token, curved ripe rice stalk, jade leaves, thin bronze rim.',
  },
  {
    id: 'SenHong',
    fileName: 'SenHong.png',
    unityPath: 'Assets/Resources/Art/Tiles/SenHong.png',
    publicUrl: '/art/Tiles/SenHong.png',
    category: 'Tiles',
    enumName: 'TileType.SenHong = 2',
    titleVi: 'Hoa Sen Hồng',
    titleEn: 'Pink Lotus Blossom',
    chapterTag: 'Saga v2.0 · Tất cả chương',
    theme: 'DongHoFolkSilk',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#E84A7F',
    descriptionVi:
      'Khối tròn sơn mài hồng thẫm, chính giữa là đóa sen hồng bung nở 5 cánh thanh tao trên đài lá sen xanh và nhụy vàng kim.',
    promptSummary:
      'Deep crimson-rose lacquer token, 5-petal pink lotus over green pad with golden stamens.',
  },
  {
    id: 'TrongDong',
    fileName: 'TrongDong.png',
    unityPath: 'Assets/Resources/Art/Tiles/TrongDong.png',
    publicUrl: '/art/Tiles/TrongDong.png',
    category: 'Tiles',
    enumName: 'TileType.TrongDong = 3',
    titleVi: 'Mặt Trống Đồng Ngọc Lũ',
    titleEn: 'Dong Son Bronze Drum',
    chapterTag: 'Saga v2.0 · Tất cả chương',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#B87B28',
    descriptionVi:
      'Khối tròn đồng đỏ cổ kính, ngôi sao 12 cánh nổi khối vàng rực cùng các vòng chấm đồng tâm và hoa văn răng cưa Đông Sơn.',
    promptSummary:
      'Antique bronze-ochre medallion, raised 12-pointed sun star, concentric dots and sawtooth bands.',
  },
  {
    id: 'ChimHac',
    fileName: 'ChimHac.png',
    unityPath: 'Assets/Resources/Art/Tiles/ChimHac.png',
    publicUrl: '/art/Tiles/ChimHac.png',
    category: 'Tiles',
    enumName: 'TileType.ChimHac = 4',
    titleVi: 'Chim Lạc Tung Cánh',
    titleEn: 'Soaring Lac Bird',
    chapterTag: 'Saga v2.0 · Tất cả chương',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#3BA8B8',
    descriptionVi:
      'Khối tròn ngọc lam, chính giữa là hình chim Lạc trắng ngà/vàng kim sải cánh bay với mỏ dài và mào lông vũ uốn cong theo họa tiết trống đồng.',
    promptSummary:
      'Turquoise-jade token, ivory-and-gold stylized Dong Son Lac bird in flight.',
  },
  {
    id: 'SungTrau',
    fileName: 'SungTrau.png',
    unityPath: 'Assets/Resources/Art/Tiles/SungTrau.png',
    publicUrl: '/art/Tiles/SungTrau.png',
    category: 'Tiles',
    enumName: 'TileType.SungTrau = 5',
    titleVi: 'Cặp Sừng Trâu Vàng',
    titleEn: 'Golden Buffalo Horns',
    chapterTag: 'Saga v2.0 · Tất cả chương',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#5C4B6B',
    descriptionVi:
      'Khối tròn đá huyền tím trầm, đầu trâu nước Việt Nam cách điệu mạnh mẽ với cặp sừng cong hình trăng khuyết nạm vàng và khuyên mũi đồng.',
    promptSummary:
      'Slate-plum stone medallion, stylized Vietnamese water buffalo head with gold-inlaid crescent horns.',
  },
  {
    id: 'NonLa',
    fileName: 'NonLa.png',
    unityPath: 'Assets/Resources/Art/Tiles/NonLa.png',
    publicUrl: '/art/Tiles/NonLa.png',
    category: 'Tiles',
    enumName: 'TileType.NonLa = 6',
    titleVi: 'Nón Lá Quai Lụa',
    titleEn: 'Conical Hat & Silk Ribbon',
    chapterTag: 'Zen v1 Mode',
    theme: 'DongHoFolkSilk',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#74A847',
    descriptionVi:
      'Khối tròn xanh ngọc bích nhạt, chiếc nón lá chóp nhọn đan nan tre vàng óng kèm dải quai lụa đỏ uốn mềm bên dưới.',
    promptSummary:
      'Celadon-green token, woven golden bamboo conical Non La hat with crimson silk chin ribbon.',
  },

  // Part B — 7 Special Gems
  {
    id: 'DragonSeal',
    fileName: 'DragonSeal.png',
    unityPath: 'Assets/Resources/Art/Gems/DragonSeal.png',
    publicUrl: '/art/Gems/DragonSeal.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.DragonSeal = 1',
    titleVi: 'Ấn Rồng Lạc Long Quân',
    titleEn: 'Dragon Lord Royal Seal',
    chapterTag: 'Chương 1 · Lạc Long Quân',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#D8A24A',
    descriptionVi:
      'Ấn ngọc vàng kim chạm hình Rồng Việt cổ uốn lượn mềm mại như sóng nước, ngậm ngọc sáng xanh biển, tỏa hào quang sơn mài.',
    promptSummary:
      'Octagonal gold-jade seal engraved with wingless ancient Vietnamese serpent dragon and luminous pearl.',
  },
  {
    id: 'FairyLotus',
    fileName: 'FairyLotus.png',
    unityPath: 'Assets/Resources/Art/Gems/FairyLotus.png',
    publicUrl: '/art/Gems/FairyLotus.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.FairyLotus = 2',
    titleVi: 'Sen Tiên Bách Noãn',
    titleEn: 'Fairy Lotus of Hundred Eggs',
    chapterTag: 'Chương 1 · Âu Cơ',
    theme: 'DongHoFolkSilk',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#E84A7F',
    descriptionVi:
      'Đóa sen tiên 9 cánh phát sáng hồng kim huyền ảo, tâm đài sen nâng bọc trăm trứng tỏa ánh sáng vàng ấm linh thiêng.',
    promptSummary:
      'Sacred 9-petal pink and gold fairy lotus cradling the luminous golden pouch of hundred eggs.',
  },
  {
    id: 'IronBamboo',
    fileName: 'IronBamboo.png',
    unityPath: 'Assets/Resources/Art/Gems/IronBamboo.png',
    publicUrl: '/art/Gems/IronBamboo.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.IronBamboo = 3',
    titleVi: 'Tre Đằng Ngà & Roi Sắt',
    titleEn: 'Ivory Bamboo & Iron Whip',
    chapterTag: 'Chương 2 · Thánh Gióng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#E06428',
    descriptionVi:
      'Bụi tre đằng ngà vàng óng đan quyện cùng chiếc roi sắt rực lửa đỏ cam của Phù Đổng Thiên Vương.',
    promptSummary:
      'Golden ivory bamboo stalks crossed with ember-glowing forged iron whip-rod inside bronze rim.',
  },
  {
    id: 'MagicStaff',
    fileName: 'MagicStaff.png',
    unityPath: 'Assets/Resources/Art/Gems/MagicStaff.png',
    publicUrl: '/art/Gems/MagicStaff.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.MagicStaff = 4',
    titleVi: 'Gậy Thần & Nón Tiên',
    titleEn: 'Mystic Staff & Fairy Hat',
    chapterTag: 'Chương 3 · Chử Đồng Tử',
    theme: 'DongHoFolkSilk',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#F5C238',
    descriptionVi:
      'Cây gậy trúc thần cắm đứng đội chiếc nón lá tỏa hào quang vàng kim hóa hiện lâu đài giữa đầm Dạ Trạch.',
    promptSummary:
      'Upright bamboo pilgrim staff topped by radiant golden conical hat with celestial lacquer light.',
  },
  {
    id: 'MountainJade',
    fileName: 'MountainJade.png',
    unityPath: 'Assets/Resources/Art/Gems/MountainJade.png',
    publicUrl: '/art/Gems/MountainJade.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.MountainJade = 5',
    titleVi: 'Ngọc Núi Tản Viên',
    titleEn: 'Tan Vien Mountain Jade',
    chapterTag: 'Chương 4 · Sơn Tinh',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#2E9E75',
    descriptionVi:
      'Khối ngọc bích núi Tản Viên khắc phù điêu ba đỉnh núi, tia sét vàng và vách đá vững chãi ngăn lũ.',
    promptSummary:
      'Carved emerald-jade mountain monolith showing Tan Vien triple peaks and golden lightning.',
  },
  {
    id: 'IncenseOffering',
    fileName: 'IncenseOffering.png',
    unityPath: 'Assets/Resources/Art/Gems/IncenseOffering.png',
    publicUrl: '/art/Gems/IncenseOffering.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.IncenseOffering = 6',
    titleVi: 'Đỉnh Đồng Cầu Thần',
    titleEn: 'Sacred Bronze Cauldron',
    chapterTag: 'Chương 5 · An Dương Vương',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#D8A24A',
    descriptionVi:
      'Đỉnh đồng Đông Sơn ba chân chạm hoa văn sóng nước và chim Lạc, tỏa làn khói trầm hương vàng kim và xanh ngọc.',
    promptSummary:
      'Three-legged Dong Son bronze incense cauldron with swirling gold and jade incense smoke.',
  },
  {
    id: 'DivineCrossbow',
    fileName: 'DivineCrossbow.png',
    unityPath: 'Assets/Resources/Art/Gems/DivineCrossbow.png',
    publicUrl: '/art/Gems/DivineCrossbow.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.DivineCrossbow = 7',
    titleVi: 'Nỏ Thần Liên Châu',
    titleEn: 'Divine Co Loa Crossbow',
    chapterTag: 'Chương 5 · Thần Kim Quy',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#3BA8B8',
    descriptionVi:
      'Cây nỏ đồng cổ chạm mai rùa vàng ở báng, lẫy móng rùa thần, nạp chùm 3 mũi tên đầu phát sáng lam ngọc.',
    promptSummary:
      'Ancient bronze Co Loa repeating crossbow with golden turtle-shell stock, claw trigger, 3 glowing jade arrows.',
  },

  // Part C — 6 Hero Portraits
  {
    id: 'Hero_LacLongQuan',
    fileName: 'Hero_LacLongQuan.png',
    unityPath: 'Assets/Resources/Art/Portraits/Hero_LacLongQuan.png',
    publicUrl: '/art/Portraits/Hero_LacLongQuan.png',
    category: 'Heroes',
    enumName: 'HeroId.LacLongQuan = 1',
    titleVi: 'Đức Lạc Long Quân',
    titleEn: 'Lord Lac Long Quan',
    chapterTag: 'Chương 1 · Hồng Bàng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#2596A8',
    descriptionVi:
      'Chân dung minh họa 2D sắc nét trong khung đồng vàng khảm ngọc lam: Lạc Long Quân đội mão sừng rồng và lông chim Lạc, giáp vảy rồng vàng kim rực rỡ trước sóng biển Đông.',
    promptSummary:
      'Crisp 2D stylized illustration inside luminous gold-and-jade Dong Son medallion: noble Lac Long Quan in dragon crown and gilded scale armor.',
    archiveUrl: '/art/Archive_Style1/Hero_LacLongQuan.png',
    archiveLabel: 'Phù điêu đồng cổ',
  },
  {
    id: 'Hero_AuCo',
    fileName: 'Hero_AuCo.png',
    unityPath: 'Assets/Resources/Art/Portraits/Hero_AuCo.png',
    publicUrl: '/art/Portraits/Hero_AuCo.png',
    category: 'Heroes',
    enumName: 'HeroId.AuCo = 2',
    titleVi: 'Mẹ Âu Cơ',
    titleEn: 'Mother Au Co',
    chapterTag: 'Chương 1 · Hồng Bàng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#C94A5A',
    descriptionVi:
      'Chân dung minh họa 2D sắc nét trong khung đồng vàng khảm ngọc lam: Mẹ Âu Cơ phúc hậu đội mũ chim Lạc vàng, áo gấm đỏ son thêu vàng, nâng đóa sen tiên phát sáng.',
    promptSummary:
      'Crisp 2D stylized illustration inside luminous gold-and-jade Dong Son medallion: Mother Au Co in golden Lac bird headdress holding radiant fairy lotus.',
    archiveUrl: '/art/Archive_Style1/Hero_AuCo.png',
    archiveLabel: 'Phù điêu đồng cổ',
  },
  {
    id: 'Hero_ThanhGiong',
    fileName: 'Hero_ThanhGiong.png',
    unityPath: 'Assets/Resources/Art/Portraits/Hero_ThanhGiong.png',
    publicUrl: '/art/Portraits/Hero_ThanhGiong.png',
    category: 'Heroes',
    enumName: 'HeroId.ThanhGiong = 3',
    titleVi: 'Phù Đổng Thiên Vương',
    titleEn: 'Saint Giong',
    chapterTag: 'Chương 2 · Phù Đổng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#D8822A',
    descriptionVi:
      'Chân dung minh họa 2D sắc nét trong khung đồng vàng khảm ngọc lam: tráng sĩ Thánh Gióng trẻ trung đội mũ chiến lông chim Lạc, nắm tre đằng ngà bên ngựa sắt rực lửa.',
    promptSummary:
      'Crisp 2D stylized illustration inside luminous gold-and-jade Dong Son medallion: youthful Saint Giong with golden bamboo and fiery iron warhorse.',
    archiveUrl: '/art/Archive_Style1/Hero_ThanhGiong.png',
    archiveLabel: 'Phù điêu đồng cổ',
  },
  {
    id: 'Hero_ChuDongTu',
    fileName: 'Hero_ChuDongTu.png',
    unityPath: 'Assets/Resources/Art/Portraits/Hero_ChuDongTu.png',
    publicUrl: '/art/Portraits/Hero_ChuDongTu.png',
    category: 'Heroes',
    enumName: 'HeroId.ChuDongTu = 4',
    titleVi: 'Chử Đồng Tử',
    titleEn: 'Saint Chu Dong Tu',
    chapterTag: 'Chương 3 · Nhất Dạ Trạch',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#D4A838',
    descriptionVi:
      'Chân dung minh họa 2D sắc nét trong khung đồng vàng khảm ngọc lam: tiên nhân Chử Đồng Tử đội nón lá vàng óng, áo lụa vàng ngọc bích cầm gậy trúc thần bên đầm sen Dạ Trạch.',
    promptSummary:
      'Crisp 2D stylized illustration inside luminous gold-and-jade Dong Son medallion: serene Chu Dong Tu in golden Non La holding glowing bamboo staff.',
    archiveUrl: '/art/Archive_Style1/Hero_ChuDongTu.png',
    archiveLabel: 'Phù điêu đồng cổ',
  },
  {
    id: 'Hero_SonTinh',
    fileName: 'Hero_SonTinh.png',
    unityPath: 'Assets/Resources/Art/Portraits/Hero_SonTinh.png',
    publicUrl: '/art/Portraits/Hero_SonTinh.png',
    category: 'Heroes',
    enumName: 'HeroId.SonTinh = 5',
    titleVi: 'Tản Viên Sơn Thánh',
    titleEn: 'Mountain God Son Tinh',
    chapterTag: 'Chương 4 · Tản Viên',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#B87B28',
    descriptionVi:
      'Phù điêu đồng cổ Đông Sơn tạc Sơn Tinh đội mũ đỉnh núi khảm ngọc lam, tay bắt ấn dời non bên ba ngọn núi Tản Viên.',
    promptSummary:
      'Unified Dong Son bronze bas-relief medallion: Son Tinh in mountain-crest crown with turquoise inlays before Mount Tan Vien.',
  },
  {
    id: 'Hero_ThanKimQuy',
    fileName: 'Hero_ThanKimQuy.png',
    unityPath: 'Assets/Resources/Art/Portraits/Hero_ThanKimQuy.png',
    publicUrl: '/art/Portraits/Hero_ThanKimQuy.png',
    category: 'Heroes',
    enumName: 'HeroId.ThanKimQuy = 6',
    titleVi: 'Thần Kim Quy',
    titleEn: 'Golden Turtle Deity',
    chapterTag: 'Chương 5 · Loa Thành',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#D4A338',
    descriptionVi:
      'Phù điêu vàng ròng và đồng cổ Đông Sơn tạc Rùa Thần Kim Quy nổi trên sóng sông Hồng, mai chạm ngôi sao 14 cánh và chim Lạc thuần kim loại không khảm ngọc.',
    promptSummary:
      'Luminous burnished gold & Dong Son bronze relief medallion: Than Kim Quy with pure engraved golden shell star and Lac birds, no gemstones.',
  },

  // Part D — 7 Enemies + 1 HP2 Overlay
  {
    id: 'Enemy_NguTinhRock',
    fileName: 'Enemy_NguTinhRock.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_NguTinhRock.png',
    publicUrl: '/art/Portraits/Enemy_NguTinhRock.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.NguTinhRock = 1',
    titleVi: 'Đá Ngư Tinh',
    titleEn: 'Ngu Tinh Sea Spirit',
    chapterTag: 'Màn C1_M1 · C4_M2',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#3D5A6C',
    descriptionVi:
      'Chân dung bán thân Ngư Tinh hóa hình người sắc lạnh, ánh mắt sắc lẻm phát sáng, giáp vây đá ngầm gai góc giữa xoáy sóng biển sâu đầy đe dọa.',
    promptSummary:
      'Menacing stylized bust medallion: cold intimidating humanoid Ngu Tinh sea spirit with spiky barnacle armor and glowing slit eyes.',
    archiveUrl: '/art/Archive_Style1/Enemy_NguTinhRock.png',
    archiveLabel: 'Bản dịu nhẹ trước đó',
  },
  {
    id: 'Enemy_HoTinhFog',
    fileName: 'Enemy_HoTinhFog.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_HoTinhFog.png',
    publicUrl: '/art/Portraits/Enemy_HoTinhFog.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.HoTinhFog = 2',
    titleVi: 'Khói Hồ Tinh Chín Đuôi',
    titleEn: 'Nine-Tailed Fox Spirit',
    chapterTag: 'Màn C1_M2 · C3_M2',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#8C4BA8',
    descriptionVi:
      'Chân dung bán thân Hồ Tinh Chín Đuôi hóa hình thiếu nữ tu luyện bên Hồ Tây, tai cáo trắng, ấn đỏ nhẹ trên trán và chín đuôi sương tím dịu mắt.',
    promptSummary:
      'Soothing stylized bust medallion: cultivated nine-tailed fox maiden of West Lake in lavender silk robes amid gentle mist.',
  },
  {
    id: 'Enemy_MocTinhRoot',
    fileName: 'Enemy_MocTinhRoot.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_MocTinhRoot.png',
    publicUrl: '/art/Portraits/Enemy_MocTinhRoot.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.MocTinhRoot = 3',
    titleVi: 'Rễ Mộc Tinh',
    titleEn: 'Ancient Tree Sage',
    chapterTag: 'Màn C1_M3 · Quái 2 HP',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#4E8F52',
    descriptionVi:
      'Chân dung bán thân Mộc Tinh hóa hình trưởng lão rừng sâu tu luyện, vương miện cành lá non và râu rễ cây xanh biếc, ánh mắt ngọc bích trầm ổn.',
    promptSummary:
      'Soothing stylized bust medallion: cultivated ancient tree sage in bark mantle with sprouting leaf antlers and calm jade eyes.',
  },
  {
    id: 'Enemy_BachKeSpirit',
    fileName: 'Enemy_BachKeSpirit.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_BachKeSpirit.png',
    publicUrl: '/art/Portraits/Enemy_BachKeSpirit.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.BachKeSpirit = 4',
    titleVi: 'Bạch Kê Tinh',
    titleEn: 'White Rooster Spirit',
    chapterTag: 'Màn C5_M1 · C5_M3',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#C73E3A',
    descriptionVi:
      'Chân dung bán thân Bạch Kê Tinh hóa hình đạo sĩ trẻ tu luyện, tóc bạc trắng đỉnh mào đỏ rực, khoác áo lông vũ trắng và cầm quạt lông thanh thoát.',
    promptSummary:
      'Soothing stylized bust medallion: cultivated White Rooster Spirit in dashing human form with crimson crest, white feather robes and fan.',
  },
  {
    id: 'Enemy_TrieuDaSoldier',
    fileName: 'Enemy_TrieuDaSoldier.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_TrieuDaSoldier.png',
    publicUrl: '/art/Portraits/Enemy_TrieuDaSoldier.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.TrieuDaSoldier = 5',
    titleVi: 'Quân Lính Triệu Đà',
    titleEn: 'Trieu Da Guard',
    chapterTag: 'Màn C5_M5 · Cổ Loa',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#8C3E32',
    descriptionVi:
      'Chân dung bán thân lính Triệu Đà phong cách cổ trang nhẹ nhàng, đội mũ đồng, cầm kích và khiên tròn trước mây chiều thành Cổ Loa.',
    promptSummary:
      'Gentle stylized bust medallion: northern Trieu Da palace guard in bronze helmet holding halberd and shield at dusk.',
  },
  {
    id: 'Enemy_GiacAnSoldier',
    fileName: 'Enemy_GiacAnSoldier.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_GiacAnSoldier.png',
    publicUrl: '/art/Portraits/Enemy_GiacAnSoldier.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.GiacAnSoldier = 6',
    titleVi: 'Quân Giặc Ân',
    titleEn: 'An Commander',
    chapterTag: 'Chương 2 · Thánh Gióng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#7A4035',
    descriptionVi:
      'Chân dung bán thân tướng Giặc Ân phong cách hoạt họa hóm hỉnh không dữ tợn, đội mũ sừng đồng tròn, giáp vai hoa văn mây cổ trong ánh đèn sương mờ.',
    promptSummary:
      'Approachable stylized bust medallion: proud grumpy Giac An commander in rounded horned helmet and cloud-motif bronze pauldrons.',
  },
  {
    id: 'Enemy_AncientSeal',
    fileName: 'Enemy_AncientSeal.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_AncientSeal.png',
    publicUrl: '/art/Portraits/Enemy_AncientSeal.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.AncientSeal = 7',
    titleVi: 'Phong Ấn Cổ',
    titleEn: 'Ancient Stone Seal',
    chapterTag: 'Màn C1_M5 · C5_M5',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#7D3030',
    descriptionVi:
      'Khối đá huyền vũ cổ bị khóa bởi dây xích đồng và phù ấn đỏ thẫm nứt nẻ, chặn lối trên bàn cờ.',
    promptSummary:
      'Dark enemy medallion: cracked basalt monolith bound in heavy bronze chains and glowing crimson seal.',
  },
  {
    id: 'MocTinhHp2Overlay',
    fileName: 'MocTinhHp2Overlay.png',
    unityPath: 'Assets/Resources/Art/Board/MocTinhHp2Overlay.png',
    publicUrl: '/art/Board/MocTinhHp2Overlay.png',
    category: 'Enemies',
    enumName: 'EnemyHp >= 2 Overlay',
    titleVi: 'Vòng Rễ Gai & Khoá 2 HP',
    titleEn: 'Thorny Chain HP2 Ring',
    chapterTag: 'Assets/Resources/Art/Board/',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#6A5B47',
    descriptionVi:
      'Vòng rễ cây gai góc đan xích đồng bao quanh mép ngoài huy hiệu, rỗng hoàn toàn ở tâm để nhìn xuyên thấy mặt quái bên dưới.',
    promptSummary:
      'Hollow circular perimeter wreath of thorny dark roots and bronze chains with empty transparent center.',
  },

  // Part E — Environment & Board
  {
    id: 'DrumMandala',
    fileName: 'DrumMandala.png',
    unityPath: 'Assets/Resources/Art/Environment/DrumMandala.png',
    publicUrl: '/art/Environment/DrumMandala.png',
    category: 'Environment',
    enumName: 'Environment · Backdrop',
    titleVi: 'Mặt Trống Đồng Xoay Nền',
    titleEn: 'Rotating Bronze Drum Mandala',
    chapterTag: '512×512 · Environment',
    theme: 'JadeBronzeRelief',
    targetWidth: 512,
    targetHeight: 512,
    colorHex: '#9C7B3E',
    descriptionVi:
      'Đĩa tròn mặt trống đồng Ngọc Lũ chạm sao 14 cánh ở tâm, vòng chim Lạc bay ngược chiều kim đồng hồ, đặt xoay chậm sau bàn cờ 8×8.',
    promptSummary:
      'Symmetrical top-down Dong Son bronze drum face with 14-pointed star and counter-clockwise Lac birds.',
  },
  {
    id: 'PlayableCellPlate',
    fileName: 'PlayableCellPlate.png',
    unityPath: 'Assets/Resources/Art/Board/PlayableCellPlate.png',
    publicUrl: '/art/Board/PlayableCellPlate.png',
    category: 'Environment',
    enumName: 'Board · PlayableCellBackdrop',
    titleVi: 'Đế Ô Bàn Cờ Sơn Mài',
    titleEn: 'Playable Cell Plate',
    chapterTag: '256×256 · Board',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#54281B',
    descriptionVi:
      'Ô vuông bo góc nhẹ bằng gỗ sơn mài/đá cổ có viền chỉ vàng mảnh ở mép, trầm màu ở lòng ô để tôn viên gem nổi bật.',
    promptSummary:
      'Rounded square dark warm-brown lacquer and matte slate cell socket with thin gold-leaf edge trim.',
  },
  {
    id: 'ClusterRotateNode',
    fileName: 'ClusterRotateNode.png',
    unityPath: 'Assets/Resources/Art/Board/ClusterRotateNode.png',
    publicUrl: '/art/Board/ClusterRotateNode.png',
    category: 'Environment',
    enumName: 'Board · DrumNode (2×2)',
    titleVi: 'Nút Xoay Cụm 2×2',
    titleEn: 'Cluster Rotate Node',
    chapterTag: '128×128 · Board',
    theme: 'SonMaiGoldGlow',
    targetWidth: 128,
    targetHeight: 128,
    colorHex: '#B87B28',
    descriptionVi:
      'Nút tròn nhỏ đặt ở giao điểm 4 ô gem, chạm ngôi sao đồng 6 cánh và 2 mũi tên vòng cung mảnh chỉ chiều xoay kim đồng hồ.',
    promptSummary:
      'Compact antique bronze circular node with 6-pointed star and curved clockwise golden rotation arrows.',
  },
  {
    id: 'MountainPillar',
    fileName: 'MountainPillar.png',
    unityPath: 'Assets/Resources/Art/Environment/MountainPillar.png',
    publicUrl: '/art/Environment/MountainPillar.png',
    category: 'Environment',
    enumName: 'Environment · Diorama',
    titleVi: 'Dãy Núi Tản Viên / Nghĩa Lĩnh',
    titleEn: 'Tan Vien Mountain Pillar',
    chapterTag: '256×384 · Environment',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 384,
    colorHex: '#2C544B',
    descriptionVi:
      'Đỉnh núi đá vôi Việt Nam dựng đứng hùng vĩ phủ mây mờ khắc gỗ, đặt đối xứng hai bên rìa chân trời phía sau bàn cờ.',
    promptSummary:
      'Vertical karst limestone peaks in jade-slate woodblock style with scrolling mist ribbons.',
  },
  {
    id: 'FloodWaveOverlay',
    fileName: 'FloodWaveOverlay.png',
    unityPath: 'Assets/Resources/Art/Environment/FloodWaveOverlay.png',
    publicUrl: '/art/Environment/FloodWaveOverlay.png',
    category: 'Environment',
    enumName: 'Environment · VFX Wave',
    titleVi: 'Làn Sóng Thủy Triều',
    titleEn: 'Flood Wave Crest',
    chapterTag: '256×256 · Environment',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#3BA8B8',
    descriptionVi:
      'Dải sóng nước cuộn xoáy theo nét khắc gỗ cổ truyền dùng cho hiệu ứng nước dâng và sóng Lạc Long Quân.',
    promptSummary:
      'Swirling sea-teal and jade woodblock flood wave crest with ivory foam tips and gold accents.',
  },
  {
    id: 'CraneEmblem',
    fileName: 'CraneEmblem.png',
    unityPath: 'Assets/Resources/Art/Environment/CraneEmblem.png',
    publicUrl: '/art/Environment/CraneEmblem.png',
    category: 'Environment',
    enumName: 'Environment · ZenLacBird',
    titleVi: 'Cánh Chim Lạc Bay Ngang',
    titleEn: 'Flying Lac Bird Emblem',
    chapterTag: '256×256 · Environment',
    theme: 'DongHoFolkSilk',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#D8A24A',
    descriptionVi:
      'Hình chim Lạc vàng ngà nhìn ngang đang vỗ cánh bay thanh thoát dùng cho hiệu ứng cắt ngang và Zen mode.',
    promptSummary:
      'Side-profile golden-ivory Lac bird flying horizontally with outstretched Dong Son patterned wings.',
  },
  {
    id: 'BuffaloEmblem',
    fileName: 'BuffaloEmblem.png',
    unityPath: 'Assets/Resources/Art/Environment/BuffaloEmblem.png',
    publicUrl: '/art/Environment/BuffaloEmblem.png',
    category: 'Environment',
    enumName: 'Environment · RowSweep',
    titleVi: 'Huy Hiệu Trâu Vàng Húc Phá',
    titleEn: 'Golden Buffalo Emblem',
    chapterTag: '256×256 · Environment',
    theme: 'SonMaiGoldGlow',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#F5C238',
    descriptionVi:
      'Hình trâu vàng Kim Ngưu lao tới dùng trong hiệu ứng càn quét hàng ngang.',
    promptSummary:
      'Charging golden water buffalo Kim Nguu emblem with sweeping horns and bronze harness.',
  },
];
