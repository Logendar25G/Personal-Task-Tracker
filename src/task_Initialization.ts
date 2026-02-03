enum Status{
    Pending="Pending",
    InProgress="Inprogress",
    Completed="Completed"
}
enum Priority{
    low=1,
    medium,
    high
}
interface Task{
    id:number,
    Title:string,
    Description:string,
    status:Status,
    priority:Priority
}

type tResult={
    success:boolean,
    task?:Task;
}

type Data={
    completed:String,
    pending:String
}

export {Status,Priority,Task,tResult,Data};