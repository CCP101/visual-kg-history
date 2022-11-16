$('main').on('click', '[data-type="page-transition"]', function(event){

    event.preventDefault();
    
    //detect which page has been selected
    
    var newPage = $(this).attr('href');
    
    //if the page is not animating - trigger animation
    
    if( !isAnimating ) changePage(newPage, true);
    
    });
    function changePage(url, bool) {

        isAnimating = true;
        
        // trigger page animation
        
        $('body').addClass('page-is-changing');
        
        //...
        
        loadNewContent(url, bool);
        
        //...
        
        }
    function loadNewContent(url, bool) {

            var newSectionName = 'cd-'+url.replace('.html', ''),
            
            section = $(section.load(url+' .cd-main-content > *', function(event){
            
            // load new content and replace content with the new one
            
            $('main').html(section);
            
            //...
            
            $('body').removeClass('page-is-changing');
            
            //...
            
            if(url != window.location){
            
            //add the new page to the window.history
            
            window.history.pushState({path: url},'',url);
            
            }
            
            }))
            
            }
$(window).on('popstate', function() {

    var newPageArray = location.pathname.split('/'),
                
//this is the url of the page to be loaded
                
    newPage = newPageArray[newPageArray.length - 1];
                
    if( !isAnimating ) changePage(newPage);
                
                });
        