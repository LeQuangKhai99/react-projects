const {createStore, dispatch} = window.Redux;
//state
//reducer
//store
const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_HOBBY': {
            const newListHobby = [...state];
            newListHobby.push(action.payload);
            return newListHobby;
        }
        default:
            return state;
    }
}

const store = createStore(hobbyReducer);

//Render redux hobby list
const renderHobbyList = (hobbyList) => {
    if(!Array.isArray(hobbyList || hobbyList.length === 0)){
        return;
    }

    const ulElement = document.querySelector('#hobbyListId');
    if(!ulElement) return;

     //reset previous content of ul
     ulElement.innerHTML = '';

     for (const hobby of hobbyList) {
         const liElement = document.createElement('li');
         liElement.textContent = hobby;

         ulElement.appendChild(liElement);
     }
}

// render initial hobby list
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

// handle form submit
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
        if (!hobbyTextElement.value) return;

        const action = {
            'type': 'ADD_HOBBY',
            payload: hobbyTextElement.value
        }
        store.dispatch(action);
        
        hobbyFormElement.reset();
    }

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    console.log('STATE UPDATE: ', store.getState());
    const newListHobby = store.getState();
    renderHobbyList(newListHobby);

    localStorage.setItem('hobby_list', JSON.stringify(newListHobby));
});