let store = {
  getState() {
    return this._state
  },

  _rerenderEntireTree() {},

  _state: {
    dataProfilePage: {
      PostState: [{
          id: "1",
          text: "It is my first post.",
          likes: "20"
        },
        {
          id: "2",
          text: "How are you?",
          likes: "15"
        },
        {
          id: "3",
          text: "I feel good!",
          likes: "55"
        }
      ],
      NewPostInput: 'Input Text'
    },

    dataDialogsPage: {
      PeopleState: [{
          id: "1",
          name: "Viktor",
          ava: "https://www.whalesharkstudio.com/wp-content/uploads/2015/03/guitarpanda.jpg"
        },
        {
          id: "2",
          name: "Oleg",
          ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCeos9PePfuk7TFXmlFYDD-HGbQI8MiF5gKA&usqp=CAU"
        },
        {
          id: "3",
          name: "Nelia",
          ava: "https://newcastlebeach.org/images/panda-vector-2.jpg"
        },
        {
          id: "4",
          name: "Mam",
          ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JeH71Jp2Mh6yIDAHXiQusm83RqBeBzv42Q&usqp=CAU"
        },
        {
          id: "5",
          name: "Tomas",
          ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4ujl0RQRe50orwwLWE6fhpsVIJY3qYvJ1A&usqp=CAU"
        }
      ],

      MessagesState: [{
          id: "1",
          text: "Hi bro",
          from: "Viktor"
        },
        {
          id: "2",
          text: "How are you?",
          from: "Viktor"
        },
        {
          id: "3",
          text: "Write me back as soon as possible",
          from: "Viktor"
        },
        {
          id: "4",
          text: "Hi I'm here",
          from: "you"
        }
      ]
    }
  },


  _addPost() {
    let newPost = {
      id: "5",
      text: this._state.dataProfilePage.NewPostInput,
      likes: "0"
    }
    this._state.dataProfilePage.PostState.push(newPost)
    this._state.dataProfilePage.NewPostInput = ''
    this._rerenderEntireTree(this._state)
  },

  _updateNewPostInput(newText) {
    this._state.dataProfilePage.NewPostInput = newText
    this._rerenderEntireTree(this._state)
  },

  subscribe(check) {
    this._rerenderEntireTree = check
  },

  dispatch(action) {
    debugger;
    if (action.type === 'ADD-POST') {
      this._addPost()
    } else if (action.type === 'UPDATE-NEW-POST-INPUT') {
      this._updateNewPostInput(action.newText)
    }
  }
}


export default store;
window.store = store