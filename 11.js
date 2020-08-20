//This section is the code to manage the results for compelted workouts. 

//Represents a workout 

class Log {
  constructor(weight, sets, reps) {
    this.weight = weight;
    this.sets = sets;
    this.reps = reps;
  }
}

// handles the user interface tasks
class uInterface {
  static listWorkout() {
    const workout = Store.getWorkout();

    workout.forEach((book) => uInterface.addWorkoutToList(book));
  }

  static addWorkoutToList(book) {
    const list = document.querySelector('#workout-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.weight}</td>
      <td>${book.sets}</td>
      <td>${book.reps}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Remove</a></td>
    `;

    list.appendChild(row);
  }

  static deleteWorkout(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#workout-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#weight').value = '';
    document.querySelector('#sets').value = '';
    document.querySelector('#reps').value = '';
  }
}

// takes care of storage using local storage
class Store {
  static getWorkout() {
    let workout;
    if(localStorage.getItem('workout') === null) {
      workout = [];
    } else {
      workout = JSON.parse(localStorage.getItem('workout'));
    }

    return workout;
  }

  static addWorkout(workout) {
    const workouts = Store.getWorkout();
    workout.push(workout);
    localStorage.setItem('books', JSON.stringify(workout));
  }

  static removeWorkout(reps) {
    const workout = Store.getWorkout();

    workout.forEach((workout, index) => {
      if(book.reps === reps) {
        workout.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(workout));
  }
}

// shows the logged workouts in the list
document.addEventListener('DOMContentLoaded', uInterface.listWorkout);

// add/loggs workout
document.querySelector('#workout-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const weight = document.querySelector('#weight').value;
  const sets = document.querySelector('#sets').value;
  const reps = document.querySelector('#reps').value;

  // error handling 
  if(weight === '' || sets === '' || reps === '') {
    uInterface.showAlert('Please fill in the blanks', 'danger');
  } else {
    // Instatiate log
    const workout = new Log(weight, sets, reps);

    // Add workout to interface
    uInterface.addWorkoutToList(workout);

    // Add workout to storage
    Store.addWorkout(workout);

    // Show success message when log is added
    uInterface.showAlert('Workout Added', 'success');

    // Clear fields
    uInterface.clearFields();
  }
});

 // removes/deletes logged workout
document.querySelector('#workout-list').addEventListener('click', (e) => {
  // Remove workout from interface
  uInterface.deleteWorkout(e.target);

  // Remove workout from storage
  Store.removeWorkout(e.target.parentElement.previousElementSibling.textContent);

  // Show success message when workout has been removed
  uInterface.showAlert('Workout Removed', 'success');
});