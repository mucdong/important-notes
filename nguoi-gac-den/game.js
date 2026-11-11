'use strict';

/* =========================================================
   NGƯỜI GÁC ĐÈN CUỐI CÙNG
   Dòng radio dùng [[...]] cho những từ luôn bị nhiễu khi radio chưa sửa.
   ========================================================= */

const SAVE_KEY = 'ngdcc_save_v1';
const ENDINGS_KEY = 'ngdcc_endings_v1';
const MAX_SANITY = 10;
const MAX_OIL = 10;
const MAX_FOOD = 8;
const AP_PER_DAY = 2;
const RADIO_FIX_NEEDED = 2;
const TOTAL_PAGES = 6;
const LAST_NIGHT = 7;

const R = (t) => ({ who: 'radio', t });
const N = (t) => ({ who: 'narr', t });

/* ---------------- Trang nhật ký ---------------- */
const PAGES = [
  'Ngày thứ nhất. Hòn đảo này không có tên trên bản đồ. Tôi không nhớ mình đến đây bằng cách nào. Tôi chỉ biết mình phải giữ cho đèn sáng.',
  'Radio lại kêu. Tôi không dám trả lời. Có những giọng nói mà một khi đã nghe, ta không bao giờ quên được nữa.',
  'Tôi để ý rằng không con tàu nào tôi dẫn đường từng cập bến. Chúng tiến lại gần ánh đèn rồi tan vào sương. Thứ duy nhất ở lại là những giấc mơ.',
  'Đêm qua tôi nghe tiếng trẻ con cười lẫn trong tiếng sóng. Trên đảo này không có đứa trẻ nào cả.',
  'Tôi so chữ trong cuốn sổ này với chữ của chính mình, và chúng giống nhau đến từng nét. Có lẽ người gác đèn trước đã... Không. Có lẽ trước tôi chẳng có người gác đèn nào hết.',
  'Nếu ai đó đọc được dòng này: đèn không dành cho những con tàu, mà dành cho người đứng trên tháp. Chiếc thuyền con dưới chân đảo vẫn chèo được.',
];

/* ---------------- Những thứ biển dạt vào ---------------- */
const BEACH = [
  'Sóng đánh dạt vào một chiếc phao cứu sinh đã bạc màu. Hàng chữ trên phao mờ gần hết, chỉ còn đọc được: "...AO MAI".',
  'Trên cát có một vỏ ốc to bằng nắm tay. Lắc lên, bạn nghe bên trong có một hạt cườm đỏ lăn lóc cóc.',
  'Một con diều giấy bị rách, khung tre vẫn còn nguyên. Ai lại thả diều giữa biển?',
  'Một chiếc lông hải âu mắc vào mảnh khăn voan trắng. Mảnh khăn thoang thoảng mùi nước hoa rẻ tiền, thứ mùi mà bạn biết rất rõ.',
  'Một lon thịt hộp dán tem: "Tiếp tế, trạm [[...]]". Phần chữ còn lại đã bị nước biển làm nhòe.',
  'Một chiếc dép nhựa màu đỏ, cỡ chân trẻ con. Bạn đứng nhìn nó rất lâu.',
  'Hôm nay biển không dạt vào thứ gì. Chỉ có một hàng dấu chân nhỏ trên cát, kéo dài ra tới mép nước rồi biến mất.',
];

