# Hướng Dẫn Thiết Kế & Sinh Tài Nguyên Đồ Họa Cho AI (Art Bible & Asset Prompt Guide)
**Dự án:** Hào Khí Lạc Hồng — Lĩnh Nam Chích Quái (Match-3 Saga, Mobile Portrait `9:16`)  
**Mục đích:** Tài liệu đặc tả toàn bộ bối cảnh văn hóa, quy chuẩn kỹ thuật, đường dẫn tên file và prompt mẫu để **bất kỳ AI tạo ảnh hoặc công cụ thiết kế nào (kể cả không cài đặt Unity)** có thể tạo ra bộ tài nguyên PNG đồng nhất, đúng tinh thần thần thoại Việt Nam, không bị lệch sang bối cảnh ngoại lai.

---

## 1. Bối Cảnh Văn Hóa & Định Hướng Mỹ Thuật (Art Direction & Lore Bible)

### 1.1. Bối cảnh cốt lõi
- **Nguồn cảm hứng:** Kho tàng thần thoại, truyền thuyết dân gian Việt Nam thời kỳ dựng nước **Hồng Bàng – Văn Lang – Âu Lạc** (dựa trên *Lĩnh Nam Chích Quái* và *Việt Điện U Linh Tập*).
- **Tinh thần chủ đạo:** Hào hùng, cổ kính, đậm bản sắc văn hóa **Đông Sơn – Lạc Việt** (trống đồng, chim Lạc, hoa sen, bông lúa nước, sừng trâu, rồng thời Lý/Đông Sơn uốn lượn mềm mại, nỏ thần Liên Châu, rùa vàng Kim Quy, thành ốc Cổ Loa).
- **Trải nghiệm thị giác:** Game giải đố Match-3 màn hình dọc (`9:16`), kết hợp chất liệu thủ công mỹ nghệ truyền thống Việt Nam: **Tranh khắc gỗ Đông Hồ trên giấy dó điệp**, **Phù điêu đồng cổ Đông Sơn ngả ngọc bích**, và **Tranh sơn mài thếp vàng (Son Mài)**.

### 1.2. 3 Chủ đề chất liệu (Art Themes) theo Chương
1. **`DongHoFolkSilk` (Chương 1 — Khai Thiên Lập Quốc):** Màu sắc mộc mạc, ấm áp của giấy dó, vỏ điệp, lụa tơ tằm, đỏ son, vàng đất, xanh chàm (`Background: #241914`, `BoardFrame: #5E3423`).
2. **`JadeBronzeRelief` (Chương 2, 3, 4 — Thánh Gióng, Chử Đồng Tử, Sơn Tinh):** Chạm khắc đồng xanh Đông Sơn cổ kính, ánh ngọc bích trầm mặc và đá núi Tản Viên (`Background: #14221F` / `#132026`, `BoardFrame: #2C544B` / `#2B4E5C`).
3. **`SonMaiGoldGlow` (Chương 5 — Loa Thành Chiến Ký):** Sơn mài truyền thống Việt Nam với nền đen huyền/đỏ trầm sâu thẳm, họa tiết chạm khắc thếp vàng rực rỡ và ánh sáng xanh lục huyền bí của Thần Kim Quy (`Background: #1E110C`, `BoardFrame: #54281B`).

### 1.3. Quy tắc NGHIÊM CẤM khi sinh ảnh (Negative Prompt bắt buộc)
Để tránh AI vẽ lệch sang bối cảnh nước khác hoặc sai thể loại game, **MỌI prompt sinh ảnh phải loại trừ**:
> **Negative Prompt:** `NO Western medieval knight armor, NO European winged dragons, NO Chinese Qing/Ming dynasty court robes, NO Japanese samurai/katana/torii gates, NO modern/sci-fi/cyberpunk elements, NO glossy plastic Candy Crush jelly style, NO Western faceted diamond/ruby/emerald gems, NO text/letters/numbers/watermarks inside the image, NO busy background outside the icon badge.`

---

## 2. Quy Chuẩn Kỹ Thuật Chung (Dành Cho AI Không Cài Unity)

