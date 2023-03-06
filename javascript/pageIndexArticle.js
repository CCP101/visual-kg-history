import getData from './function.js';

/**
 * 读取MySQL数据库中的历史上的今天
 * */
async function getHT() {
  const getHistoryToday = await getData('sql', 'getAllHT', 'history');
  let addHTML = '';
  for (let i=0; i < getHistoryToday.length; i++) {
    addHTML += '        <div class="d-flex flex-row bd-highlight mb-3 mt-5">';
    addHTML += '          <a href="#" style="color:blue;">' +
                          getHistoryToday[i].DATE + '</a>' + '</a>';
    addHTML += '          <div class="d-flex flex-row bd-highlight">';
    addHTML += '            <p>'+ getHistoryToday[i].HISTORY +'</p>';
    addHTML += '          </div>';
    addHTML += '        </div>';
  }
  $('#HT').append(addHTML);
}

/**
 * 读取MySQL数据库中的热点话题
 * */
async function getHotTopic() {
  const getHotTopicToday = await getData('sql', 'getHotTopic', 'history');
  let addHTML = '';
  for (let i=0; i < getHotTopicToday.length; i++) {
    addHTML += '        <div class="d-flex flex-row bd-highlight ml-3">';
    addHTML += '<a href="#" style="color:blue;">' +
      getHotTopicToday[i].topic +'</a>';
    addHTML += '        </div>';
  }
  $('#HTD').append(addHTML);
}

/**
 * 读取MySQL数据库中的最新文章
 * */
async function getLatestArticle() {
  const LatestArticle = await getData('sql', 'getArticle', 'article');
  let addHTML = '';
  for (let i=0; i < LatestArticle.length; i++) {
    if (LatestArticle[i].type === 'a') {
      addHTML += '<div class="card">';
      addHTML += '<img alt="..." class="card-img-top" ' +
        'src="'+LatestArticle[i].photo+'">';
      addHTML += '            <div class="card-body">';
      addHTML += '              <h5 class="card-title"><b>'+
        LatestArticle[i].shortname + '</b></h5>';
      addHTML += '<p class="card-text">' +LatestArticle[i].introduce +'</p>';
      addHTML += '            </div>\n' +
        '          </div>';
    } else {
      addHTML += '<div class="card p-3">';
      addHTML += '<blockquote class="blockquote mb-0 card-body">';
      addHTML += '<p><b>'+LatestArticle[i].introduce+'</b></p>';
      addHTML += '<footer class="blockquote-footer">\n' +
        '                <small class="text-muted">';
      addHTML += '<cite>'+ LatestArticle[i].shortname +'</cite>';
      addHTML += '                </small>\n' +
        '              </footer>\n' +
        '            </blockquote>\n' +
        '          </div>';
    }
  }
  $('#LA').append(addHTML);
}

export {getHT, getHotTopic, getLatestArticle};
