'use strict';

function getDogImage(breedString) {
  fetch(`https://dog.ceo/api/breed/${breedString}/images/random`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      renderDogs(responseJson);
    })
    .catch(error => console.log(error));
}

function renderDogs(DogImage) {
  // let DogHtml = '';
// 
  // DogImage.message.forEach(function(Url) {
  //   DogHtml = DogHtml
  //   .concat(`<img src ='${Url}' alt='This is a random image of a dog.'>`)
  // })
  let DogHtml = `<img src='${DogImage.message}' alt='This is a random image of a dog.'>`
  console.log(DogHtml);
  $('#results').html(DogHtml); 
}

function loadDogBreeds(){
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(responseJson => parseDogBreeds(responseJson))
    .then(breeds => renderDogBreeds(breeds))
    .catch(error => console.log(error));
}

function parseDogBreeds(dogJson){
  //dogJson.message is obj of arrays, most empty
  //"main breed" : [sub breed names, if any]
  let arr = Object.keys(dogJson.message);
  let breeds = []
  arr.forEach(breed => {
    if (0 === dogJson.message[breed].length){ //no sub-breeds
      breeds.push(breed);
    } else {
      dogJson.message[breed].forEach(subtype => {
        breeds.push(`${subtype}-${breed}`)
      })
    }
  })
  return breeds;
}

function renderDogBreeds(breeds) {
  let html = '';
  breeds.forEach(breed => {
    if (-1 === breed.indexOf('-')){
      html = html.concat(`<option value="${breed}">${breed}</option>`);
    } else {
      let split = breed.split('-');
      html = html.concat(`<option value="${breed}">${split[1]} ${split[0]}</option>`);
    }
  });
  $('.breed-selector').html(html);
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const breed = $('.breed-selector').val() //doesn't matter which one we watch
    getDogImage(breed);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  loadDogBreeds();
});