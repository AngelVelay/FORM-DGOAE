import React, { useEffect, useState } from 'react'
import StorageIcon from '@material-ui/icons/Storage'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton } from '@material-ui/core'
import contact from "../images/contact.png"
import "./MainBody.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
function MainBody() {

    const {user} = useAuth0();
    const [files, setFiles] = useState([]);
    
    const navigate = useNavigate();

    function navegate_to(docname) {
        var fname = docname.split(".");
        navigate("/form/" + fname[0]);
    }

    useEffect(() => {
        
        async function filesnames() {

            var request = await axios.get(`http://localhost:9000/get_all_filenames_by_user?username=${user.name}`);
            let filenames = request.data;
            console.log(filenames);
            setFiles(filenames);

        };

        filesnames();


        
    }, [])

    function msToTime(duration) {
        var d = new Date(parseInt(duration, 10));
        var ds = d.toString('MM/dd/yy HH:mm:ss');
        return ds;
      }

    return (
        <div className='main_body'>
            <div className='main_body_top'>
                <div className='main_body_top_left' style={{ fontSize: "16px", fontWeight: "500" }}>
                    Formas recientes
                </div>
                <div className='main_body_top_right'>
                    <div className='main_body_top_center' style={{ fontSize: "14px", marginRight: "125px" }}> 
                    Archivos de {user.name} <ArrowDropDownIcon /></div>
                    
                </div>

            </div>
            <div className='main_body_docs'>
                {
                    files.map((ele,index) => (
                        
                        <div key={index} className='doc_cards' onClick={() => { navegate_to(ele.filename) }}>
                           
                            <img src={contact} className='doc_image' />
                            <div className='doc_card_content' >
                                <h5 style={{ overflow: "ellipsis" }}>{ele ? ele.name : "Untilted Document"}</h5>

                                <div className='doc_content' style={{ fontSize: "12px", color: 'gray' }}>
                                    <div className='content_left'>

                                        <StorageIcon style={{ fontSize: "12px", color: "white", backgroundColor: "#6e2594", padding: '3px', marginRight: '3px', borderRadius: '2px' }} />

                                        <h5>{msToTime(ele.time)}</h5>
                                    </div>
                                    <MoreVertIcon style={{ fontSize: "16px", color: 'gray' }} />
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>



        </div>
    )
}

export default MainBody