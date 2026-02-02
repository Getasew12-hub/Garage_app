import { X } from 'lucide-react'
import React, { useEffect } from 'react'

function Search({data,searchResult,type}) {
    const [SearchTerm, setSearchTerm] = React.useState('');

    useEffect(()=>{
        console.log("the search term is ",data);
    if(!SearchTerm) searchResult(data);
    else{
        if(type==='user'){
            const filteredData = data.filter((item) => {

            return  item?.name.toLowerCase().includes(SearchTerm.toLowerCase()) || item?.phone.toString().toLowerCase().includes(SearchTerm.toLowerCase()) || item?.address.toLowerCase().includes(SearchTerm.toLowerCase());
            
          });
          searchResult(filteredData);
        }else
        if(type==='vehicles'){
            const filteredData = data.filter((item) => {
           
            return  item?.model.toLowerCase().includes(SearchTerm.toLowerCase()) || item?.VIN.toLowerCase().includes(SearchTerm.toLowerCase()) || item?.userId?.name.toLowerCase().includes(SearchTerm.toLowerCase());
            
          });
          searchResult(filteredData);
       
        }else{
            const filteredData = data.filter((item) => {
           
            return  item.vehicle?.model.toLowerCase().includes(SearchTerm.toLowerCase()) || item.vehicle?.VIN.toLowerCase().includes(SearchTerm.toLowerCase());
            
          });
          searchResult(filteredData);
        }
        
    }
    },[SearchTerm])
  return (
    <div>
        <div className='relative'>
            <form action="">
            <input type="text" className='border border-gray-400 rounded-md outline-0 px-2 py-1' placeholder='Search' value={SearchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
         {SearchTerm &&  <X  size={19} className='absolute top-2 right-2 ' onClick={()=>setSearchTerm('')}/>}
            </form>
        </div>
    </div>
  )
}

export default Search