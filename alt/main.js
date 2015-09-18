import React from 'react';


/* Alt */
import Alt from 'alt';
const alt = new Alt();


/* Actions */
class ItemsActions {
    constructor() {
        this.generateActions(
            'create'
        )
    }
}

var itemsActions = alt.createActions(ItemsActions);


/* Stores */
class ItemsStore {
    constructor() {
        this.items = [];

        this.bindAction(itemsActions.create, this.onCreate);
    }

    onCreate(item) {
        this.items.push(item);
    }
}

var itemsStore = alt.createStore(ItemsStore);


/* UI/React */
class InputItem extends React.Component {

    onCreate() {
        var inputText = this.refs.inputText.getDOMNode();
        this.props.onCreate(inputText.value);
        inputText.value = '';
    }

    render() {
        return (
            <div>
              <input type="text"
                     ref="inputText" />
              <button onClick={() => this.onCreate()}>+</button>
            </div>
        );
    }
}

class ItemList extends React.Component {
    render() {
        if (!this.props || !this.props.items) {
            return <b>loading...</b>;
        }
        var renderedItems = this.props.items.map(function(item) {
            return (
              <div>{item.name}</div>
            );
        });

        return (
            <div>
              {renderedItems}
              <br/>
              Total: {this.props.items.length}
            </div>
        );
    }
}

class App extends React.Component {
    createNew(text) {
        itemsActions.create({name: text});
    }

    componentDidMount() {
        itemsStore.listen((s) => this.onItemStoreChanged(s));
        this.onItemStoreChanged(itemsStore.state);
    }

    onItemStoreChanged(storeState) {
        this.setState({items: storeState.items});
    }


    render() {
        return (
            <div>
              <InputItem onCreate={this.createNew} />
              <hr/>
              <ItemList items={this.state ? this.state.items : false} />
            </div>
        );
    }
}

React.render(
    <App />,
    document.getElementById('content')
);
