// Created enum for status 
enum Status{
    Pending="Pending",
    InProgress="Inprogress",
    Completed="Completed"
}

// Created enum for Priority
enum Priority{
    low=1,
    medium,
    high
}

//Interface for creting a Task Object 
interface Task{
    id:number,
    Title:string,
    Description:string,
    status:Status,
    priority:Priority
}

// It is an type used for returning custom return type
type tResult={
    success:boolean,
    task?:Task;
}

//type aliasses used for summary of statuses
type Data={
    completed:String,
    pending:String
}

export {Status,Priority,Task,tResult,Data};