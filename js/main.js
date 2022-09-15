let newClass = { name: null, id: null, exam: null, result: null }

// INPUT THAT DISPLAYS ON PAGE
let classes = [
  { exam: "Final", id: 1, result: 93, name: "Mobile Apps" },
  { exam: "Final", id: 2, result: 78, name: "Check Point Project" },
  { exam: "Final", id: 3, result: 89, name: "Capstone Project" },
];

// LOOP THROUGH EACH ROW USING ( for/in ) AND DISPLAYING RESULTS
for (let i in classes) {
  addRow(classes[i]);
}

// |||||||||| EVENT LISTENERS STARTS |||||||||| // 

// ONCE "ADD CLASS" BUTTON IS "clicked", FORM APPEARS 
$('#add-class').on('click', function () {
  $('.form-wrapper').removeClass('hidden')
})

// CONSOLE LOGS NAME ON "change"
$("#class-name").on("change", function () {
  newClass.name = $(this).val();
  console.log(newClass);
});

// CONSOLE LOGS TYPE OF EXAM ON "keydown"
$("#class-exam").on("keyup", function () {
  newClass.exam = $(this).val();
  console.log(newClass);
});

// CONSOLE LOGS GRADE RESULTS ON "keyup"
$('#class-result').on('keyup', function () {
  newClass.result = Number($(this).val());
  console.log(newClass);
});

// ON "click", IF NO NAME IS SELECTED, ALERT MODAL APPEARS
$('#create-class').on('click', function () {
  if ( newClass.name == null ) {
    alert( 'No Class Selected!' )
  }
  
  // ELSE ADD THE ROW AND THE SET THE INPUT TO EMPTY VALUES
  else {
    const itemToAdd = { ...newClass, id: classes[classes.length - 1].id + 1 };
    classes.push( itemToAdd );
    
    // ADD ROW AND LEAVE INPUT EMPTY 
    addRow(itemToAdd)
    $('#class-name').val('')
    $('#class-exam').val('')
    $('#class-result').val('')

    // HIDE FORM AGAIN
    $('.form-wrapper').addClass('hidden')
  }
});

// |||||||||| EVENT LISTENERS ENDS |||||||||| // 

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
  
  // APPEND ROW TO TABLE
  $('#class-table').append(row)

  // CALLING THE EVENT HANDLERS
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
  const value = $(`#result-${testid}`).val();

  // UNBIND BAD BEHAVIOR BY EDIT FEATURE
  $(this).unbind()

  // UPDATED INPUT
  $(this).html(`<input 
                  type="number"
                  id="result-${testid}"
                  class="result form-control"
                  data-testid="${testid}"
                  value="${value}">`);

  // ON "keyup" EVENT UNDISABLED
  $(`.result`).on('keyup', function() {
    let testid = $(this).data('testid')
    let saveBtn = $(`#save-${testid}`)
    saveBtn.prop('disabled', false)
  });

}

function saveUpdate() {

  // USING DATA WITH OBJECT ID
  let testid = $(this).data('testid');

  let saveBtn = $(`#save-${testid}`);
  let row = $(`.class-row-${testid}`);
  console.table(row)

  // WHICH CLASS ID IS SAVED
  console.log(`Class ID#: ${testid}  Saved!`);
  console.log($(`#result-${testid}`).html())
    
    // GRABBING VALUES AND UPDATES THE VALUE OF THE INPUT
    const newValue = $(`input#result-${testid}`).val();
    $(`#result-${testid}`).html(
      `<td class="flexCenter" id="result-${testid}" data-testid="${testid}"> ${newValue} </td>`
    );

  // DISABLES SAVE BUTTON
  saveBtn.prop('disabled', true)
  row.css('opacity', '0.5')

  // DISABLES THE INPUT AND SAVE BUTTON FOR 2 SECONDS
  setTimeout(function() {
    row.css('opacity', '1')
  }, 2000)
}

function deleteTest() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data("testid");
  
  // FILTERS THROUGH ARRAY AND REMOVE THE INPUT WITH SPECIFIC TEST ID
  classes = classes.filter((obj) => obj.id !== testid);
  
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

  // CONFIRMS DELETION
  let row = $(`.class-row-${testid}`)

  // REMOVE ROWS USING REMOVE METHOD
  row.remove()
}
