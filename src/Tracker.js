import Storage from "./Storage";


class CalorieTracker {
    constructor(){
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();
        this._displayCalorieLimit()
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayClaorieProgress()

        // document.getElementById('limit').value = this._calorieLimit; 
    }

    //public methods
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveMeal(meal)
        this._displayNewMeal(meal);
        this._render()
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveWorkout(workout);
        this._displayNewWorkout(workout)
        this._render()
    }

    removeMeal(id){
        const index = this._meals.findIndex((meal)=>{ return meal.id === Number(id)});
        if(index !== -1){
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            Storage.updateTotalCalories(this._totalCalories);
            this._meals.splice(index,1);
            Storage.removeMeal(id)
            this._render()
        }
    }

    removeWorkout(id){
        const index = this._workouts.findIndex((workout)=>{ return workout.id === Number(id)});
        if(index !== -1){
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            Storage.updateTotalCalories(this._totalCalories)
            this._workouts.splice(index,1);
            Storage.removeWorkout(id)
            this._render()
        }
    }

    resetDay(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }

    setLimit(newLimitValue){
        Storage.setCalorieLimit(newLimitValue);
        this._calorieLimit = Storage.getCalorieLimit();//or just provide newLimitValue
        console.log(Storage.getCalorieLimit(),localStorage,this._calorieLimit)
        this._displayCalorieLimit();
        this._render();
    }

    loadItems(items,type){
        if(type === 'meals'){
            items.forEach((item)=>this._displayNewMeal(item))
        }else{
            items.forEach((item)=>this._displayNewWorkout(item)) 
        }
    }

    //private-methods
    _displayNewMeal(meal){
        const mealItems = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id',meal.id);
        mealEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                     ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
            </div>
        `
        mealItems.appendChild(mealEl);
    }

    _displayNewWorkout(workout){
        const workItems = document.getElementById('workout-items');
        const workEl = document.createElement('div');
        workEl.classList.add('card', 'my-2');
        workEl.setAttribute('data-id',workout.id);
        workEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${workout.name}</h4>
                    <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                    ${workout.calories}
                    </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        `
        workItems.appendChild(workEl);
    }

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
        let width = Math.min(percentage,100);
        width = width < 0 ? 0 : width;
        progressBar.style.width = `${width}%`;
    }

    _render(){
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayClaorieProgress()
    }
}


export default CalorieTracker;