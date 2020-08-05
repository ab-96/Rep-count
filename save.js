//This section is the code to manage the results for compelted workouts. 



//Represents a workout 
class workout {
    constructor(weight, set, rep) {
      this.weight = weight;
      this.set = set;
      this.rep = rep;
    }
  }
  
  // Handles the interfacse task 
  class interface {
    static listWorkout() {
      const workout = storage.getWorkout();
  
      workout.forEach((workout) => interface.addWorkoutToList(workout));
    }
  
    static addWorkoutToList(workout) {
      const list = document.querySelector('workout-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${workout.weight}</td>
        <td>${workout.set}</td>
        <td>${workout.reps}</td>
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
      const form = document.querySelector('#Workout-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#weight').value = '';
      document.querySelector('#set').value = '';
      document.querySelector('#reps').value = '';
    }
  }
  
  // takes care of storage using local storage
  class storage {
    static getWorkout() {
      let workouts;
      if(localStorage.getItem('workouts') === null) {
        workouts = [];
      } else {
        workouts = JSON.parse(localStorage.getItem('workouts'));
      }
  
      return workouts;
    }
  
    static addWorkout(workout) {
      const workouts = storage.getWorkout();
     workouts.push(workouts);
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
  
    static deleteWorkout(reps) {
      const workouts = storage.getWorkout();
  
      workouts.forEach((workout, index) => {
        if(workout.reps === reps) {
          workouts.splice(index, 1);
        }
      });
  
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
  }
  
  // shows the logged workouts in the list
  document.addEventListener('DOMContentLoaded', interface.listWorkout);
  
  // add/loggs workout
  document.querySelector('#Workout-form').addEventListener('submit', (e) => {
    // Prevent submit
    e.preventDefault();
  
    // Get form values
    const weight = document.querySelector('#weight').value;
    const set = document.querySelector('#set').value;
    const reps = document.querySelector('#reps').value;
  
    // error handling 
    if(weight === '' || set === '' || reps === '') {
      interface.showAlert('Please fill in the blanks', 'danger');
    } else {
      
      const workout = new workout(weight, set, reps);
  
      // Add workout to interface
      interface.addWorkoutToList(workout);
  
      // Add workout to local store
      storage.addWorkout(workout);
  
      // Show success message
      interface.showAlert('Workout Added', 'success');
  
      // Clear the fields
      interface.clearFields();
    }
  });
  
  // removes/deletes logged workout
  document.querySelector('#workout-list').addEventListener('click', (e) => {
    // Remove workout from interface
    interface.deleteWorkout(e.target);
  
    // Remove workout from storage
    storage.deleteWorkout(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    interface.showAlert('Workout Removed', 'success');
  });