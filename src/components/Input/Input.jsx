import styles from './input.module.css';

import { useEffect, useRef, useState } from "react";


const Input = ({id,title,content}) => {

    const [searchTerm, setSearchTerm] = useState("");

    const [suggestion, setSuggestion] = useState(content);
    const [minExpBasePay,setMinExpBasePay]= useState(content);

    const [selectedItem, setSelectedItem] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);


    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);



    useEffect(() => {

        if (searchTerm.trim() == "") {

            setSuggestion(content);
            return;

        }

        const data = suggestion.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
        setSuggestion(data);



    }, [searchTerm])



    const openList = () => {

        if (!suggestion) return;
        setOpen(!open);

    }

    const addToList = (item) => {

        setSelectedItem((prev) => [...prev, item]);
        const data = suggestion.filter((data) => data !== item);
        setSuggestion(data);
        inputRef.current.focus();
    }


    const removeItem = (item) => {

        setSelectedItem((prev) => prev.filter((it) => it !== item));
        setSuggestion((prev) => [...prev, item]);
    }


    const clearList = () => {

        setSelectedItem([]);
        setSuggestion(content)
    }



    const handleKeyDown = (e) => {

        if (e.key === "Backspace" && e.target.value === "" && selectedItem.length > 0) {
            const lastItem = selectedItem[selectedItem.length - 1];
            removeItem(lastItem);
        } else if (e.key === "ArrowUp" && suggestion.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
        } else if (e.key === "ArrowDown" && suggestion.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) => (prevIndex < suggestion.length - 1 ? prevIndex + 1 : prevIndex))
        }
        else if (e.key === "Enter" && activeSuggestion >= 0 && activeSuggestion < suggestion.length) {
            addToList(suggestion[activeSuggestion]);
        }


    }




    if(id == 3 || id == 5){


        return(
           
            <div>
            <span className={styles.inputTitle}>{selectedItem.length > 0 ? `${title}` : ""}</span>
            <div className={styles.containerList} onClick={openList} >
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={selectedItem.length > 0 ? "" : `${title}`} ref={inputRef} onKeyDown={handleKeyDown} />
            <div className={styles.showAll}>
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                </div>
                <div className={open && minExpBasePay ? styles.list : ""} >
                    {open && minExpBasePay && minExpBasePay.map((item, index) => <p className={index == activeSuggestion ? `${styles.active} ${styles.listItem}` : `${styles.listItem}`} onClick={() => setSearchTerm(item)}>{item}</p>)}
                </div>
            </div>
        </div>

          
        )

    }


    if(id == 6){


        return(
           
            <div>
            <span className={styles.inputTitle}>{selectedItem.length > 0 ? `${title}` : ""}</span>
            <div className={styles.containerList}>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={selectedItem.length > 0 ? "" : `Search ${title}`} ref={inputRef} onKeyDown={handleKeyDown} />
            </div>
        </div>

          
        )

    }



    return (

        <div>
            <span className={styles.inputTitle}>{selectedItem.length > 0 ? `${title}` : ""}</span>
            <div className={styles.containerList} onClick={openList} >
                {selectedItem.map((item) => (<p className={styles.filterItem}>{item} <svg onClick={() => removeItem(item)} height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg> </p>))}
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={selectedItem.length > 0 ? "" : `${title}`} ref={inputRef} onKeyDown={handleKeyDown} />
                <div className={styles.showAll}>
                    <svg onClick={() => clearList()} height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                    <div className={styles.leftBar}></div>
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                </div>
                <div className={open && suggestion ? styles.list : ""} >
                    {open && suggestion && suggestion.map((item, index) => <p className={index == activeSuggestion ? `${styles.active} ${styles.listItem}` : `${styles.listItem}`} onClick={() => addToList(item)}>{item}</p>)}
                </div>
            </div>
        </div>
    )

}


export default Input;