AI tạo ảnh chỉ cần xuất các tệp **`.png` chuẩn hệ màu `RGBA` (32-bit, có kênh Alpha trong suốt)** và đặt đúng vào thư mục `Assets/Resources/Art/...`. Khi mở Unity sau này, script `Assets/Editor/SpriteImporter.cs` sẽ tự động chuyển tất cả thành `Sprite` (`Pixels Per Unit = 256`, `Single`, tắt Mipmap, bật `AlphaIsTransparency`).

- **Định dạng:** `.png` (`RGBA` 8-bit/channel).
- **Xử lý nền trong suốt (Alpha Channel):**
  - Với **Gem / Tile / Node / Huy hiệu**: Bắt buộc tách sạch nền ngoài thành trong suốt (`Alpha = 0`). Không để viền trắng răng cưa (nên khử viền/feather nhẹ 1–2 px).
  - **Vùng an toàn (Safe Margin):** Chủ thể chính nằm gọn trong khoảng **84%–88%** diện tích trung tâm (chừa lề trong suốt ~12–16px mỗi cạnh trên ảnh `256×256`) để khi gem phồng lên/xoay trên bàn cờ 8×8 không bị cắt mép.
- **Độ phân giải chuẩn:**
  - Gem thường, Gem đặc biệt, Chân dung Hero/Enemy, Huy hiệu: **`256×256` px** (có thể vẽ gốc ở `1024×1024` rồi downsample bằng thuật toán `LANCZOS` về `256×256`).
  - Mặt Trống Đồng xoay nền (`DrumMandala`): **`512×512` px**.
  - Trụ núi Tản Viên (`MountainPillar`): **`256×384` px**.
  - Nút xoay cụm 2×2 (`ClusterRotateNode`): **`128×128` px**.

---

## 3. Danh Mục Chi Tiết Từng Tài Nguyên & Prompt Mẫu

### Phần A — 6 Viên Gem Cơ Bản Trên Bàn Cờ (`TileType`)
**Thư mục lưu:** `Assets/Resources/Art/Tiles/` *(5 loại đầu dùng trong mọi màn Saga v2.0; loại thứ 6 `NonLa` dùng cho chế độ Zen v1).*  
**Thiết kế chung:** Mỗi viên gem là một **huy hiệu/khối tròn vát cạnh 2.5D (medallion/token)** có viền đồng/sơn mài mảnh, nổi bật màu chủ đạo riêng biệt để người chơi nhận diện tức thì trên màn hình điện thoại dọc `9:16`.

