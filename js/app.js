class CalorieTracker {
    constructor(){
        this._calorieLimit = 3000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._displayCalorieLimit()
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
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
        caloriesRemaining.innerText =  this._calorieLimit - this._totalCalories
    }

    _render(){
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
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

const tracker = new CalorieTracker();

const breakFast = new Meal('BreakFast', 300);
tracker.addMeal(breakFast);

const morningRun = new Workout('Morning Run', 200);
tracker.addWorkout(morningRun);

console.log(tracker,breakFast,morningRun)