const axios = require('axios');
const cheerio = require('cheerio');

//let
axios.get('http://210.125.122.79/webseat/roomview5.asp?room_no=6')
    .then( dataa => {
        const $ = cheerio.load(dataa.data);
        //$('section.book-toc>ul>li>a').each((index, item)=>{$href.push(item.attribs.href)});
        let text = '';
        for(let i = 1; i < 90; i++) {
            text += i+':' + $('div#Layer'+ i +' table tr td').attr('bgcolor') + '\n';
        }
        //db에서 5초전에 파싱한 텍스트 불러옴
        //없으면 text 등록
        //있으면 가져와서 비교, 같으면 넘어감
        //다르면 새 text로 db UPDATE하고 
        //기존 새 text 비교해서 달라진 좌석 구별
        //구별된 자석들 DB에 색깔과 함께 로그 생성
        console.log(text);
    })