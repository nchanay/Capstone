$(function() {
  $('.like-btn').each(function() {
    $(this).on('click', function(evt) {
      console.log(evt)
      fetch('like/'+$(this).attr('pk'))
    })
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
