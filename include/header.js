var str = '';

str += '<header id="headerWrap" class="fixed">';
str += '    <div class="headerBtn verM" style="">';
str += '        <button type="button" class="backBtn btn" onclick="history.back();">이전 단계로 돌아가기</button>';
str += '        <button type="button" class="searhBtn btn">검색</button>';
str += '        <button type="button" id="totalMenuBtn1" class="totalMenuBtn">메뉴</button>';
str += '        <button type="button" class="closeBtn btn" style="display:none">닫기</button>';
str += '    </div>';
str += '</header>';


document.write(str);