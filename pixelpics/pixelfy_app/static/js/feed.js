$('button[name="post_id"]').each(button => button.click(function(){
      $.ajax({
               type: "POST",
               url: "{% url 'pixelfy:like_post' %}",
               // data: {'slug': $(this).attr('titulo'), 'csrfmiddlewaretoken': '{{ csrf_token }}'},
               dataType: "json",
               success: function(response) {
            },
                error: function(error) {
                       console.log(error);
            }
      });
}))

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