/* ---------------- Các con tàu ---------------- */
const SHIPS = [
  {
    name: 'Ghe Sao Mai',
    pain: 1,
    intro: [
      N('Gần nửa đêm, radio rè lên từng hồi.'),
      R('Đây là ghe Sao Mai... Sao Mai gọi trạm hải đăng... Lưới vướng đá ngầm, nước đang vào khoang. Có ai nghe không?'),
      R('Trời tối quá. Hồi xưa bến này có một ngọn đèn, thằng con tôi hay chỉ tay lên đó...'),
      N('Ngoài khơi, một đốm sáng nhỏ chập chờn giữa những con sóng.'),
    ],
    replies: [
      { label: '"Tôi nghe rõ. Ông cắt lưới đi, rồi giữ hướng về phía tháp."',
        resp: [R('Cắt lưới? ...Ừ, ừ. Lưới thì đan lại được. Hồi đó tôi cũng dạy thằng con y như vậy.')] },
      { label: '"Ông là ai? Ông từng tới vùng này rồi sao?"',
        resp: [R('Tôi đánh cá vùng này bốn chục năm rồi. Có một thằng nhỏ hay ngồi trên mũi ghe, nhìn lên ngọn đèn mà cười. [[Nó tên Tư.]]')] },
      { label: '"Đèn hỏng rồi. Ông tự xoay xở đi."', lie: true,
        resp: [R('...Vậy hả. Thôi được. Tôi quen tự xoay xở rồi.'), N('Giọng ông không có vẻ giận. Chỉ mệt mỏi.')] },
    ],
    dream: {
      title: 'Mũi ghe',
      text: 'Bạn bảy tuổi, ngồi trên mũi một chiếc ghe gỗ sơn xanh. Bàn tay chai sạn của ba trùm lên tay bạn, hai cha con cùng kéo tấm lưới nặng trĩu. "Kéo theo chiều gió nghe con. Đừng bao giờ cãi với biển." Phía xa, ngọn hải đăng chớp ba nhịp. Ba nói: còn thấy đèn là còn đường về.',
    },
  },
  {
    name: 'Tàu Hoa Phượng',
    pain: 1,
    intro: [
      N('Đêm thứ hai, radio bật lên đột ngột, ồn ào như một bữa tiệc.'),
      R('A lô, a lô! Tàu Hoa Phượng đây! Ha ha, xin lỗi, ở đây ồn quá...'),
      N('Tiếng nhạc đám cưới lẫn trong tiếng rè. Có ai đó đang hát "Ngày vui qua mau".'),
      R('Tụi tôi lạc hướng rồi. Cô dâu say sóng, còn chú rể... chú rể đâu rồi? Có ai thấy chú rể đâu không?'),
    ],
    replies: [
      { label: '"Chúc mừng hai người. Cứ đi theo ánh đèn là tới bến."',
        resp: [R('Cảm ơn nha! Cô dâu nói... khoan, cô ấy hỏi anh có muốn nói gì với cô ấy không?'), N('Bạn không hiểu vì sao tay mình lại run.')] },
      { label: '"Chú rể tên gì?"',
        resp: [R('Tên là... [[anh Tư]]! [[Anh Tư]] đâu rồi? [[Lan]] ơi, chồng em trốn đâu mất rồi!')] },
      { label: '"Đây không phải trạm hải đăng. Mấy người gọi nhầm rồi."', lie: true,
        resp: [R('Ủa? Kỳ vậy... Rõ ràng tôi thấy cái tháp mà.'), N('Tiếng nhạc nhỏ dần, như một cánh cửa đang khép lại.')] },
    ],
    dream: {
      title: 'Hoa phượng trên mạn thuyền',
      text: 'Mùa hè. Chiếc thuyền kết đầy hoa phượng giấy. Cô gái tên Lan mặc áo dài trắng, trên tóc vướng một cánh hoa đỏ. Cô ghé tai bạn: "Hứa với em, đi biển xa cỡ nào cũng phải nhớ đường về." Bạn cười, chỉ lên ngọn hải đăng trên hòn đảo nhỏ phía xa: "Có nó rồi, lo gì."',
    },
  },
  {
    name: 'Tàu Cánh Diều',
    pain: 2,
    intro: [
      R('Trạm hải đăng! Đây là tàu hàng Cánh Diều. Bật đèn lên cho tôi, ngay!'),
      R('Tôi phải giao hàng trước sáng. Tôi trả tiền. Bao nhiêu cũng được.'),
      R('Đừng lề mề. Mấy ông già gác đèn như anh tôi lạ gì. Suốt ngày chỉ biết ngồi chờ.'),
      N('Giọng nói trẻ, gấp gáp, và quen một cách khó chịu.'),
    ],
    replies: [
      { label: '"Hàng gì mà gấp dữ vậy?"',
        resp: [R('Hàng gì kệ tôi! ...Thôi được. Tôi bán chiếc ghe cũ của ông già để mua con tàu này. Chuyến này mà không có lời thì coi như mất trắng.'), R('Ông già khóc cả buổi. Ai đời lại đi khóc vì một chiếc ghe mục.')] },
      { label: '"Tôi không lấy tiền. Cứ đi theo đèn."',
        resp: [R('Không lấy tiền? ...Ai lại đi làm không công. Anh làm tôi nhớ ông già tôi. Ổng cũng khờ y như vậy.')] },
      { label: '"Hết dầu rồi. Tự mà đi."', lie: true,
        resp: [R('Được! Tôi không cần ai hết! Tôi chưa bao giờ cần ai!'), N('Radio tắt cái rụp.')] },
    ],
    dream: {
      title: 'Chiếc ghe sơn xanh',
      text: 'Bạn đứng trên bến, đếm xấp tiền vừa bán chiếc ghe gỗ sơn xanh. Ba ngồi bệt dưới đất, vuốt mạn ghe như vuốt lưng một con trâu già, không nói một lời. Một năm sau ba mất, lúc đó bạn đang ở ngoài khơi đuổi theo một luồng cá. Bạn về trễ ba ngày. Trên bàn thờ, người ta để một ngọn đèn dầu nhỏ cháy suốt ba đêm, như đang chờ ai.',
    },
  },
  {
    name: 'Hải Âu',
    pain: 2,
    intro: [
      R('...Anh ơi.'),
      N('Không có tiếng máy tàu. Không có cả tiếng sóng. Chỉ có một giọng phụ nữ rất gần, như thể cô ấy đang ngồi ngay cạnh bạn.'),
      R('Đây là Hải Âu. Em không bị lạc. Em không cần anh dẫn đường.'),
      R('Em chỉ cần anh nhớ. Anh còn nhớ chiều nào em cũng đứng ở đầu bến không?'),
    ],
    replies: [
      { label: '"Tôi... không biết cô là ai."',
        resp: [R('Em biết. Không sao đâu. Em đọc cho anh nghe nha. [[Ngày nào em cũng đọc.]]'), N('Đâu đó rất xa, có tiếng lật trang sách đều đặn.')] },
      { label: '"Cô đang ở đâu?"',
        resp: [R('Ở ngay đây. Bên cạnh anh. [[Từ hôm đó tới giờ]], em chưa đi đâu hết.')] },
      { label: '"Đừng gọi nữa. Ở đây không có ai là \'anh\' hết."', lie: true,
        resp: [R('...Vậy thì em sẽ gọi cho tới khi có.')] },
    ],
    dream: {
      title: 'Bến chiều',
      text: 'Mặt trời lặn đỏ như hòn than. Lan đứng ở đầu bến, bế một đứa bé quấn khăn vàng, mảnh khăn voan trắng bay trong gió. Bạn về muộn, khoang đầy cá, người nồng mùi dầu máy. Lan không trách. Cô chỉ đặt đứa bé vào tay bạn: "Con bé nhận ra tiếng máy tàu của anh đó. Anh còn ở ngoài xa là nó đã cười rồi."',
    },
  },
  {
    name: 'Tàu tiếp tế số Bảy',
    pain: 1,
    reward: { full: { oil: 3, food: 3 }, dim: { oil: 1, food: 1 } },
    intro: [
      R('Trạm hải đăng [[Hòn Cô]], đây là tàu tiếp tế số Bảy. Đề nghị trả lời.'),
      R('Chúng tôi chở theo dầu và lương thực. Và... chúng tôi được dặn là phải đón anh về.'),
      R('[[Anh Tư. Bác sĩ nói anh vẫn nghe được.]] Nếu anh nghe thấy, xin hãy cho chúng tôi một tín hiệu.'),
      N('Có một tiếng "tít" đều đặn chen giữa tiếng rè. Nghe như tiếng máy, mà cũng như tiếng tim đập.'),
    ],
    replies: [
      { label: '"Tôi nghe đây. Tôi ở đây."',
        resp: [R('Tốt lắm! Giữ cho đèn sáng. Chúng tôi đang tới gần.'), N('Tiếng "tít" nhanh hơn một chút.')] },
      { label: '"Đón tôi về đâu? Đây là nhà tôi mà."',
        resp: [R('Anh còn một ngôi nhà khác. Ở đó có người đang chờ anh. [[Ngày nào cô ấy cũng đọc sách cho anh nghe.]]')] },
      { label: '"Trạm này không có người. Đi đi."', lie: true,
        resp: [R('...Đã rõ. Chúng tôi sẽ quay lại. Chúng tôi lúc nào cũng quay lại.')] },
    ],
    dream: {
      title: 'Tiếng tít',
      text: 'Lần này bạn không mơ thấy biển. Bạn mơ thấy một trần nhà trắng, và một thứ ánh sáng không phát ra từ ngọn đèn nào. Có tiếng "tít... tít..." đều đặn. Có ai đó đang nắm tay bạn và đọc to một câu chuyện về một người gác đèn trên hoang đảo.',
    },
  },
  {
    name: 'Con tàu không tên',
    pain: 3,
    storm: true,
    intro: [
      N('Đêm thứ sáu, trời nổi gió. Sóng đập vào chân tháp như có ai đang gõ cửa.'),
      R('...KÉO LƯỚI LÊN! Mặc kệ cảnh báo! Luồng cá này cả năm mới có một lần!'),
      R('Ba ơi... con sợ...'),
      R('Đừng sợ con. Còn thấy đèn là còn đường về. Con thấy ngọn đèn trên hòn đảo kia không?'),
      N('Bạn nhìn ra ô cửa. Ngọn đèn duy nhất ở vùng biển này là ngọn đèn bạn đang giữ.'),
      R('Đèn... đèn tắt rồi? Sao đèn [[Hòn Cô]] lại tắt?'),
    ],
    replies: [
      { label: '"QUAY VỀ ĐI! Đừng đi tiếp nữa!"',
        resp: [R('...Ai vậy? Ai đang la vậy? Ba ơi, có người kêu mình quay về kìa!'), R('Kệ nó. Kéo lưới!'), N('Bạn biết giọng người đàn ông đó. Bạn đã nghe nó cả đời.')] },
      { label: '"Giữ chặt con bé. Đừng buông tay."',
        resp: [R('Ba nắm tay con nè. Ba không buông đâu. Ba hứa.')] },
      { label: '"Ở đây không có ai hết. Không có ngọn đèn nào hết."', lie: true,
        resp: [R('...Vậy là tối thật rồi.'), N('Tiếng sóng nuốt trọn tiếng rè.')] },
    ],
    dream: {
      title: 'Cơn bão số Chín',
      text: 'Đài báo bão số Chín sẽ đổ bộ trong đêm. Lan đứng chắn ngang cửa: "Đừng mang con theo." Bạn gạt đi: "Một đêm thôi mà, con bé đòi đi với ba." Ngoài khơi, luồng cá dày đặc như mây. Rồi gió đổi chiều. Bạn tìm ngọn đèn Hòn Cô nhưng nó đã tắt từ lâu, người gác đèn bỏ đảo đi từ năm ngoái. Con sóng thứ nhất làm vỡ mạn tàu. Con sóng thứ hai ập tới, bàn tay nhỏ trong tay bạn trơn như cá. Bạn đã hứa là không buông.',
    },
  },
  {
    name: 'Bé Na',
    pain: 3,
    final: true,
    intro: [
      N('Đêm cuối cùng. Biển lặng như tờ. Không có gió, không có sương, chỉ có tiếng radio rè rất khẽ.'),
      R('Ba ơi?'),
      R('Ba có ở đó không? Con là Na nè.'),
      R('Tối quá. Con không thấy đường về. Ba nói còn thấy đèn là còn đường về mà.'),
    ],
    replies: [
      { label: '"Ba đây. Ba ở đây, Na."',
        resp: [R('Ba! Con biết ba còn ở đó mà! Ba thắp đèn cho con đi ba.')] },
      { label: '"Ba xin lỗi. Ba xin lỗi con."',
        resp: [R('Sao ba lại xin lỗi? ...Đâu phải ba buông tay con. Là tại sóng mà ba. Là tại sóng.')] },
      { label: '"Ở đây không có ba của con."', lie: true,
        resp: [R('...Dạ. Vậy con chờ thêm chút nữa. Ba con sẽ tới mà.')] },
    ],
  },
];

