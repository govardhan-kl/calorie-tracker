class CalorieTracker {
    constructor(){
        this._calorieLimit = 200;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._displayCalorieLimit()
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayClaorieProgress()
    }

    //public methods
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render()
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render()
    }

    //private-methods
    _displayCaloriesTotal(){
        const totalCalories = document.getElementById('calories-total');
        totalCalories.innerText = this._totalCalories;
    }

    _displayCalorieLimit(){
        const caloriesLimit = document.getElementById('calories-limit');
        caloriesLimit.innerText = this._calorieLimit
    }

    _displayCaloriesConsumed(){
        const caloriesConsumed = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((accum,meal)=>{
           return accum + meal.calories},0) //we are saying accumator start value is 0
        console.log(caloriesConsumed, consumed)
        caloriesConsumed.innerText =  consumed;
    }

    _displayCaloriesBurned(){
        const caloriesBurned = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((accum,workout)=>{
           return accum + workout.calories},0)
        caloriesBurned.innerText = burned
    }

    _displayCaloriesRemaining(){
        const caloriesRemaining = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        caloriesRemaining.innerText =  remaining
        const progressBar = document.getElementById('calorie-progress');

        //checking if thee is any daily limit calorie limit is consumed or not to display warning
        if(remaining<=0){
            //chnaging for card body of calories remaining
            caloriesRemaining.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemaining.parentElement.parentElement.classList.add('bg-danger');
            //changing for progress bar
            progressBar.classList.add('bg-danger')
            progressBar.classList.remove('bg-success')
        }else{
            caloriesRemaining.parentElement.parentElement.classList.add('bg-light');
            caloriesRemaining.parentElement.parentElement.classList.remove('bg-danger');
            progressBar.classList.remove('bg-danger')
            progressBar.classList.add('bg-success')
        }
    }

    _displayClaorieProgress(){
        const progressBar = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit)*100;
        const width = Math.min(percentage,100);
        console.log(width)
        progressBar.style.width = `${width}%`;
        // if(this._displayCaloriesRemaining()<=0){

        // }
    }

    _render(){
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayClaorieProgress()
    }
}


class Meal {
    constructor(name,calories){
        this.id = Date.now();
        this.name = name;
        this.calories = calories;
    }
}


class Workout {
    constructor(name,calories){
        this.id = Date.now();
        this.name = name;
        this.calories = calories;
    }
}

class App {
    constructor(){
        this._tracker = new CalorieTracker();
        document.getElementById('meal-form').addEventListener('submit',this._addNewMeal.bind(this));//bind helps us to ind this to an App class no to the element the event is on
        document.getElementById('workout-form').addEventListener('submit',this._addNewWorkout.bind(this));
    }

    _addNewMeal(e){
        e.preventDefault();
        const name = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        //validate inputs
        if (name.value === '' || calories.value === ''){
            alert('Pill fill the fields');
            return
        }
       
        const meal = new Meal(name.value,Number(calories.value));//bcoz the values will be in string, or we can do +caloreies.value
        this._tracker.addMeal(meal);

        name.value = '';
        calories.value = '';

        const collapseMealForm = document.getElementById('collapse-meal');
        const bsCollapse = new bootstrap.Collapse(collapseMealForm,{
            toggle:true
        });
        // collpsed.style.display = 'none';
    }

    _addNewWorkout(e){
        e.preventDefault();
        const name = document.getElementById('workout-name');
        const calories = document.getElementById('workout-calories');

        //validate inputs
        if (name.value === '' || calories.value === ''){
            alert('Pill fill the fields');
            return;
        }
       
        const workout = new Workout(name.value,Number(calories.value));//bcoz the values will be in string, or we can do +caloreies.value
        this._tracker.addWorkout(workout);

        name.value = '';
        calories.value = '';

        const collapseWorkoutForm = document.getElementById('collapse-workout');
        const bsCollapse = new bootstrap.Collapse(collapseWorkoutForm,{
            toggle:true
        });
        console.log(bsCollapse);
    }
}

const app = new App()
console.log(app)