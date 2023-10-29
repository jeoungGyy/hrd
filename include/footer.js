var str = '';

str += '<div id="floatingWrap" class="fixBotNav verM">';
str += '    <nav class="floatingMenu">';
str += '        <ul>';
str += '            <li class="home on"><a href="/" title="홈으로 이동"><span>홈</span></a></li>';
str += '            <li class="search"><a href="javascript:void(0);" onclick="moveTracseListPageRenewal(2)" title="과정검색"><span>과정검색</span></a></li>';
str += '            <li class="my"><a href="javascript:void(0)" onclick="fn_myMove();return false;" title="내 정보로 이동"><span>나의 정보</span></a></li>';
str += '            <li class="help"><a href="#tutorial-section" role="button" title="도움말보기"><span>도움말</span></a></li><!-- 1030 메뉴추가 -->';
str += '        </ul>';
str += '    </nav>';
str += '</div>';


document.write(str);