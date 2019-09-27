'use strict';

function getDogImages(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      renderDogs(responseJson);
    })
    .catch(error => console.log(error));
}

function renderDogs(DogImage) {
  let DogHtml = '';

  DogImage.message.forEach(function(Url) {
    DogHtml = DogHtml
    .concat(`<img src ='${Url}' alt='This is a random image of a dog.'>`)
  })
  console.log(DogHtml);
  $('.results').html(DogHtml); 
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const num = $('#num').val() //doesn't matter which one we watch
    getDogImages(num);
  });
}
function watchSlider() {
  $('#slider').on('input', event => {
    $('#num').val(event.target.value);
  });
}
function watchNumberBox() {
  $('#num').on('input', event => {
    $('#slider').val(event.target.value);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchNumberBox();
  watchSlider();
});