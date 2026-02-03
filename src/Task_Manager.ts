import promptSync from "prompt-sync";
import { Status,Priority,Task,tResult } from "./task_Initialization";
import { Task_Tracker } from "./Task_Tracker";

//Initialaized object for the PromptSync and Task_Tracker class
const prompt=promptSync();
const Tracker=new Task_Tracker();

//Display the menu Options 
function show():void{
    console.log("1. Add Task");
    console.log("2. Update Task");
    console.log("3. Delete Task");
    console.log("4. Filter Task by Status");
    
    console.log("5. Filter Task by Priority");
    console.log("6. View All Task");
    console.log("7. Completed vs Pending");
    console.log("8. Progress Report");
    console.log("9. Exit");
}

// Get Priroity from the user 
function getPriority():Priority{
    console.log("Priorities: Low-1 Medium-2 High-3");
    const choice=parseInt(prompt("Enter Your Choice:"));
    switch(choice){
        case 1:
            return Priority.low;
        case 2:
            return Priority.medium;
        case 3:
            return Priority.high;
        default:
            console.log("Invalid Choice.Defaulting Medium");
            return Priority.medium;
    }
}

// Get Status from the user 
function getStatus():Status{
    console.log("Status: Pending=Pending, InProgress=InProgress, Completed=Completed");
    const choice=prompt("Enter Your Choice:");
    switch(choice){
        case 'Pending':
            return Status.Pending;
        case 'InProgress':
            return Status.InProgress;
        case 'Completed':
            return Status.Completed;
        default:
            console.log("Invalid Choice.Defaulting Pending");
            return Status.Pending;
    }
}

// Main menu Loop
function main():void{
    let flag:boolean=true;
    while(flag){
        show();
        let choice=parseInt(prompt("Enter your choice:"));
        let id: number;
        let title: string;
        let desc: string;
        let priority: Priority;
        let status: Status;
        let result: tResult; 
        switch(choice){
            // Add Task
            case 1:
                console.log("Add Task to the System");

                title = prompt("Enter the title of the Task:");
                desc = prompt("Enter Description of the task:");
                priority = getPriority();

                const newTask = Tracker.addTask(title, desc, priority);
                console.log(`The new Task ${newTask.id} is added.`);
                Tracker.displayTask([newTask]);
                break;
            //Update Task    
            case 2:
                console.log("Update Task to the System");

                id = parseInt(prompt("Enter the task id to update:"));
                status = getStatus();

                result = Tracker.updateTask(id, status);

                if (result.success) {
                    console.log(`The Task ID ${id} is updated successfully!`);
                    if (result.task) Tracker.displayTask([result.task]);
                } else {
                    console.log(`Task ID ${id} is not found.`);
                }
                break;
        
            //Delete the Task
            case 3:
                console.log("Delete Task from the System");

                id = parseInt(prompt("Enter task id to delete:"));
                result = Tracker.deleteTask(id);

                if (result.success) {
                    console.log(`The Task ID ${id} is deleted successfully!`);
                    if (result.task) Tracker.displayTask([result.task]);
                } else {
                    console.log(`Task ID ${id} not found.`);
                }
                break;
             //Filter Task by Status
            case 4:
                console.log("Filter Task by Status");
                status=getStatus();
                const filteredTaskS:Task[]=Tracker.filterByStatus(status);
                console.log(`The Below Task are ${status}:`);
                Tracker.displayTask(filteredTaskS);
                break;
            
            //Filter The Task by priority
            case 5:
                console.log("Filter Task by Priority");
                priority=getPriority();
                const filteredTaskP:Task[]=Tracker.filterByPriority(priority);
                console.log(`The Below Task are ${priority} Priority Tasks:`);
                Tracker.displayTask(filteredTaskP);
                break;
            
            //View All the tasks in the memory
            case 6:
                console.log("View All the Tasks in the system");
                Tracker.displayTask(Tracker.viewAllTask());
                break;
            
            //Completed tasks vs Pending tasks
            case 7:
                console.log("Completed Task and Pending Task");
                Tracker.displayCompletedVsPending(Tracker.filterByStatus(Status.Completed),Tracker.filterByStatus(Status.Pending));
                break;

            //Report of the Statuses
            case 8:
                const task:Task[]=Tracker.viewAllTask();
                Tracker.getProgressReport(task);
            
            //Exit   
            case 9:
                console.log("Exiting the application.");
                flag = false;
                break;
            
            //Invalid Option
            default:
                console.log("Invalid choice. Please try again.");
        }
    }

}

main();