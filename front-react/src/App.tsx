import React, {useEffect, useState, useReducer} from 'react';

import {timerPluginRef} from "./timer/consts";
import addTimerPlugin from './timer';
import TemplateDisplay from "./templateDisplay";

import GrapesJS from 'grapesjs';
import './index.css'
// import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBasicBlocks from 'grapesjs-blocks-basic';

// import sanityClient  from "./client"
import axios from 'axios'
import {Button, Typography} from "@material-ui/core"
import HorizontalLabelPositionBelowStepper from './stepper';






const App: React.FC = () => {
    
    

    const [htmlString, setHtmlString] = useState(null);
    const [cssString, setCssString] = useState("");
    const [pluginLoaded, setPluginLoaded] = useState(false);
    const [editor, setEditor] = useState(null);


    

    /// TESTING BLOW
    const [templateData, setTemplateData] = useState({
       html:'',
       css: ''
    })
    const [done, setDone] = useState(false)
    const [create,setCreate] = useState(false)

    const handleDone = () => {
        setTemplateData({
            html: localStorage.getItem('gjs-html'),
            css: localStorage.getItem('gjs-css')
        })
        setDone(true)
    }
    const handleClick = async() => {
        console.log('data sent')
        setCreate(true)
        //  setTemplateData({
        //     html: localStorage.getItem('gjs-html'),
        //     css: localStorage.getItem('gjs-css')
        // })
   
        await axios.post(`http://localhost:8000/create/`,{templateData})

       
        
     
     
    }

    // const clearClick=  () => {

        // setTemplateData({
        //     html: '',
        //     css: ''
        // })
       // localStorage.clear()

       
    // }

    
   
    

    console.log("This is the templateData", templateData)

    

   /// TESTING ABOVE

    useEffect(() => {
        if (!pluginLoaded) {
            // Pass the state setters to the timer plugin, so that each time the bell is pressed these gets called
            // and the TemplateDisplay gets updated withthe new values
            addTimerPlugin(setHtmlString, setCssString);
            setPluginLoaded(true);
            // setTemplateData({
            //     html: localStorage.getItem('gjs-html'),
            //     css: localStorage.getItem('gjs-css')
            // })
            // localStorage.clear()
          
      

          
        }
        else if (!editor) {
            const e = GrapesJS.init({
                container: `#example-editor`,
                fromElement: true,
                plugins: [gjsBasicBlocks, timerPluginRef],
              
                // storageManager: {
                //     type: 'remote',
                //     stepsBeforeSave: 3,
                //     urlStore: `http://localhost:3001/templatedata/store/${1}`,
                //     urlLoad: `http://localhost:3001/templatedata/load/${1}`,
                //     // For custom parameters/headers on requests
                //     params: { _some_token: '....' },
                //     // headers: { Authorization: 'Basic ...' },
                //     headers: { 'Access-Control-Allow-Origin': true,
                //     contentType: "application/json"
                // },
                //   }

                  
            });
            // e.load(res => console.log("rest here",res));
        //     e.load(res => (
        //         res._type ="templateData",
        //         client.create(res).then(res => {
        //   console.log(`document was created, document ID is ${res._id}`)
        // })
        //     ))
        
            
        }
    });
   

    return (
        <>
            <div id="example-editor"/>
            {/* <Typography style={{margin: 6}} className="siteTitle" variant="h4" component="h2">
           Create Your Site!
           </Typography> */}
            {/* <TemplateDisplay jsxString={htmlString} cssString={cssString} /> */}


           {/* {!done && ( <Button style={{margin:4}} variant="contained" color="primary" onClick={handleDone}>
            Done
             </Button>)}
            {done && (<Button style={{margin:4}} variant="contained" color="primary" onClick={handleClick}>
            Create Site
             </Button>)}
            {create && ( <Button  
             variant="contained" color="primary">
            <a className="offbutton" href="http://localhost:8000/" target="_blank"
            >Visit Site</a>
             </Button>)} */}
            <HorizontalLabelPositionBelowStepper/>

        </>
    );
}

export default App;
