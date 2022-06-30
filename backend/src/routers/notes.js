const e = require("express")
const express = require("express")
const router = new express.Router()
const Enote = require("../model/noteSchema")

//create notes
router.post('/createNote', async (req, res) => {
    try {
        const note = new Enote(req.body)
        await note.save()
        res.status(200).send({ message: "Notes saved successfully" })
    } catch (e) {
        res.status(400).send({error:"Kuch toh garbarh hai Daya!!!"})
    }
})

//read notes
router.get('/readNotes', async (req, res) => {
    try {
        const data = await Enote.find({})
        if (data.length>0) {
            res.status(200).send(data)
        } else {
            res.status(403).send({error:"data not found"})
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

//fetch by giving id
router.get('/readNotes/:id', async (req, res) => {
    try {
        const eid = req.params.id
        const data = await Enote.findById({ _id: eid })
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send({error:"data does not exist"})
        }
       
    } catch (e) {
        res.status(400).send(e)
    }
})

///update
router.patch('/updateNote/:id', async (req, res) => {
    try {
        const eid = req.params.id
        const data = await Enote.findById({ _id: eid })
        
        if (!data) {
            res.status(404).send({error:"data does not exist to update"})
        }
        await Enote.findByIdAndUpdate({ _id:eid },req.body,{new:true})
        res.status(200).send({message:"Data updated successfully!"})
       
    } catch (e) {
        // console.log(data)
        res.status(404).send({error:e})
    }
})

//delete note
router.delete('/deleteNote/:id', async (req, res) => {
    try {
        const eid = req.params.id
        const data = await Enote.findById({ _id: eid })
        if (!data) {
            res.status(404).send({error:"data does not exist to delete"})
           
        }
        await Enote.findByIdAndDelete({ _id: eid })
        res.status(200).send({message:"Data deleted successfully!"})
       
    } catch (e) {
        res.status(400).send(e)
    }
})

// //delete
// router.delete('/deleteNote/:id', async (req, res) => {
//     let note = await Enote.findById(req.params.id)
//     if (!note) {
//         res.status(404).send({"failure":"note does not exist"})
//     }

//     note = await Enote.findByIdAndDelete(req.params.id)
//     res.status(200).send({"Success":"notes deleted successfully"})
// })





module.exports = router
