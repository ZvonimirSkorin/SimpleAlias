import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
const { api } = require('./../Api')


function Stats(props) {

    const Timovi = useSelector((state) => state.counter.timovi)
    const TimoviBodovi = useSelector((state) => state.counter.timBodovi)
    useEffect(() => {
        if (props.word_set !== undefined) {
            let temporaryArray = []
            console.log(props.word_set)
            console.log(props.count_set)
            for (var i = 0; i < props.word_set.length; i++) {
                temporaryArray.push([props.word_set[i][0], props.count_set[i]])
            }
            
            console.log(api)
            axios.post(api + '/initializeData', {
                data: temporaryArray
            }).then((response) => {
                console.log(response);
            })
        }
    }, [props.rijeci])

    return (
        <div>
            {
                Timovi.map((val,index) =>
                    <div>
                        <span>{val.tim }</span>
                        <span style={{ marginLeft: "1rem" }}>{ TimoviBodovi[index]}</span>
                    </div>
                    )
            }


            <button onClick={()=>props.refresh() }>
                Next Round
            </button>

            </div>
        );
}


export default Stats;