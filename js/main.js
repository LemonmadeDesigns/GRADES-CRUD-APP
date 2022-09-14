const newId = 4

const newClass = { 'name': null, 'id': newId, 'exam': null, 'result': null }

$('#add-class').on('click', function () {
  $('.form-wrapper').removeClass('hidden')
})

$("#class-name").on("change", function () {
  newClass.name = $(this).val();
  console.log(newClass);
});

$("#class-exam").on("keyup", function () {
  newClass.exam = $(this).val();
  console.log(newClass);
});

$('#class-result').on('keyup', function () {
  newClass.result = $(this).val();
  console.log(newClass);
});

$('#create-class').on('click', function () {
  if ( newClass.name == null ) {
    alert( 'No Class Selected!' )
  } else {
    addRow(newClass)
    $('#class-name').val('')
    $('#class-exam').val('')
    $('#class-result').val('')
    $('.form-wrapper').addClass('hidden')
  }
});

// INPUT THAT DISPLAYS ON PAGE
let classes = [
  { exam: "Final", id: "1", result: "93", name: "Mobile Apps" },
  { exam: "Final", id: "2", result: "78", name: "Check Point Project" },
  { exam: "Final", id: "3", result: "89", name: "Capstone Project" },
];

// LOOP THROUGH EACH ROW USING ( for/in ) AND DISPLAYING RESULTS
for (let i in classes) {
  addRow(classes[i]);
}

// AND DISPLAY RESULTS
function addRow(obj) {
  let row = `<tr scope="row" class="class-row-${obj.id}">
              <td> ${obj.name} </td>
              <td> ${obj.exam} </td>
              <td class="flexCenter" id="result-${obj.id}" data-testid="${obj.id}"> ${obj.result} </td>
              <td>
                <button class="btn btn-sm btn-danger" 
                  data-testid="${obj.id}" 
                  id="delete-${obj.id}"> Delete 
                </button>

                <button class="btn btn-sm btn-info" 
                  disabled
                  data-testid="${obj.id}" 
                  id="save-${obj.id}"> Save 
                </button>
                
                <button class="btn btn-sm btn-danger hidden" 
                  data-testid="${obj.id}" 
                  id="cancel-${obj.id}"> Cancel 
                </button>

                <button class="btn btn-sm btn-primary hidden" 
                  data-testid="${obj.id}" 
                  id="confirm-${obj.id}"> Confirm 
                </button>
                
              </td>
            </tr>`;
  
  $('#class-table').append(row)

  // EVENT HANDLERS
  $(`#delete-${obj.id}`).on('click', deleteTest)
  $(`#save-${obj.id}`).on('click', saveUpdate);
  $(`#confirm-${obj.id}`).on('click', confirmDeletion);
  $(`#cancel-${obj.id}`).on('click', cancelDeletion);

  $(`#result-${obj.id}`).on('click', editResult);
}

function editResult() {
  // USING DATA WITH OBJECT ID
  const testid = $(this).data('testid');

  // UPDATE VALUE OF INPUT
  const value = $(this).html();

  // UNBIND BAD BEHAVIOR BY EDIT FEATURE
  $(this).unbind()

  $(this).html(`<input 
                  type="text" 
                  class="result form-control"
                  data-testid="${testid}"
                  value="${value}">`)
  
  $(`.result`).on('keyup', function() {
    let testid = $(this).data('testid');
    let saveBtn = $(`#save-${testid}`);
    saveBtn.prop('disabled', false)
  });

}

function saveUpdate() {

  // USING DATA WITH OBJECT ID
  let testid = $(this).data('testid');

  let saveBtn = $(`#save-${testid}`);
  let row = $(`.class-row-${testid}`);

  // WHICH CLASS ID IS SAVED
  console.log(`Class ID#: ${testid}  Saved!`);

  saveBtn.prop('disabled', true)
  row.css('opacity', '0.5')

  setTimeout(function() {
    row.css('opacity', '1')
  }, 2000)
}

function deleteTest() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data('testid');

  // CREATING VARIABLE TO USE THE OBJECT BY IS ID
  let deleteBtn = $(`#delete-${testid}`);
  let saveBtn = $(`#save-${testid}`);
  let cancelBtn = $(`#cancel-${testid}`);
  let confirmBtn = $(`#confirm-${testid}`);

  // ADDING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  deleteBtn.addClass('hidden');
  saveBtn.addClass('hidden');

  // REMOVING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  cancelBtn.removeClass('hidden');
  confirmBtn.removeClass('hidden');
}

function cancelDeletion() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data('testid');

  // CREATING VARIABLE TO USE THE OBJECT BY IS ID
  let deleteBtn = $(`#delete-${testid}`);
  let saveBtn = $(`#save-${testid}`);
  let cancelBtn = $(`#cancel-${testid}`);
  let confirmBtn = $(`#confirm-${testid}`);

  // REMOVING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  deleteBtn.removeClass('hidden');
  saveBtn.removeClass('hidden');

  // ADDING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  confirmBtn.addClass('hidden');
  cancelBtn.addClass('hidden');
}

function confirmDeletion() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data('testid');

  let row = $(`.class-row-${testid}`)

  // REMOVE ROWS USING REMOVE METHOD
  row.remove()
}
