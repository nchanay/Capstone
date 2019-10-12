// $('button[name="post_id"]').on('click', '#like', function(event){
$(document).on('click', '#like', function(event){
    event.preventDefault();
    var pk = $(this).attr('vaule')
    $.ajax({
         type: "POST",
         url: "{% url 'pixelfy:like_post' %}",
         data: {'id': pk, 'csrfmiddlewaretoken': '{{ csrf_token }}'},
         dataType: "json",
         success: function(response) {
           $('#like-section').html(response['form'])
           console.log($('#like-section').html(response['form']));
        },
          error: function(rs, e) {
                 console.log(rs.responseText);
        }
    });
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