| Tên file (`.png`) | Enum (`TileType`) | Màu nhận diện | Biểu tượng & Mô tả chi tiết (Prompt gợi ý) |
|---|---|---|---|
| `LuaVang.png` | `LuaVang = 1` | **Vàng Kim / Hổ Phách** (`#F5C238`) | **Bông Lúa Vàng Lạc Việt:** Khối tròn ngọc hổ phách ấm, chính giữa là nhánh lúa nước chín vàng trĩu hạt uốn cong mềm mại cùng lá lúa xanh ngọc, viền đồng Đông Sơn mảnh, nền ngoài trong suốt (`256×256` RGBA). |
| `SenHong.png` | `SenHong = 2` | **Hồng Sen / Đỏ Đào** (`#E84A7F`) | **Hoa Sen Hồng:** Khối tròn sơn mài hồng thẫm, chính giữa là đóa sen hồng bung nở 5 cánh thanh tao trên đài lá sen xanh và nhụy vàng kim, nền ngoài trong suốt (`256×256` RGBA). |
| `TrongDong.png` | `TrongDong = 3` | **Nâu Đồng / Vàng Cổ** (`#B87B28`) | **Mặt Trống Đồng Ngọc Lũ:** Khối tròn đồng đỏ/đồng thau cổ kính, chính giữa là ngôi sao 12 cánh nổi khối vàng rực cùng các vòng chấm đồng tâm và hoa văn răng cưa Đông Sơn, nền ngoài trong suốt (`256×256` RGBA). |
| `ChimHac.png` | `ChimHac = 4` | **Xanh Lam Ngọc / Trắng Ngà** (`#3BA8B8`) | **Chim Lạc (Chim Hạc) Tung Cánh:** Khối tròn ngọc lam (turquoise/jade), chính giữa là hình chim Lạc trắng ngà/vàng kim sải cánh bay lượn với mỏ dài và mào lông vũ uốn cong theo đúng họa tiết trống đồng Đông Sơn, nền ngoài trong suốt (`256×256` RGBA). |
| `SungTrau.png` | `SungTrau = 5` | **Tím Than / Nâu Đá & Vàng** (`#5C4B6B`) | **Trâu Nước / Cặp Sừng Trâu Vàng:** Khối tròn đá huyền/tím trầm, chính giữa là đầu trâu nước Việt Nam cách điệu mạnh mẽ với cặp sừng cong hình trăng khuyết nạm vàng và khuyên mũi tròn bằng đồng, nền ngoài trong suốt (`256×256` RGBA). |
| `NonLa.png` | `NonLa = 6` | **Xanh Lá Mạ / Vàng Tre** (`#74A847`) | **Nón Lá Quai Lụa:** Khối tròn xanh ngọc bích nhạt, chính giữa là chiếc nón lá chóp nhọn đan nan tre vàng óng kèm dải quai lụa đỏ uốn mềm bên dưới, nền ngoài trong suốt (`256×256` RGBA). |

---

### Phần B — 7 Viên Gem Đặc Biệt (`SpecialGemKind`)
**Thư mục lưu:** `Assets/Resources/Art/Gems/` *(Hệ thống đã nạp tự động 4 file Demo; 3 file Chương 2–4 tạo sẵn để mở rộng).*  
**Thiết kế chung:** Có hào quang linh khí rực rỡ, chi tiết chạm trổ tinh xảo hơn gem thường để nhìn biết ngay là **Gem Đặc Biệt (Power-up)** khi đúc từ Match-4 / L-T.

| Tên file (`.png`) | Enum (`SpecialGemKind`) | Chương / Anh hùng | Mô tả chi tiết & Prompt gợi ý (`256×256` RGBA) |
|---|---|---|---|
| `DragonSeal.png` *(Đang dùng)* | `DragonSeal = 1` | Chương 1 (`Lạc Long Quân`) | **Ấn Rồng Lạc Long Quân:** Ấn ngọc vàng kim chạm hình Rồng Việt cổ (mình uốn lượn mềm mại như sóng nước, bờm lửa, ngậm ngọc sáng xanh biển, không cánh), tỏa hào quang nước và ánh vàng sơn mài. |
| `FairyLotus.png` *(Đang dùng)* | `FairyLotus = 2` | Chương 1 (`Âu Cơ`) | **Sen Tiên Bách Noãn:** Đóa sen tiên 9 cánh phát sáng hồng kim huyền ảo, tâm đài sen nâng bọc trăm trứng tỏa ánh sáng vàng ấm linh thiêng, điểm lá ngọc bích. |
| `IncenseOffering.png` *(Đang dùng)* | `IncenseOffering = 6` | Chương 5 (`An Dương Vương`) | **Lư Trầm / Đỉnh Đồng Cầu Thần:** Đỉnh đồng Đông Sơn ba chân chạm hoa văn sóng nước và chim Lạc, bên trên tỏa làn khói trầm hương phát sáng màu vàng kim và xanh ngọc huyền bí. |
| `DivineCrossbow.png` *(Đang dùng)* | `DivineCrossbow = 7` | Chương 5 (`Thần Kim Quy`) | **Nỏ Thần Liên Châu (Linh Quang Kim Quy Thần Cơ):** Cây nỏ đồng cổ chạm mai rùa vàng Đông Sơn ở báng, lẫy móng rùa thần, trên thân lắp chùm 3 mũi tên đồng đầu phát sáng xanh lam ngọc rực rỡ. |
| `IronBamboo.png` *(Chương 2)* | `IronBamboo = 3` | Chương 2 (`Thánh Gióng`) | **Khóm Tre Đằng Ngà / Roi Sắt:** Bụi tre ngà vàng óng đan quyện cùng chiếc roi sắt rực lửa đỏ cam của Phù Đổng Thiên Vương. |
| `MagicStaff.png` *(Chương 3)* | `MagicStaff = 4` | Chương 3 (`Chử Đồng Tử`) | **Gậy Thần & Nón Tiên:** Cây gậy trúc thần cắm đứng đội chiếc nón lá toả hào quang vàng kim tạo lâu đài trong đêm đầm Dạ Trạch. |
| `MountainJade.png` *(Chương 4)* | `MountainJade = 5` | Chương 4 (`Sơn Tinh`) | **Ngọc Núi Tản Viên / Sách Ước:** Khối ngọc bích núi Tản Viên khắc phù điêu sấm sét và vách đá vững chãi chống lũ. |