/* ---------------- Kết cục ---------------- */
const ENDINGS = {
  dawn: {
    title: 'Bình minh',
    text: [
      'Bạn thắp đèn. Ánh sáng quét qua mặt biển đen, vươn xa hơn bất cứ đêm nào trước đó.',
      'Ngoài khơi, đốm sáng nhỏ tiến lại gần. Đó là một chiếc ghe gỗ sơn xanh. Trên mũi ghe, một cô bé đi dép nhựa đỏ đang vẫy tay.',
      'Cô bé không cập bến. Ghe chỉ dừng lại vừa đủ gần để bạn thấy nụ cười của con, rồi tan vào ánh sáng như mọi con tàu khác.',
      'Nhưng lần này bạn không đánh mất con bé. Bạn nhớ.',
      '—',
      'Bạn mở mắt. Trần nhà trắng. Tiếng tít đều đặn. Có một bàn tay đang nắm lấy tay bạn, và một cuốn sách rơi xuống sàn.',
      '"Anh Tư... anh Tư!" Lan bật khóc. Tóc cô đã bạc gần hết.',
      'Bạn đã nằm đó bảy tháng, kể từ đêm bão số Chín. Bạn là người duy nhất được vớt lên.',
      'Mùa xuân năm sau, ngọn hải đăng Hòn Cô có người gác trở lại. Đêm nào đèn cũng sáng.',
      'Không phải cho bạn. Mà cho những người vẫn còn ở ngoài khơi.',
    ],
  },
  farewell: {
    title: 'Lời tạm biệt',
    secret: true,
    text: [
      'Bạn thắp đèn, nhưng không ở lại trên tháp. Bạn đi xuống cầu gỗ và tháo dây chiếc thuyền con.',
      'Bạn chèo ra giữa màn sương. Lần này bạn không chờ ai dẫn đường cả.',
      'Chiếc ghe gỗ sơn xanh hiện ra. Na ngồi trên mũi ghe, đúng chỗ bạn từng ngồi hồi bảy tuổi.',
      '"Ba tới rồi," con bé nói, như thể đó là chuyện đương nhiên.',
      'Hai cha con ngồi bên nhau tới gần sáng. Bạn kể cho con nghe về ông nội, về chiếc ghe sơn xanh, về ngày cưới của ba mẹ. Những chuyện mà bạn chưa kịp kể.',
      'Rồi Na nắm tay bạn, lần này thật chặt, và nói: "Giờ ba buông tay con được rồi. Con hết sợ rồi."',
      'Bạn buông tay.',
      'Khi bạn chèo về, ngọn đèn trên tháp vẫn sáng. Nó sẽ dẫn bạn về căn phòng trắng, về với Lan, về một buổi sáng mà bạn biết mình có thể sống tiếp.',
      'Rất hiếm người gác đèn tìm được kết cục này.',
    ],
  },
  stranger: {
    title: 'Người lạ trên bến',
    text: [
      'Bạn thắp đèn. Một chiếc thuyền nhỏ cập vào cầu gỗ. Một cô bé đi dép nhựa đỏ bước lên.',
      '"Ba!" Con bé chạy ào về phía bạn.',
      'Bạn lùi lại. "Cháu là con nhà ai? Sao cháu lại ở đây?"',
      'Cô bé đứng sững lại. Rồi con bé cười, nụ cười của một người lớn hơn tuổi mình rất nhiều: "Không sao đâu ba. Ba chưa sẵn sàng. Con chờ được mà."',
      'Cô bé quay lại thuyền. Bạn đứng trên bến rất lâu, không hiểu sao ngực mình lại đau đến vậy.',
      'Tối hôm đó, radio lại rè lên. "Đây là ghe Sao Mai... Sao Mai gọi trạm hải đăng..."',
      '(Có những điều bạn đã để vuột mất trên đường tới đây.)',
    ],
  },
  eternal: {
    title: 'Ngọn đèn vĩnh cửu',
    text: [
      'Bạn không thắp đèn. Tiếng radio nhỏ dần, nhỏ dần, rồi im hẳn.',
      'Sáng hôm sau, biển xanh và yên ả. Không còn con tàu nào gọi tới nữa.',
      'Bạn sống trên đảo rất lâu. Bạn lau kính đèn, châm dầu, viết nhật ký. Bạn không nhớ mình đến đây bằng cách nào, và bạn cũng không còn muốn nhớ.',
      'Đó cũng là một kiểu bình yên.',
      'Ở một nơi rất xa, trong một căn phòng trắng, một người phụ nữ gấp lại cuốn sách mà ngày nào cô cũng đọc, rồi tắt ngọn đèn đầu giường.',
    ],
  },
  storm: {
    title: 'Người gác bão',
    text: [
      'Bạn không thắp đèn. Bạn tắt luôn cả chiếc radio.',
      'Bạn đã nói dối quá nhiều lần, với quá nhiều con tàu. Mỗi lời nói dối lại dễ hơn lần trước.',
      'Đêm đó, một con tàu đâm vào đá ngầm ngay dưới chân đảo. Bạn đứng trên tháp nhìn xuống và không làm gì cả.',
      'Bạn chợt hiểu người gác đèn Hòn Cô năm ấy đã cảm thấy gì khi bỏ đảo ra đi.',
      'Bạn đã trở thành đúng thứ mà bạn căm ghét nhất: một ngọn hải đăng không có ánh sáng.',
    ],
  },
  dark: {
    title: 'Bóng tối',
    text: [
      'Bạn ngồi thu mình trong góc tháp, ôm đầu. Những giọng nói trong radio không chịu dừng, kể cả khi bạn đã rút dây.',
      'Ngọn đèn tắt. Rồi ngọn nến cũng tắt. Rồi bạn không còn phân biệt được đâu là biển, đâu là trời.',
      'Có lẽ có những ký ức mà người ta không thể đối diện cùng một lúc.',
      '(Hãy chăm sóc bản thân trước khi gánh lấy nỗi đau.)',
    ],
  },
};
const ENDING_ORDER = ['dawn', 'farewell', 'stranger', 'eternal', 'storm', 'dark'];

