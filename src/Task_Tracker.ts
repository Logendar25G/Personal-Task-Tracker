import { Status,Priority,Task,Data,tResult} from "./task_Initialization";


/*class to manage the features like add tasks,view all tasks,delete tasks , 
 update tasks and display tasks */
export class Task_Tracker{
    tasks_map=new Map<number,Task>();//map to store the tasks
    taskId:number=0; //Auto-increment ID for tasks


    // Method to add a tasks
    addTask(title:string,desc:string,priority:Priority):Task{
        const id = ++this.taskId;
        const task:Task={
            id,
            Title:title,
            Description:desc,
            status:Status.Pending,
            priority
        }
        this.tasks_map.set(id,task);
        return task;
    }

    //Return all the Tasks in the memory as an array
    viewAllTask():Task[]{
        const result:Task[]=[];
        this.tasks_map.forEach((val)=>{
            result.push(val);
        })

        return result;
    }

    //Delete the tasks using the Task ID
    deleteTask(id:number):tResult{
        if(this.tasks_map.has(id)){
            const dTask=this.tasks_map.get(id);
            this.tasks_map.delete(id);
            return {success:true,task:dTask};
        }
        else{
            return {success:false};
        }
    }

    //Update the status of the Task using ID 
    updateTask(id:number,newStatus:Status):tResult{
        const uTask=this.tasks_map.get(id);
        
        if(!uTask) return {success:false};

        uTask.status=newStatus ;
        return {success:true,task:uTask};
    }

    //Filter the tasks by status
    filterByStatus(f_status:Status):Task[]{
        const result:Task[] =[...this.tasks_map.values()].filter((val)=>{
            return (val.status===f_status);
        })
        return result;
    }

    //Filter the tasks by priority
    filterByPriority(f_priority:Priority):Task[]{
        const result:Task[] =[...this.tasks_map.values()].filter((val)=>{
            return (val.priority===f_priority);
        })
        return result;
    }

    //Display the tasks in the tabular format
    displayTask(task:Task[]):void{
        console.log("The Tasks are:");
   
        console.table(
            task.map((ele) => ({
                ID: ele.id,
                Title: ele.Title,
                Status: ele.status,
                Priority: ele.priority,
                Description: ele.Description
            }))
        )
    }

    //summary of status of the overall Tasks
    getProgressReport(task:Task[]):void{
        const total:number=task.length;
        const completed:number=task.filter((val)=>{
            val.status===Status.Completed;
        }).length;

        const pending:number=task.filter((val)=>{
            val.status===Status.Pending;
        }).length;

        const InProgress:number=task.filter((val)=>{
            val.status===Status.InProgress;
        }).length;

        console.log("===== Progress Report =====");
        console.table({
            Total_Task:total,
            Completed_Task:completed,
            Pending_Task:pending,
            InProgress_Task:InProgress
        })
    }

    
    /*displayCompletedVsPending(cTask:Task[],pTask:Task[]):void{
        const maxLen=Math.max(cTask.length,pTask.length);

        console.log("================================  COMPLETED TASKS  vs  PENDING TASKS  ================================ \n");
        console.log("Completed Task\t\t\t\t\t\t\t\t|\t\t\t\tPending Task");
        console.log("------------------------------------------------------------------------------------------------------");

        for(let i=0;i<maxLen;i++){
            const c = cTask[i];
            const p = pTask[i];

            const cText = c ? `${c.id}. ${c.Title}` : "";
            const pText = p ? `${p.id}. ${p.Title}` : "";

            console.log(`${cText}t\t\t\t\t\t\t\t|\t\t\t\t${pText}`);
        }

        console.log("\nCompleted: " + cTask.length + ", Pending: " + pTask.length);
    }*/

    // Dispaly the completed and pending tasks id and titile in table format
    displayCompletedVsPending(cTask:Task[],pTask:Task[]):void{
        const maxLen=Math.max(cTask.length,pTask.length);

        const table:Data[]=[];
        for(let i=0;i<maxLen;i++){
            const c=cTask[i];
            const p=pTask[i];

            const data:Data={
                completed:c? `${c.id} . ${p.Title}`:"",
                pending:p? `${p.id} . ${p.Title}`:""
            }
            table.push(data);
        }


        console.log("\n=====  COMPLETED TASKS  vs  PENDING TASKS  =====\n");
        console.table(table);
        console.log("\nCompleted: " + cTask.length + ", Pending: " + pTask.length + "\n");
    }



}