---

### Phần C — 6 Chân Dung Anh Hùng (`HeroId`)
**Thư mục lưu:** `Assets/Resources/Art/Portraits/` *(Đặt tên chính xác `Hero_<HeroId>.png`).*  
**Thiết kế chung:** Chân dung nửa người trên nằm trong **khung huy hiệu tròn bằng đồng chạm hoa văn Đông Sơn**, nền ngoài khung tròn hoàn toàn trong suốt (`256×256` RGBA).

| Tên file (`.png`) | Enum (`HeroId`) | Mô tả tạo hình văn hóa Việt Nam chuẩn (`256×256` RGBA) |
|---|---|---|
| `Hero_LacLongQuan.png` *(Đang dùng)* | `LacLongQuan = 1` | **Đức Lạc Long Quân:** Vị thần nòi Rồng uy nghiêm, gương mặt góc cạnh cương nghị, đội mũ/mão đồng chạm sừng rồng và lông chim Lạc, giáp vảy rồng đồng thau pha ngọc lam, phía sau là sóng biển Đông và hào quang mặt trời trống đồng. |
| `Hero_AuCo.png` *(Đang dùng)* | `AuCo = 2` | **Mẹ Âu Cơ:** Tiên nữ dòng Tiên thanh cao, nhân từ, mặc áo lụa gấm truyền thống đỏ son – vàng kim, khăn vấn và trâm cài đầu hình chim phượng/chim Lạc, tay nâng dải lụa và hoa sen sáng, nền mây núi non ngàn. |
| `Hero_ThanKimQuy.png` *(Đang dùng)* | `ThanKimQuy = 6` | **Thần Kim Quy (Sứ Thanh Giang):** Rùa Thần khổng lồ bằng vàng ròng và đồng cổ, mai rùa khắc nổi ngôi sao trống đồng Đông Sơn phát sáng xanh ngọc lục bảo, đôi mắt rực sáng trí tuệ uy linh giữa làn nước sông Hồng. |
| `Hero_ThanhGiong.png` *(Chương 2)* | `ThanhGiong = 3` | **Phù Đổng Thiên Vương (Thánh Gióng):** Dũng sĩ mặc giáp sắt cổ Việt Nam, đội mũ sắt chạm hoa văn Đông Sơn, tay cầm cụm tre ngà vàng óng, sau lưng là ngựa sắt phun lửa đỏ rực. |
| `Hero_ChuDongTu.png` *(Chương 3)* | `ChuDongTu = 4` | **Chử Đồng Tử:** Chàng trai hiếu thảo hóa tiên nhân hiền từ, khoác áo vải mộc và choàng lụa vàng, cầm gậy trúc và nón lá thần giữa sương khói đầm Nhất Dạ Trạch. |
| `Hero_SonTinh.png` *(Chương 4)* | `SonTinh = 5` | **Sơn Tinh (Tản Viên Sơn Thánh):** Thần núi Tản Viên vạm vỡ, oai phong, giáp đồng khắc họa tiết đá núi và rừng xanh, tay chỉ ấn dời non lấp bể, phía sau là ba đỉnh núi Tản Viên. |

