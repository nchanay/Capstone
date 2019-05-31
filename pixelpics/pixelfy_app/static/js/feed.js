document.getElementsByName('post_id').forEach(element => {
    element.addEventListener('click', function(){
      pk = $(element).attr('value')
      url = `http://127.0.0.1:8000/like_post/${pk}/`
      $.ajax({
               url: url,
               dataType: "json",
               success: function(response) {
            },
                error: function(error) {
                       console.log(error);
            }
      });
    })
})

// const likeBtns = document.querySelectorAll('.like-btn')
//
// for (let elem of likeBtns) {
//   const pk = 999
//   elem.addEventListener('click', function(evt) {
//     console.log(evt)
//     fetch('likes/'+pk)
//     .then(res => console.log(res))
//     .catch(err => alert(err))
//   })
// }