/* =========================================================
   Trạng thái & lưu game
   ========================================================= */
let S = null;

function newState() {
  return {
    day: 1,
    ap: AP_PER_DAY,
    oil: 5,
    food: 4,
    sanity: 7,
    radioFix: 0,
    pages: 0,
    beachToday: false,
    memories: 0,
    lies: 0,
    dreams: [],
  };
}

function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
}
function loadSave() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { return null; }
}
function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
}
function getEndings() {
  try { return JSON.parse(localStorage.getItem(ENDINGS_KEY)) || []; } catch (e) { return []; }
}
function unlockEnding(id) {
  const got = getEndings();
  if (!got.includes(id)) got.push(id);
  try { localStorage.setItem(ENDINGS_KEY, JSON.stringify(got)); } catch (e) { /* ignore */ }
}

const radioClear = () => S && S.radioFix >= RADIO_FIX_NEEDED;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* =========================================================
   Hiển thị
   ========================================================= */
const $ = (s) => document.querySelector(s);
const storyEl = $('#story');
const choicesEl = $('#choices');
let delay = 0;

function setScene(...classes) {
  document.body.className = classes.filter(Boolean).join(' ');
}

function clearStory() {
  storyEl.innerHTML = '';
  delay = 0;
}

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function renderRadio(text) {
  const clear = radioClear();
  let out = '';
  const parts = text.split(/(\[\[.*?\]\])/);
  parts.forEach((part, pi) => {
    const forced = part.startsWith('[[');
    const body = forced ? part.slice(2, -2) : part;
    if (clear) { out += escapeHtml(body); return; }
    if (forced) {
      out += `<span class="garble">${body.replace(/\S/g, '▒')}</span>`;
      return;
    }
    out += body.split(/(\s+)/).map((w, wi) => {
      if (!w.trim()) return w;
      return hashStr(w + pi + wi) % 5 === 0 ? `<span class="garble">${w.replace(/\S/g, '▒')}</span>` : escapeHtml(w);
    }).join('');
  });
  return out;
}