---

### Phần D — 7 Chân Dung / Ô Quân Địch & Lớp Phủ HP (`EnemyTileKind`)
**Thư mục lưu:** `Assets/Resources/Art/Portraits/` *(Đặt tên chính xác `Enemy_<EnemyTileKind>.png`).*  
**Thiết kế chung:** Ô quân địch vừa dùng làm icon mục tiêu trên HUD vừa hiển thị trực tiếp trên ô bàn cờ bị chiếm đóng. Trình bày trong **khung huy hiệu tròn tối màu (đá đen/đồng sẫm/viền đỏ tà khí)** để tương phản rõ với các viên gem sáng màu xung quanh (`256×256` RGBA).

| Tên file (`.png`) | Enum (`EnemyTileKind`) | Xuất hiện ở | Mô tả tạo hình (`256×256` RGBA) |
|---|---|---|---|
| `Enemy_NguTinhRock.png` *(Đang dùng)* | `NguTinhRock = 1` | Màn `C1_M1`, `C4_M2` | **Đá Ngư Tinh (Quái Cá Biển Khơi):** Quái ngư khổng lồ nhiều đuôi có vảy đá xám xanh sắc nhọn như rạn đá ngầm, mắt đỏ hung dữ giữa xoáy nước đen. |
| `Enemy_HoTinhFog.png` *(Đang dùng)* | `HoTinhFog = 2` | Màn `C1_M2`, `C3_M2` | **Khói Hồ Tinh (Cáo Chín Đuôi Đầm Xác Cáo):** Mặt hồ ly trắng chín đuôi tà mị theo truyền thuyết Hồ Tây, mắt đỏ rực có ấn đỏ trên trán, bao quanh bởi chướng khí tím sẫm. |
| `Enemy_MocTinhRoot.png` *(Đang dùng)* | `MocTinhRoot = 3` | Màn `C1_M3` *(Quái 2 HP)* | **Rễ Mộc Tinh (Quỷ Xương Cuồng Cây Chiên Đàn):** Yêu thụ cổ thụ ngàn năm với gương mặt gỗ vặn vẹo, mắt phát sáng xanh lục ma quái và chằng chịt rễ cây gai góc. |
| `Enemy_BachKeSpirit.png` *(Đang dùng)* | `BachKeSpirit = 4` | Màn `C5_M1`, `C5_M3` | **Bạch Kê Tinh (Yêu Gà Trắng Núi Thất Diệu):** Yêu tinh gà trống lông trắng muốt ma mị ẩn dưới quán trọ núi Thất Diệu, mào đỏ máu, mỏ và cựa sắc nhọn tỏa tà khí xanh tím phá đổ tường thành. |
| `Enemy_TrieuDaSoldier.png` *(Đang dùng)* | `TrieuDaSoldier = 5` | Màn `C5_M5` | **Quân Lính Triệu Đà:** Binh lính xâm lược phương Bắc cổ đại đội mũ giáp đồng sẫm che mặt hung hãn, cầm giáo kích và khiên đồng vây hãm thành Cổ Loa. |
| `Enemy_AncientSeal.png` *(Đang dùng)* | `AncientSeal = 7` | Màn `C1_M5`, `C5_M5`... | **Phong Ấn Cổ / Chướng Khí Đá:** Khối đá huyền vũ cổ bị khóa bởi dây xích đồng và phù ấn đỏ thẫm nứt nẻ, chặn lối trên bàn cờ. |
| `Enemy_GiacAnSoldier.png` *(Chương 2)* | `GiacAnSoldier = 6` | Chương 2 (`Thánh Gióng`) | **Quân Giặc Ân:** Tướng giặc Ân giáp đồng đen thô kệch, mặt dữ tợn giữa khói lửa chiến trường. |
| `MocTinhHp2Overlay.png` *(Tùy chọn)* | Lớp phủ khi `EnemyHp >= 2` | `Assets/Resources/Art/Board/` | **Vòng Rễ Gai / Giáp Khoá 2 Máu:** Vòng rễ cây gai góc hoặc viền xích đồng bao quanh mép ngoài huy hiệu (`256×256` RGBA, rỗng ở tâm để nhìn xuyên thấy mặt quái bên dưới). |

