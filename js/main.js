document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  
 var siteName = document.getElementById('siteName').value;
 var siteUrl = document.getElementById('siteUrl').value;    
    

    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    
     var bookmark = {
         name: siteName,
         url: siteUrl
     }    

 
// //local storage test
//localStorage.setItem('test','hey there!');
//console.log(localStorage.getItem('test'));
 
 if(localStorage.getItem('bookmarks') === null){
     //initiate the array bookmarks
     var bookmarks = [];
     //Adding the values got from the submit button to the array
     bookmarks.push(bookmark);
     
     //set the array values to the local storage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
     ``
 } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
        //add to the array
        bookmarks.push(bookmark);
        
        //adding the data to the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
}
    
  //clear the form
    document.getElementById('myForm').reset();
    
    
  //re-fetch bookmarks
    fetchBookmarks();
e.preventDefault();    
}

//deleting a bookmark
function deleteBookmark(url){
    var bookmarks =  JSON.parse(localStorage.getItem('bookmarks'));
    
    //loop through the bookmarks
    for(var i = 0; i< bookmarks.length; i++){
    if(bookmarks[i].url == url){
        bookmarks.splice([i], 1);
    }
    }
//re-set the bookmarks to local storage
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  
    
    //re-fetch bookmarks
    fetchBookmarks();
}



//fetching the data out to the screen 
 function fetchBookmarks(){
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     
     var bookmarksResults = document.getElementById('bookmarksResults');
     
     //building output
     
     bookmarksResults.innerHTML = ' ';
     for(var i = 0; i< bookmarks.length; i++){
         var name = bookmarks[i].name;
         var url = bookmarks[i].url;
         
         bookmarksResults.innerHTML += '<div class="well">'+
                                       '<h3>'+name+
                                       '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                       '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
                                       '</h3>'+
                                       '</div>';
     }
 }

//validate form 
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill in the form!');
        return false;
    }
    
    var expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please use a valid url!!');
        return false;
    }
    
    return true;
}