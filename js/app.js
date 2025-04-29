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
        this._displayNewMeal(meal);
        this._render()
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._displayNewWorkout(workout)
        this._render()
    }

    removeMeal(id){
        const index = this._meals.findIndex((meal)=>{ return meal.id === Number(id)});
        if(index !== -1){
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            this._meals.splice(index,1);
            this._render()
        }
    }

    removeWorkout(id){
        const index = this._workouts.findIndex((workout)=>{ return workout.id === Number(id)});
        if(index !== -1){
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            this._workouts.splice(index,1);
            this._render()
        }
    }

    resetDay(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._render();
    }

    setLimit(newLimitValue){
        this._calorieLimit = newLimitValue;
        this._displayCalorieLimit();
        this._render();
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
        document.getElementById('meal-form').addEventListener('submit',this._addNew_Item.bind(this, 'meal'));//bind helps us to ind this to an App class no to the element the event is on
        document.getElementById('workout-form').addEventListener('submit',this._addNew_Item.bind(this, 'workout')); // we can still pass parameters in bind
        document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this,'meal'));
        document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this,'workout'));
        //below one for filter items
        document.getElementById('filter-meals').addEventListener("keyup",this._filterItems.bind(this,'meal'));
        document.getElementById('filter-workouts').addEventListener('keyup',this._filterItems.bind(this,'workout'));
        //below is for reset day
        document.getElementById('reset').addEventListener('click', this._reset.bind(this));
        //below is for set-daily limit
        document.getElementById('limit-form').addEventListener('submit',this._setLimit.bind(this));
    }

    _addNew_Item(type,e){ //as we are passing arguments, arguments come first in the event object
        e.preventDefault();

        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        //validate inputs
        if (name.value === '' || calories.value === ''){
            alert('Pill fill the fields');
            return
        }
       
        if(type === 'meal'){
            const meal = new Meal(name.value,Number(calories.value));//bcoz the values will be in string, or we can do +caloreies.value
            this._tracker.addMeal(meal);
        }else{
            const workout = new Workout(name.value,Number(calories.value));//bcoz the values will be in string, or we can do +caloreies.value
            this._tracker.addWorkout(workout);
        }
        
        name.value = '';
        calories.value = '';

        const collapseForm = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseForm,{
            toggle:true
        });
    }

    // removing item
    _removeItem(type,e){
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
            if(confirm('Are you Sure')){
                const id = e.target.closest('.card').getAttribute('data-id')
                
                type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)

                e.target.closest('.card').remove();
            }
        }
    }

    _filterItems(type,e){
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach((item)=>{
            const name = item.firstElementChild.firstElementChild.firstElementChild.textContent.trim();
            if(name.toLowerCase().indexOf(text) !== -1 ){
               item.style.display = 'block'; 
            }else{
                item.style.display = 'none';
            }
        })  
    }

    _reset(){
        // this._tracker._calorieLimit = 4400;
        console.log(this._tracker._calorieLimit);
        this._tracker.resetDay();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _setLimit(e){
        e.preventDefault()
        const limitUpdate = document.getElementById('limit')
        if(limitUpdate.value === '' || Number(limitUpdate.value)<=0){
            alert('please add a valid limit');
            return;
        }
        if(Number(limitUpdate.value) !== this._tracker._calorieLimit){
            this._tracker.setLimit(Number(limitUpdate.value));  
        }
        limitUpdate.value = '';
        // document.getElementsByClassName('btn-close')[0].click()
        //or close as below
        const modalEl = document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
            
    }
        
}

const app = new App()
console.log(app)