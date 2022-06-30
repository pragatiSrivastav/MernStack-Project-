import React, { Component } from "react"
import Modal from "./Modal"
import Update from "./Update"
class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            uid: "",
            utitle:"",
            showModal: false
        }
    }
    
         
    getData = async () => {
        const res = await fetch("http://localhost:3000/readNotes")
        const data = await res.json()
        console.log(res.status)
        if (res.status === 403) {
            this.setState({ notes: [] })
        } else {
            this.setState({ notes: data })
        }

        
    }
    componentDidMount() {
        this.getData()
    }

    deleteData = async (id) => {
        const url = `http://localhost:3000/deleteNote/${id}`
        const res = await fetch(url, { method: "DELETE" })
        if (res.status === 400) {
            alert("Some error occured")
        } else if (res.status === 200) {
            alert("Note deleted successfully")
            const newNotes = this.state.notes.filter((note) => {
                return note._id !== id
            })
            this.setState({ notes: newNotes })
            // window.location = '/'
        }
    }

    // updateData = async (id,t) => {
    //     this.setState({showModal:true})
    //     alert("Someone trying to update your note")
    //     console.log(id,t)
    //     const url = `http://localhost:3000/updateNote/${id}`
    //     await fetch(url, {
    //         method: "PATCH",
    //         body: JSON.stringify({
    //             title:t
    //         })
    //     })
    //     this.setState({ title: t})
    //     //this.setState({showModal : false})

      

    // }

    openModal = (id,t) => {
        this.setState({uid:id,utitle:t})
        this.setState({showModal:true})
    }
    onCloseHandle = (t) => {
        this.setState({showModal:t})
    }

    
    render() {
        
        return (
            <>
        <div>
                    {this.state.showModal && <Update onClose={this.onCloseHandle} uid={this.state.uid} utitle={this.state.utitle} />}  
        </div>
        <div>
            {this.state.notes.map((item) => {
                return (<div key={item._id} className="card container col-3" style={{"display":"inline-block","marginLeft":"15px","borderRadius":"10px","backgroundColor":"blueviolet"}}>
                <div className="card-header">
                  {item.title}
                </div>
                    <div className="card-body">
                        <h5 className="card-title">Published by author {item.author}</h5>
                        <p className="card-text">{ item.description}</p>
                        {/* <button onClick={() => { this.updateData(item._id,item.title) }} className="btn btn-success">Edit</button> */}
                        <button onClick={() => this.openModal(item._id,item.title)} className="btn btn-success">Edit</button>
                        <button onClick={() => { this.deleteData(item._id) }} type="button" style={ {"marginLeft":"200px"}}className="btn btn-danger">Delete</button>
                </div>
              </div>)
            })}
                </div>
                </>
    )
    }
    
}

export default Notes