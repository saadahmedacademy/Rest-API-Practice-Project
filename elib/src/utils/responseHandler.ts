const ApiResponse = (
    statusCode:number
    ,message:string,
    data?:any)=>{

    return {
        statusCode,
        message,
        data
    }
    
}

export {ApiResponse}