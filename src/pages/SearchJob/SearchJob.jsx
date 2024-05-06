
import React, { useEffect, useRef, useState } from 'react'
import JobCard from '../../components/JobCard/JobCard';
import Loading from '../../components/Loading/Loading';
import styles from './searchjob.module.css';
import { useSelector ,useDispatch} from 'react-redux';
import { getJobsData } from '../../features/jobs/jobsSlice';
import Input from '../../components/Input/Input';




const filters = [{
   id:1,
   title:"Roles",
   data:["FrontEnd", "BackEnd", "Android", "IOS", "Flutter", "ReactNative", "FullStack"]
},
{
   id:2,
   title:"No of Employees",
   data:["10-20","20-30","30-40","50-100","100-200","200-500"]
},
{

   id:3,
   title:"Experience",
   data:["2","3","4","5","6","10","15"]
},
{

   id:4,
   title:"Remote",
   data:["remote","in-office"]
},
{

   id:5,
   title:"Min Base Pay",
   data:["0L","1L","2L","3L","4L","5L","7L"]
},{


   id:6,
   title:"Comapany Name",
   data:["amazon","mitra","flipkart","meesho"]
}
];



function SearchJob() {

   
  
    const dispatch = useDispatch();
    const[offSet,setOffSet] = useState(1);
    const {loading , data}  = useSelector((state)=> state.jobs);

    const[filterOption,setFilterOption]= useState(filters);
  

   
    useEffect(()=>{

     dispatch(getJobsData({offSet}));

    },[offSet])


    const handleScroll = ()=>{

        const {scrollTop,clientHeight,scrollHeight} = document.documentElement;

        if(scrollTop + clientHeight >= scrollHeight-10){
            setOffSet((prev)=> (prev+1));
        }

    }

   

    useEffect(()=>{
      
       window.addEventListener('scroll',handleScroll);
       
       ()=>{

          window.removeEventListener('scroll',handleScroll);
       }

    },[])





    return (
        <>
        <div className={styles.parentContainer}>
           <div>
           <img src="https://jobs.weekday.works/_next/static/media/logo.268caeb2.png" alt="logo" className={styles.logo} />
           </div>
           <div className={styles.searchJobs}>
              <span>SearchJobs</span>
           </div>
        <div className={styles.inputParentContainer}>
          {filterOption.map((item)=>(<Input title={item.title} content={item.data} id={item.id} key={item.title}/>))}
        </div>
        
        <div className={styles.jobContainer}>
        {data && data?.map((job)=>( <JobCard  {...job} key={job.jdUid}/>))}
        </div>
        {loading && <Loading/>}

        </div>
        
        </>
    )
}

export default SearchJob



