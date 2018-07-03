export function resetAnimation(elId){
  var element = $(elId)
  element.removeClass('animated jello')
  setTimeout( () => {
    element.addClass('animated jello')
  }, 5)
}

export function resetAnimationType(elId, type){
  var element = $(elId)
  element.removeClass('animated ' + type)
  setTimeout( () => {
    element.addClass('animated ' + type)
  }, 5)
}

export function animateElement(element, animation) {
  $(element).addClass('animated ' + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
    $(this).removeClass('animated '+ animation)
  })
}