function line(text, cls = '', html = false) {
  const p = document.createElement('p');
  if (cls) p.className = cls;
  if (html) p.innerHTML = text; else p.textContent = text;
  p.style.animationDelay = `${delay}s`;
  delay += 0.35;
  storyEl.appendChild(p);
  requestAnimationFrame(() => { storyEl.scrollTop = storyEl.scrollHeight; });
  return p;
}

function say(lines) {
  lines.forEach((l) => {
    if (l.who === 'radio') line(renderRadio(l.t), 'radio', true);
    else if (l.who === 'you') line(l.t, 'you');
    else line(l.t);
  });
}

function heading(text, tag = 'h2') {
  const h = document.createElement(tag);
  h.textContent = text;
  h.style.animationDelay = `${delay}s`;
  delay += 0.3;
  storyEl.appendChild(h);
}

function sys(text, kind = '') { line(text, `sys ${kind}`.trim()); }

function divider() {
  const d = document.createElement('div');
  d.className = 'divider';
  storyEl.appendChild(d);
}

function choices(list) {
  choicesEl.innerHTML = '';
  list.forEach((c) => {
    const b = document.createElement('button');
    b.className = `choice ${c.cls || ''}`.trim();
    b.innerHTML = escapeHtml(c.label) + (c.hint ? `<span class="hint">${escapeHtml(c.hint)}</span>` : '');
    b.disabled = !!c.disabled;
    b.addEventListener('click', () => {
      if (b.disabled) return;
      choicesEl.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      sfx('click');
      delay = 0;
      c.go();
    });
    choicesEl.appendChild(b);
  });
}

function pips(el, value, max) {
  const prev = Number(el.dataset.v || value);
  el.innerHTML = '';
  for (let i = 0; i < max; i++) {
    const d = document.createElement('div');
    d.className = 'pip' + (i < value ? ' on' : '') + (i >= value && i < prev ? ' lose' : '');
    el.appendChild(d);
  }
  el.dataset.v = value;
}

function updateHud() {
  $('#hud').hidden = false;
  const phase = S.phase === 'night' ? 'Đêm' : 'Ngày';
  $('#hud-day').textContent = `${phase} ${S.day} / ${LAST_NIGHT}`;
  pips($('#pip-oil'), S.oil, MAX_OIL);
  pips($('#pip-food'), S.food, MAX_FOOD);
  const bar = $('#bar-sanity');
  bar.style.width = `${(S.sanity / MAX_SANITY) * 100}%`;
  bar.classList.toggle('low', S.sanity <= 3);
  $('#hud-radio').textContent = radioClear() ? 'Radio: rõ' : `Radio: rè (${S.radioFix}/${RADIO_FIX_NEEDED})`;
  $('#hud-dreams').textContent = `Giấc mơ: ${S.dreams.length}`;
}

/* =========================================================
   Âm thanh: tiếng sóng tạo bằng Web Audio
   ========================================================= */
let audio = null;
let soundOn = false;

function initAudio() {
  if (audio) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const len = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 500;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.12;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.12;
  lfo.connect(lfoGain).connect(gain.gain);
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
  lfo.start();
  audio = { ctx, gain };
}

function toggleSound() {
  initAudio();
  soundOn = !soundOn;
  audio.ctx.resume();
  audio.gain.gain.cancelScheduledValues(audio.ctx.currentTime);
  audio.gain.gain.setTargetAtTime(soundOn ? 0.25 : 0, audio.ctx.currentTime, 0.5);
  $('#btn-sound').textContent = soundOn ? 'Âm thanh: bật' : 'Âm thanh: tắt';
}

