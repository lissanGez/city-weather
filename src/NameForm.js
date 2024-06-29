import { React} from "react";

function NameForm (props){
    const handleSubmit = (event) => {
        event.preventDefault();
        props.getNationality()
    };
    return (
        <form className="mt-4 mb-1" onSubmit={(e)=> handleSubmit(e)}>
            <div className="form-group mb-3">
                <label for="name" className="mb-1">Person Name</label>
                <input name="name" type="text" className="form-control" placeholder="Enter Persons Name"
                        onChange={(event) => props.handleNameChange(event.target.value)}
                />  
            
            </div>
            <p className="text-center mb-0">
                <button onClick={()=> props.getNationality()} className="btn btn-primary btn-lg w-100 text-uppercase" value="Submit"> Submit </button>
            </p>   
        </form> 
    )
}

export default NameForm;