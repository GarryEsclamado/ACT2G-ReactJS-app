import React from "react";
import StartFirebase from '../firebaseConfig/index';
import { ref, set, get, update, remove, child } from 'firebase/database';
import './index.css';


export class Crud extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            db:'',
            username:'',
            fullname:'',
            studentnumber:'',
            dob:'',


        }
        this.interface = this.interface.bind(this);
    }    

    componentDidMount(){
        this.setState({
            db: StartFirebase()
        });


    }
    
    render(){
        return(
            <>
            
            <label>Enter username</label>
            <input type='text' id="userbox" value={this.state.username} onChange={e =>{this.setState({username: e.target.value});}}/>
            <br/><br/>

            <label>Enter Full Name</label>
            <input type='text' id="namebox" value={this.state.fullname} onChange={e =>{this.setState({fullname: e.target.value});}}/>
            <br/><br/>

            <label>Enter Student Number</label>
            <input type='number' id="phonebox" value={this.state.studentnumber} onChange={e =>{this.setState({studentnumber: e.target.value});}}/>
            <br/><br/>

            <label>Choose Date of Birth</label>
            <input type='date' id="datebox" value={this.state.dob} onChange={e =>{this.setState({dob: e.target.value});}}/>
            <br/><br/>

            <button id="addBtn" onClick={this.interface}> Add Data </button>
            <button id="updateBtn" onClick={this.interface}> Update Data </button>
            <button id="deleteBtn" onClick={this.interface}> Delete Data </button>
            <button id="selectBtn" onClick={this.interface}> Get Data From Database Data </button>
            
            </>
            
        )

    }

    interface (event){
        const id = event.target.id;

        if (id=='addBtn'){
            this.insertData();
        }

        else if (id=='updateBtn'){
            this.updateData();
        }

        else if (id=='deleteBtn'){
            this.deleteData();
        }

        else if (id=='selectBtn'){
            this.selectData();
        }

    }

    getAllInputs(){
        return {
            username: this.state.username,
            name: this.state.fullname,
            phone: Number (this.state.studentnumber),
            dob: this.state.dob


    }

    }

    insertData (){
        const db = this.state.db;
        const data = this.getAllInputs();

        set(ref(db, 'Student/'+data.username),
        {
            Fullname: data.name,
            studentnumber: data.phone,
            dateofbirth: data.dob

        })
        .then (()=>{alert('data was added successfully')})
        .catch ((error)=>{alert("there was an error, details: "+error)});


    }

    updateData (){
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Student/'+data.username),
        {
            Fullname: data.name,
            studentnumber: data.phone,
            dateofbirth: data.dob

        })
        .then (()=>{alert('data was update successfully')})
        .catch ((error)=>{alert("there was an error, details: "+error)});


    }

    deleteData (){
        const db = this.state.db;
        const username = this.getAllInputs().username;

        remove(ref(db, 'Student/'+username))
        .then (()=>{alert('data was added successfully')})
        .catch ((error)=>{alert("there was an error, details: "+error)});


    }

    selectData(){
        const dbref = ref(this.state.db);
        const username = this.getAllInputs().username;

        get(child(dbref, 'Student/'+username)) .then((snapshot) =>{
            if (snapshot.exists()){
                this.setState({
                    
                    fullname:snapshot.val().Fullname,
                    studentnumber:snapshot.val().studentnumber,
                    dob:snapshot.val().dateofbirth

                })
            }

            else {
                alert("no data found!");
            }

        })
        .catch((error)=>{alert("there was an error, details:"+error)});
    }

}