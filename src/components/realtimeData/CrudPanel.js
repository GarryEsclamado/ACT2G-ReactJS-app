import React from "react";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { ref, set, get, update, remove, child } from "firebase/database";
import StartFirebase from "../firebaseConfig/index";

const db = StartFirebase();

export class CrudPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mod:'',
            isOpen: false,
            record:{
                username: props.username,
                fullname: props.record.Fullname,
                studentnumber: props.record.studentnumber,
                dob: props.record.dateofbirth,
            },
            modusername:'',
            modFullname:'',
            modstudentnum:'',
            modDob:''
        }
    }

    componentDidMount(){
        console.log(this.state.record);
    }

    render() {
        return (
            <>
            <Button variant='primary' className='ms-2'onClick={()=>{this.openModal('add')}}>Add New Records</Button>
            <Button variant='primary' className='ms-2'onClick={()=>{this.openModal('edit')}}>Edit Records</Button>

            <Modal show={this.state.isOpen}>
                <Modal.Header>
                    <Modal.Title>{(this.state.mode== 'add') ? 'Add New Record': 'Edit Record'}</Modal.Title>
                    <Button size='sm' variant='green'onClick={()=>{this.CloseModal()}}>X</Button>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text>Username</InputGroup.Text>
                        <Form.Control
                            value={this.state.modusername}
                            onChange={e => {this.setState({modusername: e.target.value}) }}
                            disabled = {(this.state.mode != 'add')}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>Fullname</InputGroup.Text>
                        <Form.Control
                            value={this.state.modFullname}
                            onChange={e => {this.setState({modFullname: e.target.value}) }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>Student Number</InputGroup.Text>
                        <Form.Control
                            value={this.state.modstudentnum}
                            onChange={e => {this.setState({modstudentnum: e.target.value}) }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>Date of Birth</InputGroup.Text>
                        <Form.Control
                            type='date'
                            value={this.state.modDob}
                            onChange={e => {this.setState({modDob: e.target.value}) }}
                        />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='primary' className='ms-2' onClick={()=>{this.interface('add')}} style={(this.state.mode !='add')? {display: 'none'}:{}}>Add New Records</Button>
                    <Button variant='success' className='ms-2' onClick={()=>{this.interface('update')}} style={(this.state.mode =='add')? {display: 'none'}:{}}>Update Records</Button>
                    <Button variant='danger' className='ms-2'  onClick={()=>{this.interface('delete')}} style={(this.state.mode =='add')? {display: 'none'}:{}}>Delete Records</Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
    openModal(option){
        if (option=='add'){
            this.setState({
                isOpen: true,
                mode: option,
                modusername:'',
                modFullname:'',
                modstudentnum:'',
                modDob:''

            });
        }

        else if(option=='edit'){
            let rec = this.state.record;
            this.setState({
                isOpen: true,
                mode: option,
                modusername:rec.username,
                modFullname:rec.fullname,
                modstudentnum:rec.studentnumber,
                modDob:rec.dob

            });
        }
        

    }

    CloseModal(){
        this.setState({
            isOpen: false
        })

    }

    getAllData (){
        return {
            id: this.state.modusername,
            data:{
                Fullname: this.state.modFullname,
                studentnumber: this.state.modstudentnum,
                dateofbirth: this.state.modDob
            }
        }
    }

    interface (option){
        if (option == 'add')
            this.insertData();

        else if (option == 'update')
                 this.updateData();

        else if (option == 'delete')
                 this.deleteData();
        
        this.CloseModal();
        
    }

    insertData (){
        const dbref = ref (db);
        const record = this.getAllData();
        const address = 'Student/' + record.id;

        get(child(dbref, 'Student/'+ record.id)) .then(snapshot =>{
            if (snapshot.exists()){
                alert ('cannot create, user already exist');
            }

            else{
                set(ref(db, address), record.data);
            }
        })
    }

    updateData (){
        const dbref = ref (db);
        const record = this.getAllData();
        const address = 'Student/' + record.id;

        get(child(dbref, 'Student/'+ record.id)) .then(snapshot =>{
            if (snapshot.exists()){
                update(ref(db, address), record.data);
            }

            else{
                alert ('cannot update, user already exist');
                
            }
        })
    }

    deleteData (){
        const dbref = ref (db);
        const record = this.getAllData();
        const address = 'Student/' + record.id;

        get(child(dbref, 'Student/'+ record.id)) .then(snapshot =>{
            if (snapshot.exists()){
                remove(ref(db, address));
            }

            else{
                alert ('cannot delete, user already exist');
                
            }
        })
    }

}
