class Storage{
    static getCalorieLimit(defaultLimit = 2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null){
            calorieLimit = defaultLimit; 
        }else{
            calorieLimit = +localStorage.getItem('calorieLimit') //+ converts string to number
        }
        return calorieLimit
    }

    static setCalorieLimit(newLimit){
        localStorage.setItem('calorieLimit',newLimit);
    }

    static getTotalCalories(defaultCalories=0){
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null){
            totalCalories = defaultCalories;
        }else{
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static updateTotalCalories(calories){
        localStorage.setItem('totalCalories',calories);
    }

    static getMeals(defaultMeals=[]){
        let meals;
        if(localStorage.getItem('meals') === null){
            meals = defaultMeals;
        }else{
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }

    static saveMeal(meal){
        const meals = this.getMeals()
        meals.push(meal)
        localStorage.setItem('meals',JSON.stringify(meals));
    }

    static removeMeal(id){
        const meals = this.getMeals();
        meals.forEach((meal,index)=>{
            if(meal.id === Number(id)){
                meals.splice(index,1)
            }
        });
        localStorage.setItem('meals',JSON.stringify(meals));
    }

    static getWorkouts(defaultWorkouts=[]){
        let workouts;
        if(localStorage.getItem('workouts') === null){
            workouts = defaultWorkouts;
        }else{
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }

    static saveWorkout(workout){
        const workouts = this.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts',JSON.stringify(workouts));
    }

    static removeWorkout(id){
        const workouts = this.getWorkouts();
        workouts.forEach((workout,index)=>{
            if(workout.id === Number(id)){
                workouts.splice(index,1)
            }
        });
        localStorage.setItem('workouts',JSON.stringify(workouts));
    }

    static clearAll(){
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('meals');
        localStorage.removeItem('workouts');

        // below is if u wan to delete including calorie limit
        // localStorage.clear();
    }
}

export default Storage;