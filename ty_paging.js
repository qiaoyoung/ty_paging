/**
 * Created by Joeyoung on 2017/9/9.
 */


//------------------------------ 分页功能 ------------------------------

// 当前选中页
var ty_currentPage;

// totalPage:服务端返回的总页数
// callback:回调函数
function ty_dealPaging(totalPage, callback) {

  // 设置UI
  $('#ty_paging').empty();
  $('#ty_paging').append(
    '<li class="home">首页</li>' +
    '<li class="prev">＜</li>' +
    '<li class="next">＞</li>' +
    '<li class="max">共0页</li>' +
    '<input type="number" min="1" value="1" class="inputPage">' +
    '<li class="jump">跳转</li>'
  );

  var
    $paging = $('#ty_paging'),                              // 分页ul
    $homePage = $('#ty_paging .home'),                      // 首页
    $prevPage = $('#ty_paging .prev'),                      // 上一页
    $nextPage = $('#ty_paging .next'),                      // 下一页
    $inputPage = $('#ty_paging .inputPage'),                // 输入页数
    $jumpPage = $('#ty_paging .jump'),                      // 跳转
    maxPage = totalPage,                                    // 总页数
    onePageMaxCount = 5;                                    // 一页最多展示的分页数量(可修改)

  // 分页功能
  if (maxPage > 1) {
    // 显示分页
    $paging.show();
    // 显示总页数
    $('#ty_paging .max').text('共' + maxPage + '页');
    // 移除分页标签 1 2 3 ...
    $('#ty_paging .pageIndex').remove();

    if (!ty_currentPage) {
      ty_currentPage = 1;
    }
    // 修改输入的跳转页数（当前页数+1）
    var jumpNum = ty_currentPage;
    $inputPage.val(Math.min(maxPage, ++jumpNum)).attr("max", maxPage);


    // 需要展示的分页范围
    var startIndex = 1,
      endIndex = maxPage;

    if (maxPage <= onePageMaxCount) {// 一页能显示下分页数量
      startIndex = 1;
      endIndex = maxPage;
    } else {
      if (ty_currentPage <= Math.ceil(onePageMaxCount / 2)) {
        startIndex = 1;
        endIndex = onePageMaxCount;
      } else {
        startIndex = ty_currentPage - (Math.ceil(onePageMaxCount / 2) - 1);
        endIndex = ty_currentPage + (Math.ceil(onePageMaxCount / 2) - 1);
        if (endIndex > maxPage) {
          endIndex = maxPage;
          startIndex = maxPage - (onePageMaxCount - 1);
        }
      }
    }
    // 添加分页标签 1 2 3 ...
    for (var p = startIndex; p <= endIndex; p++) {
      $nextPage.before('<li  class="pageIndex" value=' + p + '>' + p + '</li>');
    }

    // 修改样式
    $('#ty_paging .pageIndex').each(function (index, liDom) {
      // 选中分页修改css
      if (ty_currentPage == $(liDom).val()) {
        $(liDom).css({'backgroundColor':'#31C27C',
          'color':'white',
          'border-color':'#31C27C'});
      } else {
        $(liDom).css({'backgroundColor':'white',
          'color':'#666666',
          'border-color':"#ddd"});
      }
    });

    // 悬浮样式
    $('#ty_paging li.pageIndex').mouseover(function () {
      if ($(this).val() == ty_currentPage) return;
      $(this).css({
        'border-color':'#31C27C',
        'color':'#31C27C'
      });
    });
    $('#ty_paging li.pageIndex').mouseout(function () {
      if ($(this).val() == ty_currentPage) return;
      $(this).css({
        'border-color':"#ddd",
        'color':'#666'
      });
    });

    // 绑定事件
    $('#ty_paging .pageIndex').click(function () {
      ty_currentPage = $(this).val();
      if (callback) {
        callback(ty_currentPage);
      }
    });

  } else {
    // 隐藏分页
    $paging.hide();
  }

  // 取消绑定event
  $homePage.unbind().click();
  $prevPage.unbind().click();
  $nextPage.unbind().click();
  $jumpPage.unbind().click();

  // 首页 ,上一页 绑定event
  if (ty_currentPage !== 1) {

    $homePage.click(function () {// 首页
      ty_currentPage = 1;
      if (callback) {
        callback(ty_currentPage);
      }
    });
    $prevPage.click(function () {// 上一页
      ty_currentPage = Math.max(1, --ty_currentPage);
      if (callback) {
        callback(ty_currentPage);
      }
    });

    $homePage.css("color", "#666");
    $prevPage.css("color", "#666");

  } else {
    $homePage.css("color", "#ddd");
    $prevPage.css("color", "#ddd");
  }

  // 下一页 绑定event
  if (ty_currentPage !== maxPage) {
    $nextPage.click(function () {
      ty_currentPage = Math.min(maxPage, ++ty_currentPage);
      if (callback) {
        callback(ty_currentPage);
      }
    });

    $jumpPage.css('color','#666');
    $nextPage.css("color", "#666");
  } else {
    $jumpPage.css('color','#ddd');
    $nextPage.css("color", "#ddd");
  }

  // 跳转 绑定event
  $jumpPage.click(function () {
    if (checkPositiveInteger($inputPage.val())) {// 正整数
      ty_currentPage = Math.min(maxPage, $inputPage.val());
      if (callback) {
        callback(ty_currentPage);
      }
    } else {
      $inputPage.focus();
    }

  });

  // 校验是否输入正整数
  var checkPositiveInteger = function (integer) {
    if (!integer.match(/^[0-9]*[1-9][0-9]*$/)) {
      return false;
    } else {
      return true;
    }
  };
}