---

### Phần E — Môi Trường Nền, Diorama & Khung Bàn Cờ (`Environment` & `Board`)
**Thư mục lưu:** `Assets/Resources/Art/Environment/` và `Assets/Resources/Art/Board/`  
*(Các phần tử tạo nên bức tranh sâu khấu văn hóa phía sau và xung quanh lưới 8×8).*

| Tên file (`.png`) | Kích thước | Vai trò trong game & Mô tả thiết kế |
|---|---|---|
| `DrumMandala.png` | `512×512` RGBA | **Vòng Trống Đồng Đông Sơn Xoay Nền:** Đĩa tròn hoa văn mặt trống đồng Ngọc Lũ/Hoàng Hạ bán trong suốt, chạm sao 14 cánh ở tâm, vòng chim Lạc bay ngược chiều kim đồng hồ, đặt xoay chậm phía sau bàn cờ 8×8. |
| `PlayableCellPlate.png` | `256×256` RGBA | **Đế Ô Bàn Cờ (`PlayableCellBackdrop`):** Ô vuông bo góc nhẹ bằng gỗ sơn mài/đá cổ có viền chỉ vàng mảnh ở mép, hơi trầm màu ở lòng ô để tôn viên gem bên trên nổi bật (chỉ hiện ở ô chơi được `#`, ẩn ở ô lỗ `.`). |
| `ClusterRotateNode.png` | `128×128` RGBA | **Nút Xoay Cụm 2×2 (`DrumNode`):** Nút tròn nhỏ đặt ở giao điểm 4 ô gem, chạm hình ngôi sao đồng 6 cánh và 2 mũi tên vòng cung mảnh chỉ chiều xoay kim đồng hồ. |
| `MountainPillar.png` | `256×384` RGBA | **Dãy Núi Tản Viên / Núi Nghĩa Lĩnh:** Hình bóng (silhouette) đỉnh núi đá vôi Việt Nam dựng đứng hùng vĩ phủ mây mờ, đặt đối xứng hai bên rìa chân trời phía sau bàn cờ. |
| `FloodWaveOverlay.png` | `256×256` RGBA | **Làn Sóng Thủy Tinh / Thủy Triều:** Dải sóng nước cuộn xoáy theo nét khắc gỗ cổ truyền (dùng cho hiệu ứng nước dâng và sóng Lạc Long Quân). |
| `CraneEmblem.png` | `256×256` RGBA | **Cánh Chim Lạc Bay Ngang Trời (`ZenLacBird`):** Hình chim Lạc vàng ngà nhìn ngang đang vỗ cánh bay thanh thoát. |
| `BuffaloEmblem.png` | `256×256` RGBA | **Huy Hiệu Trâu Vàng Húc Phá:** Hình trâu vàng Kim Ngưu lao tới dùng trong hiệu ứng càn quét hàng ngang. |

---

## 4. Tóm Tắt Bối Cảnh Nội Dung 5 Chương (`SagaCatalog.json`) Để AI Giữ Đúng Mạch Truyện

Khi cần vẽ thêm tranh nền chương (`1080×1920` dọc) hoặc minh họa cắt cảnh (`StoryCutsceneModal`), AI phải bám sát nội dung của từng Chương sau:

1. **Chương 1 — Hồng Bàng Khai Quốc (Lạc Long Quân & Âu Cơ) [Đã mở khóa Demo]:**
   - *Màn 1.1:* Lạc Long Quân trừ Ngư Tinh ở biển Đông (`SHAPE_BOAT_HULL`).
   - *Màn 1.2:* Dẹp Hồ Tinh chín đuôi ở Đầm Xác Cáo / Hồ Tây (`SHAPE_FOX_CAVERN`).
   - *Màn 1.3:* Duyên kỳ ngộ Lạc Long Quân – Âu Cơ & phá Mộc Tinh (`SHAPE_BANYAN_TRUNK`).
   - *Màn 1.4:* Điềm lành Bọc Trăm Trứng nở trăm người con (`SHAPE_HUNDRED_EGGS`).
   - *Màn 1.5:* Năm mươi con lên núi, năm mươi con xuống biển, dựng nước Văn Lang (`SHAPE_SPLIT_PATH`).
