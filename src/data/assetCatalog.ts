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
      'Đĩa tròn sơn mài mịn màu vàng hổ phách (#F5C238) viền đồng mảnh 6 px đồng bộ SenHong, chính giữa là nhánh lúa chín vàng cong kèm lá lúa xanh ngọc.',
    promptSummary:
      'Circular smooth amber-gold (#F5C238) lacquer medallion matching SenHong 6px bronze rim, crisp curved ripe golden rice stalks with jade leaves.',
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
    colorHex: '#C86D3B',
    descriptionVi:
      'Đĩa tròn sơn mài 2D màu cam đất nung / đồng đỏ (#C86D3B) viền đồng mảnh 6 px, ngôi sao 12 cánh đồng đúc nổi gọn tâm (~25% đường kính) cùng 3 vòng hoa văn chấm nổi, chữ S và Chim Lạc nét to rõ ở 64 px.',
    promptSummary:
      'Terracotta copper-orange (#C86D3B) 2D Dong Son bronze drum medallion with 6px rim, compact 25% sculpted 12-point bronze star and 3 deeply-carved concentric rings.',
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
      'Đĩa tròn sơn mài mịn màu xanh lam ngọc (#3BA8B8) viền đồng trơn mảnh 6 px, chính giữa là Chim Lạc Đông Sơn trắng ngà viền vàng mỏ dài thẳng và cánh kỷ hà.',
    promptSummary:
      'Circular smooth turquoise-jade (#3BA8B8) lacquer medallion with thin 6px bronze rim and soaring stylized Dong Son Lac bird.',
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
    colorHex: '#8E5BB8',
    descriptionVi:
      'Đĩa tròn sơn mài Tím Hoàng Gia tâm sáng (#8E5BB8 -> #56307A) viền đồng mảnh 6 px đồng bộ ChimHac, họa tiết Trâu Nước Đông Sơn chạm vàng ngà cách điệu với cặp sừng trăng khuyết khắc vân xoắn.',
    promptSummary:
      'Luminous royal violet-amethyst (#8E5BB8 to #56307A) lacquer medallion with 6px rim, stylized golden-ivory Dong Son carved water buffalo motif matching ChimHac.',
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
      'Khung bát giác đồng vàng – ngọc bích thanh mảnh (12%) đính đúng 4 viên ngọc lam (12/3/6/9 giờ) trên nền sóng biển #195C66; Rồng Việt cổ không cánh cuộn gọn uy nghiêm hoàn toàn trong khung, ôm viên ngọc biển sáng rực.',
    promptSummary:
      'Slender 12% gold-jade octagonal frame with 4 cardinal turquoise gems over #195C66 sea-teal swirl: wingless golden Dong Son dragon tightly coiled inside frame cradling glowing cyan pearl.',
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
      'Khung bát giác sơn mài đỏ thẫm viền vàng mảnh (12%) đính 4 viên ngọc hồng-vàng trên nền #6E2C45; đóa sen tiên 9 cánh hồng phấn bung nở lớn chớm phá khung, nâng bọc lụa vàng chứa cụm trứng vàng rực sáng.',
    promptSummary:
      'Slender 12% crimson-gold octagonal frame with 4 pink-gold cardinal gems over #6E2C45 rose-plum glow: blooming 9-petal pastel lotus overlapping rim cradling golden silk egg pouch.',
  },
  {
    id: 'IronBamboo',
    fileName: 'IronBamboo.png',
    unityPath: 'Assets/Resources/Art/Gems/IronBamboo.png',
    publicUrl: '/art/Gems/IronBamboo.png',
    category: 'Gems',
    enumName: 'SpecialGemKind.IronBamboo = 3',
    titleVi: 'Tre Đằng Ngà & Roi Sắt',
    titleEn: 'Ivory Bamboo & Iron Baton',
    chapterTag: 'Chương 2 · Thánh Gióng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#E06428',
    descriptionVi:
      'Khung bát giác thép rèn & đồng sáng thanh mảnh (12%) đính 4 ngọc hổ phách cam trên nền #315C53; thanh Roi Sắt thẳng cứng có khớp lửa rèn bắt chéo cùng thân Tre Đằng Ngà vàng óng nằm gọn hoàn toàn trong viền khung.',
    promptSummary:
      'Slender 12% forged-steel & bronze octagonal frame with 4 amber cardinal gems over #315C53 jade-amber: crossed rigid iron baton with ember joints and golden bamboo cleanly contained inside frame.',
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
      'Khung bát giác đồng vàng khắc vân mây thanh mảnh (12%) đính 4 ngọc lam sáng trên nền trời hoàng hôn #315E6E; cây gậy trúc thần đặt chéo nâng nón lá vàng phát hào quang dịu nằm gọn hoàn toàn bên trong viền bát giác.',
    promptSummary:
      'Slender 12% gold-bronze cloud-scroll octagonal frame with 4 cyan cardinal gems over #315E6E twilight teal: diagonal bamboo staff supporting softly glowing golden Non La hat strictly contained inside frame.',
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
      'Khung bát giác đồng – đá chạm thanh mảnh (12%) đính 4 viên ngọc lục bảo trên nền #225E54; ba đỉnh núi Tản Viên tạc ngọc bích đa diện lớn nổi khối cùng mây trắng kem và dải lụa hào quang vàng mềm.',
    promptSummary:
      'Slender 12% bronze-stone octagonal frame with 4 emerald cardinal gems over #225E54 jade-teal: sculptural faceted emerald-jade Tan Vien triple peaks with cream clouds and golden ribbon.',
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
      'Khung bát giác đồng đỏ khắc vân lửa thanh mảnh (12%) đính 4 viên ngọc hổ phách trên nền sơn mài đỏ son rực ấm (#782418); đỉnh đồng Đông Sơn 3 chân lớn tỏa làn khói linh khí vàng – lam uốn lượn gọn gàng hoàn toàn trong khung.',
    promptSummary:
      'Slender 12% red-copper flame-engraved octagonal frame with 4 amber cardinal gems over #782418 cinnabar glow: prominent 3-legged Dong Son bronze cauldron with gold-teal spirit smoke contained neatly inside frame.',
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
      'Chuẩn Nỏ Thần v3: khung bát giác đồng vàng thanh mảnh (12%) đính đúng 4 viên ngọc lam (12/3/6/9 giờ) trên trường năng lượng ngọc bích sáng; cây Nỏ Thần gỗ sơn mài đỏ đặt chéo 45° lắp mũi tên linh quang lam ngọc vươn phá mép khung trên-phải.',
    promptSummary:
      'Anchor v3 slender 12% beveled gold-bronze octagonal frame with 4 turquoise cardinal gems over glowing turquoise-jade field: 45-degree diagonal lacquered Divine Crossbow with cyan spirit arrow breaking upper-right rim.',
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
      'Huy hiệu minh họa 2D nét thanh trong khung đồng vàng khảm ngọc lam: tráng sĩ Thánh Gióng trẻ tuổi mặc giáp sắt Đông Sơn góc 3/4, cưỡi ngựa sắt hóa sống phun lửa vàng cam, tay vung roi sắt thẳng cứng có đốt tre.',
    promptSummary:
      '2D cel-shaded action medallion matching Lac Long Quan frame: youthful Saint Giong riding living forged-iron warhorse breathing flame, wielding rigid bamboo-segmented iron baton.',
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
      'Bố cục góc 3/4 từ đầu gối trở lên trong khung đồng ngọc Lạc Long Quân: chàng trai trẻ Chử Đồng Tử mặt không râu đội nón lá, mình trần mặc khố nâu mộc chống gậy trúc phát sáng bên đầm Dạ Trạch.',
    promptSummary:
      '2D cel-shaded 3/4 knee-up medallion: youthful clean-shaven Chu Dong Tu in Non La, bare-chested in rustic brown loincloth with glowing bamboo staff in marsh.',
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
    colorHex: '#2E9E75',
    descriptionVi:
      'Minh họa 2D góc 3/4 trong khung đồng vàng khảm ngọc lam: Sơn Tinh trẻ trung đội mũ đồng ba đỉnh núi, mặc giáp Đông Sơn, tay cầm cuộn thẻ tre và dâng ba ngọn núi Tản Viên xanh ngọc.',
    promptSummary:
      '2D cel-shaded 3/4 action medallion: youthful mountain god Son Tinh in Dong Son bronze armor holding bamboo scripture scroll and lifting three emerald Tan Vien peaks.',
    archiveUrl: '/art/Archive_Style1/Hero_SonTinh.png',
    archiveLabel: 'Phù điêu đồng cổ',
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
      'Minh họa 2D góc 3/4 trong khung đồng vàng khảm ngọc lam: Cụ Rùa Vàng Thần Kim Quy mai chạm sao Đông Sơn 14 cánh rẽ sóng sông Hoàng Giang trước thành xoắn ốc Cổ Loa, trao vuốt vàng ngọc lam.',
    promptSummary:
      '2D cel-shaded 3/4 medallion: benevolent Golden Turtle Deity gliding on sunlit river ripples before Co Loa spiral ramparts, presenting luminous golden-turquoise claw.',
    archiveUrl: '/art/Archive_Style1/Hero_ThanKimQuy.png',
    archiveLabel: 'Phù điêu đồng cổ',
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
      'Minh họa 2D trong khung đồng cổ sẫm khảm 4 viên ngọc tím-đỏ (12/3/6/9 giờ): nguyên hình đại ngư thủy quái vảy đá xám xanh góc 3/4 uốn mình giữa bọt sóng biển.',
    promptSummary:
      '2D folk medallion in dark antique bronze frame with 4 plum-crimson cardinal gems: giant rocky sea-fish monster curving through teal sea foam.',
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
    colorHex: '#D9A77C',
    descriptionVi:
      'Minh họa 2D chuẩn sáng nền giấy dó trong khung đồng cổ khảm 4 ngọc đỏ-hổ phách: nguyên hình cáo trắng 4 chân chín đuôi mang ấn lửa đỏ trên trán, bước trong sương hoàng hôn vàng-hồng ấm (#D9A77C, không ám tím).',
    promptSummary:
      'Daylight-readable 2D folk medallion in dark bronze 4-gem frame: feral quadruped white nine-tailed fox with crimson forehead mark inside warm sunlit rose-amber & peach dawn mist (0% purple).',
  },
  {
    id: 'Enemy_MocTinhRoot',
    fileName: 'Enemy_MocTinhRoot.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_MocTinhRoot.png',
    publicUrl: '/art/Portraits/Enemy_MocTinhRoot.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.MocTinhRoot = 3',
    titleVi: 'Rễ Mộc Tinh',
    titleEn: 'Ancient Tree Monster',
    chapterTag: 'Màn C1_M3 · Quái 2 HP',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#8A5E3B',
    descriptionVi:
      'Minh họa 2D sáng rõ trên nền giấy dó trong khung đồng cổ khảm 4 ngọc đỏ-hổ phách: gốc đa cổ thụ vỏ gỗ nâu hổ phách sáng (#8A5E3B), rêu xanh nổi khối và mạch linh khí ngọc lục bảo dẫn lên 2 hốc mắt sáng trên nền sương rừng vàng-ô liu (#B4C49A).',
    promptSummary:
      'Daylight-readable 2D folk medallion in dark bronze 4-gem frame: sunlit amber-brown banyan tree trunk monster with emerald spirit veins and hollow luminous emerald eyes against pale olive-gold mist.',
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
      'Minh họa 2D trong khung đồng cổ sẫm khảm 4 ngọc tím-đỏ: nguyên hình yêu gà trống lông trắng ánh bạc mào đỏ son, cựa vàng đậu trên mỏm đá sương tím-xanh dịu.',
    promptSummary:
      '2D folk medallion in dark bronze 4-gem frame: supernatural pearlescent white rooster beast with crimson comb perched on misty crag.',
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
    colorHex: '#5B6874',
    descriptionVi:
      'Minh họa 2D sáng rõ trong khung sắt xám cổ khảm 4 viên ngọc đỏ thẫm (không dùng sắc vàng chính nghĩa): thế thủ 3/4 chiến binh Triệu Đà giáp phiến sắt thép lạnh phối áo lót & khiên sơn đỏ son vân xoắn, nền sương bão xám bạc sáng rõ trên nền giấy dó (#C6D0D6, 0% tím).',
    promptSummary:
      'Daylight-readable 2D folk medallion in cold gunmetal-iron 4-crimson-gem frame (zero heroic gold): 3/4 guard pose Trieu Da soldier in steel lamellar armor with crimson lacquer spiral shield over bright pale storm-slate mist (0% purple).',
  },
  {
    id: 'Enemy_GiacAnSoldier',
    fileName: 'Enemy_GiacAnSoldier.png',
    unityPath: 'Assets/Resources/Art/Portraits/Enemy_GiacAnSoldier.png',
    publicUrl: '/art/Portraits/Enemy_GiacAnSoldier.png',
    category: 'Enemies',
    enumName: 'EnemyTileKind.GiacAnSoldier = 6',
    titleVi: 'Quân Giặc Ân',
    titleEn: 'An Vanguard',
    chapterTag: 'Chương 2 · Thánh Gióng',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#9E2F2C',
    descriptionVi:
      'Minh họa 2D sáng rõ trong khung sắt đen cổ khảm 4 viên ngọc đỏ thẫm (không dùng sắc vàng chính nghĩa): thế công 3/4 chiến binh Giặc Ân giáp sắt rèn lạnh, chùm lông mũ & áo choàng đỏ son, khiên đinh tán sắt – đỏ và rìu chiến trên nền khói tro sáng pha hồng tro (#CBC4C2, 0% tím).',
    promptSummary:
      'Daylight-readable 2D folk medallion in dark tarnished-iron 4-crimson-gem frame (zero heroic gold): 3/4 combat pose An vanguard in blackened steel armor, crimson plume & cloak, iron-studded crimson shield over bright pale ash-grey smoke with subtle cinder haze (0% purple).',
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
      'Minh họa 2D trong khung đồng cổ sẫm khảm 4 ngọc tím-đỏ: bia đá cổ rêu phong chạm vân xoắn Đông Sơn quấn dây thừng bện và xích đồng, tâm phát ánh sáng hồng-hổ phách dịu.',
    promptSummary:
      '2D folk medallion in dark bronze 4-gem frame: moss-covered Vietnamese stone stele with Dong Son spirals, braided hemp ropes, bronze chains, and soft ruby-amber glow.',
  },
  {
    id: 'MocTinhHp2Overlay',
    fileName: 'MocTinhHp2Overlay.png',
    unityPath: 'Assets/Resources/Art/Board/MocTinhHp2Overlay.png',
    publicUrl: '/art/Board/MocTinhHp2Overlay.png',
    category: 'Enemies',
    enumName: 'EnemyHp >= 2 Overlay',
    titleVi: 'Vòng Rễ Gai & Khoá 2 HP',
    titleEn: 'Thorny Vine HP2 Ring',
    chapterTag: 'Assets/Resources/Art/Board/',
    theme: 'JadeBronzeRelief',
    targetWidth: 256,
    targetHeight: 256,
    colorHex: '#6A5B47',
    descriptionVi:
      'Vòng rìa 2D mảnh gồm dây leo xanh rêu, rễ gai nâu ấm, xích đồng và 4 nút thắt vòng đồng Đông Sơn ở 4 hướng; tâm rỗng hoàn toàn >= 72% đường kính để thấy rõ chân dung quái.',
    promptSummary:
      'Ultra-thin 2D perimeter wreath overlay with empty >=72% transparent center: mossy vines, thorny roots, bronze chains, and 4 Dong Son bronze ring clasps.',
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
    colorHex: '#B9AD82',
    descriptionVi:
      'Đĩa tròn mặt trống đồng Ngọc Lũ 2D dịu mắt tông vàng đồng pha ngọc bích nhạt, độ tương phản thấp giữa sao 14 cánh và vòng chim Lạc để làm nền xoay sau bàn cờ 8×8.',
    promptSummary:
      'Low-contrast 2D Dong Son bronze drum mandala backdrop in pale antique gold and muted jade patina with 14-point sun star and flying Lac birds.',
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
    colorHex: '#4A2C22',
    descriptionVi:
      'Đế ô vuông bo góc sơn mài gỗ gụ nâu ấm trung tính (#4A2C22) kèm viền chỉ vàng mảnh, kích thước khít 89.8% (230 px) để tôn gem sáng bên trên lưới 8×8.',
    promptSummary:
      'Rounded-square neutral warm mahogany-umber lacquer cell socket (#4A2C22) with thin muted gold-leaf border spanning ~90% width.',
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
    colorHex: '#D8A24A',
    descriptionVi:
      'Nút tròn nhỏ 128×128 tông vàng đồng ấm sáng (#D8A24A) đồng bộ khung Anh hùng, chạm ngôi sao Đông Sơn 6 cánh và các mũi tên xoay chiều kim đồng hồ.',
    promptSummary:
      'Sunlit warm antique bronze rotation node (#D8A24A) engraved with 6-pointed Dong Son star and golden clockwise rotation arrows.',
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
      'Linh vật Trâu Vàng Kim Ngưu tách nền hoàn toàn (không khung khiên tròn) đồng bộ CraneEmblem: cặp sừng trâu nước cong rộng hình trăng khuyết, yếm vải Đông Sơn và dải mây vàng – ngọc dưới vó.',
    promptSummary:
      'Standalone isolated 2D golden Vietnamese water buffalo Kim Nguu silhouette matching CraneEmblem, wide backward crescent horns over compact golden-teal clouds.',
  },
];