function sfx(kind) {
  if (!soundOn || !audio) return;
  const ctx = audio.ctx;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = kind === 'lamp' ? 'sine' : 'triangle';
  o.frequency.value = kind === 'lamp' ? 220 : 660;
  g.gain.value = kind === 'lamp' ? 0.08 : 0.025;
  g.gain.setTargetAtTime(0, ctx.currentTime + 0.05, kind === 'lamp' ? 0.6 : 0.05);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 2);
}

/* =========================================================
   Màn hình tiêu đề
   ========================================================= */
function titleScreen() {
  S = null;
  $('#hud').hidden = true;
  setScene('title', 'lamp-on');
  clearStory();
  heading('Người Gác Đèn Cuối Cùng', 'h1');
  line('Một hòn đảo không tên. Một ngọn hải đăng. Bảy đêm.', 'sys');
  line('Mỗi đêm, có một con tàu gọi tới qua radio. Dầu thì ít, đêm thì dài, và không phải con tàu nào cũng nên được dẫn đường.');
  const got = getEndings();
  const box = document.createElement('div');
  box.innerHTML = `<p class="sys" style="opacity:1">Kết cục đã mở: ${got.length} / ${ENDING_ORDER.length}</p>`;
  const ul = document.createElement('ul');
  ul.className = 'endings-list';
  ENDING_ORDER.forEach((id) => {
    const li = document.createElement('li');
    const has = got.includes(id);
    li.className = has ? 'got' : '';
    li.textContent = has ? `• ${ENDINGS[id].title}` : `• ${ENDINGS[id].secret ? '??? (bí mật)' : '???'}`;
    ul.appendChild(li);
  });
  box.appendChild(ul);
  storyEl.appendChild(box);

  const existing = loadSave();
  const list = [];
  if (existing && existing.day) {
    list.push({ label: `Chơi tiếp (Ngày ${existing.day})`, cls: 'primary', go: () => { S = existing; startDay(true); } });
  }
  list.push({ label: 'Bắt đầu ca trực mới', cls: existing ? '' : 'primary', go: () => { clearSave(); S = newState(); prologue(); } });
  choices(list);
}

function prologue() {
  setScene('dusk');
  clearStory();
  heading('Mở đầu');
  line('Bạn tỉnh dậy trên chiếc giường gỗ hẹp, trong căn phòng tròn dưới chân một ngọn hải đăng. Ngoài kia chỉ có biển.');
  line('Trên bàn có một cuốn sổ trống, một chiếc radio cũ và một tờ giấy ghim vào tường:');
  line('"Giữ cho đèn sáng. Dầu có hạn. Radio sửa được. Đừng tin mọi thứ mình nghe."', 'page');
  line('Bạn không nhớ mình là ai, và cũng không nhớ mình đến đây bằng cách nào. Nhưng tay bạn biết cách châm dầu, như thể đã làm việc này cả đời.');
  sys('Ban ngày, mỗi ngày bạn có 2 lượt hành động. Ban đêm, bạn trả lời radio và quyết định có thắp đèn hay không.');
  choices([{ label: 'Bắt đầu ngày đầu tiên', cls: 'primary', go: () => startDay() }]);
}

/* =========================================================
   Ban ngày
   ========================================================= */
function startDay(resumed = false) {
  S.phase = 'day';
  setScene('day');
  clearStory();
  updateHud();
  heading(`Ngày ${S.day}`);
  if (resumed) sys('Tiếp tục ca trực.');
  if (S.day === 1) line('Nắng sớm trải trên mặt biển. Hòn đảo nhỏ tới mức đi bộ một vòng chưa hết buổi sáng.');
  else if (S.day === LAST_NIGHT) line('Biển lặng một cách bất thường. Bạn có cảm giác đêm nay sẽ là đêm cuối cùng.');
  else line('Một ngày mới. Gió mang theo mùi muối và mùi dầu cháy từ đêm qua.');
  save();
  dayMenu();
}

function dayMenu() {
  updateHud();
  const noAp = S.ap <= 0;
  const list = [
    { label: 'Ra bãi biển nhặt nhạnh', hint: S.beachToday ? 'Hôm nay bạn đã ra bãi biển rồi.' : 'Có thể nhặt được dầu, đồ ăn... hoặc thứ khác. (1 lượt)',
      disabled: noAp || S.beachToday, go: actBeach },
    { label: 'Câu cá', hint: 'Thêm lương thực. (1 lượt)', disabled: noAp, go: actFish },
    { label: 'Sửa radio', hint: radioClear() ? 'Radio đã nghe rõ.' : `Nghe rõ hơn những gì người ta nói. (1 lượt, tiến độ ${S.radioFix}/${RADIO_FIX_NEEDED})`,
      disabled: noAp || radioClear(), go: actRadio },
    { label: 'Ngủ bù', hint: 'Hồi tinh thần. (1 lượt)', disabled: noAp || S.sanity >= MAX_SANITY, go: actSleep },
    { label: noAp ? 'Chờ trời tối' : `Chờ trời tối (còn ${S.ap} lượt chưa dùng)`, cls: noAp ? 'primary' : '',
      hint: 'Ăn bữa tối (-1 lương thực) rồi lên tháp.', go: endDay },
  ];
  choices(list);
}

function spendAp() { S.ap -= 1; }

function actBeach() {
  spendAp();
  S.beachToday = true;
  divider();
  line(BEACH[Math.min(S.day - 1, BEACH.length - 1)].replace(/\[\[(.*?)\]\]/g, '$1'));
  if (S.pages < TOTAL_PAGES) {
    S.pages += 1;
    line('Kẹt giữa hai tảng đá là một trang giấy ố vàng, chữ viết tay:');
    line(PAGES[S.pages - 1], 'page');
    sys(`Đã tìm được ${S.pages}/${TOTAL_PAGES} trang nhật ký.`, 'good');
  }
  const r = Math.random();
  if (r < 0.6) {
    S.oil = clamp(S.oil + 1, 0, MAX_OIL);
    sys('Bạn tìm được một can dầu nhỏ. (+1 dầu)', 'good');
  } else if (r < 0.85) {
    S.food = clamp(S.food + 1, 0, MAX_FOOD);
    sys('Bạn nhặt được vài con ốc. (+1 lương thực)', 'good');
  } else {
    sys('Ngoài những thứ đó ra, bạn không tìm được gì dùng được.');
  }
  save();
  dayMenu();
}