2. **Chương 2 — Phù Đổng Thiên Vương (Thánh Gióng Phá Giặc Ân) [Khóa ở Demo]:**
   - Roi sắt, ngựa sắt phun lửa, nhổ tre đằng ngà quét sạch giặc Ân rồi bay về trời tại núi Sóc.
3. **Chương 3 — Đầm Nhất Dạ Trạch (Chử Đồng Tử & Tiên Dung) [Khóa ở Demo]:**
   - Mối duyên kỳ ngộ bên bãi cát sông Hồng, gậy thần nón tiên hóa hiện thành quách lâu đài trong một đêm.
4. **Chương 4 — Đại Chiến Núi Tản Viên (Sơn Tinh & Thủy Tinh) [Khóa ở Demo]:**
   - Lễ vật Voi chín ngà, Gà chín cựa, Ngựa chín hồng mao; dâng núi chặn đứng lũ dữ của Thủy Tinh.
5. **Chương 5 — Loa Thành Chiến Ký (An Dương Vương & Thần Kim Quy) [Đã mở khóa Demo]:**
   - *Màn 5.1:* Xây thành ốc Cổ Loa bên sông Hoàng Giang屢 bị đổ (`SHAPE_SPIRAL_CITADEL`).
   - *Màn 5.2:* Lập đàn cầu đảo, Rùa Vàng Thần Kim Quy hiện lên chỉ rõ yêu quái (`SHAPE_TURTLE_SHELL`).
   - *Màn 5.3:* Diệt Bạch Kê Tinh ẩn dưới núi Thất Diệu, xây xong Loa Thành (`SHAPE_FOX_CAVERN`).
   - *Màn 5.4:* Thần Kim Quy trao vuốt làm lẫy Nỏ Thần Liên Châu (`SHAPE_CROSSBOW_ARC`).
   - *Màn 5.5:* Đại chiến bảo vệ Thành Cổ Loa trước vạn quân Triệu Đà bằng mưa tên Nỏ Thần và chiêu Kim Quy Chấn Địa (`SHAPE_CROSSBOW_ARC`).

---

## 5. Mẫu Câu Lệnh (Prompt) Copy-Paste Cho AI Mới

Bạn có thể copy đoạn dưới đây gửi trực tiếp cho AI mới khi bắt đầu phiên làm việc:

```text
Hãy đọc toàn bộ file hướng dẫn `docs/superpowers/AI_ART_ASSET_GENERATION_GUIDE_VI.md` và `docs/superpowers/ASSET_STORE_IMPORT_GUIDE_VI.md` trong dự án `c:\Users\Admin\PJ\Match3`.
Nhiệm vụ của bạn là tạo bộ tài nguyên ảnh PNG RGBA (nền trong suốt, kích thước chuẩn 256x256 px, chừa lề an toàn 12-16px) cho game Match-3 "Hào Khí Lạc Hồng — Lĩnh Nam Chích Quái".
Yêu cầu bắt buộc:
1. Không cần chạy hay cài đặt Unity. Chỉ xuất file .png chuẩn RGBA vào đúng đường dẫn trong `Assets/Resources/Art/...`.
2. Tuyệt đối tuân thủ phong cách văn hóa Đông Sơn – Văn Lang – Âu Lạc (Tranh dân gian Đông Hồ, Đồng cổ ngọc bích, Sơn mài thếp vàng). Không vẽ theo phong cách Trung Hoa, Nhật Bản, hay Fantasy phương Tây.
3. Kiểm tra từng ảnh sau khi tạo: phải có kênh Alpha trong suốt ở 4 góc (`alpha == 0`), không có viền trắng rác và không có chữ/text bên trong icon.
```
