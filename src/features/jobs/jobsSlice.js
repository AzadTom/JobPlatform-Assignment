import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const  JOB_PER_PAGE = 10;



const initialState ={
    loading:false,
    data :[],
    displaydata:[],
    filter:[]
}


const jobsSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{

        removeFilter:(state,action)=>{

           state.filter = state.filter.filter((item)=> item.toLowerCase() !== action.payload) 

           if(state.filter.length===0){

            state.displaydata = state.data;
            return;
        }



        },
        getFilter:(state,action)=>{

           state.filter = [...state.filter,action.payload];
           


          
           if(state.filter.length===0){

            state.displaydata = state.data;
            return;
        }
        

           state.displaydata = state.data.filter(item=>{


           

            // jobRole
            if(state.filter.length> 0 && state.filter.includes(item.jobRole.toLowerCase()) )
                {
                     return true;
                }

                // CompnayNAme
                if(state.filter.length> 0 && state.filter.includes(item.companyName.toLowerCase()) )
                    {
                         return true;
                    }

                    //minExp

                    if(state.filter.length> 0 && state.filter.includes(parseInt(item.minExp)) )
                        {
                             return true;
                        }  
                        
                        //Remote/in-office
                        if(state.filter.length> 0 && state.filter.includes(item.location.toLowerCase()))
                            {
                                 return true;
                            } 

                             //Remote/in-office
                        if(state.filter.length> 0 && state.filter.includes("in-office"))
                            {
                                 return true;
                            } 

              

        })


        }

    },
    extraReducers:(builder)=>{

    
        builder.addCase(getJobsData.pending,(state,action)=>{

            state.loading = true;
        })
        .addCase(getJobsData.fulfilled,(state,action)=>{


           

            state.data = [...state.data,...action.payload];

            if(state.filter.length===0){

                state.displaydata = state.data;
                return;
            }

            state.displaydata = state.data.filter(item=>{


        

                // jobRole
                if(state.filter.length> 0 && state.filter.includes(item.jobRole.toLowerCase()) )
                    {
                         return true;
                    }

                    // CompnayNAme
                    if(state.filter.length> 0 && state.filter.includes(item.companyName.toLowerCase()) )
                        {
                             return true;
                        }

                        //minExp

                        if(state.filter.length> 0 && state.filter.includes(parseInt(item.minExp)) )
                            {
                                 return true;
                            }  
                            
                            //Remote/in-office
                            if(state.filter.length> 0 && state.filter.includes(item.location.toLowerCase()))
                                {
                                     return true;
                                } 

                                    //Remote/in-office
                        if(state.filter.length> 0 && state.filter.includes("in-office"))
                            {
                                 return true;
                            } 

                    
                   

            })

            state.loading = false;
        })
        

    }
}) 


export const {removeFilter,getFilter} = jobsSlice.actions;


export default jobsSlice.reducer;

export const getJobsData = createAsyncThunk("/jobs",async(params,ThunkApi)=>{

    try {
    

       
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const body = JSON.stringify({
            "limit": JOB_PER_PAGE,
            "offset": JOB_PER_PAGE * (params.offSet-1)
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body:body
        };
    
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);

        if(!response.ok) throw new Error("Error occured!");

        const {jdList:data} = await response.json();

        return data;
                
        } catch (error) {
    
            console.log(error);
        }

})