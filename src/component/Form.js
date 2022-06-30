import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { Component } from "react";

class Form extends Component{
    constructor(props) {
        super(props)
        this.state={
            title: "",
            description: "",
            author: "",
            date: new Date().getDate(),
            isDisabled: true
        }
    }
    
    
    onChangeInputHandler = (event) => {
        let nameTag = event.target.name
        let valueTag = event.target.value
        this.setState({ [nameTag]: valueTag })
    }

    onSubmitHandler = async(event) => {
        event.preventDefault()
        //alert("You tried to submit the form")
        
        const response = await fetch("http://localhost:3000/createNote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                author: this.state.author,
                date: this.state.date
            })}
        )

        const data = await response.json()
        if (data.status === 400 || !data) {
            alert(data.error)
        } else {
            alert(data.message)
        }

        this.setState({
            title: "",
            description: "",
            author: "",
            date: new Date().getDate(),
            isDisabled : true
        })
        window.location='/'

        // this.getData()
        

    }
    render() {
        return (<div className="container col-4">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChangeInputHandler}

                         />
   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeInputHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" className="form-control"
                    name="author"
                    value={this.state.author}
                    onChange={this.onChangeInputHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Publish Date</label>
                    <input type="date" className="form-control"
                    name="date"
                    value={this.state.date.toString()}
                    onChange={this.onChangeInputHandler}/>
                </div>
                <button type="button" className="btn btn-warning" style={{"margin":"15px"}} onClick={()=>{this.setState({isDisabled:false})}}>Add</button>
                <button type="submit" disabled={this.state.isDisabled} className="btn btn-primary" onClick={this.onSubmitHandler}>Submit</button>
            </form>
        </div>
        )
    }
}

export default Form