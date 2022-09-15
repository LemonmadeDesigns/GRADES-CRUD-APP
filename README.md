# Week 10 - SODA DINER CHECK POINT #

<div style="position: relative; top: 0em; text-align: center;">
<img src="./imgs/CRUD.png" style="width: 400px%;"
    alt="CRUD" />
</div>

Week 10 - BASIC CRUD FUNCTIONALITY

- [Reminder](#reminder)
- [Instructor's Note](#instructors-note)
- [Background](#background)
- [Learning Objectives](#learning-objectives)
- [Glossary](#glossary)
- [Starting Point](#starting-point)
- [First Steps](#first-steps)
- [Second Step](#second-step)
- [Third Step](#third-step)
- [Fourth Step](#fourth-step)
- [Fifth Step](#fifth-step)
- [Sixth Step](#sixth-step)
- [Seventh Step](#seventh-step)
- [Eighth Step](#eighth-step)
- [Setting Up the Front End Edit Functionality](#setting-up-the-front-end-edit-functionality)
- [Final Thoughts](#final-thoughts)
- [Review Questions](#review-questions)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Instructor's Note ##

This is a rather lengthy lesson plan. It may be necessary for you to limit side discussions as much as possible in order to set a good pace. That being said, make sure to answer any questions throroughly and completely while moving through the material.

---

## Background ##

The students should have a working full-stack app that utilizes API calls and serves out templated HTML with EJS and Express. They should also have a database built on their local environment using MongoDB, and their app should be able to read and create documents with that database.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Perform the CREATE method by creating data from a form
- Perform the READ method by reading data from a form
- Perform the UPDATE method by updating data from a form
- Perform the DELETE method by deleting data from a form
- Creating front-end elements to handle the CRUD operations

---

## Glossary ##

- `jQuery`:  jQuery is a concise and fast JavaScript library that can be used to simplify event handling, HTML document traversing, Ajax interactions and animation for speedy website development. jQuery simplifies the HTML's client-side scripting, thus simplifying Web 2.0 applications development.

---

## Starting Point ##

Before we begin this lesson, let's grab our `/grades-crud-app` directory. Move it to your `Documents` directory and initialize it as a git repository.

```bash
  git clone </"ADD YOUR COPY OF THE REPO HERE">
```

---

## First Steps ##

Before we can actually perform any CRUD action, we must first provide the user with a way to perform these operations. Let's start by adding a couple of buttons to the form that get rendered to the home page. Open up `js/main.js` file in your editor and add the following:

```html
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Grade CRUD App</title>

    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
      integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

    <!-- jQUERY -->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>

    <!-- CUSTOM STYLES -->
    <link rel="stylesheet" href="css/main.css">

  </head>
```

Now we are going to add the <body></body> content to make sure that our code is and can be connect to our page

```html
<body>
    <div>

      <!-- BOOTSTRAP CONTAINER -->
      <div class="container">

        <!-- BOOTSTRAP 12 COLUMN, MEDIUM -->
        <div class="col-md-12">

          <!-- GIVES A NICE BORDER AROUND APPLICATION -->
          <div class="card card-body">

            <!-- FORM WRAPPER & BUTTON -->
            <button class="btn btn-sm btn-primary" id="add-class"> Add Class </button>

            <!-- FORM THAT WILL BE HIDDEN UPON INITIAL DISPLAY -->
            <div class="form-wrapper hidden">
              
              <!-- SELECT OPTIONS INPUT -->
              <label for="">Name</label>
              <select id="class-name" class="form-control">
                <option value="">Please Select</option>
                <option value="Mobile Apps"> Mobile Apps </option>
                <option value="Check Point Project"> Check Point Project </option>
                <option value="Capstone Project"> Capstone Project </option>
              </select>

              <!-- EXAM INPUT -->
              <label for="">Exam</label>
              <input type="text" class="form-control" id="class-exam" placeholder="Mid-Term, Final, Capstone">
              
              <!-- RESULTS INPUT -->
              <label for="">Results</label>
              <input type="number" class="form-control" id="class-result" placeholder="97">
              
              <!-- BUTTON TO ADD ROW TO TABLE -->
              <div id="add-to-table">
                <button class="btn btn-sm btn-info" id="create-class"> Add To Table </button>
              </div>
              
            </div>

            <!-- TABLE DATA -->
            <table>
              <thead>
                <tr>
                  <!-- TABLE HEAD  -->
                  <th scope="col">NAME</th>
                  <th scope="col">EXAM</th>
                  <th scope="col">RESULTS</th>
                </tr>
              </thead>
              <tbody id="class-table">
                <!-- BODY OF TABLE IN JAVASCRIPT -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- JAVASCRIPT -->
    <script type="text/javascript" src="js/main.js"></script>
  </body>
```

Pay particular attention to the difference between this `form` and the `movie-form.ejs` file from which it was initially copied. Discuss how the context works, starting with how it is sent from the controller.

---

## Second Step ##

```javascript
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

}
```

> `Consider This`  
> What do you think the significance of the `data-testid` attribute is?  
>> Expect: These are data tags that allow a developer to pull information out of the HTML element itself.

---

## Third Step ##

Now let's add a little styling to this page to make it look good. Open up `css/main.css` in your editor and append the following rules:

```css
html, body { height: 100%;  width: 100%; }

.container { padding-top: 1em; height: 100%; width: 100%; }

.card-body {
  border-radius: 0;
}

.form-wrapper {
  padding: 1em;
}

.hidden {
  display: none;
}

.btn, .form-control {
  border-radius: 0;
}

.form-control {
  margin-bottom: 10px;
}

table {
  width: 100%;
  background-color: rgb(32, 33, 36);
  color: white;
}

th, td {
  text-align: center;
}

th {
  background-color: rgb(32, 33, 36);
  padding: 0.5em 0;
}

tr:nth-child(odd) {
  background-color: rgb(69, 69, 69);
}

td {
  padding: 10px 0 11px;
}

td.flexCenter {
  display: flex;
  justify-content: center;
}

.result {
  max-width: 80px;
  text-align: center;
  padding: 0;
  width: 80px;
}

#add-to-table {
  display: flex;
  justify-content: flex-end;
}

td > button.btn {
  width: 75px;
}

```

---

Now reload the page in your browser and open up your dev tools to the console tab. Click the `Add Class` and `Delete` buttons a few times. What do you see? Why do you see this? There is a lot going on in the block of code above. Make sure you understand it before moving on. Ask questions about anything you don't understand.

> `Consider This`  
> Why is there one event listener listening for all the button clicks on the `movies` element instead of individual listeners on each button?  
>> Expect: We're taking advantage of event bubbling in order to minimize the number of listeners present in our application because they consume resources. In addition, it will dynamically listen to every movie as they are added to the database.

---

## Fourth Step ##

### Setting Up the Front End Edit Functionality ###

```js
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
```

---

## Fifth Step ##

### Setting Up the Front End Save Functionality ###

```js
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
```

---

## Sixth Step ##

### Setting Up the Front End Delete Functionality ###

```js
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
```

---

## Seventh Step ##

### Setting Up the Front End Cancel Functionality ###

```js
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
```

---

## Eighth Step ##

### Setting Up the Front End Confiorm Functionality ###

```js
function confirmDeletion() {
  // USING DATA WITH OBJECT ID
  let testid = $(this).data('testid');

  // CONFIRMS DELETION
  let row = $(`.class-row-${testid}`)

  // REMOVE ROWS USING REMOVE METHOD
  row.remove()
}
```

---

## Setting Up the Front End Functionality ##

Notice how similar this file is to `movie-form.js`. Discuss the differences you see and why they are necessary. Make sure you understand everything going on here and take some time later to go over every detail.

---

## Final Thoughts ##

I know we covered a lot today, so make sure to take some time and go back over everything we did. See if there are any ways you can improve upon the design. See if there are any interesting features you would like to add to the project, or if you can accomplish some of the same tasks in different ways. Remember, you know how to use jQuery and Bootstrap, both of which are used in this project. Next time we're going to really shift gears as we dive headfirst into React!

---

## Review Questions ##

- How can you implement CREATE methods into your projects?
- How can you implement READ methods into your projects?
- How can you implement UPDATE methods into your projects?
- How can you implement DELETE methods into your projects?
- In what ways can you modularize or improve the project thus far?

<div style="position: relative; top: -5em; text-align: center;">

<div style="position: relative; left: -400px; top: 100px;">
<img src="./imgs/CRUD.png" style="width: 300px; height: 300px;"
    alt="CRUD" />
</div>

<div style="position: relative; left: -100px; top: -150px;">
<img src="./imgs/CRUD-Update.png" style="width: 300px; height: 300px;"
    alt="CRUD-Update" />
</div>

<div style="position: relative; left: 200px; top: -400px;">
<img src="./imgs/CRUD-Create.png" style="width: 300px; height: 300px;"
    alt="CRUD-Create" />
</div>

</div>
