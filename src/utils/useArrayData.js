import { useState } from "react";
import generateId from "./generateId";

export default function useArrayData () {
    const [data, setData] = useState([]);
    const actions = {
        add (...newData) {
            const addIdData = newData.map(item => ({id: generateId(), ...item}));
            setData([...data, ...addIdData]);
        },
        getById(id) {
            return [...data].find(item => item.id === id) || null;
        },
        getByIndex(index) {
            return [...data].find((item, currentIndex) => currentIndex === index) || null;
        },
        getAll() {
            return [...data];
        },
        remove (id) {
            let getData = [...data].filter(item => item.id !== id);
            setData(getData);
        },
        pop () {
            data.pop();
            setData([...data]);
        },
        shift() {
            data.shift();
            setData([...data]);
        },
        
        lastReplace(newData) {
            data[data.length ? data.length - 1 : 0] = newData;
            setData([...data]);

        },
        clear () {
            setData([]);
        },
        clearWithIndex (index) {
            const cloneData = [...data].filter((eachData, indexData) => index !== indexData);
            setData([...cloneData]);
        },
    } 

    return [data, actions];
}