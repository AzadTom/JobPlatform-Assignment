import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const  JOB_PER_PAGE = 9;



const initialState ={
    loading:false,
    data :[],
}


const jobsSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    
        builder.addCase(getJobsData.pending,(state,action)=>{

            state.loading = true;
        })
        .addCase(getJobsData.fulfilled,(state,action)=>{

            state.data = [...state.data,...action.payload];
            state.loading = false;
        })
        

    }
}) 


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