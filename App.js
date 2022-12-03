import React, { useEffect, useState } from 'react';


const getitems = () => {
    const list = localStorage.getItem('data');
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const App = () => {
    // eslint-disable-next-line
    const [itemlist, setitem] = useState('');
    const [items, setlist] = useState(getitems());
    // eslint-disable-next-line
    const [edititem, setedititem] = useState("");
    const [togglebtn, setbtn] = useState(false)

    const item = (event) => {
        setitem(event.target.value);
    }

    const listitem = () => {
        if (!itemlist) {
            alert('Enter item')

        } else if (itemlist && togglebtn) {
            setlist(
                items.map((curr) => {
                    if (curr.id === edititem) {
                        return { ...curr, name: itemlist }
                    }
                    return curr;
                })
            )
            setitem("");
            setedititem("");
            setbtn(false);
        }
        else {
            const mydata = {
                id: new Date().getTime().toString(),
                name: itemlist
            }
            setlist([...items, mydata])
            setitem('');
        }

    }

    const edit = (key) => {
        const edits = items.find((curelem) => {
            return curelem.id === key
        })
        setitem(edits.name);
        setedititem(key);
        setbtn(true);
    }

    const deleteitem = (key) => {
       const update = items.filter((elem) => {
        return elem.id !== key;
     })
     setlist(update);
    }

    const remove = () => {
        setlist([]);
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className='container'>
                <div className='main'>
                    <br />
                    <h1>ToDo List</h1>
                    <br />
                    <input type='text' value={itemlist} placeholder='Add a Item' onChange={item} />
                    {togglebtn ? <button onClick={listitem} > Edit </button> : <button onClick={listitem}> Add
                     </button>}
                    {/* <button onClick={listitem}> + </button> */}
                    <ol>
                        {items.map((itemvalue) => {
                            return (
                                <div key={itemvalue.id}>
                                    <li>{itemvalue.name}</li>
                                    <button onClick={() => deleteitem(itemvalue.id)}>Delete</button>
                                    <button onClick={() => edit(itemvalue.id)}>Edit</button>
                                </div>

                            )
                        })}
                    </ol>
                    <button onClick={remove}>Remove all</button>
                </div>
            </div>
           
        </>
    )
}

export default App;