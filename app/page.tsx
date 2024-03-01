"use client"
import Image from "next/image";
import _ from "lodash"
import { useEffect, useState } from "react";

export default function Home() {
  const [itemStore,setItemStore]=useState<Task[]>()
  const [editMode,setEditMode]=useState<boolean>(true)
  
  const [id,setId]=useState<number|null>()
  const [taskName,setTaskName]=useState<string|"">("")
  type Task={
    id:number,
    name:string,
    status:string
  }
  let tasks:Task[] = [
    {
      id: 1,
      name: "Training at the gym",
      status: "incomplete",
    }
    // {
    //   id: 2,
    //   name: "Training at the gym",
    //   status: "incomplete",
    // },

    // {
    //   id: 3,
    //   name: "Training at the gym",
    //   status: "incomplete",
    // },
  ];


 

  

const updateTaskStat=(id:number)=>{
  tasks=  _.map(tasks, (task) => {
    if (task.id === id) {
      if(task?.status=="incomplete"){
console.log(task)

      return { ...task, status: "complete" };
      }
   
      console.log(task)
      return { ...task, status: "incomplete" };
    }
    console.log(task)
    return task;
  });
  localStorage.setItem("itemsStore",JSON.stringify(tasks)) 
}

const updateTask=(id:number)=>{
  
  tasks=  _.map(tasks, (task) => {
    if (task.id === id) {
      
      return {
        ...task,name:taskName
      }
   

    }
    return task
   
  });
  localStorage.setItem("itemsStore",JSON.stringify(tasks)) 
  console.log(tasks)
}


const deleteTask=(id:number)=>{
  _.remove(tasks, (task)=>task?.id==id)
  localStorage.setItem("itemsStore",JSON.stringify(tasks)) 
}

useEffect(() => {
  // Check if localStorage is available
  if (typeof window !== 'undefined' && window.localStorage) {
    let itemLocalStore = localStorage.getItem("itemsStore");
    if (itemLocalStore) {
      let t = JSON.parse(itemLocalStore);
      setItemStore(t);
      console.log(itemStore)
    }
  }
},[itemStore]);

  // const taskStore=localStorage.setItem ("taskStore",JSON.stringify(tasks))
  return (
    <main className="flex min-h-screen  ">
      <div className="lg:w-[40%]  relative shadow-[0px_0px_10px_0px_#00000026]">
        <header className=" bg-[#3556AB] shadow-[0px_0px_10px_0px_#00000026] lg:min-h-[130px] p-5 z-10 ">
          <section className="flex gap-x-4">
            <Image
              alt="pfp"
              src="/pfp.png"
              className="max-h-14"
              width={50}
              height={50}
            />
            <div>
              <p className="font-[500] text-white ">Hello , John</p>
              <p className="italic text-[#FFFFFF] text-3xl font-[100] opacity-30 leading-8 lg: w-[75%]">
                What are your plans for today?
              </p>
            </div>
          </section>
        </header>

        <div className=" bg-[#CDE53D]  lg:min-h-[130px] ps-5 pe-5 ">
          <section className="flex justify-between items-center">
            <Image
              alt="pfp"
              src="/cup.png"
              className="max-h-14 pt-5"
              width={50}
              height={50}
            />
            <div>
              <p className=" text-[#071D55] font-bold pt-5 ">
                Go Pro Upgrade Now
              </p>
            </div>
            <p className="bg-[#071D55] text-[#F2C94C]  lg: h-[71px] lg:w-[66px] flex justify-center items-center">
              $1
            </p>
          </section>
        </div>

        <ul className=" min-h-[60%] ">

  {

itemStore?.map(task=>(

  <li key={task?.id}>
  <div className="   lg:min-h-24 p-5  shadow-lg shadow-[#E7E7E7] max-w-[99%] mx-auto">
    <section className="flex justify-between items-center">
     
     {task?.status=="complete"?(
     <div
     onClick={()=>{
      updateTaskStat(task?.id)
     }}
     
     className="rounded-full w-[30px] h-[30px] border border-[#071D55] cursor-pointer">

     </div>
     ):(
      <Image
      onClick={()=>{
        updateTaskStat(task?.id)
       }}
        alt="pfp"
        src="/check.svg"
        className="max-h-14 pt-5 cursor-pointer"
        width={30}
        height={30}
      />

     )
     
     }
      
     
      <div>
        <p className=" text-[#8D8D8D] font-bold  ">
          {task?.name}
        </p>
      </div>
      <p
      onClick={()=>{
        setTaskName(task.name)
        setId(task?.id)
      }}
        className="border-[#071D55] border rounded 
  hover:bg-[#071D55] hover:text-white hover:transition cursor-pointer
  lg:p-2 flex justify-center align-middle place-content-center text-[#071D55]"
      >
        Edit
      </p>
    </section>
  </div>
</li>
))
            // tasks?.map((task)=>(
       
            
            // ))
            }

          
        </ul>
        <div className="rounded-full w-14 h-14 text-3xl z-10 text-white border items-center flex justify-center text-center bg-[#071D55] top-[92%] left-[90%] absolute ">
          +
        </div>
      </div>

      <div className=" min-w-[60%] ">
        <div className="min-h-[92%]">
          <header className=" bg-[#3556AB] shadow shadow-[#000000] lg:min-h-[130px] ">
            <section className="flex justify-center items-center  ">
              <p className="font-[500] text-white  text-center my-auto p-7">
                {
                  editMode?"Edit task":" Add task"
                }
                
              </p>
            </section>
          </header>

          <div className="w-[90%] m-auto">
            <p className="text-[#000000] font-normal pt-6">Task Name</p>
        

<input 
onChange={(e)=>{
  setTaskName(e.target.value)
}}
value={taskName}
type="text" className="border border-[#CBCBCB] rounded-lg min-h-4 p-3 w-[100%] text-[#0D2972] items-center pt-3" />           

            
            
              
            
          </div>
        </div>
        <section className="w-[90%] m-auto space-x-6">
          <button 
          onClick={()=>{
           
          }}
          className="border-[#551d1d] border  bg-[#AB3535] rounded-lg min-w-[25%] hover:transition hover:delay-100 hover:bg-[#572525] min-h-14 text-white">
            Delete
          </button>{" "}
          <button
          onClick={()=>{
            updateTask(id)
          }}

            className="bg-[#3556AB] 
          hover:transition hover:delay-100 hover:bg-[#19243f]
          
          border border-[#0D2972] min-w-[60%] min-h-14 rounded-lg text-white"
          >
            Save
          </button>
        </section>
      </div>
    </main>
  );
}
