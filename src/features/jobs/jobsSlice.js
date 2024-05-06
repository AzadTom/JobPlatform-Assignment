import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const  JOB_PER_PAGE = 9;



const initialState ={
    loading:false,
    data :[],
    displaydata:[],
    filter:""
}


const jobsSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{

        getFilter:(state,action)=>{

           state.filter = action.payload;
           
           state.displaydata = state.data.filter(item=>
             item.companyName.toLowerCase().includes(state.filter.toLowerCase())
           );

        }

    },
    extraReducers:(builder)=>{

    
        builder.addCase(getJobsData.pending,(state,action)=>{

            state.loading = true;
        })
        .addCase(getJobsData.fulfilled,(state,action)=>{

            state.data = [...state.data,...action.payload];
            state.displaydata = state.data.filter(item=>
                item.jobRole.toLowerCase().includes(state.filter.toLowerCase())
              );
            state.loading = false;
        })
        

    }
}) 


export const {getFilter} = jobsSlice.actions;


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