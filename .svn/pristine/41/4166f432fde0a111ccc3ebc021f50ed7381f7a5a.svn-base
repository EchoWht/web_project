/**
* Pure CSS bold graphic login 
* Inspired by this poster design by Mark Brooks
* https://www.pinterest.com/pin/173247916888185020/
*/

// Ripple Effect

$('.ripple').on('click', function(event) {
  event.preventDefault();
  var $div = $('<div/>'),
    btnOffset = $(this).offset(),
    xPos = event.pageX - btnOffset.left,
    yPos = event.pageY - btnOffset.top;

  $div.addClass('ripple-effect');
  var $ripple = $(".ripple-effect");

  $ripple.css("height", $(this).height());
  $ripple.css("width", $(this).height());
  $div
    .css({
      top: yPos - ($ripple.height() / 2),
      left: xPos - ($ripple.width() / 2),
      background: $(this).data("ripple-color")
    })
    .appendTo($(this));

  window.setTimeout(function() {
    $div.remove();
  }, 1200);
});