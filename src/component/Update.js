import { useState } from "react"
import Modal from "./Modal"

const Update = (props) => {
    const [inp, setInp] = useState(props.utitle)
    
    
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInp(value)
    
    }

    const turnOff = () => {
        props.onClose(false)
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        console.log(inp)
        const url = `http://localhost:3000/updateNote/${props.uid}`
        await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
                title:inp
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        console.log("working")
        window.location = '/'
        //console.log("from update:",inp)
        // props.onUpdate(inp)
    }
    
    return <div>
        <Modal>
            <h3 style={{padding:"5px"}}>Rename title</h3>
        <form  >
                <input className="form-control" name="title" value={inp} onChange={onChangeHandler}/>
                <button className="btn btn-warning" style={{ margin: '10px' }} onClick={onSubmitHandler}>Update</button>
                <button className="btn btn-danger" style={{margin:'10px'}} onClick = {turnOff}>Close</button>
        </form>
        </Modal>
        
    </div>
}

export default Update