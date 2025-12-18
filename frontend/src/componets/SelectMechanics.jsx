import { ArrowRight, Check, Loader } from 'lucide-react'
import React, {  useEffect, useRef } from 'react'
import addminStore from '../store/addmin';

function SelectMechanics({setShow,val,update=false}) {
  const {GetMechanics,MechanicsData,smalLoad,AddSerivceJob,formLoading,UpdateServiceMechanics}=addminStore();
  
    const [openDescription,setOpenDescription]=React.useState(null);
    const [selectedMechanic, setSelectedMechanic] = React.useState([]);
    const [seletDate,setSelectData]=React.useState([]);

 useEffect(() => {
    GetMechanics();
 }, []);

 useEffect(() => {

   if(val?.mechanicId?.length>0){
     
   const mechanicsid= val?.mechanicId.map((val)=>val.id);
   const mechanicsdis= val?.mechanicId.map((val)=>{
    return {id:val.id,dis:val.dis}
  });

    setSelectedMechanic([...selectedMechanic,...mechanicsid]);
setSelectData([...seletDate,...mechanicsdis]);
}


 },[])

    function handleSelectMechanic(mechanic){
        if(selectedMechanic.includes(mechanic)){
            setSelectedMechanic(selectedMechanic.filter((val)=>val!==mechanic))
            setSelectData(seletDate.filter((val)=>val.id!==mechanic))
            
            if(openDescription==mechanic){
              setOpenDescription(null)
            }
          
        }else{
            setSelectedMechanic([...selectedMechanic,mechanic])
            setSelectData([...seletDate,{id:mechanic,dis:""}])
        }
    }

    function handleDescriptionOpen(id){
   
        if(selectedMechanic.includes(id)){

            setOpenDescription(id)
          
        }

    }

    function handleDescriptionSend(val,index){
     
        setSelectData(seletDate.map((data)=>{
          
            if(data.id==index){
                return {...data,dis:val}
            }
            return data
        }))
    }


    const getMechanicData = (mechanicID) => {
    // We use find() because the map index doesn't match the seletDate array index
    return seletDate.find(data => data.id === mechanicID);
};


async function handFormSubmit(){
   
    if(update){
const response=await UpdateServiceMechanics({seletDate,val})
response==="true" && setShow(false);
    }else{

      const response=await AddSerivceJob({seletDate,val})
      response==="true" && setShow(false);
    }
}
   
if(smalLoad) return <div className='flex justify-center items-center h-screen '><Loader  size={45} className='animate-spin'/></div>;



  return (
    <div className='fixed inset-0  flex justify-center items-center bg-black/20 z-40 overflow-hidden' onClick={()=>setShow(false)}>

        <div className='bg-gray-700 p-10 rounded max-w-4xl w-full' onClick={(e)=>e.stopPropagation()}>
        <p className='font-bold md:text-2xl text-xl mb-5'>Select Mechanics for this job</p>

    {MechanicsData?.length>0 &&      <div className="max-h-full overflow-y-auto  max-w-4xl w-full  ">
        <table className="   w-full text-sm  md:text-md  ">
          <thead className="sticky top-0 bg-gray-800 border border-gray-500 shadow-sm z-10   ">
            <tr>
              <th className="text-start p-1 px-2.5">Name</th>
              <th className="text-start p-1 px-2.5">Phone number</th>
              <th className="text-start p-1 px-2.5">Select</th>
              <th className="text-start p-1 px-2.5">Discription</th>


            </tr>
          </thead>
          <tbody>
            {MechanicsData.map((val, index) => (
                <React.Fragment key={index} >
              <tr className="border border-gray-500 " >
                <td className="p-2.5">{val.name}</td>
                <td className="p-2.5">{val.phone}</td>
                <td className=" p-2.5"><div>
                      <button className='border h-6 w-6 cursor-pointer rounded flex justify-center items-center' onClick={()=>handleSelectMechanic(val._id)}>
                       
                   {selectedMechanic.includes(val._id) &&  <Check size={15} className='text-green-400 '/>}
                      </button>
                    </div></td>

                
                <td className=" p-2.5">
                  <div >
                    <button onClick={()=>handleDescriptionOpen(val._id)} className="flex items-center gap-2 bg-gray-400 rounded-full py-1 px-2 cursor-pointer ">Description </button>
                  </div>
                </td>
              </tr>
              <tr 
            
               className={`${openDescription===val._id?"":"hidden"}`} >
                <td
                
                 colSpan={4} className='w-full relative h-20'>

                 <textarea name="description" placeholder='Description' id="description" className='border-x border-gray-500 w-full h-full p-2 resize-none  outline-0' value={getMechanicData(val._id)?.dis || ""}  onChange={(e)=>handleDescriptionSend(e.target.value,val._id)} ></textarea>
                </td>
                
              </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <button onClick={handFormSubmit} disabled={selectedMechanic.length==0 || formLoading}  className={`${selectedMechanic.length==0 ||formLoading ? "bg-blue-400/40 cursor-not-allowed": "bg-blue-400 cursor-pointer"}  p-2 rounded font-semibold  float-end mt-6`}>{formLoading?<Loader size={17} className='animate-spin'/>:"Add service"}</button>
      </div>}

</div>
    </div>
  )
}

export default SelectMechanics