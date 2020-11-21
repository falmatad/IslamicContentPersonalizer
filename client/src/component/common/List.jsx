import React, { Component } from "react";
import { FiCheck } from "react-icons/fi";

class ListOne extends Component{
    render(){
        var names = [
            'Knowledge of Allah',
            'Mentorship',
            'Activities'
        ];
        return(
            <ul className="list-style--1">
                {names.map((name, index) => {
                    return <li key={ index }><FiCheck /> {name}</li>;
                })}
            </ul>
        )
    }
}
export default ListOne;