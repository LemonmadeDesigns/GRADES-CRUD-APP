$('#add-test').on('click', function () {

})

$("#create-test").on("click", function () {

});

let tests = [
  { exam: "Final", id: "1", result: "93", name: "Mobile Apps" },
  { exam: "Final", id: "2", result: "78", name: "Check Point Project" },
  { exam: "Final", id: "3", result: "89", name: "Capstone Project" },
];

for (let i in tests) {
  addRow(tests[i]);
}

function addRow(obj) {
  let row = `<tr scope="row" class="test-row-${obj.id}">
              <td> ${obj.name} </td>
              <td> ${obj.exam} </td>
              <td class="flexCenter" id="result-${obj.id}" data-testid="${obj.id}"> ${obj.result} </td>
              <td>
                <button class="btn btn-sm btn-danger" 
                  data-testid="${obj.id}" 
                  id="delete-${obj.id}"> Delete 
                </button>

                <button class="btn btn-sm btn-info disabled" 
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
  
  $('#tests-table').append(row)

  // EVENT HANDLERS
  $(`#delete-${obj.id}`).on(`click`, deleteTest)
  $(`#save-${obj.id}`).on(`click`, saveUpdate);
  $(`#confirm-${obj.id}`).on(`click`, confirmDeletion);
  $(`#cancel-${obj.id}`).on(`click`, cancelDeletion);

  $(`#result-${obj.id}`).on(`click`, editResult);
}

function editResult() {
  // USING DATA WITH OBJECT ID
  const testid = $(this).data(`testid`);

  // UPDATE VALUE OF INPUT
  const value = $(this).html();

  // UNBIND BAD BEHAVIOR BY EDIT FEATURE
  $(this).unbind()

  $(this).html(`<input 
                  type="text" 
                  class="result form-control"
                  data-testid="${testid}"
                  value="${value}">`)
  
  $(`.result`).on(`keyup`, function() {
    let testid = $(this).data(`testid`);
    let saveBtn = $(`#save-${testid}`);
    saveBtn.prop(`disabled`, false)
  });

}

function saveUpdate() {
  console.log('Saved!')

  // USING DATA WITH OBJECT ID
  let testid = $(this).data(`testid`);

  let saveBtn = $(`#save-${testid}`);
  let row = $(`.test-row-${testid}`);

  saveBtn.prop(`disabled`, true)
  row.css("opacity", "0.5")

  setTimeout(function() {
    row.css("opacity", "1")
  }, 2000)
}

function deleteTest() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data(`testid`);

  // CREATING VARIABLE TO USE THE OBJECT BY IS ID
  let deleteBtn = $(`#delete-${testid}`);
  let saveBtn = $(`#save-${testid}`);
  let cancelBtn = $(`#cancel-${testid}`);
  let confirmBtn = $(`#confirm-${testid}`);

  // ADDING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  deleteBtn.addClass("hidden");
  saveBtn.addClass("hidden");

  // REMOVING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  cancelBtn.removeClass("hidden");
  confirmBtn.removeClass("hidden");
}

function cancelDeletion() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data(`testid`);

  // CREATING VARIABLE TO USE THE OBJECT BY IS ID
  let deleteBtn = $(`#delete-${testid}`);
  let saveBtn = $(`#save-${testid}`);
  let cancelBtn = $(`#cancel-${testid}`);
  let confirmBtn = $(`#confirm-${testid}`);

  // REMOVING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  deleteBtn.removeClass("hidden");
  saveBtn.removeClass("hidden");

  // ADDING A CLASS SO THAT I CAN USE THE ATTRIBUTE
  confirmBtn.addClass("hidden");
  cancelBtn.addClass("hidden");
}

function confirmDeletion() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data(`testid`);

  let row = $(`.test-row-${testid}`)

  // REMOVE ROWS USING REMOVE METHOD
  row.remove()
}
