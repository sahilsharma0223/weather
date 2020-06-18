import React, { Component } from 'react'
export class autosearch extends Component {
    constructor(props){
        super(props);
        
        this .state = {
            suggestions: [],
            text:'',
        }
    }

onTextChanged = (e) => {
    var {items}=this.props; 
    const value = e.target.value;
    let suggestion = [];
    if(value.length>0){
        const regex = new RegExp(`^${value}`,'i');
        suggestion = items.sort().filter(v => regex.test(v));
        if(suggestion.length==0){
            suggestion=["Not Found!!"];
        }
        else{
            suggestion = suggestion.slice(0, 2000);
        }
        
    }
    this.setState({
         suggestions:suggestion,
         text:value 
        });
    
}

suggestionSelected(value){
    if(value==="Not Found!!"){
        value="";
    }
this.setState({
    text:value,
    suggestions:[],
})
}

renderSuggestions(){
    const {suggestions} = this.state;
    if(suggestions.length===0){
        return null;
    }
    return(
        <ul style={{zIndex:1}}>
            
            {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            
        </ul>
    )
}

boxEmpty = () =>{
    this.setState({
        text:"",
        suggestions:[],
    })
}

    render() {
         const {text}=this.state;
           
        return (
            <div className="autosuggest">
                <input value={text} className="search" name="city" onChange={this.onTextChanged} type="search" placeholder="Enter City..."></input>
                <div className="slide">
                    {this.renderSuggestions()}
                </div>
            </div>
        )
    }
}

export default autosearch
