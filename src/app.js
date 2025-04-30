import '@fortawesome/fontawesome-free/js/all';
import {Modal, Collapse} from 'bootstrap';
import CalorieTracker from './Tracker';
import {Meal, Workout} from './Item';
import Storage from './Storage';

import './css/bootstrap.css';
import './css/style.css';


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

        this._tracker.loadItems(Storage.getMeals(),'meals');
        this._tracker.loadItems(Storage.getWorkouts(),'workouts')
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
        const bsCollapse = new Collapse(collapseForm,{
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
        const modal = Modal.getInstance(modalEl);
        modal.hide();
            
    }
        
}

const app = new App()
console.log(app)