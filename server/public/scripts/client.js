console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  $('#viewKoalas').on('click', '.js-btn-remove', removeKoala); // this will be our delete route
  $('#viewKoalas').on('click', '.transfer', updateKoala);

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let name = $('#nameIn').val();
    let age = $('#ageIn').val();
    let gender = $('#genderIn').val();
    let readyForTransfer = $('#readyForTransferIn').val();
    let notes = $('#notesIn').val();

    let koalaToSend = {
      name,
      age,
      gender,
      readyForTransfer,
      notes
    };
    // call saveKoala with the new obejct

    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
}).then(function(arrayFromDatabase) {
    // Take the data from the server (that we got from the
    // database), and send that over to the render function.
    render(arrayFromDatabase);
});
} // end getKoalas

function updateKoala() {
  const koalaId = $(this).parent().parent().data('id');

  $.ajax({
    type:'PUT',
    url: '/koalas/readyForTransfer/' + koalaId
  }).then(function(response){
    getKoalas();
  })
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
}).then(function(response) {
    getKoalas();
})
}

function render(arrayFromDatabase) {
  // Find container, and wipe out all its children
  $('#viewKoalas').empty();

  // The argument above, called arrayFromDatabase,
  // has an array of objects, and for each object
  // do the things in the loop
  for (let koalaholla of arrayFromDatabase) {
      // Add a new div and children to container,
      // for each item inside the array
      $('#viewKoalas').append(`
          <tr class="table" data-id="${koalaholla.id}">
              <td>${koalaholla.name}</td>
              <td>${koalaholla.gender}</td>
              <td>${koalaholla.age}</td>
              <td>${koalaholla.readyForTransfer}<button class="transfer btn btn-primary">Transfer</button></td>
              <td>${koalaholla.notes}</td>
              <td><button class = "js-btn-remove btn btn-danger" >Remove</button></td>

          </tr>
      `);
  }
}

function removeKoala() {
  const koalaId = $(this).parent().parent().data('id');
    console.log(koalaId);
    console.log('it works');

    $.ajax({
        type: 'DELETE',
        url: '/koalas/delete/' + koalaId
    }).then(function(response) {
        getKoalas();
    })
} // this is for the client side
