import {getData, getQueryVariable} from '../../javascript/function.js';

// FIXME 伪代码 需要调试

/**
 * 读取MySQL数据库中的指定文章
 */
async function getArticleSpecify() {
  const articleId = getQueryVariable('id');
  const getArticle = await getData('sql', 'getArticleSpecify', articleId);
  const articleWriter = getArticle[0].writer;
  const articleTitle = getArticle[0].title;
  const articleContent = getArticle[0].content;
  const articleTime = getArticle[0].time;
  let addHTML = '        <span>发布于 ' + articleTime +'</span>';
  addHTML += '        <span>作者：' + articleWriter+ '</span>';
  addHTML += '<p class="post-tag">\n' +
    '        <a class="badge badge-pill badge-primary" href="#">' +
      articleWriter+ '</a>\n' +
    '    </p>';
  addHTML += '    <hr>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-8">\n' +
    '            <div class="content">';
  addHTML += '<h1>' + articleTitle+ '</h1>';
  addHTML += articleContent;
  addHTML += '</div>\n' +
    '<hr>\n' +
    '</div>\n' +
    '</div>\n';
  $('#TA').append(addHTML);
}

export {getArticleSpecify};