function actFish() {
  spendAp();
  divider();
  let gain = 2;
  if (S.sanity <= 3) {
    gain = 1;
    line('Bạn ngồi nhìn chiếc phao cả buổi. Mặt nước phản chiếu một gương mặt mà bạn không chắc là của mình.');
  } else {
    line('Bạn thả câu ở ghềnh đá phía tây. Tay bạn giật cần rất thạo, như có ai từng cầm tay chỉ cho bạn.');
  }
  S.food = clamp(S.food + gain, 0, MAX_FOOD);
  sys(`+${gain} lương thực`, 'good');
  save();
  dayMenu();
}

function actRadio() {
  spendAp();
  divider();
  S.radioFix += 1;
  if (radioClear()) {
    line('Bạn hàn lại mối dây cuối cùng. Tiếng rè dịu xuống, nhường chỗ cho một thứ im lặng rất trong.');
    sys('Radio đã nghe rõ. Từ giờ bạn sẽ nghe trọn vẹn những gì người ta nói.', 'good');
  } else {
    line('Bạn tháo nắp chiếc radio. Bên trong, các bóng đèn điện tử phủ đầy muối biển. Bạn lau từng cái một.');
    sys(`Tiến độ sửa radio: ${S.radioFix}/${RADIO_FIX_NEEDED}`);
  }
  save();
  dayMenu();
}

function actSleep() {
  spendAp();
  divider();
  line('Bạn chợp mắt trên chiếc giường gỗ hẹp. Một giấc ngủ không mộng mị, và thật dễ chịu.');
  S.sanity = clamp(S.sanity + 2, 0, MAX_SANITY);
  sys('+2 tinh thần', 'good');
  save();
  dayMenu();
}

function endDay() {
  divider();
  if (S.food > 0) {
    S.food -= 1;
    line('Bạn ăn bữa tối đạm bạc, rồi leo lên những bậc thang xoắn của tháp đèn.');
  } else {
    S.sanity -= 2;
    line('Không còn gì để ăn. Bạn leo lên tháp với cái bụng rỗng, đầu óc quay cuồng.');
    sys('Đói. -2 tinh thần', 'bad');
  }
  updateHud();
  if (S.sanity <= 0) return ending('dark');
  choices([{ label: 'Lên tháp đèn', cls: 'primary', go: startNight }]);
}

/* =========================================================
   Ban đêm
   ========================================================= */
function startNight() {
  S.phase = 'night';
  const ship = SHIPS[S.day - 1];
  setScene('ship-near', ship.storm ? 'storm' : '');
  clearStory();
  updateHud();
  heading(`Đêm ${S.day}: ${ship.name}`);
  if (!radioClear()) sys('Radio vẫn còn rè, có những đoạn bạn không nghe rõ.');
  say(ship.intro);
  if (ship.final && canRow()) {
    line('Dưới chân tháp, chiếc thuyền con vẫn được buộc ở cầu gỗ. Mái chèo dựng sẵn bên cạnh.');
  }
  choices(ship.replies.map((r) => ({
    label: r.label,
    go: () => reply(ship, r),
  })));
}

function canRow() {
  return S.pages >= TOTAL_PAGES && S.memories >= 3;
}

function reply(ship, r) {
  divider();
  line(r.label.replace(/^"|"$/g, ''), 'you');
  if (r.lie) S.lies += 1;
  say(r.resp);
  lampChoices(ship);
}

function lampChoices(ship) {
  const list = [
    { label: 'Thắp đèn sáng', hint: '-2 dầu', disabled: S.oil < 2, go: () => lamp(ship, 'full') },
  ];
  if (!ship.final) {
    list.push({ label: 'Thắp đèn mờ', hint: '-1 dầu. Ánh sáng yếu, không rõ con tàu có thấy được không.', disabled: S.oil < 1, go: () => lamp(ship, 'dim') });
  }
  list.push({ label: 'Để tháp tối', hint: 'Tiết kiệm dầu. Con tàu sẽ phải tự tìm đường.', go: () => lamp(ship, 'dark') });
  if (ship.final && canRow()) {
    list.push({ label: 'Thắp đèn, rồi tự chèo thuyền ra đón', hint: '-2 dầu', cls: 'secret', disabled: S.oil < 2, go: () => lamp(ship, 'row') });
  }
  if (S.oil < 2) sys(`Dầu còn lại: ${S.oil}. Không đủ để thắp đèn sáng.`, 'bad');
  choices(list);
}

function lamp(ship, mode) {
  divider();
  if (mode === 'full' || mode === 'row') {
    S.oil -= 2;
    setScene('lamp-on', 'ship-near');
    sfx('lamp');
  } else if (mode === 'dim') {
    S.oil -= 1;
    setScene('lamp-dim', 'ship-near');
    sfx('lamp');
  } else {
    setScene();
  }

  if (ship.final) return finalNight(mode);

  if (mode === 'dark') {
    line('Bạn ngồi trong bóng tối, nghe tiếng radio nhỏ dần rồi tắt hẳn. Đốm sáng ngoài khơi trôi đi đâu mất.');
    line('Đêm đó bạn ngủ một giấc không mộng mị. Nhẹ nhõm một cách đáng ngờ.');
    S.sanity = clamp(S.sanity + 1, 0, MAX_SANITY);
    sys('+1 tinh thần', 'good');
  } else {
    const full = mode === 'full';
    line(full
      ? 'Ánh đèn quét qua mặt biển. Đốm sáng ngoài khơi đổi hướng, chầm chậm tiến về phía đảo, rồi tan vào màn sương ngay trước khi cập bến.'
      : 'Ngọn đèn leo lét. Đốm sáng ngoài khơi chần chừ hồi lâu, rồi mờ dần trong sương. Bạn không chắc nó đã tìm được đường hay chưa.');
    const loss = full ? ship.pain : Math.ceil(ship.pain / 2);
    S.sanity -= loss;
    S.memories += full ? 1 : 0.5;
    S.dreams.push({ title: ship.dream.title, text: ship.dream.text, blur: !full });
    line('Đêm đó, bạn mơ.', 'sys');
    if (full) {
      line(ship.dream.text, 'dream');
    } else {
      const words = ship.dream.text.split(' ');
      line(words.slice(0, Math.ceil(words.length / 2)).join(' ') + '... rồi giấc mơ nhòe đi.', 'dream blur');
    }
    sys(`-${loss} tinh thần`, 'bad');
    if (ship.reward) {
      const rw = ship.reward[mode];
      S.oil = clamp(S.oil + rw.oil, 0, MAX_OIL);
      S.food = clamp(S.food + rw.food, 0, MAX_FOOD);
      line('Sáng ra, dưới chân cầu gỗ có mấy thùng hàng được buộc dây cẩn thận. Không thấy dấu vết của con tàu nào.');
      sys(`+${rw.oil} dầu, +${rw.food} lương thực`, 'good');
    }
  }
  updateHud();
  if (S.sanity <= 0) {
    choices([{ label: '...', go: () => ending('dark') }]);
    return;
  }
  choices([{ label: 'Chờ trời sáng', cls: 'primary', go: () => {
    S.day += 1;
    S.ap = AP_PER_DAY;
    S.beachToday = false;
    startDay();
  } }]);
}

function finalNight(mode) {
  let id;
  if (mode === 'row') id = 'farewell';
  else if (mode === 'full') id = S.memories >= 4 ? 'dawn' : 'stranger';
  else id = S.lies >= 3 ? 'storm' : 'eternal';
  choices([{ label: 'Tiếp tục', cls: 'primary', go: () => ending(id) }]);
}

/* =========================================================
   Kết cục
   ========================================================= */
function ending(id) {
  const e = ENDINGS[id];
  unlockEnding(id);
  clearSave();
  const lit = id === 'dawn' || id === 'farewell';
  setScene(lit ? 'day' : id === 'stranger' ? 'dusk' : '', lit ? 'lamp-on' : '');
  clearStory();
  $('#hud').hidden = true;
  heading('Kết thúc', 'h2');
  heading(e.title, 'h1');
  e.text.forEach((t) => (t === '—' ? divider() : line(t)));
  const got = getEndings();
  divider();
  sys(`Kết cục đã mở: ${got.length} / ${ENDING_ORDER.length}`);
  if (got.length < ENDING_ORDER.length) sys('Mỗi lựa chọn đều để lại dấu vết. Hãy thử lại theo một cách khác.');
  choices([{ label: 'Về màn hình chính', cls: 'primary', go: titleScreen }]);
}

/* =========================================================
   Nhật ký (lớp phủ)
   ========================================================= */
function openJournal() {
  if (!S) return;
  const body = $('#overlay-body');
  body.innerHTML = '';
  const h1 = document.createElement('h3');
  h1.textContent = `Những trang tìm được (${S.pages}/${TOTAL_PAGES})`;
  body.appendChild(h1);
  if (!S.pages) body.insertAdjacentHTML('beforeend', '<p class="empty">Chưa có trang nào.</p>');
  PAGES.slice(0, S.pages).forEach((p) => {
    const d = document.createElement('div');
    d.className = 'page';
    d.textContent = p;
    body.appendChild(d);
  });
  const h2 = document.createElement('h3');
  h2.textContent = 'Những giấc mơ';
  body.appendChild(h2);
  if (!S.dreams.length) body.insertAdjacentHTML('beforeend', '<p class="empty">Bạn chưa mơ thấy gì.</p>');
  S.dreams.forEach((d) => {
    const el = document.createElement('div');
    el.className = 'dream-entry';
    const b = document.createElement('b');
    b.textContent = d.title + (d.blur ? ' (mờ)' : '');
    el.appendChild(b);
    el.appendChild(document.createElement('br'));
    const words = d.text.split(' ');
    el.appendChild(document.createTextNode(d.blur ? words.slice(0, Math.ceil(words.length / 2)).join(' ') + '...' : d.text));
    body.appendChild(el);
  });
  $('#overlay-title').textContent = 'Nhật ký người gác đèn';
  $('#overlay').hidden = false;
}

/* =========================================================
   Khởi động
   ========================================================= */
function makeStars() {
  const g = $('#stars');
  for (let i = 0; i < 60; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', (Math.random() * 400).toFixed(1));
    c.setAttribute('cy', (Math.random() * 230).toFixed(1));
    c.setAttribute('r', (Math.random() * 1.2 + 0.3).toFixed(2));
    c.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
    g.appendChild(c);
  }
}

$('#btn-journal').addEventListener('click', openJournal);
$('#btn-sound').addEventListener('click', toggleSound);
$('#overlay-close').addEventListener('click', () => { $('#overlay').hidden = true; });
$('#overlay').addEventListener('click', (e) => { if (e.target.id === 'overlay') $('#overlay').hidden = true; });

makeStars();
titleScreen();
